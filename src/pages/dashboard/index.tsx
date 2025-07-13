import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Container from '../../components/container';
import PainelHeader from '../../components/painelHeader';
import toReal from '../../utils/toReal';
import { FiTrash } from 'react-icons/fi';
import type ProductProps from '../../types/ProductProps';
import { Link } from 'react-router-dom';
//firebase
import { db, storage } from '../../services/firebase/firebaseConnection';
import { ref, deleteObject } from 'firebase/storage';
import {
  query,
  collection,
  getDocs,
  where,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState<ProductProps[]>([]);

  useEffect(() => {
    if (!user?.uid) {
      return;
    }

    function loadProducts() {
      const productRef = collection(db, 'product');
      const queryRef = query(productRef, where('uid', '==', user?.uid));

      getDocs(queryRef).then((snapshot) => {
        const listProducts = [] as ProductProps[];

        snapshot.forEach((doc) => {
          const data = doc.data();

          listProducts.push({
            id: doc.id,
            name: data.name,
            city: data.city,
            price: data.price,
            description: data.description,
            whatsapp: data.whatsapp,
            owner: data.owner,
            images: data.images,
            uid: data.uid,
          });
        });
        setProduct(listProducts);
      });
    }

    loadProducts();
  }, [user]);

  //delete product form my account
  async function handleDeleteProduct(productItem: ProductProps) {
    //remove item from the database
    const docRef = doc(db, 'product', productItem.id);
    await deleteDoc(docRef);
    //remove images form the storage
    await Promise.all(
      productItem.images.map(async (image) => {
        const imagePath = `/images/${image.name}/${image.uid}`; // database path parameters
        const imageRef = ref(storage, imagePath); // reference to remove

        try {
          await deleteObject(imageRef);
          toast.success('Product removed!');
        } catch (err) {
          console.error('Erro do deletar a imagem do banco de dados', err);
        }
      }),
    );

    //remove the car from the useState
    setProduct(product.filter((prod) => prod.id !== productItem.id));
  }

  return (
    <Container>
      <PainelHeader />
      <main className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-12">
        {product.map((item) => (
          <section
            key={item.id}
            className="w-full border border-zinc-200 bg-red-100 rounded-md relative p-2"
          >
            <Link to={`/product/${item.id}`}>
              <div className="w-full bg-white">
                <img
                  className="w-full h-52 object-contain rounded-md fadeIn"
                  src={item.images[0].url || '/fallback.jpg'}
                  alt={item.name}
                />
              </div>
              <p className="text-lg my-2 mx-2 font-bold">{item.name}</p>
              <p className="text-sm my-2 mx-2 text-zinc-700">{item.city}</p>
            </Link>
            <div className="flex items-center justify-between mt-4 mx-2">
              <p>{toReal(item.price)}</p>

              <button
                onClick={() => handleDeleteProduct(item)}
                className="flex items-center gap-2 bg-red-400 py-1 px-3 rounded-md hover:bg-red-300 cursor-pointer"
              >
                <p>Delete</p> <FiTrash />
              </button>
            </div>
          </section>
        ))}
      </main>
    </Container>
  );
}

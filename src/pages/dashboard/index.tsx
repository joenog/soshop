import { useEffect, useState, useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
import Container from '../../components/container';
import PainelHeader from '../../components/painelHeader';
import toReal from '../../utils/toReal';
import { FiTrash } from 'react-icons/fi';
import type ProductProps from '../../types/ProductProps';
import { Link } from 'react-router-dom';
//firebase
import { db } from '../../services/firebase/firebaseConnection';
import { query, collection, getDocs, where, doc, deleteDoc } from 'firebase/firestore';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [ product, setProduct ] = useState<ProductProps[]>([])

  useEffect(() => {
    if (!user?.uid) {
      return;
    }

    function loadProducts() {
    const productRef = collection(db, 'cars');
    const queryRef = query(productRef, where("uid", "==", user?.uid));

      getDocs(queryRef).then((snapshot) => {
        const listProducts = [] as ProductProps[];

        snapshot.forEach(doc => {
          listProducts.push({
            id: doc.id,
            name: doc.data().name,
            city: doc.data().city,
            price: doc.data().price,
            description: doc.data().description,
            images: doc.data().images,
            uid: doc.data().uid
          });
        });
        setProduct(listProducts);
        console.log(listProducts)
      })
    }

    loadProducts();
  }, [ user ])
  //delete product form my account
  async function handleDeleteProduct(id: string) {
    const docRef = doc(db, "cars", id);
    await deleteDoc(docRef);
    setProduct(product.filter(product => product.id !== id))
  }

  return (
    <Container>
      <PainelHeader />
      <main className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-12'>

        {product.map((item) => (
          <section key={item.id} className='w-full border border-zinc-200 bg-red-100 rounded-md relative p-2'>
          <Link to={`/product/${item.id}`}>
            <img
              className="w-full h-52 object-cover rounded-md fadeIn"
              src={item.images[0].url}
              alt={item.name}
            />
            <p className="text-lg my-2 mx-2 font-bold">{item.name}</p>
            <p className="text-sm my-2 mx-2 text-zinc-700">{item.city}</p>
          </Link>
          <div className="flex items-center justify-between mt-4 mx-2">
            <p>{toReal(100)}</p>

            <button 
              onClick={ () => handleDeleteProduct(item.id) }
              className="flex items-center gap-2 bg-red-400 py-1 px-3 rounded-md hover:bg-red-300 cursor-pointer">
              <p>Delete</p> <FiTrash />
            </button>

          </div>
        </section>
        ))}
        
      </main>
    </Container>
  );
}

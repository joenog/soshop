import { useState, useEffect } from 'react';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import Container from '../../components/container';
import type ProductProps from '../../types/ProductProps';
import toReal from '../../utils/toReal';
//firebase
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConnection';
import { Link } from 'react-router-dom';

export default function Home() {
  const [menuFixed, setMenuFixed] = useState('');
  const [product, setProduct] = useState<ProductProps[]>([]);
  const [loadImages, setLoadImages] = useState<string[]>([]);

  useEffect(() => {
    function loadProducts() {
      const productRef = collection(db, 'cars');
      const queryRef = query(productRef, orderBy('created', 'desc'));

      getDocs(queryRef).then((snapshot) => {
        const listProducts = [] as ProductProps[];

        snapshot.forEach((doc) => {
          listProducts.push({
            id: doc.id,
            name: doc.data().name,
            city: doc.data().city,
            price: doc.data().price,
            description: doc.data().description,
            whatsapp: doc.data().whatsapp,
            owner: doc.data().owner,
            images: doc.data().images,
            uid: doc.data().uid,
          });
        });
        setProduct(listProducts);
      });
    }

    loadProducts();
  }, []);
  //field search animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setMenuFixed(
          'w-screen justify-center flex md:max-w-5xl p-2 fixed top-17 opacity-50 px-4',
        );
      } else {
        setMenuFixed('');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // prevent layout shift
  function handleImageLoad(id: string) {
    setLoadImages((prevImageLoaded) => [...prevImageLoaded, id]);
  }

  return (
    <Container>
      <section className={'flex flex-row justify-center mx-auto'}>
        <div
          className={
            `flex w-screen justify-center transition-opacity` + menuFixed
          }
        >
          <input
            className="w-full md:max-w-4xl outline-0 bg-zinc-50 rounded-l-md p-2 border border-zinc-200"
            type="text"
            placeholder=" What are you looking for?"
          />
          <button
            className="bg-red-400 px-2 rounded-r-md cursor-pointer"
            type="submit"
          >
            <FiSearch color="white" size={22} />
          </button>
        </div>
      </section>

      <main className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 my-8">
        {product.map((item) => (
          <section key={item.id} className="bg-white rounded-xl p-2 shadow-sm">
            <Link to={`/product/${item.id}`}>
              <div
                className="w-full h-52 rounded-md bg-zinc-100"
                style={{
                  display: loadImages.includes(item.id) ? 'none' : 'block',
                }}
              ></div>
              <img
                className="w-full h-52 object-contain rounded-md fadeIn"
                src={item.images[0].url}
                alt={`Imagem do carro ${item.name}`}
                style={{
                  display: loadImages.includes(item.id) ? 'block' : 'none',
                }}
                onLoad={() => handleImageLoad(item.id)}
              />
            </Link>
            <p className="text-lg my-2 mx-2 font-bold">{item.name}</p>
            <p className="text-sm my-2 mx-2 text-zinc-700">{item.city}</p>
            <div className="flex items-center justify-between mt-4 mx-2">
              <p>{toReal(item.price)}</p>
              <Link to={`/product/${item.id}`}>
                <button className="flex items-center gap-2 bg-green-400 py-1 px-3 rounded-md hover:bg-green-300 cursor-pointer">
                  <strong>Buy</strong> <FiShoppingCart />
                </button>
              </Link>
            </div>
          </section>
        ))}
      </main>
    </Container>
  );
}

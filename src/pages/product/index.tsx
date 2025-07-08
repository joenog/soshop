import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../../components/container';
import type ProductProps from '../../types/ProductProps';
import { FaWhatsapp } from 'react-icons/fa';
//firebase
import { db } from '../../services/firebase/firebaseConnection';
import { getDoc, doc } from 'firebase/firestore';
import toReal from '../../utils/toReal';
// import Swiper JS
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper styles

export default function ProductDetail() {
  const { id } = useParams(); // parameter
  const [product, setProduct] = useState<ProductProps | null>(null);
  const screen = innerWidth;

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;

      const docRef = doc(db, 'cars', id);
      getDoc(docRef).then((snapshot) => {
        setProduct({
          id: snapshot.id,
          name: snapshot.data()?.name,
          city: snapshot.data()?.city,
          price: snapshot.data()?.price,
          description: snapshot.data()?.description,
          whatsapp: snapshot.data()?.whatsapp,
          owner: snapshot.data()?.owner,
          images: snapshot.data()?.images,
          uid: snapshot.data()?.uid,
        });
      });
    }

    loadProduct();
  }, [id]);

  return (
    <Container>
      {product && (
        <>
          <div className="rounded-md p-2 bg-amber-50">
            <Swiper
              spaceBetween={10}
              slidesPerView={screen <= 600 ? 1 : 2.5}
              navigation
              onSwiper={(swiper) => console.log(swiper)}
              pagination={{ clickable: true }}
            >
              {product.images.map((item) => (
                <SwiperSlide key={item.uid}>
                  <img
                    className="w-full h-82 rounded-md"
                    src={item.url}
                    alt=""
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <main
            className="w-full bg-white p-6 my-4 rounded-md"
            key={product.id}
          >
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">{product?.name}</p>
              <p className="text-2xl">{toReal(product?.price)}</p>
            </div>

            <p className="text-zinc-500 py-2">sold by: {product?.owner}</p>
            <p className=" my-4">{product?.description}</p>

            <a href="">
              <div className="flex md:justify-end mt-2">
                <button className="flex w-full md:w-40 items-center text-white justify-center gap-2 bg-green-600 hover:bg-green-500 text-xl p-2 px-4 rounded-md cursor-pointer">
                  {'Whatsapp'} <FaWhatsapp />
                </button>
              </div>
            </a>
          </main>
        </>
      )}
    </Container>
  );
}

import { FiSearch } from 'react-icons/fi';
import Container from '../../components/container';
import { FaCartPlus } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function Home() {
  const [menuFixed, setMenuFixed] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setMenuFixed(
          'w-screen flex md:max-w-5xl p-2 fixed top-17 trasition-all opacity-70',
        );
      } else {
        setMenuFixed('');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuFixed]);

  return (
    <Container>
      <section className={'flex flex-row justify-center mx-auto'}>
        <div
          className={`flex w-screen justify-center transition-all` + menuFixed}
        >
          <input
            className="w-full md:max-w-4xl border-none outline-0 bg-zinc-50 rounded-md p-2"
            type="text"
            placeholder="O que você procura?"
          />
          <button
            className="bg-red-400 px-2 rounded-md cursor-pointer"
            type="submit"
          >
            <FiSearch color="white" size={22} />
          </button>
        </div>
      </section>

      <main className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 my-8">
        <section className="bg-amber-100 rounded-xl p-2">
          <img
            className="w-full bg-cover bg-amber-50 rounded-md h-50"
            src="/soshop-fav.png"
            alt=""
          />

          <p className="text-xl my-2 mx-2">Nome do Produto</p>
          <div className="flex items-center justify-between mt-4 mx-2">
            <p>R$ 89,68</p>
            <button className="flex items-center gap-2 bg-green-400 py-1 px-3 rounded-md hover:bg-green-500 cursor-pointer">
              <strong>Buy</strong> <FaCartPlus />
            </button>
          </div>
        </section>

        <section className="bg-amber-100 rounded-xl p-2">
          <img
            className="w-full bg-cover bg-amber-50 rounded-md h-50"
            src="/soshop-fav.png"
            alt=""
          />

          <p className="text-xl my-2 mx-2">Nome do Produto</p>
          <div className="flex items-center justify-between mt-4 mx-2">
            <p>R$ 89,68</p>
            <button className="flex items-center gap-2 bg-green-400 py-1 px-3 rounded-md hover:bg-green-300 cursor-pointer">
              <strong>Buy</strong> <FaCartPlus />
            </button>
          </div>
        </section>

        <section className="bg-amber-100 rounded-xl p-2">
          <img
            className="w-full bg-cover bg-amber-50 rounded-md h-50"
            src="/soshop-fav.png"
            alt=""
          />

          <p className="text-xl my-2 mx-2">Nome do Produto</p>
          <div className="flex items-center justify-between mt-4 mx-2">
            <p>R$ 89,68</p>
            <button className="flex items-center gap-2 bg-green-400 py-1 px-3 rounded-md hover:bg-green-300 cursor-pointer">
              <strong>Buy</strong> <FaCartPlus />
            </button>
          </div>
        </section>

        <section className="bg-amber-100 rounded-xl p-2">
          <img
            className="w-full bg-cover bg-amber-50 rounded-md h-50"
            src="/soshop-fav.png"
            alt=""
          />

          <p className="text-xl my-2 mx-2">Nome do Produto</p>
          <div className="flex items-center justify-between mt-4 mx-2">
            <p>R$ 89,68</p>
            <button className="flex items-center gap-2 bg-green-400 py-1 px-3 rounded-md hover:bg-green-300 cursor-pointer">
              <strong>Buy</strong> <FaCartPlus />
            </button>
          </div>
        </section>

        <section className="bg-amber-100 rounded-xl p-2">
          <img
            className="w-full bg-cover bg-amber-50 rounded-md h-50"
            src="/soshop-fav.png"
            alt=""
          />

          <p className="text-xl my-2 mx-2">Nome do Produto</p>
          <div className="flex items-center justify-between mt-4 mx-2">
            <p>R$ 89,68</p>
            <button className="flex items-center gap-2 bg-green-400 py-1 px-3 rounded-md hover:bg-green-300 cursor-pointer">
              <strong>Buy</strong> <FaCartPlus />
            </button>
          </div>
        </section>

        <section className="bg-amber-100 rounded-xl p-2">
          <img
            className="w-full bg-cover bg-amber-50 rounded-md h-50"
            src="/soshop-fav.png"
            alt=""
          />

          <p className="text-xl my-2 mx-2">Nome do Produto</p>
          <div className="flex items-center justify-between mt-4 mx-2">
            <p>R$ 89,68</p>
            <button className="flex items-center gap-2 bg-green-400 py-1 px-3 rounded-md hover:bg-green-300 cursor-pointer">
              <strong>Buy</strong> <FaCartPlus />
            </button>
          </div>
        </section>
      </main>
    </Container>
  );
}

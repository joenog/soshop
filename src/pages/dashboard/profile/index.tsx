import { useContext } from 'react';
import Container from '../../../components/container';
import PainelHeader from '../../../components/painelHeader';
import { AuthContext } from '../../../context/AuthContext';
import { FiMail } from 'react-icons/fi';

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <PainelHeader />
      <main className="w-full mt-12">
        <div className="w-full select-none h-42 bg-red-100 p-2 rounded-md flex justify-between sm:flex-row items-center gap-2">
          <div className="flex justify-start flex-col gap-1 text-2xl text-zinc-800 px-2 md:px-8">
            <p> {user?.name}</p>
            <p className="text-sm flex items-center gap-2 ">
              {' '}
              <FiMail /> {user?.email}
            </p>
          </div>

          <div className="bg-red-200 p-6 px-9 text-zinc-700 rounded-full text-7xl shadow-sm mr-4">
            {user?.name?.charAt(0)}
          </div>
        </div>
      </main>
    </Container>
  );
}

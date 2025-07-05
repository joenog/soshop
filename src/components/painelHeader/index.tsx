import { Link, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase/firebaseConnection';
import { FiLogOut } from 'react-icons/fi';

export default function PainelHeader() {
  const location = useLocation();

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div className="fixed w-screen pr-8 xl:pr-78 z-20">
      <div className="flex justify-between px-4 items-center bg-zinc-700 text-white rounded-md h-10 shadow-sm">
        <div className="flex gap-4 font-bold">
          <Link
            className={location.pathname === '/dashboard' ? 'text-red-200' : ''}
            to={'/dashboard'}
          >
            Dashboard
          </Link>
          <span className="p-[.05px] bg-zinc-950"> </span>
          <Link
            className={
              location.pathname === '/dashboard/new' ? 'text-red-200' : ''
            }
            to={'/dashboard/new'}
          >
            New Item
          </Link>
          <span className="p-[.05px] bg-zinc-950"> </span>
          <Link
            className={
              location.pathname === '/dashboard/profile' ? 'text-red-200' : ''
            }
            to={'/dashboard/profile'}
          >
            Profile
          </Link>
        </div>
        <button className="cursor-pointer" onClick={handleLogout} type="button">
          <FiLogOut />
        </button>
      </div>
    </div>
  );
}

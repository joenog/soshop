import { Link } from 'react-router-dom';
import logo from '../../assets/soshop.png';
import { FiUser, FiLogIn } from 'react-icons/fi';
import { useLocation } from '../../services/userLocation';
//import type LocationProps from "../../types/locationProps";

export default function Header() {
  const location = useLocation();
  const singed = true;
  const loadingAuth = false;

  return (
    <header className="w-screen flex fixed h-16 bg-zinc-800 items-center justify-center shadow-sm px-4">
      <div className="flex items-center w-7xl justify-between">
        <div className="w-40 fadeIn">
          <Link to={'/'}>
            <img src={logo} alt="soshop-logo" />
          </Link>
        </div>

        <div className="flex gap-2 items-center justify-center cursor-pointer">
          <div>
            {location ? (
              <div
                style={{ fontSize: '12px' }}
                className="flex flex-col text-amber-50 opacity-50"
              >
                <p className="underline">{location.city}</p>
                <p>{location.zip}</p>
              </div>
            ) : (
              <p>...</p>
            )}
          </div>

          <div className="flex items-center text-zinc-100 my-1 px-3">
            {!loadingAuth && singed && (
              <Link to={'/dashboard'}>
                <div className="flex justify-center border-1 rounded-2xl p-0.5 opacity-80 bg-zinc-700">
                  <FiUser size={24} style={{ strokeWidth: 0.5 }} />
                </div>
              </Link>
            )}

            {!loadingAuth && !singed && (
              <Link to={'/login'}>
                <FiLogIn size={24} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

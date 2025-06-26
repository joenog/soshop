import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/soshop.png';
import { FiUser, FiLogIn } from 'react-icons/fi';
import { useLocation } from '../../services/userLocation';
import { FaLocationArrow } from 'react-icons/fa';

export default function Header() {
  const location = useLocation();
  const { signed, loadingAuth, user } = useContext(AuthContext);

  return (
    <header className="w-screen flex fixed h-16 bg-zinc-800 items-center justify-center shadow-sm px-4 z-50">
      <div className="flex items-center w-7xl justify-between">
        <div className="w-40 fadeIn">
          <Link to={'/'}>
            <img src={logo} alt="soshop-logo" />
          </Link>
        </div>

        <div className="flex gap-2 items-center justify-center">
          <div>
            {location ? (
              <div style={{ fontSize: '12px' }}>
                <p className="text-md text-white">{user?.name}</p>
                <div className="flex flex-col text-amber-50 opacity-50 underline">
                  {!signed ? (
                    <FaLocationArrow />
                  ) : (
                    <div>{location.city} | {location.zip}</div>
                  )}
                </div>
              </div>
            ) : (
              <p>...</p>
            )}
          </div>

          <div className="flex items-center text-zinc-100 my-1 px-3">
            {!loadingAuth && signed && (
              <Link to={'/dashboard'}>
                <div className="flex justify-center rounded-2xl p-1.5 opacity-60 bg-zinc-700">
                  <FiUser size={22} style={{ strokeWidth: 1 }} />
                </div>
              </Link>
            )}

            {!loadingAuth && !signed && (
              <Link to={'/login'}>
                <div className="flex justify-center rounded-2xl p-1.5 opacity-60 bg-zinc-700">
                  <FiLogIn size={22} style={{ strokeWidth: 1}} />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

import { useContext, type ReactNode } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

interface PrivateProps {
  children: ReactNode;
}

export default function Private({ children }: PrivateProps) {
  const { signed, loadingAuth } = useContext(AuthContext);

  if (loadingAuth) {
    return (
      <div className="p-2 bg-blue-950 transform rotate-45">Loading ..</div>
    );
  }

  if (!signed) {
    return <Navigate to={'/login'} />;
  }

  return children;
}

import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase/firebaseConnection";
import { FiLogOut } from "react-icons/fi";

export default function PainelHeader() {

  async function handleLogout() {
    await signOut(auth);
  } 

  return (
    <div className="w-full flex justify-between px-4 items-center bg-zinc-700 text-white rounded-md h-10 shadow-sm">
      <div className="flex gap-4">
        <Link to={"/dashboard"}>Dashboard</Link>
        <Link to={"/dashboard/new"}>New Item</Link>
      </div>
      <button className="cursor-pointer" onClick={handleLogout} type="button">
        <FiLogOut />
      </button>
    </div>
  );
}

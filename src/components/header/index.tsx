import { Link } from "react-router-dom";

export default function Header() {
  return(
    <header className="flex h-12 p-4 bg-zinc-900 justify-between">
      <div>
        <img src="/assets/soshop.png" alt="" />
      </div>

      <div>
        <Link to={"/"}>Home</Link>
      </div>
    </header>
  )
}
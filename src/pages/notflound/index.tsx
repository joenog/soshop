import { Link } from "react-router-dom";
import Container from "../../components/container";

export default function NotFound() {
  return (
    <Container>
      <main className="w-full flex flex-col items-center justify-center mt-40">
        <h1 className="text-2xl opacity-50">Not found!</h1>
        <img className="w-64 opacity-45" src={"./notfound.png"} alt="" />

        <Link className="underline text-zinc-600" to={'/'}>
          Home
        </Link>
      </main>
    </Container>
  )
}
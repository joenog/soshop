import { useEffect } from 'react';
import Container from '../../components/container';
import logo from '../../assets/soshop.png';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/input';
//validation form
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
//
import { auth } from '../../services/firebase/firebaseConnection';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

const schema = z.object({
  email: z
    .string()
    .email('Please enter a valid email!')
    .min(1, 'The email field is required!'),
  password: z.string().min(1, 'The password field is required!'),
});
//typagem para o form seguir o esquema
export type FormData = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  //logout if user is logged in
  useEffect(() => {
    async function handleLogOut() {
      signOut(auth);
    }

    handleLogOut();
  }, []);

  //login your account
  function onSubmit(data: FormData) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
        console.log('LOGADO COM SUCESSO:');
        console.log(user);
        navigate('/dashboard', { replace: true });
      })
      .catch((err) => {
        console.error('ERRO AO LOGAR:' + err);
      });
  }

  return (
    <Container>
      <div className="w-full min-h-full flex flex-col justify-center items-center">
        <Link to={'/'}>
          <img className="w-64 opacity-60" src={logo} alt="" />
        </Link>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-xl w-full rounded-md bg-white p-4 mt-10 "
        >
          <h2 className="text-center my-1 text-lg text-zinc-800">Login</h2>
          <Input
            type="email"
            placeholder="Enter your email"
            name="email"
            error={errors.email?.message}
            register={register}
          />

          <Input
            type="password"
            placeholder="Enter your password"
            name="password"
            error={errors.password?.message}
            register={register}
          />

          <button
            type="submit"
            className="w-full rounded py-1 bg-zinc-800 text-white mt-5 cursor-pointer"
          >
            Login
          </button>
        </form>

        <Link
          className="w-full text-center mt-5 cursor-pointer underline text-zinc-500"
          to={'/register'}
        >
          Create an account
        </Link>
      </div>
    </Container>
  );
}

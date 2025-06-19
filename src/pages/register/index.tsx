import Container from '../../components/container';
import logo from '../../assets/soshop.png';
import { Link } from 'react-router-dom';
import Input from '../../components/input';
//validation form
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(6, "Please enter your full name!"),
  email: z.string().email("Please enter a valid email").min(8, "The email must be at least 8 characters long!"),
  password: z.string().min(1, "The password field is required!")

})
//typagem para o form seguir o esquema
type FormData = z.infer<typeof schema>

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })
  
  function onSubmit(data: FormData) {
    console.log(data)
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
          <h2 className='text-center my-1 text-lg text-zinc-800'>Register</h2>
          <Input
            type='name'
            placeholder='Enter your name'
            name='name'
            error={errors.name?.message}
            register={register}
          />

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

          <button type="submit" className='w-full rounded py-1 bg-zinc-800 text-white mt-5 cursor-pointer'>
            Register
          </button>

        </form>
         <Link className='w-full text-center mt-5 cursor-pointer underline text-zinc-500' to={'/login'}>
              I have an account
          </Link>
      </div>
    </Container>
  );
}

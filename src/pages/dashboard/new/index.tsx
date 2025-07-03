import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../context/AuthContext';
import { FiTrash, FiUpload } from 'react-icons/fi';
import Container from '../../../components/container';
import PainelHeader from '../../../components/painelHeader';
import Input from '../../../components/input';
import { v4 as uuidV4 } from 'uuid';
import type ImageItemProps from '../../../types/ImageItemProps';
//import validation
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ChangeEvent } from 'react';
//firebase
import { storage, db } from '../../../services/firebase/firebaseConnection';
import { collection, addDoc } from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

export default function New() {
  const { user } = useContext(AuthContext);
  const [carImage, setCarImage] = useState<ImageItemProps[]>([]);

  const schema = z.object({
    name: z.string().min(1, 'The name field is required!'),
    description: z.string().min(8, 'The field description is requeired!'),
    category: z.string(),
    price: z.string().min(1, 'The field price is required!'),
    quantity: z.string().min(1, 'The field quantity is required!'),
    city: z.string().min(1, 'The field city is required!'),
    whatsapp: z
      .string()
      .min(1, 'The field whatsapp/phone is required!')
      .refine((value) => /^(\d{11,12})$/.test(value), {
        message: 'Invalid phone number!',
      }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });
  // selected images
  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      console.log(image);
      console.log('imagem enviada');
      if (image.type == 'image/png' || image.type === 'image/jpeg') {
        await handleUpload(image);
      } else {
        alert('envie algo valido');
        return;
      }
    }
  }

  //have user? then send the imagem to database
  async function handleUpload(image: File) {
    if (!user?.uid) {
      alert('have not user, please login!');
      return;
    }

    const currentUid = user?.uid; // user uid
    const uidImage = uuidV4(); // a random uid to new images
    //
    const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`);
    //add to database
    uploadBytes(uploadRef, image)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadUrl) => {
          const ImageItem = {
            uid: uidImage,
            name: currentUid,
            previewUrl: URL.createObjectURL(image),
            url: downloadUrl,
          };
          setCarImage((images) => [...images, ImageItem]);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  //delete image
  async function handleDeleteImage(item: ImageItemProps) {
    const imagePath = `images/${item.name}/${item.uid}`;
    const imageRef = ref(storage, imagePath);

    try {
      await deleteObject(imageRef);
      setCarImage(carImage.filter((car) => car.url !== item.url));
    } catch (err) {
      console.log('Erro ao deletar', err);
    }
  }

  // data in the form to sendo to the database
  function onSubmit(data: FormData) {
    if (carImage.length === 0) {
      alert('Envie alguma imagem do carro');
      return;
    }

    const carListImage = carImage.map((car) => {
      return {
        uid: car.uid,
        name: car.name,
        url: car.url,
      };
    });
    // create a collection and add to the database
    addDoc(collection(db, 'cars'), {
      name: data.name,
      category: data.category,
      descriptiom: data.description,
      city: data.city,
      whatsapp: data.whatsapp,
      price: data.price,
      quantity: data.quantity,
      created: new Date(),
      //about the user
      owner: user?.name,
      uid: user?.uid,
      images: carListImage,
    })
      .then(() => {
        reset(); // clean all form fields
        setCarImage([]); // crean the array with the cars
        console.log('NOVO ITEM ADICIONADO');
      })
      .catch((err) => {
        console.error('ERRO AO ADICIONAR: ', err);
      });
  }

  return (
    <Container>
      <PainelHeader />
      <div className="w-full bg-white p-3 mt-12 rounded-md flex flex-col sm:flex-row items-center gap-2">
        <button className="flex flex-col items-center justify-center cursor-pointer p-2 bg-zinc-100 rounded-md w-60 border-1 border-zinc-300">
          <div className="absolute">
            <FiUpload size={30} color="gray" />
          </div>
          <div>
            <input
              className="text-transparent w-full h-26 min-w-60 cursor-pointer"
              type="file"
              accept="image/*"
              onChange={handleFile}
            />
            <p className="text-zinc-300">add Image</p>
          </div>
        </button>

        {carImage.map((item) => (
          <div
            key={item.name}
            className="w-full flex items-center justify-center relative h-36"
          >
            <button
              onClick={() => handleDeleteImage(item)}
              className="absolute cursor-pointer bg-red-50 p-2 rounded-md"
            >
              <FiTrash size={20} color="red" />
            </button>

            <img
              className="rounded-md w-full h-36 object-cover"
              src={item.previewUrl}
              alt=""
            />
          </div>
        ))}
      </div>

      <div className="w-full flex flex-col items-center gap-2  p-3 rounded-md bg-white mt-2 mb-10">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-2">
            <div>
              <p className="mx-1 mt-3 text-zinc-900">Product Name</p>
              <Input
                type="text"
                name="name"
                register={register}
                error={errors.name?.message}
                placeholder="Iphone 13 PRO"
              />
            </div>
            <div>
              <p className="mx-1 mt-3 text-zinc-900">Category</p>
              <Input
                type="text"
                name="category"
                register={register}
                error={errors.category?.message}
                placeholder="Smartphones"
              />
            </div>
          </div>

          <div>
            <p className="mx-1 mt-3 text-zinc-900">Description</p>
            <textarea
              className="w-full min-h-18 max-h-18 mt-1 outline-none border-1 border-zinc-200 rounded-md indent-2"
              id="description"
              {...register('description')}
              placeholder="New and without signs of use"
            />
            {errors.description && (
              <p className="text-red-400 text-sm indent-2">
                {' '}
                {errors.description?.message}{' '}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="mx-1 mt-3 text-zinc-900">City</p>
              <Input
                type="text"
                name="city"
                register={register}
                error={errors.city?.message}
                placeholder="New York"
              />
            </div>

            <div>
              <p className="mx-1 mt-3 text-zinc-900">Whatsapp</p>
              <Input
                type="text"
                name="whatsapp"
                register={register}
                error={errors.whatsapp?.message}
                placeholder="73 99814-0001"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="mx-1 mt-3 text-zinc-900">Price</p>
              <Input
                type="text"
                name="price"
                register={register}
                error={errors.quantity?.message}
                placeholder="$ 500"
              />
            </div>

            <div>
              <p className="mx-1 mt-3 text-zinc-900">Quatity</p>
              <Input
                type="text"
                name="quantity"
                register={register}
                error={errors.quantity?.message}
                placeholder="20"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-red-800 p-1 w-full rounded-md text-lg text-white cursor-pointer mt-6"
          >
            Register
          </button>
        </form>
      </div>
    </Container>
  );
}

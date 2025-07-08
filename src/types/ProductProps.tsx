import type ImageItemProps from './ImageItemProps';

export default interface ProductProps {
  id: string;
  name: string;
  city: string;
  price: number;
  description: string;
  whatsapp: string;
  owner: string;
  images: ImageItemProps[];
  uid: string;
}

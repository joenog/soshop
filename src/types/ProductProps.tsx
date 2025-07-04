import type ImageItemProps from "./ImageItemProps";

export default interface ProductProps {
  id: string;
  name: string;
  city: string;
  price: number;
  description: string;
  images: ImageItemProps[];
  uid: string;
}
import type { RegisterOptions, UseFormRegister } from "react-hook-form"

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules: RegisterOptions;
}

export default function Input({ name, placeholder, type, register, rules, error}: InputProps) {
  return (
    <div>
      <input
        className="w-full rounded p-2 outline-0 mt-2 text-md border-1 border-zinc-300"
        placeholder={placeholder}
        type={type}
        id={name}
        {...register(name, rules)}
      />
      {error && <p className="px-2 text-red-400 mb-1 fadeIn text-sm">{error}</p>}
    </div>
  );
}
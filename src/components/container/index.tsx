import type { ReactNode } from 'react';

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="w-full select-none max-w-7xl mx-auto px-4 pt-20 fadeIn">
      {children}
    </div>
  );
}

import { useState, useEffect } from 'react';
import type LocationProps from '../../types/locationProps';

export const useLocation = () => {
  const [location, setLocation] = useState<LocationProps | null>(null);

  useEffect(() => {
    fetch('http://ip-api.com/json')
      .then((res) => res.json())
      .then((data) => {
        setLocation({
          city: data.city,
          zip: data.zip,
        });
      })
      .catch((err) => console.error('Erro ao obter localização:', err));
  }, []);

  return location;
};

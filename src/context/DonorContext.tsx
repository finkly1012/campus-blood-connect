
import React, { createContext, useState, ReactNode } from 'react';
import users from '../data/users.json';

// Definisikan tipe untuk objek donor
interface Donor {
  id: number;
  name: string;
  nim: string;
  bloodType: string;
  lastDonationDate: string;
  // tambahkan properti lain yang relevan di sini
}

// Definisikan tipe untuk konteks
interface DonorContextType {
  donors: Donor[];
  addDonor: (donor: Omit<Donor, 'id'>) => void;
}

// Buat konteks dengan nilai default
export const DonorContext = createContext<DonorContextType | undefined>(undefined);

// Buat provider untuk konteks
export const DonorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [donors, setDonors] = useState<Donor[]>(users);

  const addDonor = (donor: Omit<Donor, 'id'>) => {
    setDonors(prevDonors => [
      ...prevDonors,
      {
        id: prevDonors.length + 1, // atau gunakan mekanisme pembuatan ID yang lebih baik
        ...donor,
      },
    ]);
  };

  return (
    <DonorContext.Provider value={{ donors, addDonor }}>
      {children}
    </DonorContext.Provider>
  );
};

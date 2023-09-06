import { createContext, useState } from 'react';

type ContextType = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

interface ModalProps {
  children: React.ReactElement;
}

export const ModalContext = createContext({} as ContextType);

export const ModalProvider = ({ children }: ModalProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <ModalContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

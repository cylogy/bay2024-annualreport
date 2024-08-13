import { Dispatch, SetStateAction, createContext, useContext } from 'react';

type ContextType = {
  SelectedItem: string;
  setSelectedItem: Dispatch<SetStateAction<string>>;
};

const initial: ContextType = {
  SelectedItem: '',
  setSelectedItem: () => {
    // Æ
  },
};

export const AccordionContext = createContext<ContextType>(initial);
export const useAccordionContext = () => useContext(AccordionContext);

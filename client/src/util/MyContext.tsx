import { createContext } from "react";

interface MyContextType {
  currentUser: object;
  isChange: string | null;
  changeMode: React.Dispatch<React.SetStateAction<string>>;
}

export const MyContext = createContext<MyContextType | null>(null);

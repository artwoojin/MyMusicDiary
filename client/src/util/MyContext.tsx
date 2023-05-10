import { createContext } from "react";

interface MyContextType {
  isLogin: string | null;
  currentUser: object;
  isChange: string | null;
  changeMode: React.Dispatch<React.SetStateAction<string>>;
}

export const MyContext = createContext<MyContextType | null>(null);

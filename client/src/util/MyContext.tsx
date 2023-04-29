import { createContext } from "react";

interface MyContextType {
  isLogin: string | null;
  currentUser: object;
  isChange: string | null;
  changeMode: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MyContext = createContext<MyContextType | null>(null);

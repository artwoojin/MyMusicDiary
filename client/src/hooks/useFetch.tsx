import { BASE_API } from "../util/API";
import { useState, useEffect, useContext } from "react";
import { MyContext } from "../util/MyContext";

function useFetch(api: string, loadingState: boolean) {
  const [data, setData] = useState([]);

  const { isLoading, setIsLoading }: any = useContext(MyContext);

  const getData = async () => {
    try {
      const res = await BASE_API.get(api);
      setIsLoading(loadingState);
      setData(res.data);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return { data, isLoading, getData };
}

export default useFetch;

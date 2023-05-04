import DetailList from "./DetailList";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { DiaryData } from "../../util/Type";
import { BASE_API } from "../../util/API";
import { MyContext } from "../../util/MyContext";

function DetailMain() {
  const [detailData, setDetailData] = useState<DiaryData>();

  const { diaryId } = useParams();
  const { setIsLoading, isLoading }: any = useContext(MyContext);

  // 선택한 다이어리 get 요청
  const getDetailData = async () => {
    try {
      const res = await BASE_API.get(`/diary/${diaryId}`);
      setIsLoading(true);
      setDetailData(res.data);
    } catch (err) {
      setIsLoading(true);
      console.error(err);
    }
  };
  useEffect(() => {
    getDetailData();
  }, []);

  return <>{detailData && <DetailList list={detailData} getDetailData={getDetailData} />}</>;
}

export default DetailMain;

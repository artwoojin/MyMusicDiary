import DetailList from "./DetailList";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DiaryData } from "../../util/Type";
import { BASE_API } from "../../util/API";

function DetailMain() {
  const [detailData, setDetailData] = useState<DiaryData>();
  const [likeData, setLikeData] = useState<any>();

  const { diaryId } = useParams();

  // 선택한 다이어리 get 요청
  const getDetailData = async () => {
    try {
      const res = await BASE_API.get(`/diary/${diaryId}`);
      setDetailData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getDetailData();
  }, []);

  // const getLikeData = async () => {
  //   try {
  //     const res = await BASE_API.get(`/likes/${diaryId}`);
  //     setLikeData(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  // useEffect(() => {
  //   getLikeData();
  // }, []);

  return (
    <>
      {detailData && (
        <DetailList
          list={detailData}
          getDetailData={getDetailData}
          // likeData={likeData}
          // getLikeData={getLikeData}
        />
      )}
      ;
    </>
  );
}

export default DetailMain;

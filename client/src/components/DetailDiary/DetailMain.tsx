import DetailList from "./DetailList";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DiaryData } from "../../util/interface";
import { BASE_API } from "../../util/api";
import {
  mainDiaryRejected,
  searchDiaryRejected,
  myDiaryRejected,
  likeDiaryRejected,
} from "../../redux/slice/loading";
import { useAppDispatch } from "../../redux/hooks/hooks";

function DetailMain() {
  const [detailData, setDetailData] = useState<DiaryData>();

  const dispatch = useAppDispatch();
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

  // 다이어리 상세 페이지 진입 시 메인 다이어리, 검색 다이어리, 나의 다이어리 상태 true로 변경
  useEffect(() => {
    dispatch(mainDiaryRejected());
    dispatch(searchDiaryRejected());
    dispatch(myDiaryRejected());
    dispatch(likeDiaryRejected());
  }, []);

  return <>{detailData && <DetailList list={detailData} getDetailData={getDetailData} />}</>;
}

export default DetailMain;

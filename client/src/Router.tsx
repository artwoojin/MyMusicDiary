import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SearchDiary from "./pages/Search";
import Spinner from "./components/common/Spinner";

const NewDiary = lazy(() => import("./pages/NewDiary"));
const Mypage = lazy(() => import("./pages/Mypage"));
const DetailDiary = lazy(() => import("./pages/DetailDiary"));
const EditDiary = lazy(() => import("./pages/EditDiary"));

export default function Router() {
  return (
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/new' element={<NewDiary />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/detail/:diaryId' element={<DetailDiary />} />
          <Route path='/edit/:diaryId' element={<EditDiary />} />
          <Route path='/search' element={<SearchDiary />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

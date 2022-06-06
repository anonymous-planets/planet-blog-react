import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import MainPage from '../pages';
import MyPage from '../pages/MyPage';
import PrivateRoute from './PrivateRoute';
import AdminMainPage from '../pages/admin';
import ProtectRoute from './ProtectRoute';
import MemberManageMainPage from '../pages/admin/member';


// Error 페이지 정의
import Error404 from 'pages/common/error/Error404';

// Layout 페이지 정의
import DefaultLayout from 'layouts';
import AdminDefaultLayout from 'layouts/AdminDefaultLayout';


export default function Router() {

  return (
    <BrowserRouter>
      <Routes>
        {/* 인증 여부 상광 없이 접속 가능한 페이지 정의 */}
        <Route index element={<DefaultLayout><MainPage/></DefaultLayout>}/>

        {/* 인증을 반드시 하지 않아야만 접속 가능한 페이지 정의 */}
        <Route element={<PrivateRoute authentication={false}/>}>
          <Route path="/login" element={<DefaultLayout><LoginPage/></DefaultLayout>} />
        </Route>

        {/* 인증을 반드시 해야지만 접속 가능한 페이지 정의 */}
        <Route element={<PrivateRoute authentication={true}/>}>
          <Route path="/mypage" element={<DefaultLayout><MyPage/></DefaultLayout>} />
          {/* 권한 체크가 필요한 페이지 정의 */}
          {/* ProtectRoute는 반드시 로그인한 사용자의 한해서만 되도록 구현되어 PrivateRoute안에 종속되어야한다. */}
          <Route element={<ProtectRoute/>}>
            <Route element={<AdminDefaultLayout/>}>
              <Route path="/admin" element={<AdminMainPage/>}/>
              <Route path="/admin/member" element={<MemberManageMainPage/>}/>
            </Route>
          </Route>
        </Route>
 
        {/* 인증/권한 여부와 상관 없이 접근 가능한 Error 페이지 정의 */}
        <Route path='/*' element={<Error404/>}/>
      </Routes>
    </BrowserRouter>
  )
}
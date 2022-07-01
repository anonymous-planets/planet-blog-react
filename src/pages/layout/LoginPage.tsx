import { useNavigate } from 'react-router';
import { Gender, Member, Role } from '../../@types';

export default function LoginPage() {
  const navigate = useNavigate();

   // Login한 회원 정보
   let loginMember:Member = { uuid: "abcd123"
                                , memberId : "member01"
                                , name : "회원A"
                                , age : 21
                                , gender : Gender.MAN
                                , role : Role.MEMBER
                              };

  const memberLoginProc = () => {
    // isAuthenticated 값 true로 저장
    sessionStorage.setItem('isAuthenticated', 'true');
    // Login한 회원 정보 저장
    sessionStorage.setItem('loginMember', JSON.stringify(loginMember));
    // 메인으로 이동
    navigate("/");
  }

  const managerLoginProc = () => {
    sessionStorage.setItem('isAuthenticated', 'true');
    loginMember = {...loginMember, role : Role.MANAGER};
    sessionStorage.setItem('loginMember', JSON.stringify(loginMember));
    navigate("/admin");

  }

  const adminLoginProc = () => {
    sessionStorage.setItem('isAuthenticated', 'true');
    loginMember = {...loginMember, role : Role.ADMIN}
    sessionStorage.setItem('loginMember', JSON.stringify(loginMember));
    navigate("/admin");
  }
  return (
    <>
      <h1>Login Page</h1>
      <div>로그인 하지 않아야만 접속 가능</div>
      <button onClick={memberLoginProc}>일반회원 로그인</button>
      <button onClick={managerLoginProc}>매니저 로그인</button>
      <button onClick={adminLoginProc}>관리자 로그인</button>
    </>
  )
}
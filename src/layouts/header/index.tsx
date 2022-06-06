import { Member } from '@types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

/**
 * 기본 Header
 * 해당 Header에서는 Login한 회원의 정보를 sessionStorage에서 가져와
 * Login한 회원의 정보를 보여준느 역할을 합니다.
 */
export default function DefaultHeader() {
  const [member, setMember] = useState<Member|null>(null);
  const navigate = useNavigate();

  useEffect(()=>{
    if(sessionStorage.getItem('loginMember') !== null && sessionStorage.getItem('loginMember') !== '') {
      setMember(JSON.parse(sessionStorage.getItem('loginMember') as string) as Member);
    }
  }, []);

  // Logout 버튼을 클릭했을시 작동하는 함수
  const logoutHandler = () => {
    sessionStorage.setItem('isAuthenticated', 'false');
    sessionStorage.setItem('loginMember', 'null');
    setMember(null);
    navigate('/login');
  }
  return (
    <header>
      <div>기본 Header 영역</div>
      {/* Login한 회원의 정보가 있을경우 회원의 정보 표시 */}
      {member && 
        <div>
          <h2>{member.name} 님이 로그인 하셨습니다.(권한 : {member.role})<button onClick={logoutHandler}>로그아웃</button></h2>
        </div>
      }
    </header>
  )
}
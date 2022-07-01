import { Member } from '@types';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

/**
 * 관리자 메인화면
 * 1. 로그인을 반드시 해야지만 접근 가능한 페이지
 * 2. Role이 MANAGER, ADMIN 일 경우만 접근 가능
 */
export default function AdminMainPage() {
  return (
    <div>
      <h1>관리자 메인화면</h1>
      <Link to = "/admin/member">회원 관리</Link>
    </div>
  );
}
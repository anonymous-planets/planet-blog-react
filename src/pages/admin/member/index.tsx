import { Member } from '@types'
import { useNavigate } from 'react-router';

/**
 * 회원 관리 메인 화면
 * 1. 로그인을 반드시 해야지만 접근 가능한 페이지
 * 2. Role이 ADMIN일 경우만 접근 가능 
 */
export default function MemberManageMainPage() {
  return (
    <div>
      <h1>회원 관리 메인화면</h1>
    </div>
  )
}
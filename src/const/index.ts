export const ServiceType = {
  ADMIN_PLANET: { code: "AP", desc: "플래닛 관리자" },
  MEMBER_PLANET: { code: "MP", desc: "플래닛 회원" },
} as const;

export const MemberStatus = {
  STAND_BY: { code: "S", desc: "가입 대기" },
  ACTIVE: { code: "A", desc: "가입 활성" },
  REST: { code: "R", desc: "휴면" },
  BLOCK: { code: "B", desc: "정지" },
  LEAVE: { code: "L", desc: "탈퇴" },
} as const;

export interface Member {
  readonly uuid:string;
  memberId:string;
  password?:string;
  name:string;
  age:number;
  gender:GenderType;
  role:RoleType;
}

export const Gender = {
  FEMALE : "F" 
  , MAN : "M"
} as const;

export type GenderType = typeof Gender[keyof typeof Gender];

export const Role = {
  MEMBER : "ROLE_MEMBER"
  , MANAGER : "ROLE_MANAGER"
  , ADMIN : "ROLE_ADMIN"
} as const;

export type RoleType = typeof Role[keyof typeof Role];

export interface Category {
  idx : number;
  name : string;
  path : string;
  role : Array<RoleType>;
  sub : Array<Category>;
}


export interface LayoutDefaultProps {
  children? : React.ReactElement;
}
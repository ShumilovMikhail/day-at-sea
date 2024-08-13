export type StaffVM = StaffMemberVM[];

export interface StaffMemberVM {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'blocked';
}

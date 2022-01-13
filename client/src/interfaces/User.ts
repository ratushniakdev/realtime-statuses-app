export interface User {
  id: string;
  status: string;
  lastUpdate: Date | string;
}

export type UserList = User[];

export interface SetUserStatus {
  userId: string;
  status: string;
}

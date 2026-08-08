export type User = {
  id: string;
  userName: string;
  email: string;
  workId: string;
  firstNameRu: string;
  lastNameRu: string;
  firstNameEn: string;
  lastNameEn: string;
  department: string;
  departmentId: string;
  isActive: boolean;
  location: string;
  locationId: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};

export type UserLabelsKeys =
  | 'firstNameRu'
  | 'firstNameRu'
  | 'lastNameRu'
  | 'firstNameEn'
  | 'lastNameEn'
  | 'email'
  | 'location'
  | 'department'
  | 'workId'
  | 'isActive'
  | 'actions';

export type UserLabel = {
  key: UserLabelsKeys;
  label: string;
};

export type Signin = {
  email: string;
  password: string;
};

export type AuthRes = {
  user: User;
  accessToken: string;
};
export type RefreshTokenResponse = {
  accessToken: string;
  user: User;
};
export type ValidateUserErrors = {
  id?: string;
  userName?: string;
  email?: string;
  workId?: string;
  firstNameRu?: string;
  lastNameRu?: string;
  firstNameEn?: string;
  lastNameEn?: string;
  department?: string;
  location?: string;
};

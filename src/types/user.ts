export interface IUser {
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
}

type UserLabelsKeys =
| "firstNameRu"
| "firstNameRu"
| "lastNameRu"
| "firstNameEn"
| "lastNameEn"
| "email"
| "location"
| "department"
| "workId"
| "isActive"
| "actions"

export type UserLabel = {
key: UserLabelsKeys;
label: string;
};

export interface ISignin {
    email: string;
    password: string;
}

export interface IAuthRes {
    user: IUser;
    accessToken: string;
}
export interface RefreshTokenResponse {
    accessToken: string;
    user: IUser;
}
export interface IValidateUserErrors {
    id?: string;
    userName?: string;      
    email?: string;
    workId?: string;      
    firstNameRu?: string;
    lastNameRu?: string
    firstNameEn?: string;
    lastNameEn?: string
    department?: string;
    location?: string;
}

export interface IUserFormActions {
    handleInputChange: (name: keyof IUser, e: string) => void;
    handleCreateUser: () => void;
    handleResetUser: () => void;
    handleGetUser: (id: string) => void;
    handleChecked: () => void;
}

export interface IBaseUserQuery {
    handleInputChange: (name: keyof IUser, e: string) => void;
    handleDeviceIssue: (id: string) => void;
    handleReset: () => void;
    handleSetUser: (id: string) => void;
    handleSetStepInfo: () => void;
}

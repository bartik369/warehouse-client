import { IssueStepType } from "../features/issue/model/issueTypes";

export interface User {
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

export interface Signin {
    email: string;
    password: string;
}

export interface AuthRes {
    user: User;
    accessToken: string;
}
export interface RefreshTokenResponse {
    accessToken: string;
    user: User;
}
export interface ValidateUserErrors {
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

export interface UserFormActions {
    handleInputChange: (name: keyof User, e: string) => void;
    handleCreateUser: () => void;
    handleResetUser: () => void;
    handleGetUser: (id: string) => void;
    handleChecked: () => void;
}

export interface BaseUserQuery {
    handleUserChange: (value: string) => void;
    handleDeviceIssue: (id: string) => void;
    handleFullReset: () => void;
    handleSetUser: (id: string) => void;
    handleResetUser: () => void;
    handleResetUserQuery: () => void;
    handleSetStepInfo: (step: IssueStepType) => void;
    handleNextStep:() => void;
}

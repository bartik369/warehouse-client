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

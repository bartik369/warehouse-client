export interface IUser {
    id: string;
    userName: string;
    email: string;
    workId: string;
    firstName: string;
    lastName: string;
    department: string;
    isActive: boolean;
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
    token: string;
}
export interface RefreshTokenResponse {
    token: string;
    user: IUser;
}
export interface IValidateUserErrors {
    id?: string;
    userName?: string;      
    email?: string;
    workId?: string;      
    firstName?: string;
    lastName?: string
    department?: string;
    locationId?: string;
}

export interface IUser {
    id: string;
    workId: string;
    login: string;
    email: string;
    firstName: string;
    lastName: string;
    department: string;
    locationId: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export interface ISignin {
    email: string;
    password: string;
}

export interface IAuthRes {
    user: IUser;
    token: string;
}

export interface IUser {
    id: number;
    login: string;
    roles: string[];
    email: string;
    manager?: string;
    employeeId?: number;
    departament?: string;
    city?: string;
    name_ru: string;
    surname_ru: string;
    name_en: string;
    surname_en: string;
    works: boolean;
}
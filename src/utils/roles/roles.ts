export enum RoleType {
    Admin = 'admin',
    Manager = 'manager',
    Viewer = 'viewer',
}
export const getRoleType = (roleName: string): RoleType | null => {
    if (roleName === 'admin') return RoleType.Admin;
    if (roleName === 'manager') return RoleType.Manager;
    if (roleName === 'viewer') return RoleType.Viewer;
    return null
}
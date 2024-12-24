export interface ISubmenu {
    id: number;
    title: string;
    path: string;
}
export interface ISidebar {
    id: number;
    title: string;
    path: string;
    icon: string;
    subMenu?: ISubmenu[];
}
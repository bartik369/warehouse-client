export interface ISubmenu {
    id: number;
    title: string;
    path: string;
}
export interface ISidebar {
    [x: string]: any;
    id: number;
    title: string;
    path: string;
    icon: string;
    subMenu?: ISubmenu[];
}
import { FC } from "react";

export interface Submenu {
    id: number;
    title: string;
    path: string;
}
export interface Sidebar {
    [x: string]: any;
    id: number;
    title: string;
    path: string;
    icon: string;
    subMenu?: Submenu[];
}
export interface Tab {
  id: number;
  label: string;
  component: FC;
}
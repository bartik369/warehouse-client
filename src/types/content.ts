
export type IListRefObj = {
    [index: string]: HTMLDivElement | null;
};
export type Checked = {
    [index: number]: boolean;
}

export type CheckedDeviceOptions = {
    id: number;
    name: number;
    type: string;
    value: string;
    disabled: boolean;
  }

export type IListRefObj = {
    [index: string]: HTMLDivElement | null;
};
export type Checked = {
    [index: number]: boolean;
}

export type CheckedDeviceOptions = {
    id: number;
    name: string;
    type: string;
    value: string;
    disabled: boolean;
  }
import { IDevice } from "./devices";

export interface IInventory {
    id: number,
    place: string;
    responsible: string;
    startDate: Date;
    endDate?: Date;
    completed: boolean;
}
export type LostDeviceInfo = Pick<IDevice, 
'id' | 'title' | 'category' | 'location' | 'assigned' | 'serviceability'>;
export interface IInventoryResult {
    found: number;
    lose: number;
}
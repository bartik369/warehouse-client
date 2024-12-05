export interface IDevice {
    id?: string;
    serialNumber?: string;
    modelCode?: string;
    inventoryNumber?: string;
    title: string;
    type: string;
    manufacturer?: string;
    weight?: number;
    media?: string;
    serviceable:boolean;
    assignedTo?: string;
    location: string;
    inStock: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy: string;
    updatedBy: string;
}

export interface IInventory {
    id?: number,
    place: string;
    responsibleUser: string;
    startDate: Date;
    endDate: Date;
    completed: boolean;
    result: IInventoryResult;
}

export interface IInventoryResult {
    id?: number;
    inventoryId: number;
    found: string[];
    lost: string[];
}
export interface IDeviceRepair {
    id?:number;
    serialNumber?: string;
    contractorId: string;
    dateTransfer: Date;
}

export interface IContractor {
    id: number;
    contractorId: string;
    name: string;
    phone: string,
    address: string;

}
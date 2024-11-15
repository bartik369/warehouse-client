export interface IDevice {
    id: number;
    title: string;
    manufacturer: string;
    category: string;
    description: string;
    weight?: number;
    serviceability: boolean;
    status: string;
    assigned: string;
    location: string;
}
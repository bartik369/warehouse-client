export interface ILocation {
    id: string;
    name: string;
    slug: string;
    locationId?: string;
    comment?: string;
}
export interface IValidateLocationErrors {
    id?: string;
    name?: string;
}
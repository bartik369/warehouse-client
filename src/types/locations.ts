export interface ILocation {
    id: string;
    name: string;
    slug: string;
    locationName?: string;
    comment?: string;
}
export interface IValidateLocationErrors {
    id?: string;
    name?: string;
}
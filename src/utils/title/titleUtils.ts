import { addContractorTitle, addDepartmentTitle, addLocationTitle, 
addManufacturerTitle, addModelTitle, addPermissionTitle, addRolePermission, addRoleTitle,
addTypeTitle, addWarehouseTitle } from "../constants/constants";


export const getTitleFromPath = (locationPath: string):string => {
  const locationType = locationPath.split('/')[2]?.split('-')[1] || '';
  return getTitleByLocationType(locationType);

}
export const  getTitleByLocationType = (locationType: string) => {
    const titles:Record<string, string> = {
        warehouse: addWarehouseTitle,
        location: addLocationTitle,
        department: addDepartmentTitle,
        contractor: addContractorTitle,
        manufacturer: addManufacturerTitle,
        role: addRoleTitle,
        permission: addPermissionTitle,
        model: addModelTitle,
        type: addTypeTitle,
        permission_role: addRolePermission,
      };
    
    return titles[locationType] || 'Раздел';
    
}
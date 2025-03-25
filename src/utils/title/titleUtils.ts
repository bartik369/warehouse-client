import { addContractorTitle, addDepartmentTitle, addLocationTitle, 
addManufacturerTitle, addModelTitle, addPermissionTitle, addRoleTitle,
addTypeTitle, addWarehouseTitle } from "../constants/constants";

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
      };
    
    return titles[locationType] || ''
}
import { SECTION_TITLES } from '../constants/ui/titles';

export const getTitleFromPath = (locationPath: string):string => {
  const locationType = locationPath.split('/')[2]?.split('-')[1] || '';
  return getTitleByLocationType(locationType);

}
export const  getTitleByLocationType = (locationType: string) => {
    const titles:Record<string, string> = {
        warehouse: SECTION_TITLES.addWarehouse,
        location: SECTION_TITLES.addLocation,
        department: SECTION_TITLES.addDepartment,
        contractor: SECTION_TITLES.addContractor,
        manufacturer: SECTION_TITLES.addManufacturer,
        role: SECTION_TITLES.addRole,
        permission: SECTION_TITLES.addPermission,
        model: SECTION_TITLES.addModel,
        type: SECTION_TITLES.addType,
        permission_role: SECTION_TITLES.addRolePermission,
      };
    
    return titles[locationType] || '';
    
}
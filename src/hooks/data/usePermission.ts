import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { IPermissionRole } from "../../types/access";
import { IEntity } from "../../types/devices";
import { CheckedDeviceOptions } from "../../types/content";

export const usePermission = () => {
  const [entity, setEntity] = useState<IPermissionRole>({
    id: "",
    name: "",
    roleId: "",
    roleName: "",
    permissionId: [],
    permissionName: [],
    warehouseId: "",
    warehouseName: "",
    locationId: "",
    locationName: "",
    comment: "",
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [list, setList] = useState<Record<number, boolean>>({});

  const handleInputChange = useCallback(
    (field: keyof IPermissionRole, value: string) => {
      setEntity((prev) => {
        const updateEntity = {
          ...prev,
          [field]: value,
        };
        return updateEntity;
      });
    },
    []
  );
  const handleGetEntity = useCallback((id: string, field: string) => {}, []);
  const handleCreateEntity = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {}, []);
  const handleDeleteEntity = useCallback(() => {}, []);
  const handleResetEntity = useCallback(() => {}, []);
  const handleRoleChange = useCallback(
    (item: IPermissionRole) => {
      handleInputChange("roleId", item.id || "");
      handleInputChange("roleName", item.name || "");
    },
    [handleInputChange]
  );
  const handlePermissionChange = useCallback(
    (item: IPermissionRole) => {
      handleInputChange("permissionId", item.id || "");
      handleInputChange("permissionName", item.name || "");
    },
    [handleInputChange]
  );
  const handleLocationChange = useCallback(
    (item: IPermissionRole) => {
      handleInputChange("locationId", item.id || "");
      handleInputChange("locationName", item.name || "");
    },
    [handleInputChange]
  );
  const handleWarehouseChange = useCallback(
    (item: IEntity) => {
      console.log(item);
      handleInputChange("warehouseId", item.id || "");
      handleInputChange("warehouseName", item.name || "");
    },
    [handleInputChange]
  );
  const handleSetPermission = useCallback((
    e: ChangeEvent<HTMLInputElement>,
    item: CheckedDeviceOptions
  ) => {
    const { checked } = e.target;
    setEntity((prev) => {
      const currentArr = prev.permissionName || [];
      if (checked) {
        if (!currentArr.includes(item.name)) {
          return {
            ...prev,
            permissionName: [...currentArr, item.name],
          };
        }
        return prev;
      }
      return {
        ...prev,
        permissionName: currentArr.filter((name) => name !== item.name),
      };
    });
  }, []);

  useEffect(() => {
    if (entity.roleName === "manager") {
      setEntity((prev) => ({
        ...prev,
        permissionName: [],
        permissionId: [],
        warehouseId: "",
        warehouseName: "",
      }));
      setList({});
    }
  }, [entity.roleName]);

  console.log(entity);

  return {
    list,
    entity,
    errors,
    isUpdate,
    setList,
    actions: {
      handleInputChange,
      handleGetEntity,
      handleCreateEntity,
      handleDeleteEntity,
      handleResetEntity,
      handleRoleChange,
      handlePermissionChange,
      handleLocationChange,
      handleWarehouseChange,
      handleSetPermission,
    },
  };
};

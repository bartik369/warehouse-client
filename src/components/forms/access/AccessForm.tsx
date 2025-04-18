import { FC, useEffect, useState } from "react";
import Select from "../../ui/select/Select";
import Textarea from "../../ui/textarea/Textarea";
import Input from "../../ui/input/Input";
import { useGetLocationsQuery } from "../../../store/api/locationApi";
import { useGetAssignableRolesQuery } from "../../../store/api/permissionApi";
import { useGetPermissionsQuery } from "../../../store/api/permissionApi";
import { useGetAssignableWarehousesQuery } from "../../../store/api/warehousesApi";
import { IAccessFormActions, IPermissionRole } from "../../../types/access";
import {
  description,
  locationLabel,
  name,
  permissionsLabel,
  rolesLabel,
  warehouseLabel,
} from "../../../utils/constants/constants";
import { Checked } from "../../../types/content";
import Checkbox from "../../ui/checkbox/Checkbox";
import Actions from "../device/Actions";

interface IAccessFormProps {
  list: Checked;
  setList: (list: Checked | ((prev: Checked) => Checked)) => void;
  entity: IPermissionRole;
  isUpdate: boolean;
  errors: Record<string, string>;
  actions: IAccessFormActions;
}
const AccessForm: FC<IAccessFormProps> = ({
  list,
  entity,
  setList,
  isUpdate,
  errors,
  actions,
}) => {
  const [skip, setSkip] = useState(true);
  const { data: assignableRoles } = useGetAssignableRolesQuery();
  const { data: permissions } = useGetPermissionsQuery();
  const { data: warehouses } = useGetAssignableWarehousesQuery(
    entity.locationId || "",
    { skip: skip }
  );
  const { data: locations } = useGetLocationsQuery();

  useEffect(() => {
    if (entity.locationId) setSkip(false);
  }, [entity.locationId]);

  return (
    <form>
      <Input
        onChange={(e) => actions.handleInputChange("name", e.target.value)}
        type="text"
        value={entity.name || ""}
        label={name}
        errors={errors}
        name="name"
      />
      <Select<IPermissionRole>
        setValue={actions.handleRoleChange}
        items={assignableRoles || []}
        label={rolesLabel}
        value={entity.roleName || ""}
        errors={errors}
        name="role"
        getId={(item: IPermissionRole) => item.id}
      />
      {entity.roleName !== "manager" && (
        <Checkbox
          entity={entity}
          items={permissions || []}
          label={permissionsLabel}
          name="permission"
          list={list}
          setList={setList}
          onChange={actions.handleSetPermission}
        />
      )}
      <Select<IPermissionRole>
        setValue={(val) => actions.handleLocationChange?.(val)}
        items={locations || []}
        label={locationLabel}
        value={entity.locationName || ""}
        errors={errors}
        name="location"
        getId={(item: IPermissionRole) => item.id}
      />
      {entity.roleName !== "manager" && entity.locationName && (
        <Select<IPermissionRole>
          setValue={(val) => actions.handleWarehouseChange?.(val)}
          items={warehouses || []}
          label={warehouseLabel}
          value={entity.warehouseName || ""}
          errors={errors}
          name="warehouse"
          getId={(item: IPermissionRole) => item.id}
        />
      )}
      <Textarea
        setText={(e) => actions.handleInputChange("comment", e.target.value)}
        value={entity.comment || ""}
        label={description}
        name="comment"
        errors={errors}
      />
      <Actions
        isUpdate={isUpdate}
        resetEntity={actions.handleResetEntity}
        addEntity={actions.handleCreateEntity}
      />
    </form>
  );
};

export default AccessForm;

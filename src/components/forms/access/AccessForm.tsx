import { FC, useEffect, useState } from "react";
import Select from "../../ui/select/Select";
import Textarea from "../../ui/textarea/Textarea";
import Input from "../../ui/input/Input";
import { useGetLocationsQuery } from "../../../store/api/locationApi";
import { useGetAssignableRolesQuery } from "../../../store/api/permissionApi";
import { useGetPermissionsQuery } from "../../../store/api/permissionApi";
import { useGetAssignableWarehousesQuery } from "../../../store/api/warehousesApi";
import { IAccessFormActions, IPermission, IPermissionRole, IRole } from "../../../types/access";
import {
  description,
  locationLabel,
  name,
  permissionsLabel,
  rolesLabel,
  warehouseLabel,
} from "../../../utils/constants/constants";
import Checkbox from "../../ui/checkbox/Checkbox";
import Actions from "../device/Actions";
import { IPermissionState } from "../../../reducers/permission/permissionTypes";
import { useLocation } from "react-router-dom";
import { getTitleByLocationType } from "../../../utils/title/titleUtils";
import styles from './AccessForm.module.scss';
import { IEntity } from "../../../types/devices";
import { CheckedPermissionOptions } from "../../../types/content";

interface IAccessFormProps {
  state: IPermissionState;
  entity: IPermissionRole;
  isUpdate: boolean;
  errors: Record<string, string>;
  actions: IAccessFormActions;
}
const AccessForm: FC<IAccessFormProps> = ({state, entity, isUpdate,  actions}) => {
  const [skip, setSkip] = useState(true);
  const { data: assignableRoles } = useGetAssignableRolesQuery();
  const { data: permissions } = useGetPermissionsQuery();
  const { data: warehouses } = useGetAssignableWarehousesQuery(
    entity.locationId || "",
    { skip: skip }
  );
  const { data: locations } = useGetLocationsQuery();
  const locationPath = useLocation();
  const locationType = locationPath.pathname.split('/')[2]?.split('-')[1] || '';

  useEffect(() => {
    if (entity.locationId) setSkip(false);
  }, [entity.locationId]);

  console.log(state.entity)

  return (
    <form>
      <div className={styles.title}>{getTitleByLocationType(locationType)}</div>
      <Input
        onChange={(e) => actions.handleInputChange("name", e.target.value)}
        type="text"
        value={state.entity.name || ""}
        label={name}
        errors={state.errors}
        name="name"
      />
      <Select<IRole>
        setValue={actions.handleRoleChange}
        items={(assignableRoles || []) as IRole }
        label={rolesLabel}
        value={state.entity.roleName || ""}
        errors={state.errors}
        name="role"
        getId={(item: IRole) => item.id}
      />
      {entity.roleName !== "manager" && (
        <Checkbox
          state={state}
          entity={entity}
          items={permissions || []}
          label={permissionsLabel}
          name="permission"
          list={state.list}
          actions={actions}
        />
      )}
      <Select<IEntity>
        setValue={(val) => actions.handleLocationChange?.(val)}
        items={locations || []}
        label={locationLabel}
        value={state.entity.locationName || ""}
        errors={state.errors}
        name="location"
        getId={(item: IEntity) => item.id}
      />
      {entity.roleName !== "manager" && entity.locationName && (
        <Select<IEntity>
          setValue={(val) => actions.handleWarehouseChange?.(val)}
          items={warehouses || []}
          label={warehouseLabel}
          value={state.entity.warehouseName || ""}
          errors={state.errors}
          name="warehouse"
          getId={(item: IEntity) => item.id}
        />
      )}
      <Textarea
        setText={(e) => actions.handleInputChange("comment", e.target.value)}
        value={state.entity.comment || ""}
        label={description}
        name="comment"
        errors={state.errors}
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

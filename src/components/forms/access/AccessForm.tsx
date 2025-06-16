import { useEffect, useMemo} from "react";
import Select from "../../ui/select/Select";
import Textarea from "../../ui/textarea/Textarea";
import Checkbox from "../../ui/checkbox/Checkbox";
import Actions from "../device/Actions";
import { useGetLocationsQuery } from "../../../store/api/locationApi";
import { useLazyGetAssignableWarehousesQuery } from "../../../store/api/warehousesApi";
import { AccessFormActions, PermissionRole, Role } from "../../../types/access";
import { useGetPermissionsQuery } from "../../../store/api/permissionApi";
import { useGetAssignableRolesQuery } from "../../../store/api/rolesApi";
import {
  description,
  locationLabel,
  permissionsLabel,
  rolesLabel,
  warehouseLabel,
} from "../../../utils/constants/constants";
import { PermissionState } from "../../../reducers/permission/permissionTypes";
import { Entity } from "../../../types/devices";
import { getRoleType, RoleType  } from "../../../utils/roles/roles";
import styles from './AccessForm.module.scss';

interface AccessFormProps {
  title: string;
  state: PermissionState;
  entity: PermissionRole;
  isUpdate: boolean;
  actions: AccessFormActions;
}
const AccessForm = ({ title, state, entity, isUpdate,  actions }: AccessFormProps) => {
  const { data: assignableRoles } = useGetAssignableRolesQuery();
  const { data: permissions } = useGetPermissionsQuery();
  const [ getWarehouses, { data: warehouses } ] = useLazyGetAssignableWarehousesQuery();
  const { data: locations } = useGetLocationsQuery();

  const roleType = useMemo(() => getRoleType(entity.roleName), [entity.roleName]);
  const isManager = roleType === RoleType.Manager;

  useEffect(() => {
    if (entity.locationId && !isManager) {
      getWarehouses(entity.locationId);
    };
  }, [entity.locationId]);

  return (
    <form>
      <div className={styles.title}>{title}</div>
      <Select<Role>
        name="roleName"
        items={(assignableRoles || []) as Role[] }
        label={rolesLabel}
        value={state.entity.roleName || ""}
        errors={state.errors}
        setValue={actions.handleRoleChange}
        getId={(item: Role) => item.id}
        getLabel={(item) => item.name}
      />
      {!isManager && (
        <Checkbox
          entity={entity}
          items={permissions || []}
          label={permissionsLabel}
          name="permissionName"
          list={state.list}
          actions={actions}
          errors={state.errors}
        />
      )}
      <Select<Entity>
        setValue={(val) => actions.handleLocationChange?.(val)}
        items={locations || []}
        label={locationLabel}
        value={state.entity.locationName || ""}
        errors={state.errors}
        name="locationName"
        getId={(item: Entity) => item.id}
        getLabel={(item) => item.name}
      />
      {!isManager && entity.locationName && (
        <Select<Entity>
          setValue={(val) => actions.handleWarehouseChange?.(val)}
          items={warehouses || []}
          label={warehouseLabel}
          value={state.entity.warehouseName || ""}
          errors={state.errors}
          name="warehouseName"
          getId={(item: Entity) => item.id}
          getLabel={(item) => item.name}
        />
      )}
      <Textarea
        onChange={(e) => actions.handleInputChange("comment", e.target.value)}
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

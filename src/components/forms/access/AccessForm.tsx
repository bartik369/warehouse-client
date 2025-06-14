import { useEffect, useMemo} from "react";
import Select from "../../ui/select/Select";
import Textarea from "../../ui/textarea/Textarea";
import Checkbox from "../../ui/checkbox/Checkbox";
import Actions from "../device/Actions";
import { useGetLocationsQuery } from "../../../store/api/locationApi";
import { useLazyGetAssignableWarehousesQuery } from "../../../store/api/warehousesApi";
import { IAccessFormActions, IPermissionRole, IRole } from "../../../types/access";
import { useGetPermissionsQuery } from "../../../store/api/permissionApi";
import { useGetAssignableRolesQuery } from "../../../store/api/rolesApi";
import {
  description,
  locationLabel,
  permissionsLabel,
  rolesLabel,
  warehouseLabel,
} from "../../../utils/constants/constants";
import { IPermissionState } from "../../../reducers/permission/permissionTypes";
import { IEntity } from "../../../types/devices";
import { getRoleType, RoleType  } from "../../../utils/roles/roles";
import styles from './AccessForm.module.scss';

interface IAccessFormProps {
  title: string;
  state: IPermissionState;
  entity: IPermissionRole;
  isUpdate: boolean;
  actions: IAccessFormActions;
}
const AccessForm = ({ title, state, entity, isUpdate,  actions }: IAccessFormProps) => {
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
      <Select<IRole>
        name="roleName"
        items={(assignableRoles || []) as IRole[] }
        label={rolesLabel}
        value={state.entity.roleName || ""}
        errors={state.errors}
        setValue={actions.handleRoleChange}
        getId={(item: IRole) => item.id}
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
      <Select<IEntity>
        setValue={(val) => actions.handleLocationChange?.(val)}
        items={locations || []}
        label={locationLabel}
        value={state.entity.locationName || ""}
        errors={state.errors}
        name="locationName"
        getId={(item: IEntity) => item.id}
        getLabel={(item) => item.name}
      />
      {!isManager && entity.locationName && (
        <Select<IEntity>
          setValue={(val) => actions.handleWarehouseChange?.(val)}
          items={warehouses || []}
          label={warehouseLabel}
          value={state.entity.warehouseName || ""}
          errors={state.errors}
          name="warehouseName"
          getId={(item: IEntity) => item.id}
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

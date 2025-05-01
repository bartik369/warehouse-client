import { useEffect} from "react";
import Select from "../../ui/select/Select";
import Textarea from "../../ui/textarea/Textarea";
import Checkbox from "../../ui/checkbox/Checkbox";
import Actions from "../device/Actions";
import { useGetLocationsQuery } from "../../../store/api/locationApi";
import { useLazyGetAssignableWarehousesQuery } from "../../../store/api/warehousesApi";
import { IAccessFormActions, IPermissionRole, IRole } from "../../../types/access";
import { useGetAssignableRolesQuery, useGetPermissionsQuery } from "../../../store/api/permissionApi";
import {
  description,
  locationLabel,
  permissionsLabel,
  rolesLabel,
  warehouseLabel,
} from "../../../utils/constants/constants";
import { IPermissionState } from "../../../reducers/permission/permissionTypes";
import { IEntity } from "../../../types/devices";
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

  useEffect(() => {
    if (entity.locationId) {
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
      />
      {entity.roleName !== "manager" && (
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
      />
      {entity.roleName !== "manager" && entity.locationName && (
        <Select<IEntity>
          setValue={(val) => actions.handleWarehouseChange?.(val)}
          items={warehouses || []}
          label={warehouseLabel}
          value={state.entity.warehouseName || ""}
          errors={state.errors}
          name="warehouseName"
          getId={(item: IEntity) => item.id}
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

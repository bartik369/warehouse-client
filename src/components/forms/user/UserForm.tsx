import Input from '../../ui/input/Input';
import BtnAction from '../../ui/buttons/BtnAction';
import Select from '../../ui/select/Select';
import Toggle from '../../ui/checkbox/Toggle';
import { IEntity } from '../../../types/devices';
import { useUser } from '../../../hooks/data/useUser';
import { add, no, reset, accountIsActive, yes, addUserTitle } from '../../../utils/constants/constants';
import { GoPlus } from 'react-icons/go';
import { HiMiniXMark } from 'react-icons/hi2';
import styles from './UserForm.module.scss';
import { IFieldUserFormConfig } from '../../../types/content';
import { IUser } from '../../../types/user';


interface IUserFormProps {
  departments: IEntity[];
  locations: IEntity[];
  fields: IFieldUserFormConfig[];
}

const UserForm = ({ departments, locations, fields }:IUserFormProps) => {
  const {
    user,
    errors,
    checked,
    handleInputChange,
    handleCreateUser,
    resetUser,
    handleChecked,
  } = useUser();

  const dataSources = { locations, departments }
  return (
    <div className={styles.container}>
      <div className={styles.title}>{addUserTitle}</div>
      <form className={styles.form}>
        {fields?.map((field) => {
          if (field.type === "input") {
            return (
              <Input
                label={field.label}
                type="text"
                name={field.name}
                value={user[field.name] as keyof IUser}
                placeholder={field.placeholder}
                errors={errors}
                onChange={(e) =>
                  handleInputChange(field.name, e.target.value)
                }
              />
            );
          }
          if (field.type === "select") {
            const items = dataSources[field.itemsKey!]
            return (
              <Select<IEntity>
                key={field.name}
                setValue={(val) => {
                  handleInputChange?.(field.name, val.name)
                  if (field.name === 'department') {
                    handleInputChange("departmentId", val.id)
                  }
                  if (field.name === 'location') {
                    handleInputChange("locationId", val.id)
                  }
                }}
                items={items || []}
                label={field.label || ''}
                name={field.name}
                value={user[field.name] as keyof IUser}
                errors={errors}
                getId={(item: IEntity) => item.id}
                getLabel={(item) => item.name}
              />
            );
          }
        })}
        <Toggle
          checked={checked}
          setChecked={handleChecked}
          label={accountIsActive}
          leftPosition={no}
          rightPosition={yes}
        />
      </form>
      <div className={styles.actions}>
        <BtnAction
          icon={<HiMiniXMark />}
          size="lg"
          color="grey"
          title={reset}
          click={resetUser}
        />
        <BtnAction
          icon={<GoPlus />}
          size="lg"
          color="green"
          title={add}
          click={handleCreateUser}
        />
      </div>
    </div>
  );
};

export default UserForm;

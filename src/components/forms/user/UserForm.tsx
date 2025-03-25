import { FC } from 'react';
import Input from '../../ui/input/Input';
import BtnAction from '../../ui/buttons/BtnAction';
import Select from '../../ui/select/Select';
import Toggle from '../../ui/checkbox/Toggle';
import { IAdminEntity } from '../../../types/content';
import { useAddUser } from '../../../hooks/data/useAddUser';
import { useGetLocationsQuery } from '../../../store/api/locationApi';
import { add, no, reset, accountIsActive, yes, addUserTitle } from '../../../utils/constants/constants';
import { labelFirstNameEn, labelFirstNameRu, labelLastNameEn, labelLastNameRu,
  labelUserLogin, labelEmail, labelUserId, labelDepartment, labelCity } from '../../../utils/constants/user';
import { GoPlus } from 'react-icons/go';
import { HiMiniXMark } from 'react-icons/hi2';
import styles from './UserForm.module.scss';

interface IUserFormProps {
  departments: IAdminEntity[];
}

const UserForm: FC<IUserFormProps> = ({ departments }) => {
  const {
    user,
    errors,
    checked,
    handleInputChange,
    handleCreateUser,
    resetUser,
    handleDepartmentChange,
    handleChecked,
    handleLocationChange,
  } = useAddUser();
  const { data: locations } = useGetLocationsQuery();
  return (
    <div className={styles.container}>
      <div className={styles.title}>{addUserTitle}</div>
      <form className={styles.form}>
        <Input
          label={labelFirstNameRu}
          type="text"
          name="firstNameRu"
          value={user.firstNameRu || ""}
          errors={errors}
          onChange={(e) => handleInputChange("firstNameRu", e.target.value)}
        />
        <Input
          label={labelLastNameRu}
          type="text"
          name="lastNameRu"
          value={user.lastNameRu || ""}
          errors={errors}
          onChange={(e) => handleInputChange("lastNameRu", e.target.value)}
        />

        <Input
          label={labelFirstNameEn}
          type="text"
          name="firstNameEn"
          value={user.firstNameEn || ""}
          errors={errors}
          onChange={(e) => handleInputChange("firstNameEn", e.target.value)}
        />
        <Input
          label={labelLastNameEn}
          type="text"
          name="lastNameEn"
          value={user.lastNameEn || ""}
          errors={errors}
          onChange={(e) => handleInputChange("lastNameEn", e.target.value)}
        />
        <Input
          label={labelUserLogin}
          type="text"
          name="userName"
          value={user.userName || ""}
          errors={errors}
          onChange={(e) => handleInputChange("userName", e.target.value)}
        />
        <Input
          label={labelEmail}
          type="text"
          name="email"
          value={user.email || ""}
          errors={errors}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
        <Input
          label={labelUserId}
          type="text"
          name="workId"
          value={user.workId || ""}
          errors={errors}
          onChange={(e) => handleInputChange("workId", e.target.value)}
        />
        <Select<IAdminEntity>
          setValue={handleDepartmentChange}
          items={departments || []}
          label={labelDepartment}
          name="department"
          value={user.department || ""}
          errors={errors}
          getId={(item: IAdminEntity) => item.id}
        />
        <Select<IAdminEntity>
          setValue={handleLocationChange}
          items={locations || []}
          label={labelCity}
          name="location"
          value={user.location || ""}
          errors={errors}
          getId={(item: IAdminEntity) => item.id}
        />
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
          type="button"
          size="lg"
          color="grey"
          title={reset}
          click={resetUser}
        />
        <BtnAction
          icon={<GoPlus />}
          type="submit"
          size="lg"
          color="blue-green"
          title={add}
          click={handleCreateUser}
        />
      </div>
    </div>
  );
};

export default UserForm;

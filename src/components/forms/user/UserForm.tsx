import Input from '../../ui/input/Input';
import { useAddUser } from '../../../hooks/data/useAddUser';
import { useGetLocationsQuery } from '../../../store/api/locationApi';
import BtnAction from '../../ui/buttons/BtnAction';
import { HiMiniXMark } from 'react-icons/hi2';
import { add, no, reset, accountIsActive, yes } from '../../../utils/constants/constants';
import { GoPlus } from 'react-icons/go';
import Select from '../../ui/select/Select';
import { ILocation } from '../../../types/locations';
import Toggle from '../../ui/checkbox/Toggle';
import styles from "./UserForm.module.scss";
    
    const UserForm = () => {
        const { user, errors, checked, handleInputChange, handleCreateUser, 
            resetUser, handleDepartmentChange, handleChecked } = useAddUser();
        const {data: locations } = useGetLocationsQuery();
        
        const departments = [
            {id: 1, name: 'Бухгалтерия', slug: 'finance'},
            {id: 2, name: 'Айти отдел', slug: 'it'}
        ]
        return (
            <div className={styles.container}>
            <form className={styles.form}>
                <Input
                    label='Логин'
                    type="text" 
                    name="userName" 
                    value={user.userName || ""}
                    placeholder="input username"
                    errors={errors}
                    onChange={(e) => handleInputChange("userName", e.target.value)}
                />
                <Input 
                    label='Почта'
                    type="text" 
                    name="email" 
                    value={user.email || ""}
                    placeholder="input email"
                    errors={errors}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                />
                <Input
                    label='SAP-id'
                    type="text" 
                    name="workId" 
                    value={user.workId || ""}
                    placeholder="input workId"
                    errors={errors}
                    onChange={(e) => handleInputChange("workId", e.target.value)}
                />
                <Toggle
                  checked={checked}
                  setChecked={handleChecked}
                  label={accountIsActive}
                  leftPosition={no}
                  rightPosition={yes}
                />
                <Input 
                    label='Имя'
                    type="text" 
                    name="firstName" 
                    value={user.firstName || ""}
                    placeholder="input firstName"
                    errors={errors}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                />
                 <Input 
                    label='Фамилия'
                    type="text" 
                    name="lastName" 
                    value={user.lastName || ""}
                    placeholder="input lastName"
                    errors={errors}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                />
                <Select<ILocation>
                    setValue={handleDepartmentChange}
                    items={locations || []}
                    label='Отдел'
                    name='department'
                    value={user.department || ""}
                    errors={errors}
                    getId={(item:ILocation) => item.id}
                />
                <Select<ILocation>
                    setValue={handleDepartmentChange}
                    items={departments || []}
                    label='Город'
                    name='department'
                    value={user.department || ""}
                    errors={errors}
                    getId={(item:ILocation) => item.id}
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
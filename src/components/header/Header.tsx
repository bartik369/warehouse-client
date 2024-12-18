import { useLogoutUserMutation } from '../../store/api/authApi';
import { useAppDispatch, useAppSelector } from '../../hooks/redux/useRedux';
import { useNavigate } from 'react-router-dom';
import { isFetchBaseQueryError, isErrorWithMessage } from '../../helpers/error-handling';

const Header = () => {
    const navigate = useNavigate();
    const user = useAppSelector((store) => store.auth.user);
    const [logout] = useLogoutUserMutation();

    const logoutHandler = async () => {
      try {
        await logout(user.id).unwrap();
        navigate("/");
      } catch (err) {
        if (isFetchBaseQueryError(err)) {
          const errMsg = "error" in err ? err.error : JSON.stringify(err.data);
          console.log(errMsg);
        } else if (isErrorWithMessage(err)) {
          console.log(err);
        }
      }
    };
    return (
      <div>
        <button onClick={logoutHandler}>Test logout</button>
      </div>
    );
};

export default Header;
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/features/user/userSlice';

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = (data) => {
    dispatch(login(data));
    navigate('/');
  };

  return loginHandler;
};

export default useLogin;
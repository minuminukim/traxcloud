import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { login } from '../store/sessionReducer';

const useDemo = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const loginDemoUser = () => {
    dispatch(login({ credential: 'demoworld', password: 'newPass!' })).then(
      () => {
        // If the action is being dispatched from the landing page,
        // we redirect the user to the main feed
        if (pathname === '/') {
          history.push('/home');
        }
      }
    );
  };

  return loginDemoUser;
};

export default useDemo;

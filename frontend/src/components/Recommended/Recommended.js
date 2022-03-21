import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ProfilePicture from '../common/ProfilePicture';
import { fetchUsers } from '../../store/userReducer';
import toArray from '../../utils/toArray';
import './Recommended.css';

export const Recommended = () => {
  const dispatch = useDispatch();
  const usersObject = useSelector((state) => state.users);
  const users = toArray(usersObject);

  useEffect(() => {
    return dispatch(fetchUsers()).catch((data) => {
      if (data && data.errors) {
        return;
      }
    });
  }, []);
  return null;
};

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUser } from '../../store/userReducer';

function Profile() {
  const { userId } = useParams();
  return (
    <div className="page-container profile">
      <h1>userId</h1>
    </div>
  );
}

export default Profile;

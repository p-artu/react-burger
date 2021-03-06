import React, {useEffect} from 'react';
import { useDispatch } from '../services/hooks';
import CellEmpty from '../components/cell-empty/cell-empty';
import ProfileMenu from '../components/profile-menu/profile-menu';
import ProfileInputs from '../components/profile-inputs/profile-inputs';
import { getUserInfo } from '../services/actions';
import styles from './profile.module.css';

function ProfilePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <div className={styles.profile}>
      <div className={styles.profileContainer}>
        <ProfileMenu />
        <CellEmpty height="pl-15"/>
        <ProfileInputs />
      </div>
    </div>
  );
}

export default ProfilePage;

import React from 'react';
import {useSelector} from 'react-redux';
import {selectUser} from '../redux/userSlice';
import {ProfileCard, ProfileName, ProfilePhoto} from '../styles/Profile';

function Profile() {
  const user = useSelector(selectUser);
  return (
    <ProfileCard>
      <ProfilePhoto
        source={{
          uri: user.photoURL,
        }}
      />
      <ProfileName>{user.displayName}</ProfileName>
    </ProfileCard>
  );
}

export default Profile;

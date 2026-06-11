import React, { useState } from 'react';
import Design from './Design';
import { usePicker } from '../../../../helpers/usePicker';
import { useDispatch, useSelector } from 'react-redux';
import { roles } from '../../../../helpers/Data';
import {
  deleteImage,
  hasInternet,
  uploadImage,
} from '../../../../helpers/services';
import {
  saveLoginInfo,
  updateUser,
} from '../../../../redux/actions/authActions';
import { showToast } from '../../../../helpers/ToastConfig';

const EditProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data.userData);
  const isLoading = useSelector(state => state?.auth?.isLoading);
  const userLoginInfo = useSelector(state => state?.auth?.data?.userLoginInfo);
  const storedPassword = userLoginInfo?.userPassword ?? '';
  const [image, setImage] = useState();
  const [coverPicture, setCoverPicture] = useState([]);
  const openProfilePicker = usePicker('image', setImage);
  const openCoverPicker = usePicker('image', setCoverPicture);
  const [selectedRole, setSelectedRole] = useState(roles[0].value);
  const [showPublicJobs, setShowPublicJobs] = useState(false);
  const [firstName, setFirstName] = useState(userData.user.firstName ?? '');
  const [lastName, setLastName] = useState(userData.user.lastName ?? '');
  const [email, setEmail] = useState(userData.user.email ?? '');
  const [phone, setPhone] = useState(userData.user.phone ?? '');
  const [isImageUploading, setImageUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const normalize = val => (val ?? '').trim();

  const initialData = {
    firstName: normalize(userData?.user?.firstName),
    lastName: normalize(userData?.user?.lastName),
    email: normalize(userData?.user?.email),
    phone: normalize(userData?.user?.phone),
  };
  const hasChanges =
    normalize(firstName) !== initialData.firstName ||
    normalize(lastName) !== initialData.lastName ||
    normalize(email) !== initialData.email ||
    normalize(phone) !== initialData.phone;
  const handleSave = async () => {
    const isConnected = await hasInternet();
    if (!isConnected) {
      showToast('info', 'No Internet Connection');
      return;
    }

    const body = {
      id: userData.user.id,
      firstName,
      lastName,
      phone,
      bio: userData.user.bio ?? '',
      email,
    };

    try {
      const updateUserResponse = await dispatch(updateUser(body));
      if (updateUserResponse) {
        const loginInfoForRedux = {
          userEmail: email,
          userPassword: storedPassword,
        };

        dispatch(saveLoginInfo(loginInfoForRedux));
        showToast('success', 'Profile updated Successfully');
        navigation.goBack();
      }
    } catch (error) {
      console.log('error in update profile', error);
      showToast('error', error.message);
    }
  };
  const handleCoverPicturePick = async () => {
    const isConnected = await hasInternet();

    if (!isConnected) {
      showToast('info', 'No Internet Connection');
      return;
    }

    setCoverUploading(true);

    try {
      const res = await openCoverPicker();

      if (!res || !Array.isArray(res) || res.length === 0) {
        return;
      }

      const finalSelectedImage = res[0];

      if (!finalSelectedImage) {
        return;
      }
      const uploadRes = await uploadImage(finalSelectedImage);
      if (userData?.user?.coverPhoto) {
        try {
          await deleteImage(userData.user.coverPhoto);
        } catch (deleteErr) {
          console.log('Old cover delete failed:', deleteErr);
        }
      }

      const updateUserBody = {
        id: userData.user.id,
        coverPhoto: uploadRes?.url,
      };

      const updateUserResponse = await dispatch(updateUser(updateUserBody));

      if (updateUserResponse) {
        showToast('success', 'Cover Photo updated Successfully');
      }
    } catch (err) {
      console.log('cover pick error:', err);

      showToast('error', err?.message || 'Something went wrong');
    } finally {
      setCoverUploading(false);
    }
  };

  const handleProfilePicturePick = async () => {
    const isConnected = await hasInternet();

    if (!isConnected) {
      showToast('info', 'No Internet Connection');
      return;
    }

    setImageUploading(true);

    try {
      const res = await openProfilePicker();

      if (!res || !Array.isArray(res) || res.length === 0) {
        return;
      }

      const finalSelectedImage = res[0];

      if (!finalSelectedImage) {
        return;
      }

      // upload new image first
      const uploadRes = await uploadImage(finalSelectedImage);

      // delete old avatar after successful upload
      if (userData?.user?.avatar) {
        try {
          await deleteImage(userData.user.avatar);
        } catch (deleteErr) {
          console.log('Old avatar delete failed:', deleteErr);
        }
      }

      const updateUserBody = {
        id: userData.user.id,
        avatar: uploadRes?.url,
      };

      const updateUserResponse = await dispatch(updateUser(updateUserBody));

      if (updateUserResponse) {
        showToast('success', 'Profile Picture updated Successfully');
      }
    } catch (err) {
      console.log('Image pick error:', err);

      showToast('error', err?.message || 'Something went wrong');
    } finally {
      setImageUploading(false);
    }
  };
  return (
    <Design
      navigation={navigation}
      userData={userData}
      coverPicture={coverPicture}
      onPickProfile={handleProfilePicturePick}
      onPickCover={handleCoverPicturePick}
      selectedRole={selectedRole}
      setSelectedRole={setSelectedRole}
      showPublicJobs={showPublicJobs}
      setShowPublicJobs={setShowPublicJobs}
      firstName={firstName}
      setFirstName={setFirstName}
      lastName={lastName}
      setLastName={setLastName}
      email={email}
      setEmail={setEmail}
      phone={phone}
      setPhone={setPhone}
      isImageUploading={isImageUploading}
      hasChanges={hasChanges}
      handleSave={handleSave}
      isLoading={isLoading}
      coverUploading={coverUploading}
    />
  );
};

export default EditProfile;

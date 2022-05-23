import React from 'react';
import { handleVisibleModal } from '../../../redux/app-reducer';
import { useAppDispatch } from '../../../redux/hooks';
import EditProfileModal from './EditProfileModal';

interface IProps {
  onFormSubmit: (state: JSX.Element) => void;
}

const EditProfileButton: React.FC<IProps> = (props: IProps) => {
  const { onFormSubmit } = props;
  const dispatch = useAppDispatch();
  const editProfileComponent = EditProfileModal();

  const showUserProfile = () => {
    onFormSubmit(editProfileComponent);
    dispatch(handleVisibleModal(true));
  };

  return (
    <>
      <button onClick={showUserProfile}>Edit profile</button>
    </>
  );
};

export default EditProfileButton;

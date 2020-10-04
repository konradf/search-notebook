import React from 'react';
import { NotificationType, NotificationVariant } from '../components/Notification';

export const useNotification = () => {
  const [notification, setNotification] = React.useState({
    open: false,
    message: '',
    variant: NotificationVariant.success,
  });

  const hideNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const showNotification = ({ message, variant }: NotificationType) => {
    setNotification({ message, variant, open: true });
  };

  return { notification, showNotification, hideNotification };
};

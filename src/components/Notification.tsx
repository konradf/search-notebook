import * as React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert as MuiAlert, AlertProps } from '@material-ui/lab';

export enum NotificationVariant {
  success = 'success',
  warning = 'warning',
  info = 'info',
  error = 'error',
}

export interface NotificationType {
  variant: NotificationVariant;
  message: string;
}

interface NotificationProps extends NotificationType {
  open: boolean;
  onClose: () => void;
}

const Alert = (props: AlertProps) => <MuiAlert elevation={6} variant="filled" {...props} />;

export const Notification: React.FunctionComponent<NotificationProps> = ({ open, message, onClose, variant }) => (
  <Snackbar
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    open={open}
    autoHideDuration={5000}
    onClose={onClose}
  >
    <Alert severity={variant} onClose={onClose}>
      {message}
    </Alert>
  </Snackbar>
);

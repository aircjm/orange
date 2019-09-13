import React, {useEffect} from 'react';

import clsx from 'clsx';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import {amber, green} from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import {makeStyles} from '@material-ui/core/styles';
import {Store} from "../utils/store";


const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {

    display: 'flex',
    alignItems: 'center',
  },
}));

const Message = () => {
  const classes = useStyles1();

  const {message: {content, variant, open, duration}, dispatch} = React.useContext(Store);

  const Icon = variantIcon[variant];
  useEffect(() => {
    setTimeout(()=>{
      dispatch({
        type: 'message',
        payload: {open: false, variant, content, duration}
      })
    }, duration)
  }, [variant, content, duration, dispatch]);
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}

      open={open}
      direction="down"
      autoHideDuration={100}
    >
      <SnackbarContent
        className={classes[variant]}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {content}
        </span>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={() =>
              dispatch({
              type: 'message',
              payload: {open: false, variant, content, duration}
            })
          }>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
    
  );
}

export default Message;
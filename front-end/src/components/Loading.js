import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'blue',
  },
}));

export default function Loading() {
  const classes = useStyles();
  return (
    <div>
      <CircularProgress className={classes.backdrop} />
    </div>
  );
}

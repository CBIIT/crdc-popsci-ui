import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import LandingView from './landingView';
import { Typography } from '../../components/Wrappers/Wrappers';

const landingController = () => {
  const { loading, error, data } = {loading: false, error: false, data: []}


  if (loading) return <CircularProgress />;
  if (error) {
    return (
      <Typography variant="h5" color="error" size="sm">
        {error && `An error has occurred in loading stats component: ${error}`}
      </Typography>
    );
  }

  return <LandingView statsData={data} />;
};

export default landingController;

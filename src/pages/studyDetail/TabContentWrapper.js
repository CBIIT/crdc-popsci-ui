import React from 'react';
import { Grid } from '@material-ui/core';
import TabPanel from '../../components/Tab/TabPanel';

const TabContentWrapper = ({ value, index, children }) => {
  return (
    <TabPanel value={value} index={index}>
      {
        children 
        ||
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: '400px' }}
        >
          <p style={{ margin: 'auto' }}>Under construction ... </p>
        </Grid>
      }
    </TabPanel>
  );
};

export default TabContentWrapper;

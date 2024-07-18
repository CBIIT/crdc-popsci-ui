import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import themeProvider from './themeConfig';
import { externalIcon } from '../../../../bento/studyDetailData';
import { cn } from 'bento-components';


const Publications = ({
  classes,
  data,
}) => {

  

console.log(data)
  return (
    <themeProvider>
      <div >
        this is test
      </div>
        
  </themeProvider>
  );
};

const styles = (theme) => ({
});

export default withStyles(styles, { withTheme: true })(Publications);

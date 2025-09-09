import React, { useEffect, useState } from 'react';
import {
  Grid,
  withStyles,
  Button,
} from '@material-ui/core';
import axios from 'axios';
import styles from './HeaderStyle';
import {
  myFilesPageData,
} from '../../../../bento/fileCentricCartWorkflowData';
import ReadMeDialogComponent from '../../../../components/ReadMeDialog/ReadMe.controller';
import ReadMoreSVG from '../../assets/ReadMoreSVG.svg';
import env from '../../../../utils/env';
import DropDownView from '../dropdown/DropDownView';
import HeaderThemeprovider from './HeaderTheme';

const HeaderView = ({
  classes,
  filesId,
}) => {
  const [displayReadMe, setDisplayReadMe] = useState(false);
  const [content, setContent] = useState(undefined);

  return (
    <HeaderThemeprovider>
      <div className={classes.cartHeader}>
        <div className={classes.cartHeaderLogo}>
          <div style={{position: 'relative', minWidth: '98px'}}>
            <img
              className={classes.logo}
              src={myFilesPageData.headerIconSrc}
              alt={myFilesPageData.headerIconAlt}
            />
          </div>
        </div>
      </div>

      <Grid container alignItems="center" justifyContent="flex-end" xs={12} md={12} lg={12} className={classes.actionBtn}>
        <DropDownView
          filesId={filesId} 
        /> 
      </Grid>
    </HeaderThemeprovider>
  );
};

export default withStyles(styles)(HeaderView);

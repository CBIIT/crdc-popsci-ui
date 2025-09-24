import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import styles from "./HeaderStyle";
import { myFilesPageData } from "../../../../bento/fileCentricCartWorkflowData";

import DropDownView from "../dropdown/DropDownView";
import HeaderThemeprovider from "./HeaderTheme";
import ExternalLinkIcon from "../../../../utils/ExternalLinkIcon";

const HeaderView = ({ classes, filesId }) => {

  return (
    <HeaderThemeprovider>
      <Grid container className={classes.cartHeader}>
        <Grid item className={classes.cartHeaderLogo}>
          <img
            className={classes.logo}
            src={myFilesPageData.headerIconSrc}
            alt={myFilesPageData.headerIconAlt}
          />
        </Grid>
        <Grid item xs>
          <h4 className={classes.cartHeaderLabel}>Cart:&nbsp;&nbsp;<span className={classes.cartHeaderSubLabel}>Selected Files</span> </h4>
        </Grid>
      </Grid>

      <Grid container justifyContent="space-between" xs={12} md={12} lg={12} className={classes.headerInstructionAndActionBtn}>
        <Grid item xs className={classes.descriptionContainer} >
          <span className={classes.descriptionTitle}>Instructions:</span>
          <p className={classes.descriptionText}>

            To immediately access and analyze files using your{' '}
            <a href="https://www.cancergenomicscloud.org/" target="_blank" rel="noopener noreferrer" style={{ color: "#005D85", textDecoration: 'underline'}}>
              Velsera Seven Bridges Cancer Genomics Cloud
            </a>
            &nbsp;<ExternalLinkIcon className={classes.externalLinkIcon} width={12} height={12} />{' '}
            account, first remove any unwanted files, and then simply select the{' '}
            <span className={classes.keyword}>Export to CGC</span> option under{' '}
            <span className={classes.keyword}>Export and Download</span>.
            Alternatively, to save your file set and analyze files of interest at a more convenient time, remove any unwanted files, select the{' '}
            <span className={classes.keyword}>Download Manifest</span> option under{' '}
            <span className={classes.keyword}>Export and Download</span>, and upload the resulting{' '}
            <span className={classes.keyword}>File Manifest</span> to your account at the appropriate time.
          </p>
        </Grid>

        <Grid item style={{paddingTop: '14px'}}>
          <DropDownView filesId={filesId} />
        </Grid>
      </Grid>
    </HeaderThemeprovider>
  );
};

export default withStyles(styles)(HeaderView);

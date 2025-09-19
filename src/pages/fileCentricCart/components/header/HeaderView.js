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

      <Grid container alignItems="center" justifyContent="space-between" xs={12} md={12} lg={12} className={classes.headerInstructionAndActionBtn}>
        <Grid item xs className={classes.descriptionContainer} >
          <span className={classes.descriptionTitle}>Instructions:</span>
          <p className={classes.descriptionText}>
            To analyze files within your{" "}
            <a href="https://www.cancergenomicscloud.org" target="_blank" rel="noopener noreferrer" style={{ color: "#005D85" }}>
              Cancer Genomics Cloud
            </a>
            &nbsp;<ExternalLinkIcon className={classes.externalLinkIcon} />{" "}
            account, select Export to CGC. To analyze files, select and remove unwanted files, 
            select Download File Manifest, and upload the resulting manifest file to your{" "}
            <a href="https://www.cancergenomicscloud.org/" target="_blank" rel="noopener noreferrer" style={{ color: "#005D85" }}>
              Velsera Seven Bridges Cancer Genomics Cloud
            </a>
            &nbsp;<ExternalLinkIcon className={classes.externalLinkIcon} />{" "}
            account.
          </p>
        </Grid>

        <Grid item>
          <DropDownView filesId={filesId} />
        </Grid>
      </Grid>
    </HeaderThemeprovider>
  );
};

export default withStyles(styles)(HeaderView);

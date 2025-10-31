import React from "react";
import { Button, Tooltip, withStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

const CustomHeaderRemove = ({ openDialogBox, classes }) => {
  // Get filesId directly from Redux state
  const reduxFilesId = useSelector((state) => state.cartReducer.filesId);

  // Use Redux filesId as primary source, with fallbacks
  const updatedFilesId = reduxFilesId || [];

  return (
    <div>
      <Tooltip
        classes={{ root: classes.customTooltip, tooltip: classes.customTooltip }}
        title="Remove all items in cart"
      >
        <Button
          classes={{ root: classes.removeBtn }}
          onClick={openDialogBox}
          disabled={updatedFilesId?.length === 0}
        >
          Clear Cart
        </Button>
      </Tooltip>
    </div>
  );
};

const styles = () => ({
  customTooltip: {
    backgroundColor: '#ffffff !important',
    color: '#595959 !important',
    textAlign: 'left',

    fontFamily: 'Nunito',
    fontWeight: '400',
    
    fontSize: '14px',
    lineHeight: '17px',
    letterSpacing: '0%',

    maxWidth: '400px',
    minHeight: '29px',
    gap: '10px',
    paddingTop: '6px',
    paddingRight: '12px',
    paddingBottom: '6px',
    paddingLeft: '12px',
    borderRadius: '8px',
    borderWidth: '1px',

    border: '1px solid #818181 !important',
    boxShadow: '0px 4px 4px 0px #00000040 !important',

    margin: '5px !important',
  },
  removeBtn: {
    fontFamily: 'Open Sans',
    fontWeight: 700,
    fontStyle: 'Bold',
    fontSize: '14px',
    lineHeight: '100%',
    letterSpacing: 0,
    textAlign: 'center',
    verticalAlign: 'middle',
    textTransform: 'uppercase',

    height: '36px',
    width: '104px',
    borderRadius: '30px',
    padding: '8.5px 8px',
    color: '#C33B27',
    background: '#FFF',
    border: '1px solid #C33B27',
  },
});

export default withStyles(styles)(CustomHeaderRemove);

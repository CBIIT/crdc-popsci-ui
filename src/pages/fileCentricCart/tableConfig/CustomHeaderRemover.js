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
        classes={{ tooltip: classes.customTooltip }}
        title="Remove all items in cart"
        arrow
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
  removeBtn: {
    fontFamily: 'Open Sans',
    fontWeight: 700,
    fontStyle: 'Bold',
    fontSize: '14px',
    leadingTrim: 'NONE',
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

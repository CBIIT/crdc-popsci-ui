import React from 'react';
import {
  Button,
  makeStyles,
  Tooltip,
  withStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  customTooltip: {
    borderRadius: '5px',
    textAlign: 'center',
    fontSize:'14px',
    backgroundColor: 'white !important',
    color:'#C33B27 !important',
    border: '2px solid #C33B27 !important',
  },
}));
const CustomHeaderRemove = ({
  openDialogBox,
  classes: {
    removeBtn,
  },
}) => (
  <div>
    <Tooltip  classes={{tooltip: useStyles().customTooltip}} title="Remove all items in cart" arrow>
      <Button
        classes={{ root: removeBtn }}
        onClick={openDialogBox}
      >
        Clear Cart
      </Button>
    </Tooltip>
  </div>
);

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

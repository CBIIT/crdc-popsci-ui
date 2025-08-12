import React from 'react';
import { withStyles } from '@material-ui/core';
import ToolTip from '@bento-core/tool-tip';
import CustomIcon from '../../../../../components/CustomIcon/CustomIconView';

const IconCell = ({
  classes,
  signedUrl,
  toolTipText = 'Download a copy of this file',
  iconSrc = '',
  showToolTip = true,
  onAction,
}) => {

  const handleAction = () => {
    if (typeof onAction === 'function') {
      onAction(signedUrl);
    }
  };

  return (
    <div>
      {showToolTip ? (
        <ToolTip classes={{ tooltip: classes.customTooltip, arrow: classes.customArrow }} title={toolTipText} placement="bottom">
          <div
            onClick={handleAction}
            style={{ textAlign: 'center' }}
          >
            <CustomIcon imgSrc={iconSrc} />
          </div>
        </ToolTip>
      ) : (
        <div
          onClick={handleAction}
          style={{ textAlign: 'center' }}
        >
          <CustomIcon imgSrc={iconSrc} />
        </div>
      )}
    </div>
  );
};

const styles = () => ({
  customTooltip: {
    borderRadius: '5px',
    border: '.2px solid #C3C3C3',
    // border: 'none',
    boxShadow: '0px 4px 10px 0px #00000040',
    fontFamily: 'Open Sans',
    color: '#223D4C',
    fontSize: '13px',
    fontWeight: 600,
    lineHeight: '19px',
    letterSpacing: '0em',
    textAlign: 'left',
    maxWidth: '349px',
    padding: '10px 15px'
  },
  customArrow: {
  },

});

export default withStyles(styles)(IconCell);

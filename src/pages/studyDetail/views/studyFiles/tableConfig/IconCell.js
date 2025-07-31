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
  tooltipPlacement='bottom'
}) => {

  const handleAction = () => {
    if (typeof onAction === 'function') {
      onAction(signedUrl);
    }
  };

  return (
    <div>
      {showToolTip ? (
        <ToolTip classes={{ tooltip: classes.customTooltip, arrow: classes.customArrow }} title={toolTipText} placement={tooltipPlacement}>
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
    backgroundColor: '#ffffff',
    color: '#595959',
    textAlign: 'left',

    fontFamily: 'Nunito',
    fontWeight: '400',
    fontStyle: 'Regular',
    fontSize: '14px',
    leadingTrim: 'NONE',
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

    border: '1px solid #818181',
    boxShadow: '0px 4px 4px 0px #00000040',
  },
  customArrow: {
  },

});

export default withStyles(styles)(IconCell);

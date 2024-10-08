import React from 'react';
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';

const tabLabel = ({
  classes, title, primaryColorClass, icon,
}) => (
  <div className={classNames(classes.defaultStyle, primaryColorClass)}>
    {(icon && (<img src={icon} alt="Tab Icon" />))}
    <span>
      {title}
      {' '}

    </span>
  </div>
);

const styles = () => ({
  defaultStyle: {
    fontFamily: 'Open Sans',
    textTransform: 'none',
    fontSize: '17px',
    height: '46px',
    // marginBottom: '-5px',
  },
});

export default withStyles(styles, { withTheme: true })(tabLabel);

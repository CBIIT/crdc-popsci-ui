import React from 'react';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const CustomBreadcrumb = ({ classes, separator="/", data }) => (
  <div id="bread_crumb" className={classes.headerNav}>
    {
      data.reduce((acc, current, index) => {
        if (current.isALink) {
          acc.push(
            <Link
              className={classes.headerNavLink}
              to={current.to}
              onClick={current.onClick}
              key={current.to}
              id={`${index + 1}_breadcrumb`}
            >
              {current.name}
            </Link>,
          );
        } else {
          acc.push(<span className={classes.headerNavSpan}>{current.name}</span>);
        }
        if (index < data.length - 1) {
          acc.push(<span className={classes.separator}>{separator}</span>);
        }
        return acc;
      }, []).map((item) => (item))
    }
  </div>
);

const styles = (theme) => ({
  headerNav: {
    fontFamily: 'Open Sans',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '16.34px',
    color: '#646464',

    letterSpacing: '0.025em',
  },
  headerNavLink: {
    fontWeight: 700,
    color: '#003F74',
    textDecoration: 'none',
    paddingRight: '5px',
  },
  separator: {
    color: '#003F74',
  },
  headerNavSpan: {
    paddingLeft: '5px',
  }
});

export default withStyles(styles)(CustomBreadcrumb);

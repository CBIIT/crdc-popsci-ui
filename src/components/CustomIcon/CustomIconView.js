import React from 'react';
import { withStyles, Icon } from '@material-ui/core';

const CustomIcon = ({ imgSrc, imgAlt = 'Logo alt text', classes: userClasses }) => {
  // Merge internal styles with user-provided styles (user overrides internal)
  const defaultClasses = styles();
  const mergedClasses = { ...defaultClasses.root, ...(userClasses?.root || {}) };

  return (
    <Icon>
      <img src={imgSrc} style={mergedClasses} alt={imgAlt} />
    </Icon>
  );
};

const styles = () => ({
  root: {
    width: '1em',
    height: '1em',
    display: 'inline-block',
    flexShrink: 0,
    cursor: 'pointer',
  },
});

export default CustomIcon;
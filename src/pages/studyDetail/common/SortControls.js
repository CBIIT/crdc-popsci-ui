import React from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import upwardArrow from '../../../assets/study/upwardArrow.svg';
import downwardArrow from '../../../assets/study/downwardArrow.svg';

const useStyles = makeStyles(theme => ({
  sortButtonGroup: {
    marginLeft: '11px',
    display: 'flex',
    '& > * + *': {
      marginLeft: '15px',
    },
  },
  sortButton: {
    background: '#ffffff',
    fontFamily: 'Nunito',
    fontWeight: 400,
    fontSize: '9px',
    lineHeight: '100%',
    letterSpacing: '0%',
    color: '#5E5E5E',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down(900)]: {
      whiteSpace: 'normal',
    },
  },
  activeButton: {
    color: '#000000',
    fontWeight: 500,
  },
}));

export default function SortControls({
  sortOptions,
  sortBy,
  direction,
  onSortChange,
}) {
  const classes = useStyles();
  const SortIcon = direction === 'asc' ? upwardArrow : downwardArrow;

  return (
    <Box display="flex" className={classes.sortButtonGroup}>
      {sortOptions.map(({ key, label }) => (
        <Button
          key={key}
          size="small"
          onClick={() => onSortChange(key)}
          startIcon={
            sortBy === key && (
              <img
                src={SortIcon}
                alt={direction === 'asc' ? 'Ascending' : 'Descending'}
                style={{ width: 16, height: 16, verticalAlign: 'middle', display: 'inline-block' }}
                aria-hidden="true"
                focusable="false"
              />
            )
          }
          className={clsx(classes.sortButton, { [classes.activeButton]: sortBy === key })}
          aria-pressed={sortBy === key}
        >
          {label}
        </Button>
      ))}
    </Box>
  );
}
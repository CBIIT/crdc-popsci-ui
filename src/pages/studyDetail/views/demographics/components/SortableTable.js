import React, { memo, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import upwardArrow from '../../../../../assets/study/upwardArrow.svg';
import downwardArrow from '../../../../../assets/study/downwardArrow.svg';

const SORT_OPTIONS = [
  { key: 'alpha', label: 'Sort Alphabetically' },
  { key: 'count', label: 'Sort by Participant Count' },
];

const SortButton = memo(({ sortKey, label, active, direction, onClick, classes }) => {
  const iconSrc = direction === 'asc' ? upwardArrow : downwardArrow;

  return (
    <Button
      size="small"
      onClick={() => onClick(sortKey)}
      startIcon={
        active ? (
          <img
            src={iconSrc}
            alt={direction === 'asc' ? 'Ascending' : 'Descending'}
          />
        ) : null
      }
      className={clsx(classes.sortButton, active && classes.active)}
    >
      {label}
    </Button>
  );
});

function SortableTable({
  data = [],
  sectionTitle = '',
  sectionCaption = '',
}) {
  const classes = useStyles();

  // Track which field we're sorting by and the current sort direction
  const [sortBy, setSortBy]       = useState('alpha'); // 'alpha' or 'count'
  const [direction, setDirection] = useState('asc');   // 'asc' or 'desc'

  // Define comparator functions for each sort key
  const comparators = {
    alpha: (a, b) => {
      // Place rows without a group value at the end
      const aVal = a.group || '';
      const bVal = b.group || '';
      if (!aVal && !bVal) return 0;
      if (!aVal) return 1;
      if (!bVal) return -1;
      return aVal.localeCompare(bVal);
    },
    // Compare by subject count (defaulting to 0)
    count: (a, b) => (a.subjects || 0) - (b.subjects || 0),
  };

  // Sort data when inputs change
  const rows = useMemo(() => {
    const sorted = [...data].sort(comparators[sortBy]);
    return direction === 'asc' ? sorted : sorted.reverse();
  }, [data, sortBy, direction]);

  // Change sort key or toggle direction if same key is clicked
  const handleSortClick = key => {
    if (key === sortBy) {
      setDirection(dir => (dir === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setDirection('asc'); // Always default to ascending when changing sort field
    }
  };

  return (
    <Grid xs={12} className={classes.rootContainer}>
      {/* Section header: title, grouped sort buttons, and optional caption */}
      <Box className={classes.sectionHeaderBox}>
        <Box alignItems="center" display="flex" flexDirection="row">
          <Typography variant="h5" className={classes.sectionTitle}>
            {sectionTitle}
          </Typography>
          {/* Group sort buttons so they wrap together */}
          <Box display="flex" className={classes.sortButtonGroup}>
            {SORT_OPTIONS.map(({ key, label }) => (
              <SortButton
                key={key}
                sortKey={key}
                label={label}
                active={sortBy === key}
                direction={direction}
                onClick={handleSortClick}
                classes={classes}
              />
            ))}
          </Box>
        </Box>

        {sectionCaption && (
          <Typography variant="body2" className={classes.sectionCaption}>
            {sectionCaption}
          </Typography>
        )}
      </Box>

      {/* Data table */}
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow className={classes.headRow}>
              <TableCell component="td"/> {/* Empty header for the group column */}
              <TableCell>
                Participant&nbsp;Count
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell align="center">
                  No data available.
                </TableCell>
              </TableRow>
            ) : (
              rows.map(({ group, subject }) => (
                <TableRow key={group} className={classes.tableRow}>
                  <TableCell>{group}</TableCell>
                  <TableCell className={classes.countCell}>
                    {subject.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  rootContainer: {
    marginBottom: '40px',
  },
  sectionHeaderBox: {
    paddingBottom: '5px'
  },
  sectionTitle: {
    fontFamily: 'Open Sans',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '130%',
    letterSpacing: '-1%',
    textTransform: 'uppercase',

    color: '#27424E'
  },
  sectionCaption: {
    fontFamily: 'Nunito',
    fontWeight: '500',
    fontSize: '11px !important',
    lineHeight: '100%',
    letterSpacing: '0%',
    color: '#497494',
  },
  sortButtonGroup: {
    // Group the two sort buttons so they wrap together
    marginLeft: '11px',
    display: 'flex',
    '& > * + *': {
      marginLeft: '15px',
    },
  },
  headRow: {
    background: '#ffffff',
  },
  tableRow: {
    // Alternating row background colors
    '&:nth-of-type(odd)': { backgroundColor: '#ECEFF2' },
    '&:nth-of-type(even)': { backgroundColor: '#ffffff' },
  },
  countCell: {
    // Styling for the count column
    fontWeight: 600,
    textAlign: 'center',
    color: '#245F7B',
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

export default SortableTable;

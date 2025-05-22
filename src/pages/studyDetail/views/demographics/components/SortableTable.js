import React, { useMemo, useState } from 'react';
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
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import clsx from 'clsx';


/* -------------- table component -------------- */
function SortableTable({
  data=[], 
  sectionTitle="", 
  sectionCaption="" 
}) {
  const classes = useStyles();

  // State: which field to sort by, and direction
  const [sortBy, setSortBy]       = useState('alpha'); // 'alpha' | 'count'
  const [direction, setDirection] = useState('asc');   // 'asc'  | 'desc'

 // Memoize sorted rows to avoid recomputing on every render
 const rows = useMemo(() => {
  const sorted = [...data].sort((a, b) =>
    sortBy === 'alpha'
      ? a.group.localeCompare(b.group)
      : a.subject - b.subject
  );
  return direction === 'asc' ? sorted : sorted.reverse();
}, [data, sortBy, direction]);

 // Handler for button clicks: toggle direction or change sort field
 const onSortClick = (field) => {
  if (sortBy === field) {
    setDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
  } else {
    setSortBy(field);
    setDirection(field === 'alpha' ? 'asc' : 'desc');
  }
};

  // Choose arrow icon based on current direction
  const SortIcon = direction === 'asc' ? ArrowUpwardIcon : ArrowDownwardIcon;

  return (
    <Grid xs={12} className={classes.rootContainer}>
      {/* Title and Sorting */}
      <Box className={classes.sectionHeaderBox}>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <Typography variant="h5" className={classes.sectionTitle}>
            {sectionTitle}
          </Typography>
        
          {/* This box is treated as ONE flex‑item, so the buttons stay together */}
          <Box display="flex" gridGap={16} className={classes.sortButtonGroup}>
            {/* Map over both sort options */}
            {[
              { key: 'alpha', label: 'Sort Alphabetically' },
              { key: 'count', label: 'Sort by Participant Count' },
            ].map(({ key, label }) => (
              <Button
                key={key}
                size="small"
                onClick={() => onSortClick(key)}
                startIcon={sortBy === key ? <SortIcon fontSize="inherit" /> : null}
                className={clsx(classes.sortButton, sortBy === key && classes.activeButton)}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Box>

        <Typography variant="body2" className={classes.sectionCaption}>
          {sectionCaption}
        </Typography>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow className={classes.headRow}>
              <TableCell component="td"/>
              <TableCell>
                Participant&nbsp;Count
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(({ group, subject }) => (
              <TableRow key={group} className={classes.tableRow}>
                <TableCell>{group}</TableCell>
                <TableCell className={classes.countCell}>
                  {subject.toLocaleString()} 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

/* -------------- styles -------------- */
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
    fontSize: '11px',
    lineHeight: '100%',
    letterSpacing: '0%',

    color: '#497494',
  },
  sortButtonGroup: {
    // Group the two sort buttons so they wrap together
    marginLeft: '10px',
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
    textWrap: 'nowrap',

    fontFamily: 'Nunito',
    fontWeight: 400,
    fontSize: '9px',
    lineHeight: '100%',
    letterSpacing: '0%',
    color: '#5E5E5E',
  },
  activeButton: {
    color: '#000000',
    fontWeight: 500,
  },
}));

export default SortableTable;
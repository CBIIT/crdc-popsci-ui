import React, { useMemo } from 'react';
import { useTheme, useMediaQuery } from '@material-ui/core';

const makeColumns = (items, rowCount) =>
  items.reduce((cols, item, idx) => {
    const colIndex = Math.floor(idx / rowCount);
    if (!cols[colIndex]) cols[colIndex] = [];
    cols[colIndex].push(item);
    return cols;
  }, []);

const CancerTypeGrid = ({ classes, cancerTypes }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs')); // <800px
  const isSm = useMediaQuery(theme.breakpoints.down('sm')); // <1100px

  // pick between 1,2,3 columns
  const columnsCount = isXs ? 1 : isSm ? 2 : 3;

  // as columns shrink, rowCount grows
  const rowCount = useMemo(
    () => Math.ceil(cancerTypes.length / columnsCount),
    [cancerTypes.length, columnsCount]
  );

  const columns = useMemo(
    () => makeColumns(cancerTypes, rowCount),
    [cancerTypes, rowCount]
  );

  return (
    <div className={classes.gridContainer}>
      {columns.map((col, colIndex) => (
        <div key={colIndex}>
          {col.map((item, idx) => (
            <div
              key={`${item.code || item.term}_${idx}`}
              className={classes.neoplasmText}
            >
              <span className={classes.term}>
                {item.code && <span className={classes.code}>{item.code}&nbsp;&nbsp;</span>}
                {item.term}
              </span>
              <span className={classes.count}>
                {item.participantCount}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CancerTypeGrid;

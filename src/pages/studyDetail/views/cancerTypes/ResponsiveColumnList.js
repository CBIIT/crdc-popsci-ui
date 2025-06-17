import React, { useMemo } from 'react';
import { useTheme, useMediaQuery } from '@material-ui/core';

/**
 * Splits a flat array into evenly sized columns.
 *
 * Maintains original order and fills each column up to `maxPerColumn`.
 * If items don't divide evenly, the last column will have fewer elements.
 *
 * @param {any[]} list           - Ordered list of items to split.
 * @param {number} maxPerColumn  - Maximum items per column.
 * @returns {any[][]}            - Nested array: each inner array is one column.
 *
 * @example
 * // list = [1,2,3,4,5], maxPerColumn = 2
 * // returns [[1,2], [3,4], [5]]
 */
const splitIntoColumns = (list, maxPerColumn) =>
  list.reduce((columns, item, index) => {
    const columnIndex = Math.floor(index / maxPerColumn);
    if (!columns[columnIndex]) columns[columnIndex] = [];
    columns[columnIndex].push(item);
    return columns;
  }, []);

/**
 * Renders a responsive list of cancer types in columns.
 *
 * - Adjusts to screen size:
 *   • Mobile (<800px): 1 column
 *   • Tablet (<1100px): 2 columns
 *   • Desktop: 3 columns
 * - Keeps items balanced by calculating how many go in each column.
 *
 * @param {object} props
 * @param {object} props.classes       - MUI class names.
 * @param {Array}  props.items   - List of objects: 
 * @param {function} props.renderItem - (item, idx) ⇒ JSX for each item.
 *    { code?: string, term: string, participantCount: number }.
 */
const ResponsiveColumnList = ({ classes, items, renderItem }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'));

  // Decide how many columns to show: 1, 2, or 3
  const columnsCount = isMobile ? 1 : isTablet ? 2 : 3;

  /**
   * Compute how many items should go in each column.
   * E.g. with 10 items and 3 columns → Math.ceil(10/3) = 4 rows per column.
   */
  const itemsPerColumn = useMemo(
    () => Math.ceil(items.length / columnsCount),
    [items.length, columnsCount]
  );

  /**
   * Build the 2D columns array once per change to items or itemsPerColumn.
   * Uses splitIntoColumns to bucket items evenly.
   */
  const columnsArray = useMemo(
    () => splitIntoColumns(items, itemsPerColumn),
    [items, itemsPerColumn]
  );

  return (
    <div className={classes.columnsContainer}>
      {columnsArray.map((colItems, colIndex) => (
        <div key={colIndex}>
          { colItems.map((item, idx) => renderItem(item, idx)) }
        </div>
      ))}
    </div>
  );
};

export default ResponsiveColumnList;
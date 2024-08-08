import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import OverviewThemeProvider from './theme';
import {cn } from '@bento-core/util';
import styles from './style';

const gridStyles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    columnGap: '20px', // Adjust gap between columns
    rowGap: '20px', // Adjust gap between rows
    justifyContent: 'center',
  },
  neoplasmText: {
    wordBreak: 'break-word',
    textWrap: 'wrap',
    margin: '5px 0',
  },
});

const NeoplasmGrid = ({ classes, diseaseTerms }) => {
  const columns = [[], [], [], []];
  const columnCount = 4;
  const termsPerColumn = Math.ceil(diseaseTerms.length / columnCount);

  diseaseTerms.forEach((term, index) => {
    const columnIndex = Math.floor(index / termsPerColumn);
    columns[columnIndex].push(term);
  });

  return (
    <div className={classes.container}>
      {columns.map((column, colIndex) => (
        <div key={colIndex}>
          {column.map((term, index) => (
            <div key={term + '_' + index} className={classes.neoplasmText}>{term}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

const NeoplasmGridStyled = withStyles(gridStyles)(NeoplasmGrid);

const Neoplasms = ({ classes, data, }) => {
  const { primary_diagnosis_disease_term, primary_diagnosis_disease_count } = data;

  // Create a Set from the list to remove duplicates, convert it back to an array then sort the unique list in place
  const uniqueDiseaseTermsList = Array.from(new Set(primary_diagnosis_disease_term)).sort();

  const renderInfo = (label, value = '') => (
    <div className={classes.keyAndValueRow}>
      <span className={classes.label}>{label}</span>
      <span className={classes.value}>{value}</span>
    </div>
  );

  return (
    <OverviewThemeProvider>
      <div className={classes.detailContainer}>
        <Grid container>
          {/* Left Container Detail */}
          <Grid item xs={12} sm={12} className={cn(classes.borderRight, classes.detailContainerLeft)}>
            <div className={classes.scrollDiv}>
              <Grid container direction="row" className={classes.leftInnerContainer} >
                {renderInfo('NUMBER OF NEOPLASMS', primary_diagnosis_disease_count)}
                
                <Grid item xs={12} className={classes.mainLabel}>
                  <span>NEOPLASMS</span>
                </Grid>
                <Grid item xs={12} className={classes.mainValue}>
                  <NeoplasmGridStyled diseaseTerms={uniqueDiseaseTermsList} />
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </OverviewThemeProvider>
  );
};

export default withStyles(styles, { withTheme: true })(Neoplasms);
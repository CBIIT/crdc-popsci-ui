import React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import BarChartV2 from '../../../../../components/BarChartV2/bar-chart-v2';

const ChartSection = ({ classes, data, demo }) => {
  const {
    participant_count_by_age,
    participant_races,
    participant_ethnicities,
    participant_sexes,
  } = data

  return (
    <Grid className={classes.chartSection}>
      <Grid container spacing={4}>
        {participant_count_by_age && participant_count_by_age.length > 0 && (
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <BarChartV2 chartData={participant_count_by_age} chartTitle="Age of Enrollment" />
          </Grid>
        )}
        {participant_races && participant_races.length > 0 && (
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <BarChartV2 chartData={participant_races} chartTitle="Race" />
          </Grid>
        )}
        {participant_ethnicities && participant_ethnicities.length > 0 && (
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <BarChartV2 chartData={participant_ethnicities} chartTitle="Ethnicity" />
          </Grid>
        )}
        {participant_sexes && participant_sexes.length > 0 && (
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <BarChartV2 chartData={participant_sexes} chartTitle="Sex" />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
  

const styles = theme => ({
  chartSection: {
    width: '100%',
    marginLeft: '30px',
  },
});

export default withStyles(styles, { withTheme: true })(ChartSection);
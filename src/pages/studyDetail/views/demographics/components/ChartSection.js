import React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import BarChartV2 from '../../../../../components/BarChartV2/bar-chart-v2';

const ChartSection = ({ classes, demo }) => (
  <Grid className={classes.chartSection}>
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <BarChartV2 chartData={demo.participant_age_at_enrollment} chartTitle="Age of Enrollment" />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <BarChartV2 chartData={demo.participant_races} chartTitle="Race" />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <BarChartV2 chartData={demo.participant_ethnicities} chartTitle="Ethnicity" />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <BarChartV2 chartData={demo.participant_sexes} chartTitle="Sex" />
      </Grid>
    </Grid>
  </Grid>
);

const styles = theme => ({
  chartSection: {
    width: '100%',
    marginLeft: '30px',
  },
});

export default withStyles(styles, { withTheme: true })(ChartSection);
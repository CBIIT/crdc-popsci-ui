import React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import BarChartV2 from '../../../../../components/BarChartV2/bar-chart-v2';
import { useHideRechartsSpan } from '../../../../../hooks/useHideRechartsSpan';

const ChartSection = ({ classes, data }) => {
  const {
    participant_count_by_age,
    participant_races,
    participant_ethnicities,
    participant_sexes,
  } = data

  useHideRechartsSpan()

  return (
    <Grid className={classes.chartSection}>
      <Grid container spacing={4}>
        {participant_count_by_age && participant_count_by_age.length > 0 && (
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <BarChartV2 chartData={participant_count_by_age} chartTitle="Age at Enrollment" barWidth={30} fromChartSection={true}/>
          </Grid>
        )}
        {participant_races && participant_races.length > 0 && (
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <BarChartV2 chartData={participant_races} chartTitle="Race" chartwidth={400} fromChartSection={true}/>
          </Grid>
        )}
        {participant_ethnicities && participant_ethnicities.length > 0 && (
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <BarChartV2 chartData={participant_ethnicities} chartTitle="Ethnicity" fromChartSection={true}/>
          </Grid>
        )}
        {participant_sexes && participant_sexes.length > 0 && (
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <BarChartV2 chartData={participant_sexes} chartTitle="Sex" fromChartSection={true}/>
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
import React from 'react';
import { Grid, Typography, withStyles, useMediaQuery, CircularProgress } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_STUDY_DETAIL_DEMOGRAPHIC_DATA_QUERY } from '../../../../bento/studyDetailData';
import ThemeProvider from './themeConfig';
import StatsSection from './components/StatsSection';
import ChartSection from './components/ChartSection';
import { capitalizeWordsExcept } from '../../common/utils';

function useDemographicsData(studyShortName) {
  const { loading, error, data: raw } = useQuery(
    GET_STUDY_DETAIL_DEMOGRAPHIC_DATA_QUERY,
    {
      variables: { study_short_name: [studyShortName] },
      context: { clientName: 'mockService' },
    }
  );
  const demo = raw?.studyDemographics?.[0] || {};
  return { loading, error, demo };
}

const Demographics = ({ classes, data, studyShortName }) => {
  // Mock Demographics Data
  const { loading, error, demo } = useDemographicsData(studyShortName);
  const isUnder800px = useMediaQuery('(max-width:800px)'); // Check if screen width is under 800px

  if (loading) return <CircularProgress />;
  if (error) return <p variant="headline" color="error" size="lg" style={{textAlign: 'center', color: 'red', fontSize: '20px', margin: '50px auto'}}>Error loading demographics tab</p>
  if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
    return (
      <div className={classes.page}>
        <Grid container spacing={3} className={classes.container} justifyContent="center" alignItems="center" style={{ minHeight: '300px' }}>
          <Grid item xs={12}>
            <Typography align="center">
              There are no demographics available for this study
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }

  const capitalizeGroupArray = arr =>
    Array.isArray(arr)
      ? arr.map(item => ({
          ...item,
          group: capitalizeWordsExcept(item.group, ['or', 'and']), // ['and', 'or', 'the', 'of', 'in', 'a', 'to', 'for', 'with', 'by', 'at']),
        }))
      : arr;

  data = {
    number_of_participants: data?.number_of_participants || '',
    participant_age_range: data?.participant_age_range || '',
    participant_mean_age: data?.participant_mean_age || '',
    participant_median_age: data?.participant_median_age || '',
    participant_count_by_age: capitalizeGroupArray(data?.participant_count_by_age) || [],
    participant_races: capitalizeGroupArray(data?.participant_races) || [],
    participant_ethnicities: capitalizeGroupArray(data?.participant_ethnicities) || [],
    participant_sexes: capitalizeGroupArray(data?.participant_sexes) || [],
  };

  return (
    <ThemeProvider>
      <div className={classes.page}>
        <Grid container spacing={3} className={classes.container}>
          <Grid item xs={12} sm={6} className={classes.section}>
            <StatsSection data={data} demo={demo} />
          </Grid>

          {!isUnder800px && <div className={classes.divider} />}

          <Grid item xs={12} sm={6} className={classes.charts}>
            <ChartSection data={data} demo={demo} />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

const styles = theme => ({
  page: { position: 'relative' },
  container: { padding: '0 68px', position: 'relative' },
  section: { margin: '40px 0 120px 0' },
  charts: { margin: '20px 0 120px 0' },
  divider: {
    position: 'absolute',
    left: '50%',
    top: 10,
    bottom: 0,
    borderLeft: '2px solid #76C4E4',
    transform: 'translateX(-50%)',
    pointerEvents: 'none',
  },
});

export default withStyles(styles, { withTheme: true })(Demographics);

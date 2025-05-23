import React from 'react';
import { Grid, Typography, withStyles} from '@material-ui/core';
import SortableTable from './SortableTable';

export const StatRow = ({ label, subLabel, labelCaption, children, classes }) => (
  <div className={classes.item}>
    <Grid container>
      <Grid item xs={8}>
        <Typography className={classes.label}>
          {label}
          {subLabel && <span className={classes.subLabel}>{subLabel}</span>}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography className={classes.value}>{children}</Typography>
      </Grid>
    </Grid>
    {labelCaption && (
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.labelCaption}>{labelCaption}</Typography>
        </Grid>
      </Grid>
    )}
  </div>
);

const StatsSection = ({ classes, data, demo }) => {
  const {
    number_of_participants = 0,
    participant_maximum_age,
    participant_minimum_age,
    participant_age_range = '',
    participant_mean_age = '',
    participant_median_age = '',
    participant_races = [],
    participant_ethnicities = [],
    participant_sexes = [],
  } = demo

  console.log("|| demo: ", demo)

  const formattedCount = Number(number_of_participants || 0).toLocaleString();

  return (
    <>
      <StatRow label="NUMBER OF PARTICIPANTS" classes={classes}>
        {formattedCount}
      </StatRow>

      <StatRow
        label="PARTICIPANT AGE RANGE"
        subLabel="(years)"
        labelCaption="Data reflects Age at Enrollment"
        classes={classes}
      >
        {`${participant_maximum_age} - ${participant_minimum_age}`}
      </StatRow>

      <StatRow
        label="MEAN PARTICIPANT AGE"
        subLabel="(years)"
        labelCaption="Data reflects Age at Enrollment"
        classes={classes}
      >
        {participant_mean_age}
      </StatRow>

      <StatRow
        label="MEDIAN PARTICIPANT AGE"
        subLabel="(years)"
        labelCaption="Data reflects Age at Enrollment"
        classes={classes}
      >
        {participant_median_age}
      </StatRow>

      {Array.isArray(participant_races) && (
        <SortableTable
          data={participant_races}
          sectionTitle="Participant Races"
          sectionCaption="Participants may identify as more than one race"
        />
      )}
      {Array.isArray(participant_ethnicities) && (
        <SortableTable
          data={participant_ethnicities}
          sectionTitle="Participant Ethnicities"
        />
      )}
      {Array.isArray(participant_sexes) && (
        <SortableTable
          data={participant_sexes}
          sectionTitle="Participant Sexes"
        />
      )}
    </>
  );
};


// === Stats-related styles ===
const styles = theme => ({
  item: {
    marginBottom: '40px',
  },
  label: {
    color: '#27424E',
    fontSize: '16px !important',
    fontWeight: 700,
    fontFamily: 'Open Sans',
    lineHeight: '22px',
    textAlign: 'left',
  },
  subLabel: {
    fontFamily: 'Open Sans',
    fontWeight: 400,
    fontSize: '13px !important',
    lineHeight: '105%',
    letterSpacing: '4%',
    textTransform: 'lowercase',
    paddingLeft: '3px',
    color: 'black',
  },
  value: {
    fontSize: '16px !important',
    fontWeight: 400,
    fontFamily: 'Open Sans',
    lineHeight: '22px',
    textAlign: 'left',
    paddingLeft: '40px',
  },
  labelCaption: {
    fontFamily: 'Nunito',
    fontWeight: 500,
    fontSize: '11px !important',
    lineHeight: '100%',
    letterSpacing: '0%',
    color: '#497494',
  },
});


export default withStyles(styles, { withTheme: true })(StatsSection);

import React from 'react';
import { Grid, Typography, withStyles} from '@material-ui/core';
import SortableTable from './SortableTable';

export const StatRow = ({ label, subLabel, labelCaption, children, classes }) => (
  <div className={classes.item}>
    <Grid container>
      <Grid item xs={8}>
        <Typography className={classes.label}>
          {label}
          {subLabel && <span className={classes.unboldLabel}>{subLabel}</span>}
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

const StatsSection = ({ classes, demo }) => {
  const formattedCount = Number(demo.number_of_participants || 0).toLocaleString();

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
        {demo.participant_minimum_age} – {demo.participant_maximum_age}
      </StatRow>

      <StatRow
        label="MEAN PARTICIPANT AGE"
        subLabel="(years)"
        labelCaption="Data reflects Age at Enrollment"
        classes={classes}
      >
        {demo.participant_mean_age}
      </StatRow>

      <StatRow
        label="MEDIAN PARTICIPANT AGE"
        subLabel="(years)"
        labelCaption="Data reflects Age at Enrollment"
        classes={classes}
      >
        {demo.participant_median_age}
      </StatRow>

      {Array.isArray(demo.participant_races) && (
        <SortableTable
          data={demo.participant_races}
          sectionTitle="Participant Races"
          sectionCaption="Participants may identify as more than one race"
        />
      )}
      {Array.isArray(demo.participant_ethnicities) && (
        <SortableTable
          data={demo.participant_ethnicities}
          sectionTitle="Participant Ethnicities"
        />
      )}
      {Array.isArray(demo.participant_sexes) && (
        <SortableTable
          data={demo.participant_sexes}
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
    // border: '1px solid #E4E4E4',
  },
  label: {
    color: '#27424E',
    fontSize: '16px !important',
    fontWeight: 700,
    fontFamily: 'Open Sans',
    lineHeight: '22px',
    textAlign: 'left',
    // border: '1px solid blue',
  },
  unboldLabel: {
    color: '#27424E',
    fontSize: '16px !important',
    fontFamily: 'Open Sans',
    lineHeight: '22px',
    textAlign: 'left',
    fontWeight: 400,
  },
  value: {
    fontSize: '16px !important',
    fontWeight: 400,
    fontFamily: 'Open Sans',
    lineHeight: '22px',
    textAlign: 'left',
    paddingLeft: '40px',
    // border: '1px solid #E4E4E4',
  },
  labelCaption: {
    fontFamily: 'Nunito',
    fontWeight: 500,
    fontSize: '11px',
    lineHeight: '100%',
    letterSpacing: '0%',
    color: '#497494',
  },
});


export default withStyles(styles, { withTheme: true })(StatsSection);

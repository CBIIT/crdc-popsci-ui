import React from 'react';
import { withStyles } from '@material-ui/core';

// placeholder for whatever chart libs you’ll use:
const ChartSection = ({ classes, demo }) => (
  <div>
    {/* e.g. <AgeDistributionChart data={demo.participant_ages} /> */}
    {/* e.g. <GenderPieChart data={demo.participant_sexes} /> */}
    <p>Charts go here…</p>
  </div>
);


// === Stats-related styles ===
const styles = theme => ({
  
});


export default withStyles(styles, { withTheme: true })(ChartSection);



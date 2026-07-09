import React from 'react';
import StatsBar from './StatsBarView';
import { statsStyling, globalStatsData } from '../../bento/globalStatsData';

const StatsView = ({ data }) => {
  // Incorporate data into the stats array
  const stats = globalStatsData.map((stat) => ({
    val: data[stat.statAPI],
    
    // statTitle, statIconSrc, statIconAlt, formatValue
    ...stat,
  }));

  return (
    <StatsBar
      stats={stats}
      styles={statsStyling}
    />
  );
};

export default StatsView;

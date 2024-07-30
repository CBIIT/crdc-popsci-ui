import React from 'react';
import StatsBar from './StatsBarView';
import { statsStyling, globalStatsData } from '../../bento/globalStatsData';
import humanFileSize from './utils';

const StatsView = ({ data }) => {
  // console.log("||| Stats Bar Data: ", data)

  /* Update the data to convert the file size to a human-readable format */
  const updatedData = {
    ...data,
    data_file_total_size: humanFileSize(data.data_file_total_size),
  };

  // Incorporate data into the stats array
  const stats = globalStatsData.map((e) => ({
    name: e.statTitle,
    val: updatedData[e.statAPI],
    statIconSrc: e.statIconSrc,
    statIconAlt: e.statIconAlt,
  }));

  return (
    <StatsBar
      stats={stats}
      styles={statsStyling}
    />
  );
};

export default StatsView;

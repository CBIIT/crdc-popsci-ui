import React, { useRef } from 'react';
import { withStyles } from '@material-ui/core';
import {
  BarChart,
  XAxis,
  YAxis,
  // CartesianGrid,
  Bar,
  Cell,
  Text,
  Tooltip
} from 'recharts';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontFamily: 'Open Sans',
    fontWeight: '400',
    color: '#4B4B4B',
    fontSize: '16px',
    lineHeight: '22px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    width: '100%',
    position: 'relative',
    left: '7px',
  },
  chartWrapper: {
    width: '100%',
    overflowY: 'hidden',
    display: 'flex',
    justifyContent: 'flex-start',
    minWidth: '320px', // Ensure minimum width for proper display
  },
});

export const palette = ['#6ECDD3', '#55676F', '#E3AB19', '#C01E2E', '#B39C7C', ];

function CustomizedAxisTick(props) {
  const { x, y, payload } = props;
  // Replace 'To' with 'to' in the label
  const label = typeof payload.value === 'string' ? payload.value.replace(/\bTo\b/g, 'to') : payload.value;
  return (
    <Text x={x} y={y} style={{fontFamily: 'Open Sans', fontSize: "9px"}} fill="#000000" textAnchor="middle" width="15" verticalAnchor="start">
      {label}
    </Text>
  );
}


const CustomTooltip = ({ active, payload, label }) => {
  const tooltipStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
    overflowWrap: 'break-word',
    maxWidth: '170px',
  };

  if (active && payload && payload.length) {
    const value = payload[0].value != null ? payload[0].value.toLocaleString() : '';
    return (
      <div style={tooltipStyle}>
        <p style={{ margin: 0, fontWeight: 'bold', fontFamily: 'Open Sans', }}>{`Group: ${label}`}</p>
        <p style={{ margin: 0, fontFamily: 'Open Sans'}}>{`Participants: ${value}`}</p>
      </div>
    );
  }
  return null;
};


// Helper function to sort chart data alphabetically by group
function sortChartDataAlpha(data) {
  return [...data].sort((a, b) => {
    const aStr = (a.group || '').toString().toLowerCase();
    const bStr = (b.group || '').toString().toLowerCase();
    return aStr.localeCompare(bStr);
  });
}

const BarChartV2 = ({
  chartData,
  chartTitle,
  classes,
  chartwidth = 300,
  barWidth = 50,
  titleStyle = {},
}) => {
  const chartWrapperRef = useRef(null);

  const sortedData = sortChartDataAlpha(chartData);
  const calculatedWidth = sortedData.length > Math.min(chartwidth/barWidth) ? sortedData.length * barWidth : chartwidth;
  console.log('width: ', calculatedWidth, sortedData.length);
  // const chartWidth = Math.min(calculatedWidth, 320);

  return (
    <div className={classes.container}>
      <div>
        <h3 className={classes.title} style={{...titleStyle}}>
          {"Participants: " + chartTitle}
        </h3>
      </div>
      <div
        className={classes.chartWrapper}
        ref={chartWrapperRef}
        style={{ overflowX: 'auto', width: '100%' }}
      >
        <BarChart
          width={calculatedWidth}
          height={280}
          data={sortedData}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis 
            dataKey="group" 
            tick={CustomizedAxisTick}
            height={60}
            interval={0}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="subjects">
            {sortedData.map((_entry, index) => (
              <Cell
                key={`cell-${_entry.group}`}
                fill={palette[index % palette.length]}
              />
            ))}
          </Bar>
          <YAxis 
            tick={{ fontSize: 12, fontFamily: 'Open Sans', fill: '#666666' }}
            width={50}
          />
        </BarChart>
      </div>
    </div>
  );
};

export default withStyles(styles)(BarChartV2);
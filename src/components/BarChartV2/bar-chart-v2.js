import React from 'react';
import { withStyles } from '@material-ui/core';
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  Cell,
  Text,
  Tooltip
} from 'recharts';

const styles = theme => ({
  container: {
    display: 'inline-block', 
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
  },
});

export const palette = ['#6ECDD3', '#55676F', '#E3AB19', '#C01E2E', '#B39C7C', ];

function CustomizedAxisTick(props) {
  const { x, y, payload } = props;
  return (
    <Text x={x} y={y} style={{fontFamily: 'Open Sans', fontSize: "10px"}} fill="#000000" textAnchor="middle" width="15" verticalAnchor="start">
      {payload.value}
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
    return (
      <div style={tooltipStyle}>
        <p style={{ margin: 0, fontWeight: 'bold', fontFamily: 'Open Sans', }}>{`Group: ${label}`}</p>
        <p style={{ margin: 0, fontFamily: 'Open Sans'}}>{`Participants: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const BarChartV2 = ({
  chartData,
  chartTitle,
  classes,
}) => {
  const chartWidth = chartData.length > 8 ? chartData.length * 35: 280; 

  return (
    <div className={classes.container}>
      <div>
        <h3 className={classes.title}>
          {"Participants: " + chartTitle}
        </h3>
      </div>
      <div style={{overflowY: 'hidden'}}>
        <BarChart
          width={chartWidth}
          height={260}
          data={chartData}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis 
            dataKey="group" 
            tick={CustomizedAxisTick}
            height={40}
            interval={0}
          />
          <YAxis 
            tick={{ fontSize: 12, fontFamily: 'Open Sans', fill: '#666666' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="subjects">
            {chartData.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={palette[index % palette.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </div>
    </div>
  );
};

export default withStyles(styles)(BarChartV2);

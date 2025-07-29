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
import { BorderRight } from '@material-ui/icons';

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
    justifyContent: 'left',
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
}) => {
  const chartWrapperRef = useRef(null);

  const sortedData = sortChartDataAlpha(chartData);
  const chartWidth = sortedData.length > 5 ? sortedData.length * 55 : 280;

  // Advanced onScroll handler to visually fix Y axis and overlay white rect
  const handleScroll = (e) => {
    // Find recharts surface and axis elements inside this chart wrapper
    const wrapper = chartWrapperRef.current?.querySelector('.recharts-surface');
    const graphWrapper = chartWrapperRef.current;
    const allAxis = chartWrapperRef.current?.querySelectorAll('.recharts-yAxis');
    const xAxis = chartWrapperRef.current?.querySelector('.recharts-xAxis');

    if (!allAxis || !xAxis) return;

    const xAxisHeight = xAxis.getBoundingClientRect().height;

    allAxis.forEach((axis) => {
      // Try to get orientation from tick line or fallback to 'left'
      const tickLine = axis.querySelector('.recharts-cartesian-axis-tick-line');
      const orientation = tickLine?.getAttribute('orientation') || 'left';

      // Remove any existing rects to avoid duplicates
      const oldRects = axis.querySelectorAll('rect.y-axis-rect-' + orientation);
      oldRects.forEach(r => r.remove());

      // Create white rect overlay
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const yAxisheight = axis.getBoundingClientRect().height;
      const yAxisWidth = axis.getBoundingClientRect().width;
      rect.setAttribute('x', '0');
      rect.setAttribute('y', '0');
      rect.setAttribute('width', yAxisWidth + 15);
      rect.setAttribute('height', yAxisheight + xAxisHeight - 10);
      rect.setAttribute('fill', 'white');
      rect.setAttribute('class', `y-axis-rect-${orientation}`);
      axis.insertBefore(rect, axis.firstChild);

      // Calculate position for transform
      const position =
        orientation === 'left'
          ? e.target.scrollLeft
          : e.target.scrollLeft - (wrapper?.clientWidth || 0) + (graphWrapper?.clientWidth || 0);
      axis.style.transform = `translateX(${position}px)`;
    });
  };

  return (
    <div className={classes.container}>
      <div>
        <h3 className={classes.title}>
          {"Participants: " + chartTitle}
        </h3>
      </div>
      <div
        className={classes.chartWrapper}
        ref={chartWrapperRef}
        onScroll={handleScroll}
        style={{ overflowX: 'auto', width: '100%' }}
      >
        <BarChart
          width={chartWidth}
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
          />
          <Tooltip content={<CustomTooltip />} />
        </BarChart>
      </div>
    </div>
  );
};

export default withStyles(styles)(BarChartV2);
import React, { useRef, useEffect, useState } from 'react';
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
import PortalTooltip from './PortalTooltip';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '320px',
    margin: '0 auto',
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
    marginBottom: '10px',
  },
  chartWrapper: {
    width: '100%',
    overflowY: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    minWidth: '320px',
    marginTop: '10px'
  },
  dividerLine: {
    width: '180px',
    borderBottom: '6px solid #E2E7EC',
    alignSelf: 'center',
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
    maxWidth: '160px',
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
  fromChartSection = false,
  usePortalTooltip = true,
}) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(fromChartSection ? 320 : 0);

  useEffect(() => {
    // Inject scrollbar styles
    const styleId = 'barchart-scrollbar-styles';
    let existingStyle = document.getElementById(styleId);
    
    if (!existingStyle) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        .barchart-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .barchart-scrollbar::-webkit-scrollbar-thumb {
          background: #c7c7c7ff;
          border-radius: 2px;
          border: none;
          box-shadow: none;
          outline: none;
        }
        .barchart-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.getBoundingClientRect().width;
        setContainerWidth(width);
      }
    };

    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);
    
    return () => window.removeEventListener('resize', updateContainerWidth);
  }, []);

  const sortedData = sortChartDataAlpha(chartData);
  const calculatedWidth = sortedData.length > Math.min(chartwidth/barWidth) ? sortedData.length * barWidth : chartwidth;

  // Ensure a minimum effective container width of 320 when rendered in ChartSection
  const effectiveContainerWidth = fromChartSection ? Math.max(containerWidth, 320) : containerWidth;
  const hasOverflow = calculatedWidth > effectiveContainerWidth; 
  
  return (
    <div className={classes.container} ref={containerRef}>
      <div>
        <h3 className={classes.title} style={{...titleStyle}}>
          {"Participants: " + chartTitle}
        </h3>
      </div>
      <div
        className={`${classes.chartWrapper} barchart-scrollbar`}
        style={{ 
          overflowX: 'auto', 
          width: '100%',
          justifyContent: hasOverflow ? 'flex-start' : 'center',
        }}
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
          <Tooltip
            content={
              usePortalTooltip
                ? <PortalTooltip maxWidth={160} offset={12} padding={8} estHeight={72} />
                : <CustomTooltip />
            }
            // Recharts always renders an internal wrapper <div> for the tooltip.
            // Hide that wrapper ONLY when using the portal variant to avoid double tooltips.
            wrapperStyle={usePortalTooltip ? { visibility: 'hidden' } : undefined}
          />
          <Bar dataKey="subjects" maxBarSize={60}>
            {sortedData.map((_entry, index) => (
              <Cell
                key={`cell-${_entry.group}`}
                fill={palette[index % palette.length]}
              />
            ))}
          </Bar>
          <YAxis 
            tick={{ fontSize: 12, fontFamily: 'Open Sans', fill: '#666666' }}
            width={45}
          />
        </BarChart>
      </div>
  {/* Divider only shown when there is no horizontal scrollbar */}
  {!hasOverflow && <div className={classes.dividerLine} role="presentation" />}
    </div>
  );
};

export default withStyles(styles)(BarChartV2);
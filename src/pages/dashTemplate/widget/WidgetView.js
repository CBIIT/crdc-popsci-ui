import React, { useCallback } from 'react';
import {
  Button,
  Collapse,
  FormControlLabel,
  Grid,
  withStyles,
} from '@material-ui/core';
import { WidgetGenerator } from '@bento-core/widgets';
// import { useTheme } from '../../../components/ThemeContext';
import styles from './WidgetStyle';
import { widgetConfig } from '../../../bento/dashTemplate';
import colors from '../../../utils/colors';
import { Typography } from '../../../components/Wrappers/Wrappers';
import { formatWidgetData } from './WidgetUtils';
import sunburstStyle from './SunburstStyle'
import { DEFAULT_VALUE } from '../../../bento/siteWideConfig';
import { Sector } from 'recharts';
import { formatAsCommaSeparatedNumber } from '../../../components/Stats/utils';// components/Stats/utils

const WidgetView = ({
  classes,
  data,
  theme,
}) => {
  const displayWidgets = formatWidgetData(data, widgetConfig);
  const [collapse, setCollapse] = React.useState(true);
  // const themeChanger = useTheme(); Hidding Dark Mode
  const handleChange = () => setCollapse((prev) => !prev);

  const widgetGeneratorConfig = {
    theme,
    DonutConfig: {
      colors,
      styles: {
        cellPadding: 2,
        textOverflowLength: 20,
        textColor: theme.palette.widgetBackground.contrastText,
      },
      functions: {
        mapData: (data) => {
          if (data.number_of_participants) return { name: data.study_short_name, value: data.number_of_participants }
          return { name: data.group, value: data.subjects }
        },
        mapDatasetObject: (data) => {
          if (data.number_of_participants) return { name: data.study_short_name, value: data.number_of_participants }
          return { name: data.group, value: data.subjects }
        },
        renderActiveShape: (props) => {
          const {
            cx, cy, innerRadius, outerRadius, startAngle, endAngle,
            fill, payload, value, textColor, fontSize, fontWeight, fontFamily,
            titleLocation, titleAlignment, sliceTitle, totalCount, showTotalCount, textOverflowLength,
          } = props;
    
          const isCapital = String(payload.name).toUpperCase() === String(payload.name);
          const overflowLength = isCapital ? textOverflowLength : textOverflowLength + 10;
    
          const labelX = (titleAlignment === 'center') ? cx : (titleAlignment === 'left') ? 0 : cx * 2;
          const labelY = (titleLocation === 'top') ? 9 : cy * 2;
    
          const faceValue = showTotalCount === true ? `${value} / ${totalCount}` : value;
    
          return (
            <g>
              <text x={labelX} y={labelY} dy={0} textAnchor={(titleAlignment === 'center') ? 'middle' : undefined} fill={textColor} fontSize={fontSize || '12px'} fontWeight={fontWeight || '500'} fontFamily={fontFamily || 'Nunito'} cursor="text">
                {String(payload.name).length > overflowLength ? `${String(payload.name).substring(0, overflowLength)}...` : payload.name}
                <title>{payload.name}</title>
              </text>
              <text x={cx} y={cy} dy={0} textAnchor="middle" fill={textColor} fontSize={fontSize || '12px'} fontWeight="bold" fontFamily={fontFamily || 'Nunito'}>
                {`${formatAsCommaSeparatedNumber(faceValue)}`}
              </text>
              <text x={cx} y={cy} dy={12} textAnchor="middle" fill={textColor} fontSize={fontSize || '12px'} fontWeight="light" fontFamily={fontFamily || 'Nunito'}>
                {`${sliceTitle}`}
              </text>
              <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
              />
              <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 8}
                fill={fill}
              />
            </g>
          );
        },
      }
    },
    SunburstConfig: {
      classes: sunburstStyle(),
      styles: {
        textColor: theme.palette.widgetBackground.contrastText,
        sunburst: {
          stroke: '#ddd',
          strokeOpacity: 0.3,
          strokeWidth: '0.5',
        },
      },
    }
  };
  const { Widget } = useCallback(WidgetGenerator(widgetGeneratorConfig), []);

  const titleTransformer = (sunburstTitle) => {
    if (sunburstTitle.includes(':')) {
      // Extract the title parts
      const [firstString, secondString] = sunburstTitle.split(' : ');
      // Replace empty strings with the value of DEFAULT_VALUE("No value") from /bento/siteWideConfig
      return `${firstString || DEFAULT_VALUE } : ${secondString || DEFAULT_VALUE}`;
    }
    return sunburstTitle;
  };
  
  return (
    <>
      <div className={classes.widgetsCollapse}>
        <div className={classes.floatLeft} />
        <div className={classes.floatRight}>
          <FormControlLabel
            control={(
              <Button className={classes.customButton} onClick={handleChange}>
                {collapse ? 'COLLAPSE VIEW' : 'OPEN VIEW'}
              </Button>
            )}
          />
          {/*
          Hidding Dark Mode
          <Switch
            classes={{
              root: classes.switchRoot,
              switchBase: classes.switchBase,
              thumb: classes.thumb,
              track: classes.track,
              checked: classes.checked,
            }}
            className={classes.customSwitch}
            disableRipple
            checked={themeChanger.dark}
            onChange={themeChanger.toggleTheme}
            inputProps={{ 'aria-label': 'Switch between dark and light themes' }}
          /> */}
        </div>
      </div>
      <Collapse in={collapse} className={classes.backgroundWidgets}>
        <Grid container>
          {widgetConfig.slice(0, 6).map((widget, index) => {
            const dataset = displayWidgets[widget.dataName];
            if (!dataset || dataset.length === 0) {
              return <></>;
            }
            if (widget.type === 'sunburst' && (!dataset.children || !dataset.children.length)) {
              return <></>;
            }
            return (
              <Grid key={index} item lg={4} md={6} sm={12} xs={12}>
                <Widget
                  header={(
                    <Typography size="md" weight="normal" family="Nunito" color="lochmara">
                      {widget.title}
                    </Typography>
                  )}
                  bodyClass={classes.fullHeightBody}
                  className={classes.card}
                  bottomDivider
                  customBackGround
                  data={dataset}
                  chartType={widget.type}
                  sliceTitle={widget.sliceTitle}
                  chartTitleLocation="bottom"
                  chartTitleAlignment="center"
                  resetSunburstOnMouseOut={widget.resetSunburstOnMouseOut}
                  titleTransformer={titleTransformer}
                />
              </Grid>
            );
          })}
        </Grid>
      </Collapse>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(WidgetView);

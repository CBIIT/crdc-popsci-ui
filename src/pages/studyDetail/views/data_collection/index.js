/**
 * DataCollection Component
 * 
 * A React component that displays data collection categories and their assessment status.
 * The component splits categories into two columns for balanced presentation and shows
 * whether each category has been assessed (Yes/No) based on annotation count.
 */

import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  makeStyles,
  createTheme,
  ThemeProvider
} from '@material-ui/core';
import axios from 'axios';
import yaml from 'js-yaml';

// Create a default theme instance
const theme = createTheme();

// Define the URL for the YAML file
const YAML_URL = 'https://raw.githubusercontent.com/CBIIT/popsci-model/refs/heads/Develop/model-desc/popsci-submodel.yml';

// Helper functions moved outside component
const extractCategoryItemsCount = (modelData) => {
  const categoryGroupings = modelData.Nodes?.data_collection_category_grouping?.Props || [];
  const categoryItemsCount = {};
  
  for (let i = 0; i < categoryGroupings.length; i++) {
    const grouping = categoryGroupings[i];
    const propDef = modelData.PropDefinitions?.[grouping];
    if (propDef?.Tags) {
      const categoryName = propDef.Tags.Labeled;
      categoryItemsCount[categoryName] = {
        categoryName,
        items: propDef.Enum || [],
        count: propDef.Enum?.length || 0,
        order: i
      };
    }
  }
  
  return Object.values(categoryItemsCount).sort((a, b) => a.order - b.order);
};

const findOptimalSplit = (categoriesArray) => {
  let leftCount = 0;
  let rightCount = categoriesArray.reduce((acc, category) => acc + category.count, 0);
  let splitIndex = 0;
  let minDifference = rightCount;

  for (let i = 0; i < categoriesArray.length; i++) {
    leftCount += categoriesArray[i].count;
    rightCount -= categoriesArray[i].count;

    const difference = Math.abs(leftCount - rightCount);
    if (difference < minDifference) {
      minDifference = difference;
      splitIndex = i + 1;
    }
  }

  return splitIndex;
};

const calculateAnnotationCounts = (modelData, annotationData) => {
  let nonZeroCount = 0;
  let totalCategories = 0;

  const categoryGroupings = modelData.Nodes?.data_collection_category_grouping?.Props || [];
  categoryGroupings.forEach(grouping => {
    const propDef = modelData.PropDefinitions?.[grouping];
    if (propDef?.Tags?.Labeled && propDef.Enum) {
      propDef.Enum.forEach(item => {
        totalCategories++;
        const matchingData = annotationData.find(d => d.data_collection_category === item);
        if (matchingData && matchingData.data_collection_category_annotation_count > 0) {
          nonZeroCount++;
        }
      });
    }
  });

  return { nonZeroCount, totalCategories };
};

// Define component styles
const useStyles = makeStyles((theme) => ({
  page: {},
  container: {
    padding: '0 0 0 68px',
  },
  item: {
    paddingBottom: '33px',
  },
  section: {
    margin: '40px 0 120px 0',
    maxWidth: 'calc(45% - 20px)',
  },
  rightSection: {
    margin: '40px 0 120px 0',
    maxWidth: 'calc(45% - 20px) !important',
    paddingRight: '0px !important',
    marginRight: '0px',
  },
  label: {
    color: '#27424E',
    fontSize: '16px',
    fontWeight: '700',
    fontFamily: 'Open Sans',
    lineHeight: '22px',
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  value: {
    fontSize: '16px',
    fontWeight: '400',
    fontFamily: 'Open Sans',
    lineHeight: '22px',
    textAlign: 'left',
    paddingLeft: '40px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
  number: {
    textAlign: 'right',
  },
  numberLabel: {
    textAlign: 'right',
    color: '#27424E',
    fontSize: '15px',
    fontWeight: '700',
    lineHeight: '11px',
    letterSpacing: '-0.02em',
  },
  divider: {
    height: '277px',
    borderLeft: '7px solid #76C4E4',
    marginLeft: '14px',
    marginRight: '20px',
    marginTop: '100px',
    float: 'left',
  },
  divider2: {
    borderLeft: '2px solid #76C4E4',
    height: '100%',
    marginLeft: '20px',
    marginRight: '20px',
  },
}));

/**
 * DataCollection component that displays data collection categories and their assessment status
 */
const DataCollection = ({ data }) => {
  const classes = useStyles();
  const [modelData, setModelData] = useState(null);
  const [error, setError] = useState(null);

  // Memoized category calculations
  const { categoriesArray, leftCategories, rightCategories, counts } = useMemo(() => {
    if (!modelData) return { categoriesArray: [], leftCategories: [], rightCategories: [], counts: { nonZeroCount: 0, totalCategories: 0 } };

    const categoriesArray = extractCategoryItemsCount(modelData);
    const splitIndex = findOptimalSplit(categoriesArray);
    const counts = calculateAnnotationCounts(modelData, data);

    return {
      categoriesArray,
      leftCategories: categoriesArray.slice(0, splitIndex),
      rightCategories: categoriesArray.slice(splitIndex),
      counts
    };
  }, [modelData, data]);

  useEffect(() => {
    const fetchModelData = async () => {
      try {
        const response = await axios.get(YAML_URL);
        const parsedData = yaml.load(response.data);
        setModelData(parsedData);
      } catch (error) {
        console.error('Error fetching model data:', error);
        setError('Failed to load model data. Please try again later.');
      }
    };

    fetchModelData();
  }, []);

  // Memoize render functions to prevent unnecessary recalculations
  const renderCategoryItems = useMemo(() => (items, data) =>
    items.map((item, index) => {
      const matchingData = data.find(d => d.data_collection_category === item);
      const annotationCount = matchingData?.data_collection_category_annotation_count || 0;
      return (
        <Grid container key={index}>
          <Grid item xs={12} sm={10} md={10}>
            <Typography className={classes.value}>{item}</Typography>
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
            <Typography className={classes.number}>{annotationCount}</Typography>
          </Grid>
        </Grid>
      );
    }), [classes]);

  const renderCategories = useMemo(() => (categories, data) =>
    categories.map((category, index) => (
      <div key={index} className={classes.item}>
        <Grid container>
          <Grid item xs={12} sm={4} md={4}>
            <Typography className={classes.label}>{category.categoryName}</Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={8}>
            {renderCategoryItems(category.items, data)}
          </Grid>
        </Grid>
      </div>
    )), [classes, renderCategoryItems]);

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  if (!modelData) {
    return (
      <Typography align="center">
        Loading data...
      </Typography>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.page}>
        <Grid container className={classes.container} spacing={3}>
          <Grid item xs={12} sm={6} className={classes.section}>
            <div className={classes.item}>
              <Grid container>
                <Grid item xs={12} sm={4} md={4}>
                  <Typography className={classes.label}>Number of Data collection categories</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                  <Typography className={classes.value}>
                    <span style={{ color: '#27424E', fontWeight: '600' }}>{counts.nonZeroCount} </span>
                    (out of {counts.totalCategories} possible)
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <div className={classes.column}>
              <Grid container>
                <Grid item xs={12} sm={4} md={4}></Grid>
                <Grid item xs={12} sm={8} md={8}>
                  <Grid container>
                    <Grid item xs={12} sm={9} md={9}></Grid>
                    <Grid item xs={12} sm={3} md={3}>
                      <Typography className={classes.numberLabel}>Assessed</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
            {renderCategories(leftCategories, data)}
          </Grid>
          <Grid item xs={1}>
            <div className={classes.divider2}></div>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.rightSection}>
            <div className={classes.column}>
              <Grid container>
                <Grid item xs={12} sm={4} md={4}></Grid>
                <Grid item xs={12} sm={8} md={8}>
                  <Grid container>
                    <Grid item xs={12} sm={9} md={9}></Grid>
                    <Grid item xs={12} sm={3} md={3}>
                      <Typography className={classes.numberLabel}>Assessed</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
            {renderCategories(rightCategories, data)}
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

DataCollection.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    data_collection_category: PropTypes.string.isRequired,
    data_collection_category_annotation_count: PropTypes.number
  })).isRequired
};

export default DataCollection;
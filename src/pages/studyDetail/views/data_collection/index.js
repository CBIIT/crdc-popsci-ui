import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  makeStyles,
  createTheme,
  ThemeProvider
} from '@material-ui/core';
import DataCollected from './data_collection.json';

const theme = createTheme();

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
    fontSize: '11px',
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

const DataCollection = ({ data }) => {
  const classes = useStyles();

  const [leftCategories, setLeftCategories] = useState([]);
  const [rightCategories, setRightCategories] = useState([]);
  const [nonZeroAnnotationCount, setNonZeroAnnotationCount] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(0);


  useEffect(() => {
    const distributeCategories = () => {
      const categoryItemsCount = DataCollected.data_collected.map(category => {
        const categoryName = Object.keys(category)[0];
        return {
          categoryName,
          items: category[categoryName],
          count: category[categoryName].length,
        };
      });

      let leftCount = 0;
      let rightCount = categoryItemsCount.reduce((acc, category) => acc + category.count, 0);
      let splitIndex = 0;
      let minDifference = rightCount;

      for (let i = 0; i < categoryItemsCount.length; i++) {
        leftCount += categoryItemsCount[i].count;
        rightCount -= categoryItemsCount[i].count;

        const difference = Math.abs(leftCount - rightCount);
        if (difference < minDifference) {
          minDifference = difference;
          splitIndex = i + 1;
        }
      }

      setLeftCategories(categoryItemsCount.slice(0, splitIndex));
      setRightCategories(categoryItemsCount.slice(splitIndex));
    };

    distributeCategories();

    const countNonZeroAnnotations = () => {
      let nonZeroCount = 0;
      let totalCount = 0;

      DataCollected.data_collected.forEach(category => {
        const categoryName = Object.keys(category)[0];
        category[categoryName].forEach(item => {
          totalCount++;
          const matchingData = data.find(d => d.data_collection_category === item);
          if (matchingData && matchingData.data_collection_category_annotation_count > 0) {
            nonZeroCount++;
          }
        });
      });

      setNonZeroAnnotationCount(nonZeroCount);
      setTotalItemsCount(totalCount);
    };
    countNonZeroAnnotations();

  }, [data]);

  const renderCategoryItems = (items, data) =>
    items.map((item, index) => {
      const matchingData = data.find(d => d.data_collection_category === item);
      const annotationCount = matchingData ? (matchingData.data_collection_category_annotation_count || 0) : 0;
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
    });

  const renderCategories = (categories, data) =>
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
    ));

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
                    <span style={{ color: '#27424E', fontWeight: '600' }}>{nonZeroAnnotationCount} </span>(out of {totalItemsCount} possible)
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
                      <Typography className={classes.numberLabel}>Number of Variables</Typography>
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
                      <Typography className={classes.numberLabel}>Number of Variables</Typography>
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

export default DataCollection;
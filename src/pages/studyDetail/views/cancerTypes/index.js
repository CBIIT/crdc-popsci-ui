import React, { useState, useMemo } from 'react';
import {
  Box,
  FormControlLabel,
  Grid,
  Radio as MuiRadio,
  RadioGroup,
  Typography,
  withStyles,
} from '@material-ui/core';
import OverviewThemeProvider from './theme';
import styles from './style';
import SortControls from '../../common/SortControls';
import ResponsiveColumnList from './ResponsiveColumnList';
import { compareStringsWithFallback, getSafeString } from '../../common/utils';

/** Static fallback data for each view */
const mockData = {
  PrimaryDiseaseSite: [
    { term: "Benign Cellular Infiltrate", participantCount: 63 },
    { term: "Benign Neoplasm", participantCount: 103 },
    { term: "Carcinoma In Situ", participantCount: 325 },
    { term: "Carcinomatosis", participantCount: 98 },
    { term: "Clear Cell Neoplasm", participantCount: 2 },
    { term: "Combined Small Cell Lung Carcinoma", participantCount: 56 },
    { term: "Glass Cell Carcinoma", participantCount: 43 },
    { term: "Large Cell Carcinoma", participantCount: 1 },
    { term: "Large Cell Neuroendocrine Carcinoma", participantCount: 5 },
    { term: "Large Cell Carcinoma with Rhabdoid Phenotype", participantCount: 41 },
    { term: "Metastatic Carcinoma", participantCount: 7 },
    { term: "Malignant Cell", participantCount: 854 },
    { term: "Malignant Giant Cell Neoplasm", participantCount: 32 },
    { term: "Malignant Neoplasm", participantCount: 854 },
    { term: "Malignant Neoplasm Uncertain Whether Primary or Metastatic", participantCount: 670 },
    { term: "Malignant Ovarian Clear Cell Tumor", participantCount: 341 },
    { term: "Malignant Spindle Cell Neoplasm", participantCount: 236 },
    { term: "Metastatic Neoplasm", participantCount: 43 },
    { term: "Neoplastic Cell", participantCount: 32 },
    { term: "Neoplasm, Uncertain Whether Benign or Malignant", participantCount: 1 },
    { term: "NUT Carcinoma", participantCount: 234 },
    { term: "Pleomorphic Carcinoma", participantCount: 78 },
    { term: "Undifferentiated Carcinoma with Osteoclast-Like Giant Cells", participantCount: 90 }
  ],
  ICDMorphology: [
    { code: "8000/0", term: "Benign Neoplasm", participantCount: 103 },
    { code: "8000/1", term: "Neoplasm, Uncertain Whether Benign or Malignant", participantCount: 1 },
    { code: "8000/6", term: "Metastatic Neoplasm", participantCount: 43 },
    { code: "8000/9", term: "Malignant Neoplasm Uncertain Whether Primary or Metastatic", participantCount: 670 },
    { code: "8001/0", term: "Benign Cellular Infiltrate", participantCount: 63 },
    { code: "8001/1", term: "Neoplastic Cell", participantCount: 32 },
    { code: "8003/3", term: "Malignant Cell", participantCount: 854 },
    { code: "8003/3", term: "Malignant Giant Cell Neoplasm", participantCount: 32 },
    { code: "8003/3", term: "Malignant Neoplasm", participantCount: 854 },
    { code: "8005/0", term: "Clear Cell Neoplasm", participantCount: 2 },
    { code: "8005/3", term: "Malignant Ovarian Clear Cell Tumor", participantCount: 341 },
    { code: "8010/2", term: "Carcinoma In Situ", participantCount: 325 },
    { code: "8010/6", term: "Metastatic Carcinoma", participantCount: 7 },
    { code: "8010/9", term: "Carcinomatosis", participantCount: 98 },
    { code: "8012/3", term: "Large Cell Carcinoma", participantCount: 1 },
    { code: "8013/3", term: "Large Cell Neuroendocrine Carcinoma", participantCount: 5 },
    { code: "8014/3", term: "Large Cell Carcinoma with Rhabdoid Phenotype", participantCount: 41 },
    { code: "8015/3", term: "Glass Cell Carcinoma", participantCount: 43 },
    { code: "8022/3", term: "Pleomorphic Carcinoma", participantCount: 78 },
    { code: "8023/3", term: "NUT Carcinoma", participantCount: 234 },
    { code: "8035/3", term: "Undifferentiated Carcinoma with Osteoclast-Like Giant Cells", participantCount: 90 },
    { code: "8045/3", term: "Combined Small Cell Lung Carcinoma", participantCount: 56 }
  ]
};

/** Styled radio used in the view switcher */
const CustomRadio = withStyles({
  root:    { color: '#136071', transform: 'scale(1.3)' },
  checked: { color: '#1D91AB' },
})((props) => <MuiRadio color="default" {...props} />);

/**
 * Render callback for each item in the ResponsiveColumnList
 * item {
    group
    group_code
    subjects
 * }
 */
const renderCancerType = (classes, item, idx, view) => {
  const {group, group_code, subjects} = item;

  const divKey = `${group_code || group}_${subjects}_${idx}`;

  return (
    <div key={divKey} className={classes.columnItem}>
      <span className={classes.term}>
        { view === 'ICDMorphology' && (<span className={classes.code}> { group_code }&nbsp;&nbsp;</span>) }
        {group}
      </span>
      <span className={classes.count}>({(subjects)})</span>
    </div>
  );
}
  

/**
 * Main component: toggles view and displays sorted cancer types
 */
const CancerTypes = ({ classes, data }) => {
  // Choose between API data or fallback
  const options = {
    PrimaryDiseaseSite:
      data.cancer_diagnosis_primary_site_collection ||
      mockData.PrimaryDiseaseSite,
    ICDMorphology:
      data.cancer_diagnosis_disease_morphology_collection ||
      mockData.ICDMorphology,
  };

  // Show error message if no cancer type data is available
  const noData =
    (!options ||
      (
        (!options.PrimaryDiseaseSite || options.PrimaryDiseaseSite.length === 0) &&
        (!options.ICDMorphology || options.ICDMorphology.length === 0)
      )
    );

  if (noData) {
    return (
      <div className={classes.detailContainer}>
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '300px' }}>
          <Grid item xs={12}>
            <Typography align="center">
              There are no cancer types available for this study
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }

  const [view, setView] = useState('PrimaryDiseaseSite');
  // view-scoped sort state
  const [sortState, setSortState] = useState({
    PrimaryDiseaseSite: { sortBy: 'alpha', direction: 'asc' },
    ICDMorphology:      { sortBy: 'alpha', direction: 'asc' },
  });

  const { sortBy, direction } = sortState[view];

  // Build sort options for the current view
  const SORT_OPTIONS = useMemo(() => {
    const base = [
      { key: 'alpha', label: 'Sort Alphabetically' },
      { key: 'count', label: 'Sort by Participant Count' },
    ];
    if (view === 'ICDMorphology') {
      base.push({ key: 'code', label: 'Sort by code' });
    }
    return base;
  }, [view]);

  // Sorting functions
  const comparators = {
    code: (a, b) => compareStringsWithFallback(getSafeString(a.group_code), getSafeString(b.group_code)),
    alpha: (a, b) => compareStringsWithFallback(getSafeString(a.group), getSafeString(b.group)),
    count: (a, b) => (a.subjects || 0) - (b.subjects || 0),
  };

  // Apply sorting and direction
  const cancerTypesTerms = useMemo(() => {
    const sorted = [...options[view]].sort(comparators[sortBy]);
    return direction === 'asc' ? sorted : sorted.reverse();
  }, [options, view, sortBy, direction]);

  const handleSortChange = (key) => {
    setSortState((s) => {
      const prev = s[view];
      if (key === prev.sortBy) {
        // toggle direction
        return {
          ...s,
          [view]: {
            sortBy: key,
            direction: prev.direction === 'asc' ? 'desc' : 'asc',
          },
        };
      }
      // new sort key, reset to asc
      return {
        ...s,
        [view]: { sortBy: key, direction: 'asc' },
      };
    });
  };

  const countLabel =
    view === 'PrimaryDiseaseSite'
      ? 'Primary Disease Sites'
      : 'ICD-0 Disease Morphologies';

  return (
    <OverviewThemeProvider>
      <div className={classes.detailContainer}>
        <Grid container>
          <Grid item xs={12} sm={12} className={classes.borderRight}>
            <div className={classes.scrollDiv}>
              <Grid container direction="row" className={classes.leftInnerContainer}>
                {/* View switcher */}
                <Grid item xs={12} className={classes.mainLabel}>
                  <span>View Cancer Type:</span>
                </Grid>
                <Grid item xs={12} className={classes.CancerTypeSwitch}>
                  <RadioGroup
                    name="Cancer Type Switch"
                    value={view}
                    onChange={(e) => setView(e.target.value)}
                    row
                  >
                    <FormControlLabel
                      value="PrimaryDiseaseSite"
                      control={<CustomRadio />}
                      label="by Primary Disease Site"
                      classes={{
                        root:  classes.radioButtonSpacing,
                        label: classes.CancerTypeLabel,
                      }}
                    />
                    <FormControlLabel
                      value="ICDMorphology"
                      control={<CustomRadio />}
                      label="by ICD-0 Disease Morphology"
                      classes={{ label: classes.CancerTypeLabel }}
                    />
                  </RadioGroup>
                </Grid>

                <Grid item xs={12} style={{ marginTop: 22 }} />
                
                {/* Count display */}
                <Grid item xs={12} className={classes.mainLabel}>
                  <span>Number of Cancer Types</span>
                </Grid>
                <Grid item xs={12} className={classes.NumCancerType}>
                  <span>
                    {cancerTypesTerms.length}
                    <span style={{ marginLeft: 10 }}>{countLabel}</span>
                  </span>
                </Grid>

                <Grid item xs={12} style={{ marginTop: 22 }} />
                
                {/* Sort controls */}
                <Grid item xs={12}>
                  <Box alignItems="center" display="flex" flexDirection="row" className={classes.mainLabel}>
                    <span>CANCER TYPES</span>
                    <SortControls
                      sortOptions={SORT_OPTIONS}
                      sortBy={sortBy}
                      direction={direction}
                      onSortChange={handleSortChange}
                    />
                  </Box>
                </Grid>
                
                {/* Responsive list */}
                <Grid item xs={12} className={classes.mainValue}>
                  <ResponsiveColumnList
                    classes={classes}
                    items={cancerTypesTerms}
                    renderItem={(item, idx) => renderCancerType(classes, item, idx, view)}
                  />
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </OverviewThemeProvider>
  );
};

export default withStyles(styles, { withTheme: true })(CancerTypes);

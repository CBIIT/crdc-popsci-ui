import React, { useState, useEffect } from 'react';
import {
  FormControlLabel,
  Grid,
  Radio as MuiRadio,
  RadioGroup,
  withStyles,
} from '@material-ui/core';
import OverviewThemeProvider from './theme';
import styles from './style';

const NeoplasmGrid = ({ classes, diseaseTerms }) => {
  const numRows = 10;
  const numColumns = Math.ceil(diseaseTerms.length / numRows);
  const columns = Array.from({ length: numColumns }, () => []);

  diseaseTerms.forEach((item, index) => {
    const colIndex = Math.floor(index / numRows);
    columns[colIndex].push(item);
  });

  return (
    <div className={classes.gridContainer}>
      {columns.map((column, colIndex) => (
        <div key={colIndex}>
          {column.map((item, index) => (
            <div key={`${item.code || item.term}_${index}`} className={classes.neoplasmText}>
              {item.code && <span className={classes.code}>{item.code}</span>}
              <span className={classes.term}>{item.term}</span>
              <span className={classes.count}>({item.participantCount})</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const NeoplasmGridStyled = withStyles(styles)(NeoplasmGrid);

const icd_morphology_terms_static = [
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
];

const cancerTypesByDiseaseMorphology = async () => {
  //API call for cancerTypesByDiseaseMorphology
  //temp array for formatting
  return icd_morphology_terms_static;
};

const CancerTypes = ({ classes, data }) => {
  const {
    primary_diagnosis_disease_term = [],
    primary_diagnosis_disease_term_test = [
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
    icd_morphology_terms = icd_morphology_terms_static,
  } = data;

  const [value, setValue] = useState('PrimaryDiseaseSite');
  const [morphologyTerms, setMorphologyTerms] = useState([]);

  useEffect(() => {
    if (value === 'ICDMorphology') {
      cancerTypesByDiseaseMorphology().then(setMorphologyTerms);
    }
  }, [value]);

  function removeNonAlphabeticForSort(str) {
    return str.replace(/[^a-zA-Z\s]/g, '').trim();
  }

  const CustomRadio = withStyles({
    root: {
      color: '#136071',
      transform: 'scale(1.3)',
    },
    checked: {
      color: '#1D91AB',
    },
  })((props) => <MuiRadio color="default" {...props} />);

  const TabChanger = value === 'PrimaryDiseaseSite';
  const terms = TabChanger
    ? primary_diagnosis_disease_term_test
    : morphologyTerms.length > 0
      ? morphologyTerms
      : icd_morphology_terms;

  const uniqueTermsList = Array.from(
    new Map(terms.map(item => [`${item.code || ''}|${item.term}`, item])).values()
  ).sort((a, b) => {
    const cleanA = a.term.replace(/[^a-zA-Z\s]/g, '').trim();
    const cleanB = b.term.replace(/[^a-zA-Z\s]/g, '').trim();
    return cleanA.localeCompare(cleanB);
  });

  const count = uniqueTermsList.length;
  const countLabel = TabChanger
    ? 'Primary Disease Sites'
    : 'ICD-0 Disease Morphologies';

  const handleChange = async (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (newValue === 'ICDMorphology') {
      const data = await cancerTypesByDiseaseMorphology();
      setMorphologyTerms(data);
    }
  };

  return (
    <OverviewThemeProvider>
      <div className={classes.detailContainer}>
        <Grid container>
          <Grid item xs={12} sm={12} className={classes.borderRight}>
            <div className={classes.scrollDiv}>
              <Grid container direction="row" className={classes.leftInnerContainer}>
                <Grid item xs={12} className={classes.mainLabel}>
                  <span>View Cancer Type:</span>
                </Grid>
                <Grid item xs={12} className={classes.CancerTypeSwitch}>
                  <RadioGroup
                    name="Cancer Type Switch"
                    value={value}
                    onChange={handleChange}
                    row
                  >
                    <FormControlLabel 
                      value="PrimaryDiseaseSite" 
                      control={<CustomRadio/>} 
                      label="by Primary Disease Site"
                      classes={{
                        root: classes.radioButtonSpacing,
                        label: classes.CancerTypeLabel
                      }}
                    />
                    <FormControlLabel 
                      value="ICDMorphology" 
                      control={<CustomRadio/>} 
                      label="by ICD-0 Disease Morphology"
                      classes={{ label: classes.CancerTypeLabel }}
                    />
                  </RadioGroup>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 22 }} />
                <Grid item xs={12} className={classes.mainLabel}>
                  <span>Number of Cancer Types</span>
                </Grid>
                <Grid item xs={12} className={classes.NumCancerType}>
                  <span>
                    {count}
                    <span style={{ marginLeft: 10 }}>{countLabel}</span>
                  </span>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 22 }} />
                <Grid item xs={12} className={classes.mainLabel}>
                  <span>CANCER TYPES</span>
                </Grid>
                <Grid item xs={12} className={classes.mainValue}>
                  <NeoplasmGridStyled diseaseTerms={uniqueTermsList} />
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

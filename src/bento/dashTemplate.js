import React from 'react';
import { sortType, InputTypes } from '@bento-core/facet-filter';
import { DEFAULT_VALUE } from './siteWideConfig';
import reset_icon from '../assets/dash/resetIcon.svg'
import { Box, Typography } from '@material-ui/core';

const Studies = 'Filter by Studies';
const Participants = 'Filter by Participants';
const GROUP = 'group';

// --------------- Facet resetIcon link configuration --------------
// Ideal size for resetIcon is 16x16 px
export const resetIcon = {
  src: reset_icon,
  alt: 'Reset icon',
  size: '12 px',
};

// --------------- Dashboard Sidebar Sections styling --------------
export const facetSectionVariables = {
  'Filter by Studies': {
    isExpanded: true,
    hasSearch: false,
    hasArrowDropDownIcon: false,
  },
  'Filter by Participants': {
    isExpanded: true,
    hasArrowDropDownIcon: false,
  },
};

const CustomLowerUpperBound = (props) => {
  const {minLowerBound, maxUpperBound, classes} = props
  return (
    <Box className={classes.lowerUpperBound}>
    <Typography className={classes.lowerBound}>
      {minLowerBound}
    </Typography>
    <Typography className={classes.upperBound}>
      {maxUpperBound >= new Date().getFullYear() ? 'ongoing' : maxUpperBound}
    </Typography>
  </Box>
  )
}

const CustomSliderValue = (props) => {
  const {sliderValue, minLowerBound, maxUpperBound, isValid, quantifier, classes} = props
  if (sliderValue[0] > minLowerBound || sliderValue[1] < maxUpperBound) {
    return (
      <Typography
        className={isValid() ? classes.sliderText : classes.invalidSliderText}
      >
        {sliderValue[0]}
        {' - '}
        {sliderValue[1] >= new Date().getFullYear() ? 'ongoing' : sliderValue[1]}
        &nbsp;
        {quantifier}
      </Typography>
    );
  }
  return null;
}

export const facetsConfig = [
  {
    section: Studies,
    label: 'Study Acronym',

    apiPath: 'studyCountByStudy',
    apiForFiltering: 'filterStudyCountByStudy',
    datafield: 'study_short_name',
    
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
    defaultValue: DEFAULT_VALUE,
    customCount: () => '', // Hide Study Acronym facet count
  },
  {
    section: Studies,
    label: 'Study Type',

    apiPath: 'studyCountByStudyType',
    apiForFiltering: 'filterStudyCountByStudyType',
    datafield: 'study_type',

    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: false,
    facetClasses: {
      border: '10px solid red'
    },
    defaultValue: DEFAULT_VALUE,
  },
  {
    section: Studies,
    label: 'Study Design',
    apiPath: 'studyCountByStudyDesign',
    apiForFiltering: 'filterStudyCountByStudyDesign',
    datafield: 'study_design',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
    defaultValue: DEFAULT_VALUE,
  },
  {
    section: Studies,
    label: 'Enrollment Period',
    apiPath: 'enrollmentPeriod',
    apiForFiltering: 'enrollmentPeriod',
    datafield: 'enrollment_year',

    ApiLowerBoundName: 'lowerBound',
    ApiUpperBoundName: 'upperBound',
    show: true,
    slider: true,
    type: InputTypes.SLIDER,
    sort_type: 'none',
    CustomLowerUpperBound: CustomLowerUpperBound,
    CustomSliderValue: CustomSliderValue,
    
    // minLowerBound: 1970,
    // maxUpperBound: 2021,
    // quantifier: 'Years',
  }, 
  {
    section: Studies,
    label: 'Study Period',
    apiPath: 'studyPeriod',
    apiForFiltering: 'studyPeriod',
    datafield: 'study_year',
    ApiLowerBoundName: 'lowerBound',
    ApiUpperBoundName: 'upperBound',
    show: true,
    slider: true,
    type: InputTypes.SLIDER,
    sort_type: 'none',
    CustomLowerUpperBound: CustomLowerUpperBound,
    CustomSliderValue: CustomSliderValue,
  },
  {
    section: Studies,
    label: 'Number of Participants',
    apiPath: 'studyCountByNumberOfParticipants',
    apiForFiltering: 'studyCountByNumberOfParticipants', 
    datafield: 'number_of_participants',
    ApiLowerBoundName: 'lowerBound',
    ApiUpperBoundName: 'upperBound',
    show: true,
    slider: true,
    type: InputTypes.SLIDER,
    sort_type: 'none',
  },
  {
    section: Studies,
    label: 'Neoplasms',
    apiPath: 'studyCountByNeoplasm',
    apiForFiltering: 'filterStudyCountByNeoplasm',
    datafield: 'primary_diagnosis_disease_term',

    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
    defaultValue: DEFAULT_VALUE,
  },
  {
    section: Studies,
    label: 'Countries',
    apiPath: 'studyCountByCountries',
    apiForFiltering: 'filterStudyCountByCountries',
    datafield: 'study_country',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
    defaultValue: DEFAULT_VALUE,
  },
  {
    section: Studies,
    label: 'Biospecimen Collection',
    apiPath: 'studyCountByBiospecimenCollection',
    apiForFiltering: 'filterStudyCountByBiospecimenCollection',
    datafield: 'biospecimen_collection',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
    defaultValue: DEFAULT_VALUE,
  },

  {
    section: Participants,
    label: 'Age at Enrollment',
    apiPath: 'ageAtEnrollment',
    apiForFiltering: 'ageAtEnrollment', 
    datafield: 'study_participant_age',
    ApiLowerBoundName: 'lowerBound',
    ApiUpperBoundName: 'upperBound',
    show: true,
    slider: true,
    type: InputTypes.SLIDER,
    sort_type: 'none',
  },
  {
    section: Participants,
    label: 'Race',
    apiPath: 'studyCountByRace',
    apiForFiltering: 'filterStudyCountByRace',
    datafield: 'races',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
    defaultValue: DEFAULT_VALUE,
  },
  {
    section: Participants,
    label: 'Ethnicity',
    apiPath: 'studyCountByEthnicity',
    apiForFiltering: 'filterStudyCountByEthnicity',
    datafield: 'ethnicities',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
    defaultValue: DEFAULT_VALUE,
  },
  {
    section: Participants,
    label: 'Sex',
    apiPath: 'studyCountBySex',
    apiForFiltering: 'filterStudyCountBySex',
    datafield: 'sexes',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
    defaultValue: DEFAULT_VALUE,
  },
];

// --------------- Dashboard Widgets configuration --------------
// Sunburst chart color scheme
export const SUNBURST_COLORS_LEVEL_1 = [
  '#0A8B8B',
  '#6AC6B6',
  '#C33B27',
  '#FDB915',
  '#381F5F',
  '#007EA5',
  '#8B5996',
];

export const SUNBURST_COLORS_LEVEL_2 = [
  '#8B5996',
  '#6AC6B6',
  '#007EA5',
  '#C33B27',
  '#FDB915',
  '#381F5F',
  '#007EA5',
  '#0A8B8B',
];

// A maximum of 6 widgets are allowed
// for donuts only the following are required: type, title, dataName
//
// type: 'sunburst' | 'donut'
// title: string
// dataName: string
// datatable_level1_field: string
// datatable_level1_colors: string[]
// datatable_level2_field: string
// datatable_level2_colors: string[]
// sliceTitle: string (optional)
export const widgetConfig = [
  {
    type: 'donut',
    title: 'Studies: Participant Count',
    sliceTitle: "Participants",
    dataName: 'globalStatsBar',
  },
  {
    type: 'donut',
    title: 'Study Design',
    sliceTitle: "Studies",
    dataName: 'studyCountByStudyDesign',
  },
  {
    type: 'donut',
    title: 'Studies: Neoplasm Count',
    sliceTitle: "Neoplasms",
    dataName: 'neoplasmCountByStudy',
  }
];

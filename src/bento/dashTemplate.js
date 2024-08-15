import { sortType, InputTypes } from '@bento-core/facet-filter';
import { DEFAULT_VALUE } from './siteWideConfig';

const Studies = 'Filter by Studies';
const Participants = 'Filter by Participants';
const GROUP = 'group';

// --------------- Facet resetIcon link configuration --------------
// Ideal size for resetIcon is 16x16 px
export const resetIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg',
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
  // TODO: Slider
  {
    section: Studies,
    label: 'Enrollment Period',

    // ************ lowerBound
    /* apiPath: 'enrollmentPeriodMin',
    apiForFiltering: 'enrollmentPeriodMin',
    datafield: 'enrollment_beginning_year', */

    // ************ upperBound
    // apiPath: 'enrollmentPeriodMax',
    // apiForFiltering: 'enrollmentPeriodMax',
    // datafield: 'enrollment_ending_year',

    ApiLowerBoundName: 'lowerBound',
    ApiUpperBoundName: 'upperBound',
    show: true,
    // slider: true,
    // type: InputTypes.SLIDER,
    type: InputTypes.CHECKBOX,
    sort_type: 'none',
    minLowerBound: 0,
    maxUpperBound: 100,
    // quantifier: 'Years',
  }, 

  // TODO: Slider
  {
    section: Studies,
    label: 'Study Period',

    // ************ lowerBound
    /* apiPath: 'studyPeriodMin',
    apiForFiltering: 'studyPeriodMin',
    datafield: 'study_beginning_year', */

    // ************ upperBound
    // apiPath: 'studyPeriodMax',
    // apiForFiltering: 'studyPeriodMax', 
    // datafield: 'study_ending_year',

    ApiLowerBoundName: 'lowerBound',
    ApiUpperBoundName: 'upperBound',
    show: true,
    // slider: true,
    // type: InputTypes.SLIDER,
    type: InputTypes.CHECKBOX,
    sort_type: 'none',
    minLowerBound: 0,
    maxUpperBound: 100,
    // quantifier: 'Years',
  },
    // TODO: Slider
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
    // minLowerBound: 0,
    // maxUpperBound: 100,
    // quantifier: 'Years',
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

    // ************ lowerBound
    /* apiPath: 'participantAgeAtEnrollmentMin',
    apiForFiltering: 'participantAgeAtEnrollmentMin', 
    datafield: 'study_participant_minimum_age', */

    // ************ upperBound
    // apiPath: 'participantAgeAtEnrollmentMax',
    // apiForFiltering: 'participantAgeAtEnrollmentMax',
    // datafield: 'study_participant_maximum_age',

    ApiLowerBoundName: 'lowerBound',
    ApiUpperBoundName: 'upperBound',

    show: true,

    // slider: true,
    // type: InputTypes.SLIDER,
    type: InputTypes.CHECKBOX,

    sort_type: 'none',
    minLowerBound: 0,
    maxUpperBound: 100,
    // quantifier: 'Years',
  },

  {
    section: Participants,
    label: 'Race Representation',
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
    label: 'Ethnic Representation',
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
    label: 'Sex Representation',
    apiPath: 'studyCountBySex',
    apiForFiltering: 'filterStudyCountBySex',
    datafield: 'sexes',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
    defaultValue: DEFAULT_VALUE,
  },
  {
    section: Participants,
    label: 'Gender Representation',
    apiPath: 'studyCountByGender',
    apiForFiltering: 'filterStudyCountByGender',
    datafield: 'genders',
    field: GROUP,
    type: InputTypes.CHECKBOX,
    sort_type: sortType.ALPHABET,
    show: true,
    defaultValue: DEFAULT_VALUE,
  }
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
    title: 'Studies',
    sliceTitle: "Participants",
    dataName: 'studyCountByNeoplasm', // TODO: Need API to count based on  version study_short_name or other
  },
 
  {
    type: 'donut',
    title: 'Primary Diagnoses',
    sliceTitle: "Studies",
    dataName: 'studyCountByNeoplasm',
  },
  {
    type: 'donut',
    title: 'Data Collection Categories',
    sliceTitle: "Studies",
    dataName: 'studyCountByDataCollection',
  }
];

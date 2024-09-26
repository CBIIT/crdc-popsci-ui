import gql from 'graphql-tag';
import dataVolumeIcon from '../assets/stats/data_volume_icon.svg';
import studiesIcon from '../assets/stats/studies_icon.svg';
import participantsIcon from '../assets/stats/participants_icon.svg';
import neoplasmsIcon from '../assets/stats/neoplasms_icon.svg';
import dataCategoriesIcon from '../assets/stats/data_categories_icon.svg';
import studyFilesIcon from '../assets/stats/study_files_icon.svg';
import { formatFileSize, formatAsCommaSeparatedNumber } from '../components/Stats/utils';

export const statsStyling = {
  global: {
    horizontalStyle: false,
    statTitleFirst: false,
    background: '#9DD8F6',
  },
  statsGroup: {
    margin: '9.5px 27px 5.5px 0px',
    padding: '0px 27px 0px 0px',

    maxWidth: 'fit-content',
    minWidth: 'fit-content',
    borderRight: '1px solid #0B3556',
    maxHeight: '38px',
  },
  statsIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  statCount: {
    color: '#0B3556',
    fontFamily: 'Inter',
    fontSize: '17px',
    fontWeight: 600,
    lineHeight: '17px',

    width: 'fit-content',
    margin: '0px 0px 0px 8px',
    float: 'left',
  },
  statTitle: {
    color: '#0B3556',
    fontFamily: 'Poppins',
    fontSize: '14px',
    fontWeight: 300,
    lineHeight: '21px',

    textTransform: 'none',
    margin: '0px 0px 0px 8px',
    float: 'left',
    width: 'fit-content',
  },
};

export const globalStatsData = [
  // A maximum of 7 stats are allowed
  {
    statTitle: 'Data Volume',
    type: 'field',
    statAPI: 'dataVolume', // searchStudies
    statIconSrc: dataVolumeIcon,
    statIconAlt: 'Data Volume Stats Bar Icon',
    formatValue: formatFileSize,
  },
  {
    statTitle: 'Studies',
    type: 'field',
    statAPI: 'numberOfStudies',
    statIconSrc: studiesIcon,
    statIconAlt: 'Studies Stats Bar Icon',
    formatValue: formatAsCommaSeparatedNumber,
  },
  {
    statTitle: 'Participants',
    type: 'field',
    statAPI: 'number_of_participants', // globalStatsBar
    statIconSrc: participantsIcon,
    statIconAlt: 'Participants Stats Bar Icon',
    formatValue: formatAsCommaSeparatedNumber,
  },
  {
    statTitle: 'Neoplasms',
    type: 'field',
    statAPI: 'numberOfDiagnosis',
    statIconSrc: neoplasmsIcon,
    statIconAlt: 'Neoplasms Stats Bar Icon',
    formatValue: formatAsCommaSeparatedNumber,
  },
  {
    statTitle: 'Data Categories',
    type: 'field',
    statAPI: 'numberOfDataCollectionCatagory',
    statIconSrc: dataCategoriesIcon,
    statIconAlt: 'Data Categories Stats Bar Icon',
    formatValue: formatAsCommaSeparatedNumber,
  },
  {
    statTitle: 'Study Files',
    type: 'field',
    statAPI: 'numberOfDataFiles',
    statIconSrc: studyFilesIcon,
    statIconAlt: 'Study Files Stats Bar Icon',
    formatValue: formatAsCommaSeparatedNumber,
  }
];

export const GET_GLOBAL_STATS_DATA_QUERY = gql`

  query search(
    $study_short_name: [String]
    $study_type: [String] # Hidden for now
    $study_design: [String]
    $enrollment_beginning_year: [Int]
    $enrollment_ending_year: [Int]
    $study_beginning_year: [Int]
    $study_ending_year: [Int]
    $number_of_participants: [Int]
    $primary_diagnosis_disease_term: [String]
    $study_country: [String]
    $biospecimen_collection: [String]
    $study_participant_maximum_age: [Float]
    $study_participant_minimum_age: [Float]
    $races: [String]
    $ethnicities: [String]
    $sexes: [String]
    $genders: [String]
  ) {
    searchStudies(
      study_short_name: $study_short_name
      study_type: $study_type # Hidden for now
      study_design: $study_design
      enrollment_beginning_year: $enrollment_beginning_year
      enrollment_ending_year: $enrollment_ending_year
      study_beginning_year: $study_beginning_year
      study_ending_year: $study_ending_year
      number_of_participants: $number_of_participants
      primary_diagnosis_disease_term: $primary_diagnosis_disease_term
      study_country: $study_country
      biospecimen_collection: $biospecimen_collection
      study_participant_maximum_age: $study_participant_maximum_age
      study_participant_minimum_age: $study_participant_minimum_age
      races: $races
      ethnicities: $ethnicities
      sexes: $sexes
      genders: $genders
    ) {
        dataVolume
        numberOfStudies
        numberOfDataCollectionCatagory
        numberOfDiagnosis
        numberOfDataFiles
      }
    globalStatsBar(
      study_short_name: $study_short_name
      study_type: $study_type # Hidden for now
      study_design: $study_design
      enrollment_beginning_year: $enrollment_beginning_year
      enrollment_ending_year: $enrollment_ending_year
      study_beginning_year: $study_beginning_year
      study_ending_year: $study_ending_year
      number_of_participants: $number_of_participants
      primary_diagnosis_disease_term: $primary_diagnosis_disease_term
      study_country: $study_country
      biospecimen_collection: $biospecimen_collection
      study_participant_maximum_age: $study_participant_maximum_age
      study_participant_minimum_age: $study_participant_minimum_age
      races: $races
      ethnicities: $ethnicities
      sexes: $sexes
      genders: $genders
    ) {
        study_short_name
        number_of_participants
      }
    }
`;
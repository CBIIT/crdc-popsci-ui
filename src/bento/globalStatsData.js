import gql from 'graphql-tag';
import dataVolumeIcon from '../assets/stats/data_volume_icon.svg';
import studiesIcon from '../assets/stats/studies_icon.svg';
import participantsIcon from '../assets/stats/participants_icon.svg';
import neoplasmsIcon from '../assets/stats/neoplasms_icon.svg';
import dataCategoriesIcon from '../assets/stats/data_categories_icon.svg';
import studyFilesIcon from '../assets/stats/study_files_icon.svg';

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
    statAPI: 'numberOfStudies',
    // statAPI: 'data_file_total_size', // studyGeneral
    statIconSrc: dataVolumeIcon,
    statIconAlt: 'Data Volume Stats Bar Icon',
  },
  {
    statTitle: 'Studies',
    type: 'field',
    statAPI: 'numberOfStudies',
    // statAPI: 'numberOfStudies',
    statIconSrc: studiesIcon,
    statIconAlt: 'Studies Stats Bar Icon',
  },
  {
    statTitle: 'Participants',
    type: 'field',
    statAPI: 'numberOfParticipants',
    // statAPI: 'number_of_participants', // studyGeneral
    statIconSrc: participantsIcon,
    statIconAlt: 'Participants Stats Bar Icon',
  },
  {
    statTitle: 'Neoplasms',
    type: 'field',
    statAPI: 'numberOfDiagnoses',
    // statAPI: 'numberOfStudies',
    statIconSrc: neoplasmsIcon,
    statIconAlt: 'Neoplasms Stats Bar Icon',
  },
  {
    statTitle: 'Data Categories',
    type: 'field',
    statAPI: 'numberOfDiagnoses',
    // statAPI: 'numberOfDataCollectionCatagory',
    statIconSrc: dataCategoriesIcon,
    statIconAlt: 'Data Categories Stats Bar Icon',
  },
  {
    statTitle: 'Study Files',
    type: 'field',
    statAPI: 'numberOfFiles',
    // statAPI: 'numberOfDataFiles',
    statIconSrc: studyFilesIcon,
    statIconAlt: 'Study Files Stats Bar Icon',
  }
];



// --------------- GraphQL query - Retrieve stats details --------------
export const GET_GLOBAL_STATS_DATA_QUERY = gql`
  query search(
    $subject_id: [String],
    $ctep_disease_term: [String],
    $stage_of_disease: [String],
    $tumor_grade: [String], 
    $sex: [String], 
    $reported_gender: [String], 
    $race: [String], $ethnicity: [String],
    $carcinogen_exposure: [String], 
    $targeted_therapy: [String],
    $anatomical_collection_site: [String],
    $tissue_category: [String],
    $assessment_timepoint: [String],
    $data_file_type: [String],
    $data_file_format: [String]) {
    searchParticipants(
      subject_id: $subject_id
      ctep_disease_term: $ctep_disease_term
      stage_of_disease: $stage_of_disease
      tumor_grade: $tumor_grade
      sex: $sex
      reported_gender: $reported_gender
      race: $race
      ethnicity: $ethnicity
      carcinogen_exposure: $carcinogen_exposure
      targeted_therapy: $targeted_therapy
      anatomical_collection_site: $anatomical_collection_site
      tissue_category: $tissue_category
      assessment_timepoint: $assessment_timepoint
      data_file_type: $data_file_type
      data_file_format: $data_file_format
    ) {
        numberOfStudies
        numberOfParticipants
        numberOfDiagnoses
        numberOfTargetedTherapies
        numberOfSpecimens
        numberOfFiles
      }
    }
`;

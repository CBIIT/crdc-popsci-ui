import gql from 'graphql-tag';

export const statsStyling = {
  global: {
    horizontalStyle: false,
    statTitleFirst: false,
    background: '#9DD8F6',
  },
  statsGroup: {
    margin: '10px 0px',
    padding: '0.5% 6% 2% 6%',
    maxWidth: '250px',
    minWidth: '220px',
    borderRight: '1px solid #0B3556',
    height: '55px',
  },
  statsIcon: {
    width: '40px',
    height: '45px',
    margin: '2px 0px 0px -45px',
  },
  statCount: {
    color: '#0B3556',
    fontFamily: 'sans-serif',
    fontSize: '18px',
    margin: '0px 0px -4px 8px',
    float: 'left',
  },
  statTitle: {
    color: '#0B3556',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    textTransform: 'none',
    margin: '0px 0px 0px 8px',
    float: 'left',
  },
};

export const globalStatsData = [
  // A maximum of 7 stats are allowed
  {
    statTitle: 'Data Volume',
    type: 'field',
    statAPI: 'numberOfStudies',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Data_Vol_.svg',
    statIconAlt: 'Data Volume Stats Bar Icon',
  },
  {
    statTitle: 'Studies',
    type: 'field',
    statAPI: 'numberOfStudies',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Programs_.svg',
    // statIconSrc: '../assets/glo-icons/Programs.svg',
    statIconAlt: 'Study Files Stats Bar Icon',
  },
  {
    statTitle: 'PARTICIPANTS',
    type: 'field',
    statAPI: 'numberOfParticipants',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Studies_.svg',
    statIconAlt: 'Studies Stats Bar Icon',
  },
  {
    statTitle: 'Neoplasms',
    type: 'field',
    statAPI: 'numberOfDiagnoses',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Cases_.svg',
    statIconAlt: 'Studies Stats Bar Icon',
  },
  {
    statTitle: 'Data Categories',
    type: 'field',
    statAPI: 'numberOfDiagnoses',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/Samples_.svg',
    statIconAlt: 'Samples Stats Bar Icon',
  },
  {
    statTitle: 'Study Files',
    type: 'field',
    statAPI: 'numberOfFiles',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/CaseFiles_.svg',
    statIconAlt: 'Files Stats Bar Icon',
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

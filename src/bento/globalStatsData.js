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
    statAPI: 'data_file_total_size', // studyGeneral
    statIconSrc: dataVolumeIcon,
    statIconAlt: 'Data Volume Stats Bar Icon',
  },
  {
    statTitle: 'Studies',
    type: 'field',
    statAPI: 'numberOfStudies',
    statIconSrc: studiesIcon,
    statIconAlt: 'Studies Stats Bar Icon',
  },
  {
    statTitle: 'Participants',
    type: 'field',
    statAPI: 'number_of_participants', // studyGeneral
    statIconSrc: participantsIcon,
    statIconAlt: 'Participants Stats Bar Icon',
  },
  {
    statTitle: 'Neoplasms',
    type: 'field',
    statAPI: 'numberOfStudies',
    // statAPI: 'numberOfStudies', // TODO: Ask Adam to create stats for Neoplasms
    statIconSrc: neoplasmsIcon,
    statIconAlt: 'Neoplasms Stats Bar Icon',
  },
  {
    statTitle: 'Data Categories',
    type: 'field',
    statAPI: 'numberOfDataCollectionCatagory',
    statIconSrc: dataCategoriesIcon,
    statIconAlt: 'Data Categories Stats Bar Icon',
  },
  {
    statTitle: 'Study Files',
    type: 'field',
    statAPI: 'numberOfDataFiles',
    statIconSrc: studyFilesIcon,
    statIconAlt: 'Study Files Stats Bar Icon',
  }
];

export const GET_GLOBAL_STATS_DATA_QUERY = gql`

  query search($study_short_name: [String]) {
    searchSubjects(
      study_short_name: $study_short_name
      # TODO: Add more argument to be used for Explore
    ) {  
        numberOfStudies
        numberOfDataCollectionCatagory
        numberOfDiagnosis
        numberOfDataFiles
      }
    studyGeneral(
      study_short_name: $study_short_name
    ) {
        data_file_total_size
        number_of_participants
      }
    }
`;
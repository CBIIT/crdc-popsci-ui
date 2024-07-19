import gql from 'graphql-tag';
import studyHeaderIcon from '../assets/study/studyHeaderIcon.svg'
import externalLinkIcon from '../assets/externalLinkIcon.svg'
import previousIcon from '../assets/study/previousIcon.svg';
import { cellTypes, headerTypes } from '@bento-core/table';
// --------------- Tooltip configuration --------------
export const tooltipContent = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg',
  alt: 'tooltipIcon',
};

export const title = {
  studyFile: '',
  armsAndCohort: '',
};

export const headerIcon = studyHeaderIcon;
export const externalIcon = externalLinkIcon;
export const previousPageIcon = previousIcon;

export const GET_STUDY_DETAIL_DATA_QUERY = gql`
  query study($study_short_name: [String]){
    studyGeneral(study_short_name:$study_short_name) {
      study_name
      study_short_name
      study_description
      study_type
      study_design
      enrollment_period_start
      enrollment_period_end
      study_period_start
      study_period_end
      biospecimens_collected
      study_status
      study_gender
      dbGap_id
      associated_links
      number_of_participants
      max_age
      medium_age
      min_age
      study_race
      study_ethnicity
      study_sex
      country_list
      country_count
      state_list
      state_count
      primary_diagnosis_disease_term
      primary_diagnosis_disease_count

      study_personal {
        first_name
        middle_name
        last_name
        institution
        email
        person_role
      }

      study_publication {
        author
        title
        year
        journal
        doi
        pumID
      }

      study_files {
        file_name
        file_type
        description
        format
        size
      }

      study_links {
        associated_link_name
        associated_link_id
        associated_link_url
      }
    }
  }
`;


// --------------- Tabs Table configuration --------------
export const studyPersonnelTableConfig = {
  name: 'StudyPersonnel',
  dataField: 'participant_data_files',
  
  dataKey: 'email',
  defaultSortField: 'email',
  defaultSortDirection: 'asc',
  tableID: 'studyPersonnel_table',
  id: 'studyPersonnel_table',

  extendedViewConfig: {
    pagination: false, // Top pagination: true || false
    manageViewColumns: false, //{ title: "View Columns" },
    download: false // { downloadCsv: "Download Table Contents As CSV", downloadFileName: "CTDC_Participants_download",},
  },
  columns: [
    {
      dataField: 'first_name',
      header: 'Full Name',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
      cellType: cellTypes.CUSTOM_ELEM,
      customFullName: true, // Used to concatenate 'first_name', 'middle_name', 'last_name'
      headerType: headerTypes.CUSTOM_ELEM,
    },
    {
      dataField: 'institution',
      header: 'Institution',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'email',
      header: 'Email Address',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
      headerType: headerTypes.CUSTOM_ELEM,
    },
    {
      dataField: 'person_role',
      header: 'Position or Role',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
      headerType: headerTypes.CUSTOM_ELEM,
    },
  ],
};
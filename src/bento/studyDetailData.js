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
      study_id
      study_description
      study_type
      study_design
      enrollment_beginning_year
      enrollment_ending_year
      study_beginning_year
      study_ending_year
      biospecimen_collection
      study_status
      dbgap_accession_id
      number_of_participants
      study_participant_maximum_age
      study_participant_median_age
      study_participant_minimum_age
      race
      ethnicity
      sex
      gender
      study_country
      number_of_countries
      study_state_province_territory
      number_of_states_provinces_territories
      primary_diagnosis_disease_term
      primary_diagnosis_disease_count

      study_personnel {
        person_first_name
        person_middle_name
        person_last_name
        institution
        email_address
        person_role
      }

      study_publication {
        authorship
        publication_title
        year_of_publication
        journal_citation
        digital_object_id
        pubmed_id
        publication_record_id
      }

      data_file {
        data_file_name
        data_file_type
        data_file_description
        data_file_format
        data_file_size
      }

      associated_links {
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
  
  dataKey: 'email_address',
  defaultSortField: 'email_address',
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
      dataField: 'person_first_name',
      header: 'Full Name',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
      cellType: cellTypes.CUSTOM_ELEM,
      customFullName: true, // Used to concatenate 'person_first_name', 'person_middle_name', 'person_last_name'
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
      dataField: 'email_address',
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
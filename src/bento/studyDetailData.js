import gql from 'graphql-tag';
import { cellTypes, dataFormatTypes } from '@bento-core/table';
import studyHeaderIcon from '../assets/study/studyHeaderIcon.svg'
import externalLinkIcon from '../assets/externalLinkIcon.svg'
import previousIcon from '../assets/study/previousIcon.svg';
import openPadlockIcon from '../assets/study/openPadlockIcon.svg';
import lockedPadlockIcon from '../assets/study/lockedPadlockIcon.svg';

import directDownloadIcon from '../assets/study/directDownloadIcon.svg';
import cloudOnlyAccessIcon from '../assets/study/cloudOnlyAccessIcon.svg';
import questionMarkCircle from '../assets/Question_Mark_Circle.svg';

// --------------- Tooltip configuration --------------
export const tooltipContentForSelectedFile = {
  icon: questionMarkCircle,
  alt: 'tooltipIcon',
  arrow: false,
  DataFiles: 'Add selected files to My Files',
};

export const tooltipContentForAllFile = {
  icon: questionMarkCircle,
  alt: 'tooltipIcon',
  arrow: false,
  DataFiles: 'Add all files associated with this study to My Files'
};

export const title = {
  studyFile: '',
  armsAndCohort: '',
};

export const headerIcon = studyHeaderIcon;
export const externalIcon = externalLinkIcon;
export const previousPageIcon = previousIcon;

export const GET_STUDY_DETAIL_DATA_QUERY = gql`
  query study($study_short_name: [String]) {
    
    ## Data for Cancer Types tab
    primarySiteMorphology(study_short_name: $study_short_name) {
      study_short_name,
      cancer_diagnosis_disease_morphology_collection {
        group
        group_code
        subjects
      }
      cancer_diagnosis_primary_site_collection {
        group
        subjects
      }
    }

    # Study detail data for Demographics tab
    studyDemographics(study_short_name: $study_short_name) {
      study_short_name
      number_of_participants

      participant_maximum_age # PARTICIPANT AGE RANGE (years)
      participant_minimum_age # PARTICIPANT AGE RANGE (years)
      participant_age_range # PARTICIPANT AGE RANGE (years)
      participant_mean_age # MEAN PARTICIPANT AGE (years)
      participant_median_age # MEDIAN PARTICIPANT AGE (years)
      
      # Participants: Age at Enrollment
      participant_count_by_age {
        group
        subjects
      }

      # PARTICIPANT_RACES
      participant_races {
        group
        subjects
      }
      # PARTICIPANT ETHNICITIES
      participant_ethnicities {
        group
        subjects
      }
      # PARTICIPANT SEXES
      participant_sexes {
        group
        subjects
      } 
    }

    dataCollectionPage(study_short_name: $study_short_name) {
      study_short_name
      data_collection {
        data_collection_category
        data_collection_category_annotation_count
      }
    }

    studyGeneral(study_short_name: $study_short_name) {
      study_short_name

      personnel {
        person_first_name
        person_middle_name
        person_last_name
        institution
        email_address
        person_role
      }

      publication {
        authorship
        publication_title
        year_of_publication
        journal_citation
        digital_object_id
        pubmed_id
        publication_record_id
      }

      associated_links {
        associated_link_name
        associated_link_record_id
        associated_link_url
      }
    }

    studyFiles( study_short_name: $study_short_name) {
      data_file_uuid
      data_file_name
      data_file_type
      data_file_description
      data_file_format
      data_volume # data_file_size
      data_file_access_control
    }

    tabStudy(study_short_name: $study_short_name) {
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
      participant_age_range
      dbgap_accession_id
      number_of_participants
      study_participant_maximum_age
      study_participant_median_age
      study_participant_minimum_age
      race
      ethnicity
      sex
      study_country
      number_of_countries
      study_state_province_territory
      number_of_states_provinces_territories
      primary_diagnosis_disease_term # To be replaced with cancer_diagnosis_primary_site_list
      primary_diagnosis_disease_count
    }

    # Stats Bar property
    globalStatsBar(study_short_name: $study_short_name) {
      study_short_name
      number_of_participants
    }
    searchStudies(study_short_name: $study_short_name) {
      dataVolume
      numberOfStudies
      numberOfDataCollectionCatagory
      numberOfDiagnosis
      numberOfDataFiles
    }
    # end
  }
`;

export const GET_STUDY_DETAIL_DEMOGRAPHIC_DATA_QUERY = gql`
query studyDemo($study_short_name: [String]) {
  studyDemographics(study_short_name: $study_short_name) {
    number_of_participants
    
    participant_age_range
    participant_maximum_age # PARTICIPANT AGE RANGE (years)
    participant_minimum_age # PARTICIPANT AGE RANGE (years)
    participant_mean_age # MEAN PARTICIPANT AGE (years)
    participant_median_age # MEDIAN PARTICIPANT AGE (years)
    
    #Participants: Age at Enrollment
    participant_age_at_enrollment{
      group
      subjects
    }

    # PARTICIPANT_RACES
    participant_races {
      group
      subjects
    }
    # PARTICIPANT ETHNICITIES
    participant_ethnicities {
      group
      subjects
    }
    # PARTICIPANT SEXES
    participant_sexes {
      group
      subjects
    } 
  }
  
}
`;

// --------------- Tabs Table configuration --------------
export const studyPersonnelTableConfig = {
  name: 'StudyPersonnel',
  dataField: 'participant_data_files',
  
  dataKey: 'email_address',
  defaultSortField: 'person_first_name',
  defaultSortDirection: 'asc',
  tableID: 'studyPersonnel_table',
  id: 'studyPersonnel_table',

  extendedViewConfig: {
    pagination: false, // Top pagination: true || false
    manageViewColumns: false, //{ title: "View Columns" },
    download: false // { downloadCsv: "Download Table Contents As CSV", downloadFileName: "Study_Personnel_download",},
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
    },
    {
      dataField: 'institution',
      header: 'Institution',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'person_role',
      header: 'Position or Role',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
  ],
};


// --------------- GraphQL Query - "ADD SELECTED FILES" under Study Files tab ---------------
export const GET_FILE_IDS_FOR_SELECTED_FILES = gql`
  query studyFiles(
    $study_short_name: [String]
    $data_file_uuid: [String]
    $first: Int
    $offset: Int
    $order_by: String
    $sort_direction: String
  ) {
    studyFiles(
      study_short_name: $study_short_name
      data_file_uuid: $data_file_uuid
      first: $first
      offset: $offset
      order_by: $order_by
      sort_direction: $sort_direction
    ) {
      data_file_name
      data_file_uuid
    }
  }
`;


// --------------- GraphQL Query - "ADD ALL FILES" under Study Files tab ---------------
export const GET_ALL_FILE_IDS_FOR_FILES = gql`
  query studyFiles(
    $study_short_name: [String]
    $data_file_uuid: [String]
    $first: Int
    $offset: Int
    $order_by: String
    $sort_direction: String
  ) {
    studyFiles(
      study_short_name: $study_short_name
      data_file_uuid: $data_file_uuid
      first: $first
      offset: $offset
      order_by: $order_by
      sort_direction: $sort_direction
    ) {
      data_file_name
      data_file_uuid
    }
  }
`;

// --------------- Tabs Table configuration --------------
export const studyDataFileTableConfig = {
  name: 'DataFiles',
  dataField: 'participant_data_files',
  
  dataKey: 'data_file_uuid',
  defaultSortField: 'data_file_name',
  defaultSortDirection: 'asc',
  tableID: 'study_files_tab_table',
  id: 'study_files_tab',

  extendedViewConfig: {
    pagination: true, // Top pagination: true || false
    manageViewColumns: { title: "View Columns" },
    download: { downloadCsv: "Download Table Contents As CSV", downloadFileName: "Study_Files_download",},
  },
  columns: [
    {
      cellType: cellTypes.CHECKBOX,
      display: true,
      role: cellTypes.CHECKBOX,
    },
    {
      dataField: 'data_file_name',
      header: 'File Name',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'data_file_type',
      header: 'File Type',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'association',
      header: 'Association',
      display: false,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'data_file_description',
      header: 'Description',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'data_file_format',
      header: 'Format',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'data_file_size',
      header: 'Size',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,

      dataFormatType: dataFormatTypes.FORMAT_BYTES,
      cellType: cellTypes.FORMAT_DATA,
    },
    {
      dataField: 'data_file_access_control', // This need to left empty if no data need to be displayed before file download icon
      header: 'Access Control',
      display: true,
      cellType: cellTypes.CUSTOM_ELEM,
      accessControl: true,
      customCellProps: {
        openAccessTooltip: 'Open Access file',
        controlledAccessTooltip: 'Controlled Access file',
        openAccessIcon: openPadlockIcon,
        controlledAccessIcon: lockedPadlockIcon
      },
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'data_file_access_control', // This need to left empty if no data need to be displayed before file download icon
      header: 'File Delivery',
      display: true,
      cellType: cellTypes.CUSTOM_ELEM,
      fileDelivery: true,
      customCellProps: {
        openAccessTooltip: 'Download this file or add to cart using checkbox',
        controlledAccessTooltip: 'Available only via the Cloud; add to cart using checkbox',
        openAccessIcon: directDownloadIcon,
        controlledAccessIcon: cloudOnlyAccessIcon,
      },
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },

  ],

  selectableRows: true,
  tableMsg: {
    noMatch: 'No Matching Records Found',
  },

  addFilesRequestVariableKey: 'data_file_uuid',
  
  addFilesResponseKeys: ['studyFiles', 'data_file_uuid'],
  addSelectedFilesQuery: GET_FILE_IDS_FOR_SELECTED_FILES,

  addAllFilesResponseKeys: ['studyFiles', 'data_file_uuid'],
  addAllFileQuery: GET_ALL_FILE_IDS_FOR_FILES,
};



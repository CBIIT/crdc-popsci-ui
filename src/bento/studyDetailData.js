import gql from 'graphql-tag';
import studyHeaderIcon from '../assets/study/studyHeaderIcon.svg'
import externalLinkIcon from '../assets/externalLinkIcon.svg'
import previousIcon from '../assets/study/previousIcon.svg';
import { cellTypes, dataFormatTypes } from '@bento-core/table';
import downloadSuccess from '../assets/dash/downloadSuccess.svg'
import downloadLock from '../assets/dash/downloadLock.svg'
import previewLarge from '../assets/dash/previewLarge.svg'
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
  query study($study_short_name: [String]) {

    dataCollectionPage(study_short_name:$study_short_name) {
      study_short_name
      data_collection {
        data_collection_category
        data_collection_category_annotation_count
      }
    }

    studyGeneral(study_short_name:$study_short_name) {
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

      data_file {
        data_file_uuid
        association
        data_file_name
        data_file_type
        data_file_description
        data_file_format
        data_file_size
      }

      associated_links {
        associated_link_name
        associated_link_record_id
        associated_link_url
      }
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
      dbgap_accession_id
      number_of_participants
      study_participant_maximum_age
      study_participant_median_age
      study_participant_minimum_age
      race
      ethnicity
      sex
      gender
      races
      ethnicities
      sexes
      genders
      study_country
      number_of_countries
      study_state_province_territory
      number_of_states_provinces_territories
      primary_diagnosis_disease_term
      primary_diagnosis_disease_count
    }

    # Stats Bar property
    globalStatsBar(study_short_name: $study_short_name) {
      study_short_name
      data_volume
      number_of_participants
    }
    searchStudies(study_short_name: $study_short_name) {
      numberOfStudies
      numberOfDataCollectionCatagory
      numberOfDiagnosis
      numberOfDataFiles
    }
    # end
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
      dataField: 'email_address',
      header: 'Email Address',
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

// --------------- Tabs Table configuration --------------
export const studyDataFileTableConfig = {
  name: 'DataFiles',
  dataField: 'participant_data_files',
  
  dataKey: 'data_file_uuid',
  defaultSortField: 'data_file_name',
  defaultSortDirection: 'asc',
  tableID: 'dataFile_table',
  id: 'dataFile_table',

  extendedViewConfig: {
    pagination: true, // Top pagination: true || false
    manageViewColumns: { title: "View Columns" },
    download: { downloadCsv: "Download Table Contents As CSV", downloadFileName: "Study_Files_download",},
  },
  columns: [
    {
      cellType: cellTypes.CHECKBOX,
      display: false,
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
        dataField: 'data_file_location', // This need to left empty if no data need to be displayed before file download icon
        header: 'Access',
        display: true,
        cellType: cellTypes.CUSTOM_ELEM,
        downloadDocument: true, // To indicate that column is document donwload
        documentDownloadProps: {
          dataField: 'data_file_location',
          toolTipTextFileDownload: 'Download a copy of this file',
          iconFileDownload: downloadSuccess,
        },
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
  ],
};
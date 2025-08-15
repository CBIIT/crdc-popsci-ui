import gql from 'graphql-tag';
import { cellTypes, dataFormatTypes } from '@bento-core/table';
import { types } from '@bento-core/paginated-table';
import { customMyFilesTabDownloadCSV } from './tableDownloadCSV';
import cartPageIcon from '../assets/cart/cartPageIcon.svg'
import downloadSuccess from '../assets/dash/downloadSuccess.svg'
import downloadLock from '../assets/dash/downloadLock.svg'
import previewLarge from '../assets/dash/previewLarge.svg'
import openPadlockIcon from '../assets/study/openPadlockIcon.svg';
import lockedPadlockIcon from '../assets/study/lockedPadlockIcon.svg';

import directDownloadIcon from '../assets/study/directDownloadIcon.svg';
import cloudOnlyAccessIcon from '../assets/study/cloudOnlyAccessIcon.svg';

export const getManifestFileSignedUrlEndPoint = 'get-manifest-file-signed-url'
export const navBarCartData = {
  cartLabel: 'Cart',
  cartLink: '/fileCentricCart',
  cartIcon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Icon-Cart-Navbar.svg',
  cartIconAlt: 'cart_logo',
};

// --------------- Files limit configuration --------------
export const alertMessage = 'The cart is limited to 1000 files. Please narrow the search criteria or remove some files from the cart to add more.';
export const maximumNumberOfFilesAllowedInTheCart = 1000;

// --------------- Tooltip configuration --------------
export const tooltipContent = {
  icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  alt: 'tooltipIcon',
  clsName: 'tooltip_icon',
  myFiles: 'To access and analyze files, select and remove unwanted files, click the "Download File Manifest" button, and upload the resulting manifest file to your Velsera Seven Bridges Cancer Genomics Cloud account.',
  arrow: true,
  styles: {
    border: '#03A383 1px solid',
  },
};

export const myFilesPageData = {
  manifestFileName: 'PSDC File Manifest',
  tooltipIcon: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  tooltipAlt: 'tooltip icon',
  tooltipMessage: 'To access and analyze files: select and remove unwanted files,  click the “Download Manifest” button, and upload the resulting Manifest file to your Seven Bridges Genomics account.',
  errorMessage: 'An error has occurred in loading CART',
  layout: [
    {
      container: 'paginatedTable',
      paginatedTable: true,
    },
    // {
    //   container: 'buttons',
    //   size: 'xl',
    //   clsName: 'container_footer',
    //   items: [
    //     {
    //       clsName: 'manifest_comments',
    //       type: types.TEXT_INPUT,
    //       placeholder: 'User Comment',
    //     }
    //   ],
    // },
  ],

  downButtonText: 'DOWNLOAD MANIFEST',
  headerIconSrc: cartPageIcon,
  headerIconAlt: 'CTDC Cart header logo',
};

export const USER_COMMENT = "User_Comment";

export const manifestData = {
  keysToInclude: [
    'data_file_name',   // ('name' - 1/4 required fields)
    'drs_uri',          // ('drs_uri' - 2/4 required fields)
    'study_short_name', // ('study_short_name' - 3/4 required fields)
    'participant_id',       // ('participant_id' - 4/4 required fields)

    'data_file_uuid',
    'data_file_checksum_value',
    'parent_specimen_id',
    'ctep_disease_term',
    'meddra_disease_code',
    'primary_disease_site',
    'histology',
    'stage_of_disease',
    'tumor_grade',
    'age_at_enrollment',
    'sex',
    'race',
    'ethnicity',
    'carcinogen_exposure',
    'targeted_therapy',
    'parent_specimen_id',
    'anatomical_collection_site',
    'tissue_category',
    'assessment_timepoint',
    'User_Comment'
  ],
  header: [
    'name',
    'drs_uri',
    'study_short_name',
    'participant_id',

    'File ID',
    'Md5sum',
    'Biospecimen ID',
    'Diagnosis',
    'MedDRA Disease Code',
    'Primary Site',
    'Histology',
    'Stage of Disease',
    'Tumor Grade',
    'Age',
    'Sex',
    'Race',
    'Ethnicity',
    'Carcinogen Exposure',
    'Targeted Therapy',
    'Parent Biospecimen ID',
    'Anatomical Collection Site',
    'Tissue Category',
    'Collection Timepoint',
    'User Comment'
  ],
};

// --------------- GraphQL query --------------
export const GET_MY_CART_DATA_QUERY = gql`
  query filesInList(
    $data_file_uuid: [String],
    $offset: Int = 0,
    $first: Int = 10,
    $order_by:String ="data_file_name",
    $sort_direction:String="asc"
  ){
    filesInList(
      data_file_uuid: $data_file_uuid,
      offset: $offset,
      first: $first,
      order_by: $order_by,
      sort_direction: $sort_direction
    ){
       data_file_uuid
        data_file_name
        data_file_type
        data_file_description
        data_file_format
        data_file_size
        data_file_location
        data_file_access_control
        data_file_signed_url
   }
  }
`;

export const GET_MY_CART_DATA_QUERY_DESC = gql` query filesInList(
  $data_file_uuid: [String],
  $offset: Int = 0,
  $first: Int = 10,
  $order_by:String ="data_file_name",
  $sort_direction:String="desc"
){
  filesInList(
    data_file_uuid: $data_file_uuid,
    offset: $offset,
    first: $first,
    order_by: $order_by,
    sort_direction: $sort_direction
  ){
        data_file_uuid
        data_file_name
        data_file_type
        data_file_description
        data_file_format
        data_file_size
        data_file_access_control
        data_file_location
        data_file_signed_url
 }
}`;

// --------------- File table configuration --------------

export const table = {
  dataField: 'data_file_uuid',
  title: 'myFiles',
  // Value must be one of the 'dataField's in "columns"
  defaultSortField: 'data_file_name',
  // 'asc' or 'desc'
  api: GET_MY_CART_DATA_QUERY,
  defaultSortDirection: 'asc',
  paginationAPIField: 'filesInList',
  paginationAPIFieldDesc: 'filesInList',
  dataKey:'data_file_uuid',
  tableDownloadCSV: customMyFilesTabDownloadCSV,
  objectKey: 'filesInList',
  extendedViewConfig: {
    pagination: true,
    manageViewColumns: true, //{ title: "View Columns" },
    download: true,
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
                openAccessTooltip: 'Open Access file',
                controlledAccessTooltip: 'This file must be accessed via the Cloud',
                openAccessIcon: directDownloadIcon,
                controlledAccessIcon: cloudOnlyAccessIcon,
              },
              tooltipText: 'sort',
              role: cellTypes.DISPLAY,
        },
        {
          cellType: cellTypes.DELETE,
          headerType: cellTypes.DELETE,
          display: true,
        },
        // {
        //      dataField: 'data_file_uuid', // This need to left empty if no data need to be displayed before file download icon
        // header: 'File Delivery',
        // display: true,
        // cellType: cellTypes.CUSTOM_ELEM,
        // downloadDocument: true, // To indicate that column is document donwload
        // documentDownloadProps: {
        //   // Max file size needs to bin Bytes to seperate two support file preview and download
        //   maxFileSize: 80000000, // 10MB => 80,000,000 bits
        //   // datafield where file file column exists in the table
        //   fileSizeColumn: 'data_file_size',
        //   // datafield where file file id exists in the table which is used to get file location
        //   fileLocationColumn: 'data_file_uuid',
        //   // datafield where file format exists in the table
        //   fileFormatColumn: 'data_file_format',
        //   // datafield where file case id exists in the table which is used to get file information
        //   caseIdColumn: 'participant_id',
        //   // datafield where file name exists
        //   fileName: 'data_file_name',

        //   // Case 1: Logged in and granted access, file size below {maxFileSize}
        //   toolTipTextFileDownload: 'Download a copy of this file',
        //   iconFileDownload: downloadSuccess,
          
        //   // Case 2: Not logged in or access not granted, file size below {maxFileSize}
        //   iconUnauthenticated: downloadLock,
        //   toolTipTextUnauthenticated: 'This file must be accessed via the Cloud',
        // },
        // tooltipText: 'sort',
        // role: cellTypes.DISPLAY,
        //   },
  ],
  tableMsg: {
    noMatch: 'No files have been added to the cart',
  },
};


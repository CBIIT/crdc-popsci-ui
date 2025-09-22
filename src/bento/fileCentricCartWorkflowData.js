import gql from 'graphql-tag';
import { cellTypes, dataFormatTypes } from '@bento-core/table';
import { types } from '@bento-core/paginated-table';
import cartPageIcon from '../assets/cart/cartPageIcon.svg'
import openPadlockIcon from '../assets/study/openPadlockIcon.svg';
import lockedPadlockIcon from '../assets/study/lockedPadlockIcon.svg';

import directDownloadIcon from '../assets/study/directDownloadIcon.svg';
import cloudOnlyAccessIcon from '../assets/study/cloudOnlyAccessIcon.svg';
// import CustomFooterMessage from '../pages/fileCentricCart/tableConfig/CustomFooterMessage';
import { downloadJson } from '../pages/fileCentricCart/utils';

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
    //   container: 'instruction',
    //   clsName: 'container_footer',
    //   items: [
    //     {
    //       clsName: 'text_instruction',
    //       type: types.CUSTOM_ELEM,
    //       customViewElem: CustomFooterMessage,
    //     }
    //   ],
    // },
    {
      container: 'buttons',
      size: 'xl',
      clsName: 'container_footer',
      items: [
        {
          clsName: 'manifest_comments',
          type: types.TEXT_INPUT,
          placeholder: 'User Comment',
        }
      ],
    },
  ],

  downButtonText: 'DOWNLOAD MANIFEST',
  headerIconSrc: cartPageIcon,
  headerIconAlt: 'PSDC Cart header logo',
};

export const USER_COMMENT = "User_Comment";

export const manifestData = {
  keysToInclude: [
    'data_file_name',
    'drs_uri',
    'data_file_uuid', 
    'data_file_checksum_value',   
    'study_short_name',
    'data_file_description',
    'User_Comment'
  ],
  header: [
    'name',
    'drs_uri',
    'File UUID',
    'Md5sum',
    'Study Acronym',
    'File Description',
    'User Comment'
  ],
};

// --------------- GraphQL query --------------
export const GET_MY_CART_DATA_QUERY = gql`
  query filesInList(
    $data_file_uuid: [String],
    $offset: Int = 0,
    $first: Int = 1000,
    $order_by:String = "data_file_name",
    $sort_direction:String="asc"
  ) {
    filesInList(
      data_file_uuid: $data_file_uuid,
      offset: $offset,
      first: $first,
      order_by: $order_by,
      sort_direction: $sort_direction
    ) {
      data_file_uuid
      data_file_name
      data_file_type
      data_file_description
      data_file_format
      data_volume # data_file_size
      data_file_access_control

      drs_uri
      data_file_checksum_value
      study_short_name
    }
  }
`;

export const GET_MY_CART_DATA_QUERY_DESC = gql`
  query filesInList(
    $data_file_uuid: [String],
    $offset: Int = 0,
    $first: Int = 1000,
    $order_by:String ="data_file_name",
    $sort_direction:String="desc"
  ) {
    filesInList(
      data_file_uuid: $data_file_uuid,
      offset: $offset,
      first: $first,
      order_by: $order_by,
      sort_direction: $sort_direction
    ) {
      data_file_uuid
      data_file_name
      data_file_type
      data_file_description
      data_file_format
      data_volume # data_file_size
      data_file_access_control

      drs_uri
      data_file_checksum_value
      study_short_name
    }
  }
`;

// Custom function used to download the Cart Table
export const createDownloadTableFunction = (client, filterItems) => () => {
  const queryVariables = {
    ...filterItems,
    offset: 0,
    first: 10000
  };
  
  return client
    .query({
      query: GET_MY_CART_DATA_QUERY,
      variables: {
        ...queryVariables,
      },
    })
    .then((result) => {
      if (result.data[table.objectKey]) {
        // POPSCI-375: Inject a consistent _fileDelivery field for all files to indicate delivery method
        const files = result.data[table.objectKey];
        if (Array.isArray(files)) {
          files.forEach((file) => {
            file._fileDelivery = "Access via Cloud";
          });
        }
        downloadJson(
          result.data[table.objectKey],
          "",
          table?.extendedViewConfig?.download?.downloadFileName || "PSDC_My_Files_download",
          {
            keysToInclude: ['data_file_name', 'data_file_type', 'data_file_description', 'data_file_format', 'data_volume', 'data_file_access_control', '_fileDelivery'],
            header: ['File Name', 'File Type', 'Description', 'Format', 'Size', 'Access Control', 'File Delivery'],
          }
        );
      }
    });
};

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
  objectKey: 'filesInList',

  extendedViewConfig: {
    pagination: true,
    manageViewColumns: { title: "View Columns" },
    download: {
      downloadFileName: "PSDC_My_Files_download",
      downloadCsv: "Download Table Contents As CSV",
      // This function should be replaced in React component with createDownloadTableFunction(client)
      downloadTable: null,
    },
  },
  columns: [
        {
          dataField: 'data_file_name',
          header: 'File Name',
          display: true,
          tooltipText: 'sort',
        },
        {
          dataField: 'data_file_type',
          header: 'File Type',
          display: true,
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
          dataField: 'data_volume',
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
              dataField: '_fileDelivery',
              header: 'File Delivery',
              display: true,
              cellType: cellTypes.CUSTOM_ELEM,
              fileDelivery: true,
              customCellProps: {
                openAccessTooltip: 'Open Access file',
                controlledAccessTooltip: 'This file must be accessed via the Cloud',
                openAccessIcon: directDownloadIcon,
                controlledAccessIcon: cloudOnlyAccessIcon,
                dataField: 'data_file_access_control'
              },
              tooltipText: 'sort',
              role: cellTypes.DISPLAY,
        },
        {
          // cellType: cellTypes.CUSTOM_ELEM,
          // headerType: headerTypes.CUSTOM_ELEM,
          
          cellType: cellTypes.DELETE,
          headerType: cellTypes.DELETE,
          display: true,
          cancelText: "Cancel",
          okText: "Ok"
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
    noMatch: 'Your cart is currently empty',
  },
};


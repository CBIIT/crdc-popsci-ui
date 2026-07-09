import React from 'react';
import { cellTypes, headerTypes } from '@bento-core/table';
import { Typography } from '@material-ui/core';
import { useApolloClient } from '@apollo/client';
import CustomHeaderRemover from './CustomHeaderRemover';
import IconCell from '../../studyDetail/views/studyFiles/tableConfig/IconCell';
import { createDownloadTableFunction } from '../../../bento/fileCentricCartWorkflowData';
import DeleteButton from './DeleteButton';

export const CustomHeaderCellView = (props) => {
  const {
    dataField,
    openDialogBox,
    headerType,
  } = props;
  switch (dataField || headerType) {
    case headerTypes.DELETE:
      return (
        <CustomHeaderRemover openDialogBox={openDialogBox} />
      );
    // You can add for more cases like "case headerTypes.CUSTOM_ELEM:"
    
    default:
      return (<></>);
  }
};


// Helper component for custom cell rendering
export const CustomCellView = (props) => {
  const {
    fileDelivery,
    accessControl,
    displayEmpty,
    dataField,
    customCellProps,
    _customActionLabel,
  } = props;

  // Helper to render IconCell for access control/file delivery
  const renderIconCell = (type) => {
    if (type === 'accessControl' && props[dataField] === "Open Access") {
      return (
        <IconCell
          signedUrl={props[dataField]}
          toolTipText={customCellProps?.openAccessTooltip}
          iconSrc={customCellProps?.openAccessIcon}
          showToolTip={true}
        />
      );
    }
    // All Files can only be accessed through Seven Bridges Cancer Genomics Cloud 
    if (type === 'fileDelivery' || props[dataField] === "Controlled Access") {
      return (
        <IconCell
          signedUrl={props[dataField]}
          toolTipText={customCellProps?.controlledAccessTooltip}
          iconSrc={customCellProps?.controlledAccessIcon}
          showToolTip={true}
        />
      );
    }
    return null;
  };

  if (accessControl && dataField === "data_file_access_control") {
    return renderIconCell('accessControl');
  }

  if (fileDelivery) {
    return renderIconCell('fileDelivery');
  }
  
  if (_customActionLabel === "Delete_File") {
    return <DeleteButton {...props} />;
  }

  if (typeof displayEmpty === "boolean") {
    return (
      <Typography>
        {displayEmpty || props[dataField] ? props[dataField] : ""}
      </Typography>
    );
  }

  // Return empty fragment for other cases
  return null;
};

/**
* Create download table function with Apollo client
* @returns download table function
*/
export const useDownloadTableFunction = (filterItems) => {
  const client = useApolloClient();
  return createDownloadTableFunction(client, filterItems);
};

/**
* set column configuration
* @param {*} columns
* @returns config columns
*/
export const configColumn = ({
  columns,
  deleteAllFiles, 
  deleteCartFile,
  removeCheck,
}) => {
  /**
  * display columns as configuration
  * set custom cell render for column
  */
  const displayColumns = columns.filter((col) => col.display);
  const displayCustomView = [...displayColumns].map((column) => {
    if (column.cellType === cellTypes.CUSTOM_ELEM) {
      return {
        ...column,
        cellEventHandler: deleteCartFile,
        customCellRender: (props) => <CustomCellView {...props} deleteCartFile={deleteCartFile} />,
      };
    }
    if (column.cellType === cellTypes.DELETE) {
      return {
        ...column,
        cellEventHandler: deleteCartFile,
      };
    }
    return column;
  });

  /**
  * custom header view configuration
  */
  const displayCustomHeader = [...displayCustomView].map((column) => {
    if (column.headerType === headerTypes.CUSTOM_ELEM) {
      return {
        ...column,
        // Use For Deleting Column but still shows the header
        customColHeaderRender: (props) => <CustomHeaderCellView {...props} />,
      };
    }

    /*
    * props deleteAllFiles
    */
    if (column.headerType === headerTypes.DELETE) {
      return {
        ...column,
        headerEventHandler: ()=>{ removeCheck(); deleteAllFiles() },
        customColHeaderRender: (toggleDisplay) => (
          <CustomHeaderCellView openDialogBox={toggleDisplay} {...column} />
        ),
      };
    }
    return column;
  });
  return displayCustomHeader;
};

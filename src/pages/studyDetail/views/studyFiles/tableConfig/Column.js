import React from 'react';
import { Typography } from '@material-ui/core';
import { cellTypes, headerTypes } from '@bento-core/table';
import IconCell from './IconCell';

// Helper component for custom cell rendering
export const CustomCellView = (props) => {
  const {
    fileDelivery,
    accessControl,
    displayEmpty,
    dataField,
    customCellProps,
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

  if (fileDelivery && dataField === "data_file_access_control") {
    return renderIconCell('fileDelivery');
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

// Helper component for custom header rendering
export const CustomHeaderCellView = (props) => {
  const { dataField, header } = props;

  // An Example from CTDC
  if (dataField === "___reported_gender") {
    return (
      <>
      <span style={{fontSize: '14px',width: '130px',textAlign: 'center'}}>
        Gender <p style={{fontSize: '10px', lineHeight: '0px', margin: 0, textAlign: 'center',fontWeight: '700'}}>(if different than sex)</p>
      </span>
      </>
    )
  }
  
  return <> {header}</>
}


/**
  * Configure columns with custom cell and header renderers.
  * @param {*} columns - Array of column configurations.
  * @returns Configured columns with custom renderers.
*/
export const configColumn = (columns) => {
  // Filter columns that should be displayed
  const displayColumns = columns.filter((col) => col.display);

  // Set custom cell renderers
  const columnsWithCustomCells = [...displayColumns].map((column) => {
    if (column.cellType === cellTypes.CUSTOM_ELEM) {
      return {
        ...column,
        customCellRender: (props) => <CustomCellView {...props} />,
      };
    }
    return column;
  });

  /**
    * custom header view configuration
    * Set custom header renderers
  */
  const columnsWithCustomHeaders = [...columnsWithCustomCells].map((column) => {
    if (column.headerType === headerTypes.CUSTOM_ELEM) {
      return {
        ...column,
        customColHeaderRender: (props) => <CustomHeaderCellView {...props} />,
      };
    }
    return column;
  });
  return columnsWithCustomHeaders;
};

import React from 'react';
import { Typography } from '@material-ui/core';
import { cellTypes, headerTypes } from '@bento-core/table';

// Helper component for custom cell rendering
export const CustomCellView = (props) => {
  const { customFullName, displayEmpty, dataField, person_first_name, person_middle_name, person_last_name } = props;
  
  if (customFullName) {
    return (
      <Typography>
        {person_first_name}{' '}{person_middle_name}{' '}{person_last_name}
      </Typography>
    );
  } else if (typeof displayEmpty === "boolean") {
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

import React from 'react';
import { Typography } from '@material-ui/core';
import { cellTypes, headerTypes } from '@bento-core/table';
import DocumentDownloadView from '../../../../components/DocumentDownload/DocumentDownloadView';
import { removeSquareBracketsFromString } from '../../../../utils/utils';
import DataCollected from '../../../studyDetail/views/data_collection/data_collection.json';

export const CustomCellView = (props) => {
  const {
    downloadDocument, documentDownloadProps,
    displayEmpty, dataField, removeSquareBrackets ,isDataCateColumn, dataCateColumnProps, isNumber
  } = props;
  if (downloadDocument) {
    return (
      <DocumentDownloadView
        // fileSize={props.file_size}
        fileSize={props[documentDownloadProps.fileSizeColumn]}
        caseId={props[documentDownloadProps.caseIdColumn]}
        fileFormat={props[documentDownloadProps.fileFormatColumn]}
        fileLocation={props[documentDownloadProps.fileLocationColumn]}
        {...documentDownloadProps}
        {...props}
        requiredACLs={props[dataField]}
        fileName={props[documentDownloadProps.fileName]}
      />
    );
  }else if (removeSquareBrackets) { 
    return (
      // If removeSquareBrackets flag is true, remove square brackets
      <Typography>
        {displayEmpty || props[dataField] ? removeSquareBracketsFromString(props[dataField]) : ""}
      </Typography>
    );
  } else if (typeof displayEmpty === "boolean") {
    return (<Typography>{displayEmpty || props[dataField] ? props[dataField] : ""}</Typography>);
  }else if(isNumber){

     const number =props[dataCateColumnProps['dataField']];
     return  <Typography>{parseInt(number,10).toLocaleString()} </Typography>

  } else if (isDataCateColumn){

    const data =props[dataCateColumnProps['dataField']];

    let nonZeroCount = 0;
      let totalCount = 0;

      DataCollected.data_collected.forEach(category => {
        const categoryName = Object.keys(category)[0];
        category[categoryName].forEach(item => {
          totalCount++;
          const matchingData = data.find(d => d.data_collection_category === item);
          if (matchingData && matchingData.data_collection_category_annotation_count > 0) {
            nonZeroCount++;
          }
        });
      });

    return  <Typography>{nonZeroCount} of {totalCount} </Typography>
  }

  // other custom elem
  return (<></>);
};

export const CustomHeaderCellView = (props) => {


  if (props.dataField === "study_name") {
    return (
      <>
      <span style={{fontSize: '11pt',width: '240px',textAlign: 'center'}}>
       Study Name 
      </span>
      </>
    )
  }
    return <> {props.header}</>
}


/**
* set column configuration
* @param {*} columns
* @returns config columns
*/
export const configColumn = (columns) => {
  /**
  * display columns as configuration
  * set custom cell render for column
  */
  const displayColumns = columns.filter((col) => col.display);
  const displayCustomView = [...displayColumns].map((column) => {
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
  */
  const displayCustomHeader = [...displayCustomView].map((column) => {
    if (column.headerType === headerTypes.CUSTOM_ELEM) {
      return {
        ...column,
        customColHeaderRender: (props) => <CustomHeaderCellView {...props} />,
      };
    }
    return column;
  });
  return displayCustomHeader;
};

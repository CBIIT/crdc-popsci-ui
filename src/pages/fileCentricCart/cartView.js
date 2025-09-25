import React, { useContext, useState } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { TableContext, TableView } from '@bento-core/paginated-table';
import { configColumn, useDownloadTableFunction } from './tableConfig/Column';
import { themeConfig } from './tableConfig/Theme';
import styles from './CartStyle';
import CartWrapper from './CartWrapper';
import {paginationOptions} from './tableConfig/PaginationOptions';
import HeaderView from './components/header/HeaderView';
const CartView = (props) => {
  const {
    classes,
    config,
    tblRows = [],
    isServer = true,
    filesId = [],
    // deleteCartFile
  } = props;
  
  const variables = {};
  variables.data_file_uuid = filesId;

  // access table state
  const tableContext = useContext(TableContext);
  const { context } = tableContext;

  // Get the custom download table function
  const downloadTable = useDownloadTableFunction(variables);

  const [isUpdated,setIsUpdated] = useState(false);
  props ={ ...props, removeCheck: () => {setIsUpdated(true)}}

  /**
  * configure table state
  */
  const initTblState = (initailState) => ({
    ...initailState,
    title: 'myFiles',
    query: config.api,
    dataKey: config.dataKey,
    columns: configColumn({ columns: config.columns, downloadTable, ...props }),
    selectedRows: [],
    tableMsg: config.tableMsg,
    paginationAPIField: config.paginationAPIField,
    sortBy: config.defaultSortField,
    sortOrder: config.defaultSortDirection,
    rowsPerPage: 10,
    page: 0,
    extendedViewConfig: {
      ...config.extendedViewConfig,
      download: {
        ...config.extendedViewConfig?.download,
        downloadTable: downloadTable
      }
    },
  });
  
  

  return (
    <Grid container className={classes.myFilesContainer}>
      <Grid item xs={12}>
        <HeaderView filesId={filesId} />
      </Grid>

      <Grid item xs={12} className={classes.myFilesWrapper}>
        <CartWrapper
          classes={classes}
          queryVariables={variables}
          totalRowCount={filesId.length}
        >
          <TableView
            initState={initTblState}
            checkedItemReset={isUpdated}
            themeConfig={themeConfig}
            queryVariables={variables}
            totalRowCount={filesId.length}
            tblRows={tblRows}
            server={isServer}
            paginationOptions={paginationOptions(context, config)}
          />
        </CartWrapper>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(CartView);

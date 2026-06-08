import React, {
  useContext,
  useEffect,
  useRef,
} from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { useApolloClient } from '@apollo/client';
import { 
  TableContext,
  TableContextProvider,
  TableView,
} from '@bento-core/paginated-table';
import styles from './TabStyle';
import { themeConfig } from './tableConfig/Theme';
import { configColumn } from './tableConfig/Column';
import { createDownloadTableFunction } from '../../../bento/dashboardTabData';

const TabViewContent = (props) => {
  /**
  * initialize state for useReducer
  * @param {*} initailState
  * @returns reducer state
  */
  const {
    config,
    dashboardStats,
    activeFilters,
    activeTab,
  } = props;

  const client = useApolloClient();
  const tableContext = useContext(TableContext);
  const { context } = tableContext;
  const tableColumnsRef = useRef(configColumn(config.columns));
  const activeFiltersRef = useRef(activeFilters);
  const downloadTableRef = useRef(null);

  useEffect(() => {
    activeFiltersRef.current = activeFilters;
  }, [activeFilters]);

  useEffect(() => {
    if (context?.columns) {
      tableColumnsRef.current = context.columns;
    }
  }, [context?.columns]);

  if (!downloadTableRef.current && config?.extendedViewConfig?.download) {
    downloadTableRef.current = createDownloadTableFunction(
      client,
      () => activeFiltersRef.current,
      config,
      () => tableColumnsRef.current
    );
  }

  const columns = configColumn(config.columns);
  const extendedViewConfig = config?.extendedViewConfig?.download
    ? {
      ...config.extendedViewConfig,
      download: {
        ...config.extendedViewConfig.download,
        downloadTable: downloadTableRef.current,
      },
    }
    : config.extendedViewConfig;

  /*
  * useReducer table state
  * paginated table update data when state change
  */
  /**
  * Server Pagination Table Configuration
  * 1. title - (Required) table name (Case, Sample, Files), required for class name
  * 2. query/api - (Required) GraphQL Query for paginated Table (e.g. GET_CASES_OVERVIEW_QUERY)
  * 3. dataKey - (Required) Tracking selected rows (case - dataKey: 'subject_id')
  * 4. sortBy - (Required) default sort column
  * 5. columns - (Required) columns defined by dashboardTabData (tabContainers)
  * (see configColumn method for customRedering)
  * 6. tableMsg - (Required) Display noMatch Msg
  * 7. theme - (Optional) override style with themeprovider use ClassName provided by
  * bento-core table to apply style (refer to class name table)
  * 8. paginationAPIField - (Required) Access http response data - defined by
  * dashboardTabData (tabContainers)
  * eg. case tab paginationAPIField: 'subjectOverview' - {subjectOverview: [data]}
  * 9. extendedViewConfig - (Optional) table view config, set hide/diaply pagination above table header
  * 10. extendedViewConfig: (Optional) config to add (pagination on top of the table, manage Column view)
  * 11. selectedRows: (Optional) provides ids of the selected row (id defined by dataKey)
  * 12. themeConfig - (optional) configure table style
  */
  const initTblState = (initailState) => ({
    ...initailState,
    title: config.name,
    query: config.api,
    paginationAPIField: config.paginationAPIField,
    dataKey: config.dataKey,
    columns,
    count: dashboardStats[config.count],
    selectedRows: [],
    tableMsg: config.tableMsg,
    sortBy: config.defaultSortField,
    sortOrder: config.defaultSortDirection,
    extendedViewConfig,
    rowsPerPage: 10,
    page: 0,
  });

  return (
    <TableContextProvider>
        <Grid container>
          <Grid item xs={12} id={config.tableID}>
            <TableView
              initState={initTblState}
              themeConfig={themeConfig}
              queryVariables={activeFilters}
              totalRowCount={dashboardStats[config.count]}
              activeTab={activeTab}
            />
          </Grid>
        </Grid>
    </TableContextProvider>
  );
};

const TabView = (props) => (
  <TableContextProvider>
    <TabViewContent {...props} />
  </TableContextProvider>
);

export default withStyles(styles)(TabView);

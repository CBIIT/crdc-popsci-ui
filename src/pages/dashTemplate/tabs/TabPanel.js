import React from 'react';
import { useApolloClient } from '@apollo/client';
import { Grid, withStyles } from '@material-ui/core';
import { 
  TableContextProvider,
  TableView,
} from '@bento-core/paginated-table';
import styles from './TabStyle';
import { themeConfig } from './tableConfig/Theme';
import { configColumn } from './tableConfig/Column';
import { downloadJson, generateDownloadConfig } from '../../../utils/fileDownload';

const TabView = (props) => {
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
  const extendedViewConfig = React.useMemo(() => {
   if (!config.extendedViewConfig?.download) {
     return config.extendedViewConfig;
   }

   return {
     ...config.extendedViewConfig,
     download: {
       ...config.extendedViewConfig.download,
       downloadTable: () => client
         .query({
           query: config.api,
           variables: {
             ...activeFilters,
             offset: 0,
             first: 10000,
             order_by: config.defaultSortField,
             sort_direction: config.defaultSortDirection,
           },
         })
         .then((result) => {
           const rows = result.data[config.paginationAPIField] || [];
           const { keysToInclude, header } = generateDownloadConfig(config.columns);

           downloadJson(
             rows,
             '',
             config?.extendedViewConfig?.download?.downloadFileName || 'PSDC_Studies_download',
             { keysToInclude, header },
             config.columns,
           );
         }),
     },
   };
  }, [activeFilters, client, config]);
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
    columns: configColumn(config.columns),
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

export default withStyles(styles)(TabView);

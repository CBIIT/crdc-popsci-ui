import React from "react";
import { Grid, } from '@material-ui/core';
import { 
  TableContextProvider,
  TableView,
} from '@bento-core/paginated-table';

import { studyPersonnelTableConfig } from '../../../../bento/studyDetailData';
import { themeConfig } from './tableConfig/Theme';
import { configColumn } from './tableConfig/Column';

const StudyPersonnel = (props) => {
  const config = studyPersonnelTableConfig;
  let { data } = props;

    // Modify data to replace "|" with "," in person_role if it's not null
  data = data.map(item => ({
    ...item,
    person_role: item.person_role ? item.person_role.replace(/\|/g, ', ') : item.person_role
  }));
  /**
    * initialize state for useReducer
    * @param {*} initailState
    * @returns reducer state
  */
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
    count: data.length || 50,
    selectedRows: [],
    tableMsg: config.tableMsg,
    sortBy: config.defaultSortField,
    sortOrder: config.defaultSortDirection,
    extendedViewConfig: config.extendedViewConfig,
    rowsPerPage: 10,
    page: 0,
  });

  return (
    <TableContextProvider>
      <Grid container>
        <Grid item xs={12} id={config.tableID}>
          <TableView
            /*
              * The table will be client-side, not server-side.
              * More info: https://github.com/CBIIT/bento-frontend/blob/master/packages/paginated-table/src/table/PaginatedTable.js
            */
            server={false} 
            tblRows={data}
            initState={initTblState}
            themeConfig={themeConfig}
            totalRowCount={data.length}
          />
        </Grid>
      </Grid>
    </TableContextProvider>
  );
};

export default StudyPersonnel;

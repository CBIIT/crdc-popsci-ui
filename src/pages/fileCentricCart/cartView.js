import React, { useContext, useState, useEffect } from 'react';
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

  // Add accessibility labels to delete buttons and remove scope attributes after table renders
  useEffect(() => {
    const updateDeleteButtons = () => {
      const deleteButtons = document.querySelectorAll('.del_row_btn');
      deleteButtons.forEach((button) => {
        // Add aria-label if missing or empty
        if (!button.getAttribute('aria-label') || button.getAttribute('aria-label') === '') {
          button.setAttribute('aria-label', 'Delete file from cart');
        }
        // Remove scope attribute if present (scope is for table headers, not buttons)
        if (button.hasAttribute('scope')) {
          button.removeAttribute('scope');
        }
        
        // Also remove scope from parent td element (scope should only be on th elements)
        const parentCell = button.closest('td');
        if (parentCell && parentCell.hasAttribute('scope')) {
          parentCell.removeAttribute('scope');
        }
      });
    };

    // Small delay to let table render, then update buttons
    const timer = setTimeout(updateDeleteButtons, 50);
    return () => clearTimeout(timer);
  }, [tblRows, isUpdated]); // Re-run when table data changes

  // Add proper label for textarea accessibility compliance
  useEffect(() => {
    const addLabelToTextarea = () => {
      const textarea = document.querySelector('textarea.manifest_comments, textarea[id="multiline-user-coments"]');
      if (textarea) {
        if (!textarea.getAttribute('title') && !textarea.getAttribute('aria-label')) {
          textarea.setAttribute('title', 'User Comments');
          textarea.setAttribute('aria-label', 'User Comments');
        }
        
        // Ensure textarea has proper id
        if (!textarea.id) {
          textarea.id = 'multiline-user-coments';
        }
      }
    };

    // Run after a delay to ensure textarea is rendered
    const timer = setTimeout(addLabelToTextarea, 200);
    return () => clearTimeout(timer);
  }, [filesId, isUpdated]);

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
    <main role="main" aria-label="Cart page main content">
      <Grid container className={classes.myFilesContainer}>
        <Grid item xs={12}>
          <section role="region" aria-labelledby="cart-page-title">
            <HeaderView filesId={filesId} />
          </section>
        </Grid>

        <Grid item xs={12} className={classes.myFilesWrapper}>
          <section role="region" aria-label="Cart items table">
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
          </section>
        </Grid>
      </Grid>
    </main>
  );
};

export default withStyles(styles)(CartView);

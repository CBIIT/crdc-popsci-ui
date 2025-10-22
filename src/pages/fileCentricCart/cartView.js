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

  // Add accessibility labels to delete buttons after table renders
  useEffect(() => {
    const addAriaLabelsToDeleteButtons = () => {
      const deleteButtons = document.querySelectorAll('.del_row_btn:not([aria-label]), .del_row_btn[aria-label=""]');
      deleteButtons.forEach((button) => {
        button.setAttribute('aria-label', 'Delete file from cart');
      });
    };

    // Small delay to let table render, then add labels
    const timer = setTimeout(addAriaLabelsToDeleteButtons, 100);
    return () => clearTimeout(timer);
  }, [tblRows, isUpdated]); // Re-run when table data changes

  // Add scope attribute to delete column header for accessibility compliance
  useEffect(() => {
    const addScopeToDeleteHeader = () => {
      // Find the delete column header and add scope attribute
      const deleteHeaders = document.querySelectorAll('th:has(button), th[class*="del_all_row"], th[data-testid*="delete"]');
      deleteHeaders.forEach(header => {
        if (!header.getAttribute('scope')) {
          header.setAttribute('scope', 'col');
        }
      });

      // Alternative approach: find by button content
      const clearCartButtons = document.querySelectorAll('button');
      clearCartButtons.forEach(button => {
        if (button.textContent && button.textContent.includes('Clear Cart')) {
          const thElement = button.closest('th');
          if (thElement && !thElement.getAttribute('scope')) {
            thElement.setAttribute('scope', 'col');
          }
        }
      });
    };

    // Run immediately and after a short delay to catch dynamic content
    addScopeToDeleteHeader();
    const timer = setTimeout(addScopeToDeleteHeader, 100);

    return () => clearTimeout(timer);
  }, [filesId, isUpdated]);

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

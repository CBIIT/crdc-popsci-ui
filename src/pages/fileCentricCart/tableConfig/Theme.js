export const tblHeader = {
  MuiDialog: {
    paper: {
      width: '400px',

      height: '210px',
      textAlign: 'center',
      backgroundColor: '#FFFFFF !important',
      backdropFilter: 'blur(4px)',
      padding: '50px 38px',
      color: '#000000',
      borderRadius: '0px'
    },
  },
  MuiDialogContent: {
    root: {
      padding: '0px',
      '&:first-child': {
        paddingTop: '0px',
      },
    },
  },
  MuiDialogContentText: {
    root: {
      fontFamily: 'Open Sans',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '130%',
      letterSpacing: 0,
      textAlign: 'center',
      color: '#000000'
    }
  },
  MuiDialogActions: {
    root: {
      padding: '0px',
      justifyContent: 'center',
      '&.actionsWrapper': {
        padding: '0px',
        flexDirection: 'row-reverse !important', // reverse direction
        gap: '0px 15px'
      }
    },
  },

  MuiButton: {
    text: {
      padding: '10px 16px',
    },
    root: {
      fontFamily: 'Raleway',
      fontWeight: 700,
      fontSize: '14px',
      lineHeight: '16px',
      letterSpacing: '2%',
      textAlign: 'center',
      verticalAlign: 'middle',
      textTransform: 'uppercase',
      padding: '12px 24px',
      color: '#FFFFFF',
      
      '&.okBtn': {
        backgroundColor: '#0C534C',
        borderRadius: '30px',

        width: '133px',
        height: '45px',
        cursor: 'pointer',
      },
      '&.cancelBtn': {
        backgroundColor: '#4F5D69',
        borderRadius: '30px',

        width: '133px',
        height: '45px',
        cursor: 'pointer',
      },
    },
  },
  MuiTableSortLabel: {
    root: {
      position: 'relative',

      fontFamily: 'Open Sans',
      fontWeight: 700,

      fontStyle: 'normal',
      fontSize: '15px',
      color: '#0F253A',
      letterSpacing: '0.06em',
      maxWidth: '220px',
      wordWrap: 'break-word',
      lineHeight: '16px',

      textAlign: 'left',
  
  
    },
    active: {
      color: '#0F253A !important',
    }
  },
  MuiTableCell: {
    root: {
      padding: '0px 0px 0px 32px',
      paddingRight: '5px',
      maxWidth: '220px',
      wordWrap: 'break-word',

      "&.data_file_format":{
      },
      "&.data_file_name": {
        minWidth: '294px',
      },
      "&.data_file_description": {
        minWidth: '294px',
      },
      '&.del_all_row': {
        paddingRight: '32px !important',
        textAlign: 'center',
      },
      '&._fileDelivery': {
        pointerEvents: "none",
      },
    },
  },
  MuiTableRow: {
    root: {
      height: '52px',
      borderTop: '3px solid #1E66A4',
      borderBottom: '3px solid #1E66A4',
    },
  },

  MuiTooltip: {
    tooltipPlacementBottom: {
      background: 'gray !important',
      marginTop: '0px',
      marginLeft: '0px',
      color: 'white !important',
      border: 'none !important',
      '&.remove_button_all':{
        background:'red !important'
      },
      '@media (min-width: 600px)': {
        marginTop: '10px',
        background: 'none',
      },
    },
    popper: {
      '&#header-tooltip div': {
        background: 'gray !important',
        marginTop: '0px',
        marginLeft: '0px',
        color: 'white !important',
        border: 'none !important'
      },
    },
  },
  MuiIconButton: {
    root: {
      '&.del_all_row_btn': {
        alignSelf: 'center',
        margin: '0px',
      },
    },
  },
};

export const extendedView = {
  tblTopPgn: {
    MuiTablePagination: {
      root: {
        paddingRight: '20px',
        borderTop: '3px solid #1E66A4',
      },
      toolbar: {
        minHeight: '42px',
        maxHeight: '42px',
      }
    },
    
  },
  MuiToolbar: {
    root: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: '0px !important',
      position: 'relative !important',

      '&.downloadAndColumnView': {
        maxHeight: '30px',
        minHeight: '30px',
        marginRight: '20px'
      },
    },
  },
};
// Bottom Pagination
export const tblPgn = {
  MuiTablePagination: {
    root: {
      paddingRight: '0px',
      borderTop: '3px solid #1E66A4',
      borderBottom: '3px solid #e7e5e5',
      marginBottom: '30px'
    },
    toolbar: {
      minHeight: '42px',
      paddingRight: '20px'
    },
  },
};

export const tblBody = {
  MuiTableBody: {
    root: {
      margin: 'auto 3% auto 3%',
      maxWidth: '100%',
      padding: '0px !important',
    },
  },
  MuiTableRow: {
    root: {
      // border: '1px solid black',
      color: '#323232',
      //styleName: New/Body/Regular;
      fontFamily: 'Roboto',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
      textAlign: 'left',

      height: '52px',

      backgroundColor: 'transparent !important',
      '&:nth-child(odd) td': {
        color: '#4B4B4B',
        background: '#F4F4F4',
      },
      '&:nth-child(even) td': {
        color: '#4B4B4B',
        background: '#FFFFFF',
      },
    }
  },

  MuiTableCell: {
    body: {
      color: '#004C73',
      borderBottom: 'none',
      maxWidth: '220px',
      wordWrap: 'break-word',
      // paddingTop: '10px !important',
      // paddingBottom: '10px !important',
      // minHeight: '24px !important',
      // maxHeight: '59px',
      "&.delete_row":{
        paddingLeft: '32px',
        paddingRight: '32px',
        textAlign: 'center',
      },
      '&.file_name': {
        '& p': {
          lineBreak: 'anywhere',
          // paddingTop: '10px',
          // paddingBottom: '10px',
        },
      },
    },
    root: {
      minHeight: '0px !important',
      padding: '0px 32px 0px 32px',
      // paddingRight: '20px',
      color: '#004C73',
      borderBottom: 'none',
    },
  },

  MUIDataTableBodyRow: {
    
  },

  MuiIcon: {
    root: {
      fontSize: '0px'
    }
  }
};

export const tblContainer = {
  MuiTableContainer: {
    root: {
      width: '100%',
      overflowX: 'auto',
      transform: 'rotateX(180deg)',
      boxShadow: 'none',
      borderRadius: '0',
    }
  },
  MuiTable: {
    root: {
      transform: 'rotateX(180deg)',
      width: '100%',
      display: 'table',
      borderSpacing: '0',
      borderCollapse: 'collapse',
      "&.delete_row":{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      },
    },
  },
};

export const themeConfig = {
  tblHeader,
  extendedView,
  tblPgn,
  tblBody,
  tblContainer,
};

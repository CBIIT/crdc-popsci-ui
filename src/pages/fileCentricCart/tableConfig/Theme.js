export const tblHeader = {
  MuiButton: {
    text: {
      padding: '10px 16px',
    },
    root: {
      color: '#fff',
      fontSize: '14px',
      marginTop: '6px',
      fontFamily: 'Lato',
      borderRadius: '10px',
      marginBottom: '10px',
      textTransform: 'uppercase',
      width: '133px',
      '&.okBtn': {
        width: '133px',
        height: '45px',
        cursor: 'pointer',
        background: '#3E74B6',
      },
      '&.cancelBtn': {
        width: '133px',
        height: '45px',
        cursor: 'pointer',
        background: '#4F5D69',
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
        // maxWidth: '1207px',
        // width: '1207px',
      },
      "&.data_file_name": {
        minWidth: '294px',
      },
      "&.data_file_description": {
        minWidth: '294px',
      },
      '&.del_all_row': {
        minWidth: '150px',
        button: {
          cursor: 'pointer',
        },
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
  MuiTypography: {
    root: {
      color: '#A61401',
      '&.del_all_row_tooltip': {
        width: '110px',
        border: '2px solid #A61401',
        minHeight: '24px !important',
        padding: '5px 10px',
        fontSize: '12px',
        background: '#fff',
        textAlign: 'center',
        fontWeight: '500',
        borderRadius: '7px',
      },
      '&.del_all_row_text': {
        float: 'left',
        fontSize: '11pt',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Lato Regular, Raleway, sans-serif',
        // lineHeight: '47px',
      },
    },
  },
};

export const extendedView = {
  tblTopPgn: {
    MuiTablePagination: {
      root: {
        paddingRight: '0px',
        borderTop: '3px solid #1E66A4',
      },
    },
  },
  MuiToolbar: {
    root: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: '0px !important',
    },
  },
};

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
        paddingLeft: '52px'
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
      padding: '0px 0px 0px 32px',
      paddingRight: '20px',
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

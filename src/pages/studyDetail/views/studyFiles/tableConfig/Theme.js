// import { previousPageIcon } from '../../../../../bento/studyDetailData';

export const tblHeader = {
  MuiTableSortLabel: {
    root: {
      color: '#0F253A',
      fontFamily: 'Open Sans',
      fontSize: '15px',
      fontWeight: 700,
      lineHeight: '20.43px',
      letterSpacing: '-0.02em',

      position: 'relative',
      textDecoration: 'none',
      whiteSpace: 'nowrap',

      '&:hover': {
        color: '#13344A',
      },
    },
  },
  MuiTableRow: {
    head: {
      height: '40px',
      borderBottom: '3px solid #1E66A4',
    },
  },
  MuiTableCell: {
    root: {
      padding: '0px 33px 0px 7px',
    },
    paddingCheckbox: {
      padding: '0px !important',
    },
  },
  MuiFormControlLabel: {
    root: {
      marginLeft: '6px',
      marginRight: '0px',
    },
  },
  MuiCheckbox: {
    color: '#969696',
    colorPrimary: {
      color: '#969696',
      '&.Mui-checked': {
        color: '#6D5F5B'
      }
    }

    
  },
  MuiSvgIcon: { // CheckBox Icon
    root: {
      width: '.7em',
      height: '.7em',
      borderRadius: 0,
    }
  }
};

const tblBody = {
  MuiTableRow: {
    root: {
      height: '45px',
      // whiteSpace: 'nowrap',
      '&:nth-child(even)': {
        background: '#F4F4F4',
      },
    },
  },
  MuiTableHead: {
    root: {
      fontWeight: '400',
      lineHeight: '2',
      fontSize: '16px',
      fontStyle: 'normal',
      fontFamily: 'Nunito',
      letterSpacing: '0.0025em',
    },
  },

  MuiTableCell: {
    root: {
      padding: '0px 33px 0px 7px',
      borderBottom: 'none',
    },
    paddingCheckbox: {
      padding: '0px 0px 0px 6px',
    },
    head: {
      padding: '0px !important',
    },
    body: {
      fontFamily: 'Open Sans',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '17.66px',
      textAlign: 'left',

      color: '#4B4B4B',

      '&.data_file_name': {
        width: '294px',
      },
      '&.data_file_type': {
        width: '179px',
      },
      '&.association': {
        width: '150px',
      },
      '&.data_file_description': {
        minWidth: '280px',
        width: '280px',
      },
      '&.data_file_format': {
        width: '100px',
      },

      '&.data_file_size': {
        width: '70px',
        paddingRight: '35px', // Align based on Footer Pagination 
        whiteSpace: 'nowrap',

      },
    },
  },

  MuiFormControlLabel: {
    root: {
      marginLeft: '6px',
      marginRight: '0px',
    },
  },
  MuiCheckbox: {
    colorSecondary: {
      color: '#969696',
      '&.Mui-checked': {
        color: '#6D5F5B'
      }
    }
  },
  MuiSvgIcon: { // CheckBox Icon
    root: {
      width: '.7em',
      height: '.7em',
      borderRadius: 0,
    }
  }
}

const commonFontStyles = {
  fontFamily: 'Open Sans',
  fontSize: '10px',
  fontWeight: 400,
  lineHeight: '13.62px',
  letterSpacing: '0.08em',
  color: '#000000',
};

const paginationCommonStyles = {
  ...commonFontStyles,
  paddingRight: '25px',
  borderTop: '3px solid #1E66A4',
};

export const extendedView = {
  tblTopPgn: {
    MuiTablePagination: {
      root: {
        ...paginationCommonStyles,
      },
      toolbar: {
        minHeight: '39px',
        ...commonFontStyles,
      },
      caption: {
        ...commonFontStyles,
      },
      select: {
        ...commonFontStyles,
      },
      selectIcon: {
        color: '#646464',
      },
      input: {
        ...commonFontStyles,
      },
      menuItem: {
        ...commonFontStyles,
      },
      actions: {
        ...commonFontStyles,
      },
    },
    MuiToolbar: {
      root: {
        marginLeft: '200px !important' // Temporally solution to Make CustomToolbar and top CustomPagination be on the same row
      }
    },

  },
  MuiToolbar: {
    root: {
      display: 'block',
      position: 'relative',
      textAlign: 'right',
      // flexDirection: 'row-reverse', /* or column-reverse for vertical layout */
    },
    regular: {
      minHeight: '53px !important'
    }
  },
  MuiIconButton: {
    root: {
      padding: '12px 12px 12px 4px'
    }
  }
};

export const tblPgn = {
  MuiTablePagination: {
    root: {
      ...commonFontStyles,
      paddingRight: '50px',
      borderTop: '3.02px solid #1E66A4',
      borderBottom: '3px solid #F4F4F4',
      '&:last-child': {
        paddingRight: '25px',
      }
    },
    toolbar: {
      minHeight: '39px',
      ...commonFontStyles,
      '& MuiTypography-root': {
        fontFamily: 'Open Sans',
        fontSize: '100px',
        fontWeight: 400,
        lineHeight: '13.62px',
        letterSpacing: '0.08em',
      }
    },
    caption: {
      ...commonFontStyles,
    },
    select: {
      ...commonFontStyles,
    },
    selectIcon: {
      color: '#646464',
    },
    input: {
      ...commonFontStyles,
    },
    menuItem: {
      ...commonFontStyles,
    },
    actions: {
      ...commonFontStyles,
    }
  },
};


export const tblContainer = {
  MuiTableContainer: {
    root: {
      width: '100%',
      overflowX: 'auto',
      transform: 'rotateX(180deg)',
      boxShadow: 'none',
      borderRadius: '0',
    },
  },
  MuiTable: {
    root: {
      transform: 'rotateX(180deg)',
      width: '100%',
      display: 'table',
      borderSpacing: '0',
      borderCollapse: 'collapse',
      borderTop: '4px solid #1E66A4',
    },
  },
  MuiPaper: {
    root: {
      '&::-webkit-scrollbar': {
        width: '7px',
        height: '0.4em',
      },
      '&::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px white',
        borderRadius: '0px',
        backgroundColor: '#ffffff',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#96CFED',
        outline: '1px solid #ffffff',
        borderRadius: '0px',
      },
    }
  },
};

const toolbar = {
  MuiToolbar: {
    root: {
      borderTop: '3px solid #1E66A4',

      display: 'flex',
      zIndex: '0',
      minHeight: '25px',
      alignItems: 'center',
      paddingTop: '8px',
      paddingBottom: '8px',
      justifyContent: 'space-between',
      backgroundColor: '#ffffff',
      marginTop: '-42px', // Temporally solution to Make CustomToolbar and top CustomPagination be on the same row
      width: '190px',
    },
    regular: {
      minHeight: '25px !important'
    },
    gutters: { // Temporally solution to Make CustomToolbar and top CustomPagination be on the same row
      paddingLeft: '32px !important',
      paddingRight: '0px !important'
    }
  },
}

export const themeConfig = {
  extendedView,
  toolbar,
  tblContainer,
  tblHeader,
  tblBody,
  // displayErr,
  tblPgn,
};

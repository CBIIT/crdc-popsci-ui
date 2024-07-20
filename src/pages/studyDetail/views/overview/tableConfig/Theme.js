// import { previousPageIcon } from '../../../../../bento/studyDetailData';

export const tblHeader = {
  MuiTableSortLabel: {
    root: {
      color: '#13344A',
      position: 'relative',
      fontSize: '11pt',
      fontFamily: 'Lato Regular,Raleway, sans-serif',
      fontWeight: 'bold',
      letterSpacing: '0.06em',
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
      minHeight: '450px',
      padding: '0px 5px 0px 42px',
    },
  },
};

const tblBody = {
  MuiTableRow: {
    head: {
      minHeight: '400px',
      borderBottom: '3px solid red',
    },
    root: {
      height: '45px',
      whiteSpace: 'nowrap',
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
      minHeight: '450px',
      padding: '0px 5px 0px 42px',
      color: 'red',
      borderBottom: 'none',
    },
    paddingCheckbox: {
      width: '48px',
      padding: '0 0 0 5px',
    },
    body: {
      fontFamily: 'Open Sans',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '17.66px',
      textAlign: 'left',

      color: '#4B4B4B',

      '&.first_name': {
        width: '209px',
      },
      '&.institution': {
        width: '240px',
      },
      '&.email': {
        width: '373px',
      },
      '&.person_role': {
        width: '213px',
        paddingRight: '35px' // Align based on Footer Pagination 
      },
    },
  },
}

export const extendedView = {
  tblTopPgn: {
    MuiTablePagination: {
      root: {
        paddingRight: '50px',
        borderTop: '3px solid #42779a',
      },
    },
  },
};

export const tblPgn = {
  MuiTablePagination: {
    root: {
      fontFamily: 'Open Sans',
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: '13.62px',
      letterSpacing: '0.08em',

      color: '#000000',

      paddingRight: '50px',
      borderTop: '3.02px solid #1E66A4',
      borderBottom: '3px solid #F4F4F4',
      '&:last-child': {
        paddingRight: '25px',
      }
    },
    toolbar: {
      minHeight: '39px',
      fontFamily: 'Open Sans',
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: '13.62px',
      letterSpacing: '0.08em',
      
      '& MuiTypography-root': {
        fontFamily: 'Open Sans',
        fontSize: '100px',
        fontWeight: 400,
        lineHeight: '13.62px',
        letterSpacing: '0.08em',
      }
    },

  // ROWS PER PAGE
  caption: { 
    fontFamily: 'Open Sans',
    fontSize: '10px',
    fontWeight: 400,
    lineHeight: '13.62px',
    letterSpacing: '0.08em',
  },

  // selectRoot: {},
  // The selected number i.e 10, 25 ...
  select: {
    fontFamily: 'Open Sans',
    fontSize: '10px',
    fontWeight: 400,
    lineHeight: '13.62px',
    letterSpacing: '0.08em',
  },
  selectIcon: {
    //top: 'calc(50% - 12px)', // Adjust if needed

    /* 
      *** Replace default Icons
        width: '24px',
        height: '24px',
        backgroundImage: `url(${previousPageIcon})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'transparent', // Hide the default icon
    */
    color: '#646464'
  },
  // Input Select
  input: {
    fontFamily: 'Open Sans',
    fontSize: '10px',
    fontWeight: 400,
    lineHeight: '13.62px',
    letterSpacing: '0.08em',
    
  },
  // Menu that opens up to change Rows per page
  menuItem: {
    fontFamily: 'Open Sans',
    fontSize: '10px',
    fontWeight: 400,
    lineHeight: '13.62px',
    letterSpacing: '0.08em',
  },
  // Previous and Next Actions
  actions: {
    fontFamily: 'Open Sans',
    fontSize: '10px',
    fontWeight: 400,
    lineHeight: '13.62px',
    letterSpacing: '0.08em',
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
    }
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
};

export const themeConfig = {
  tblHeader,
  tblBody,
  tblContainer,
  tblPgn,
  extendedView,
};

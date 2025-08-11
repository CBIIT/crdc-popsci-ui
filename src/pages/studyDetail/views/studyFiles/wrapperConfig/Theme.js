export const customTheme = {
  MuiContainer: {
    root: {
      '&.container_header': {
        textAlign: 'right',
        marginTop: '33px',
      },
      '&.container_footer': {
        paddingTop: '10px',
        textAlign: 'right',
      },
      '&.container_footer_link': {
        textAlign: 'right',
        paddingRight: '59px',
        height: '98px',
        fontSize: '12px',
        fontFamily: 'Lato',
        marginTop: '5px',
        textDecoration: 'none',
      },
      '& img': {
        verticalAlign: 'top',
        // '&.addAllTooltip': {},
        // '&.addSelectedFileTooltip': {},
      },
    },
  },
  MuiButton: {
    text: {
      padding: '10px 16px',
    },
    root: {
      color: '#FFFFFF',
      fontSize: '14px',
      fontFamily: 'Raleway',
      textTransform: 'uppercase',

      fontWeight: 700,
      fontStyle: 'Bold',
      lineHeight: '100%',
      letterSpacing: '2%',
      textAlign: 'center',
      verticalAlign: 'middle',

   
      padding: '14px 30px',
      borderRadius: '30px',

      '&.add_all_button': {
        marginLeft: '20px',
        marginRight: '2px',
        backgroundColor: '#3E7C9D',
      },
      '&.add_selected_button': {
        marginRight: '2px',
        backgroundColor: '#4B8074'
      },
      '&.add_selected_button_DataFiles': {
        backgroundColor: '#4B8074',
      },
      '&.Mui-disabled': {
        color: '#fff',
        '&.add_selected_button_DataFiles': {
          backgroundColor: '#08a3834f',
        },
      },
      '&.yesBtn': {
        width: '115px',
        height: '41px',
        cursor: 'pointer',
        background: '#0C534C',
        color: '#fff',
        marginLeft: '15px !important'
      },
      '&.noBtn': {
        width: '115px',
        height: '41px',
        cursor: 'pointer',
        background: '#4F5D69',
        color: '#fff',
      },
    },
  },
  MuiLink: {
    root: {
      height: '65px',
      color: '#3E6886',
      fontSize: '12px',
      fontFamily: 'Lato',
      borderBottom: '1px solid #3E6886',
      textDecoration: 'none',
    },
  },
  MuiDialog: {
    paper: {
      width: '573px',
      height: '206px',
      textAlign: 'center',
      backgroundColor: '#fff !important',

      fontFamily: 'Open Sans',
      fontWeight: 400,
      fontStyle: 'Regular',
      fontSize: '14px',
      lineHeight: '130%',
      letterSpacing: 0,

      backdropFilter: 'blur(4px)',

      padding: '50px 38px',
      margin: '0px'
    },
  },
  MuiDialogContent: {
    root: {
      '&:first-child': {
        paddingTop: '0px'
      },
    },
  },
  MuiDialogActions: {
    root: {
      justifyContent: 'center',
    },
  },
};

export const themeConfig = {
  customTheme,
};

export const customTheme = {
  MuiContainer: {
    root: {
      paddingTop: '5px',
      '&.container_header': {
        textAlign: 'right',
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
        // width: '29px',
        // paddingRight: '12px',
        verticalAlign: 'top',
        marginTop: '6px',
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
      marginTop: '6px',
      fontFamily: 'Raleway',
      // borderRadius: '10px',
      // marginBottom: '10px',
      textTransform: 'uppercase',

      fontWeight: 700,
      fontStyle: 'Bold',
      lineHeight: '100%',
      letterSpacing: '2%',
      textAlign: 'center',
      verticalAlign: 'middle',

   
      paddingTop: '14px',
      paddingRight: '30px',
      paddingBottom: '14px',
      paddingLeft: '30px',
      borderRadius: '30px',





      '&.add_all_button': {
        marginLeft: '20px',
        marginRight: '2px',
        // width: '120px',
        backgroundColor: '#3E7C9D',
      },
      '&.add_selected_button': {
        marginRight: '2px',
        backgroundColor: 'red'
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
        width: '133px',
        height: '45px',
        cursor: 'pointer',
        background: '#3E74B6',
      },
      '&.noBtn': {
        width: '133px',
        height: '45px',
        cursor: 'pointer',
        background: '#4F5D69',
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
      width: '431px',
      height: '170px',
      borderRadius: '25px !important',
      textAlign: 'center',
      backgroundColor: '#E8DFDC !important',
      border: '2px solid #A61401',
    },
  },
  MuiDialogContent: {
    root: {
      padding: '40px 20px 0px 20px',
      '&.alter-content': {
        fontFamily: 'Lato',
        size: '16px',
      },
    },
  },
  MuiDialogActions: {
    root: {
      justifyContent: 'center',
      paddingBottom: '25px',
    },
  },
};

export const themeConfig = {
  customTheme,
};

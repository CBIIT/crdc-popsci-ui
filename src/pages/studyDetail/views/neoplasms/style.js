const styles = (theme) => ({
    detailContainer: {
      margin: '30px auto',
      paddingLeft: '64px',
      fontFamily: theme.custom.fontFamilySans,
      letterSpacing: '0.014em',
      color: '#000000',
      size: '12px',
      lineHeight: '23px',
  
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start', // Align items to the top
      minHeight: '730px',
      maxHeight: '730px',

      marginBottom: '40px',
    },
  
    detailContainerLeft: {
      display: 'block',
      overflowY: 'auto',
      paddingTop: '30px',
      minHeight: '700px',
    },
    leftInnerContainer: {
      padding: '0px 65px 0px 0px'
    },
  
    detailContainerRight: {
      marginTop: '30px',
    },
    rightInnerContainer: {
      padding: '0px 53px 30px 43px',
    },
  
    scrollDiv: {
      minHeight: '700px',
      maxHeight: '700px',
      overflowY: 'scroll',
  
      '&::-webkit-scrollbar': {
        width: '0.5em',
        height: '0.4em',
      },
      '&::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px white',
        borderRadius: '0px',
        backgroundColor: '#ffffff',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#76C4E4',
        outline: '1px solid slategrey',
        borderRadius: '0px',
      },
    },
  
    mainLabel: {
      '& > span:first-child': {
        fontFamily: 'Open Sans',
        fontSize: '16px',
        fontWeight: 700,
        lineHeight: '20.8px',
        letterSpacing: '-0.01em',
  
        color: '#27424E',
        textTransform: 'uppercase',
      },
    },
    mainValue: {
      fontFamily: 'Open Sans',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '22px',
  
      color: '#4B4B4B',
      margin: '4px 0px 0px 10px',
    },
  
    keyAndValueRow: {
      display: 'flex',
      margin: '0px',
      padding: '0px',
    },
    label: {
      fontFamily: 'Open Sans',
      fontSize: '16px',
      fontWeight: 700,
      lineHeight: '16.8px',
      letterSpacing: '-0.01em',
  
      color: '#27424E',
      textAlign: 'left',
      width: '164px',
      minWidth: '164px',
      marginBottom: '20px',
    },
    value: {
      fontFamily: 'Open Sans',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '22px',
  
      color: '#4B4B4B',
      textAlign: 'left',
      paddingLeft: '55px',
    },
  
    link: {
      fontFamily: 'Open Sans',
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '18px',
      textAlign: 'left',
      color: '#005D85',
      textDecoration: 'underline',
      marginBottom: '5px',
    },
    externalLinkIcon: {
      marginLeft: '3px'
    },

    noData: {
      fontFamily: 'Open Sans',
      fontSize: '18px',
      fontWeight: 700,
      lineHeight: '23.4px',
      color: '#000',
    },
  
    /********           Smaller Screen Style              ********/
    '@media (max-width: 950px)': {
      detailContainer: {
        paddingLeft: '24px',
      },
      rightInnerContainer: {
        paddingLeft: '24px',
      },
      value: {
        paddingLeft: '24px',
      },
      studyFileContainer: {
        marginLeft: '24px !important',
      },
    },
  
    /********           Switch from Two to one column based layout      ********/
    '@media (max-width: 799px)': {
      detailContainer: {
        minHeight: 'fit-content',
        maxHeight: 'fit-content',
        borderRight: 'none',
      },
      leftInnerContainer: {
        padding: '0px 53px 0px 0px'
      },
      rightInnerContainer: {
        padding: '0px 53px 0px 0px'
      },
      scrollDiv: {
        maxHeight: 'fit-content',
        minHeight: 'fit-content',
        overflowY: 'auto',
      },
      borderRight: {
        borderRight: 'none',
      },
      detailContainerLeft: {
        minHeight: 'fit-content'
      },
      detailContainerRight: {
        minHeight: 'fit-content',
        paddingBottom: '30px',
      },
    },
  
    /********           Mobile sizing              ********/
    '@media (max-width: 470px)': {
      detailContainer: {
        paddingLeft: '10px',
        paddingRight: '10px',
      },
      value: {
        paddingLeft: '10px'
      },
      studyFileContainer: {
        marginLeft: '10px !important',
        marginRight: '10px !important',
      },

    },
  
    studyFileContainer: {
      margin: '56px 70px 100px 64px',
    },
    studyPersonnelTitle: {
      fontFamily: 'Open Sans',
      fontSize: '16px',
      fontWeight: 700,
      lineHeight: '20.8px',
      letterSpacing: '-0.01em',
      textAlign: 'left',
  
      textTransform: 'uppercase',
      paddingBottom: '18px',
      margin: '0px'
    },
    studyPersonnelTable: {
      paddingLeft: '10px',
    },
    noStudyRecords: {
      paddingLeft: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center', 
    },
  });

  export default styles;
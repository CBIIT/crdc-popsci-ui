export default (theme) => ({
  container: {
    paddingTop: '19px',
    fontFamily: 'Raleway, sans-serif',
    paddingLeft: '32px',
    paddingRight: '32px',
    maxWidth: `${theme?.custom?.maxContentWidth || '1440px'}`,
    margin: "0 auto",
  },
  // Study Header
  logo: {
    float: 'left',
    width: '81px',
    marginTop:'-10px',
    position: 'absolute',
  },
  header: {
    paddingLeft: '33px',
    marginTop: '30px',
    height: '80px',
    margin: 'auto',
    position: 'relative',
    borderBottom: '2px solid #658190',
    background: 'linear-gradient(270deg, #064667 20.89%, #225977 81.63%)',

    display: 'flex',
  },
  headerTitle: {
    margin: 'auto',
    float: 'left',
    marginLeft: '100px',
    display: 'flex',
    marginTop: '19px',
  },
  headerMainTitle: {
    fontFamily: 'Poppins',
    fontSize: '26px',
    fontWeight: 300,
    lineHeight: '27.7px',
    letterSpacing: '-0.02em',
    borderRight: '1px solid #FFFFFF',

    color: '#FFFFFF',
    width: '260px',
  },
  headerStudyShortName: {
    fontSize: '26px',
    fontWeight: 600,
    lineHeight: '24.36px',
    letterSpacing: '0.01em',

    paddingLeft: '14px',
  },
  headerStudyName: {
    fontFamily: 'Open Sans',
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: '16.5px',
    letterSpacing: '0.01em',
    color: '#B8E0F6',

    width: 'fit-content',
    whiteSpace: 'nowrap',
    paddingLeft: '35px',
    paddingTop: '6px',
  },
  numOfparticipants: {
    fontFamily: 'Open Sans',
    weight: 600,
    fontSize: '16px',
    lineHeight: '19.2px',
    border: '1px solid #71C3C9',
    borderRadius: '50px',

    margin: '20px 37.22px 20px 0px',
    padding: '8px 15px',
    height: '35px',
    float: 'right',
    textAlign: 'center',
    minWidth: 'fit-content',
    width: 'fit-content',

  },
  numOfparticipantsText: {
    color: '#AEFAFF',
  },
  numOfparticipantsCount: {
    color: '#FFFFFF',
    lineHeight: '17.6px',
    letterSpacing: '-0.02em',
  },

  // Tabs Component Style
  tabPrimaryColor: {
    fontFamily: 'Open Sans',
    fontSize: '17.5px',
    fontWeight: 400,
    lineHeight: '22.75px',
    letterSpacing: '0.01em',
    color: '#000000',
    padding: '10px 12px',
  },
  tabHighlightColor: {
    fontFamily: 'Poppins',
    fontSize: '17.5px',
    fontWeight: '600',
    lineHeight: '22.75px',
    letterSpacing: '0.015em',
    color: '#000000',
    padding: '10px 12px',
   
    borderBottom: '4px solid #073155',
  },
  hrLine: {
    marginTop: '-2px',
    marginBottom: '0',
    border: '1px solid #76C4E4',
  },
  tabContainer: {
    margin: 'auto',
    padding: '28px 59px 0px 59px',
    fontFamily: theme.custom.fontFamilySans,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',
    maxWidth: `${theme?.custom?.maxContentWidth || '1440px'}`,
    width: '1109px',
  },

  /********           Smaller Screen Style              ********/

  '@media (max-width: 1300px)': {
    headerMainTitle: {
      width: 'fit-content',
      paddingRight: '10px',

    },
    headerStudyName: {
      whiteSpace: 'wrap',
    },
  },

  '@media (max-width: 950px)': {
    tabContainer: {
      paddingLeft: '24px',
      paddingRight: '24px',
    },
  },

  '@media (max-width: 899px)': {
    headerTitle: {
      flexDirection: 'column',
      marginTop: '5px',
    },
    headerMainTitle: {
      flex: 1,
      paddingRight: '10px',
      borderRight: 'none',
    },
    headerStudyName: {
      flex: 1,
      paddingLeft: '0px',
      paddingTop: '6px',
    },
  },

  '@media (max-width: 790px)': {
    numOfparticipants: {
      margin: '20px 5px 20px 0px',
    },
  },

  '@media (max-width: 470px)': {
    tabContainer: {
      paddingLeft: '10px',
      paddingRight: '10px',
    },
  },
});

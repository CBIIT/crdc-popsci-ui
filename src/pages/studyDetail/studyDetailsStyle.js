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

    minWidth: 'fit-content',
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
    width: '275px',
    height: '35px',
    float: 'right',
    textAlign: 'center',
  },
  numOfparticipantsText: {
    color: '#AEFAFF',
  },
  numOfparticipantsCount: {
    color: '#FFFFFF',
    lineHeight: '17.6px',
    letterSpacing: '-0.02em',
  },

  // Study Tabs
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
    padding: '28px 50px 0px 50px',
    fontFamily: theme.custom.fontFamilySans,
    letterSpacing: '0.014em',
    color: '#000000',
    size: '12px',
    lineHeight: '23px',
    maxWidth: `${theme?.custom?.maxContentWidth || '1440px'}`,
  },

  // Smaller View
  '@media (max-width: 740px)': {
    headerTitle: {
      position: 'absolute',
      top: '0px',
    },
    headerButton: {
      marginLeft: '95px',
      marginTop: '28px',
      float: 'left',
    },
  },
  '@media (max-width: 460px)': {
    tabContainer: {
      paddingLeft: '10px',
      paddingRight: '10px',
    },
  },
});

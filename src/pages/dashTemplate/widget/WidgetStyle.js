const styles = (theme) => ({
  dashboardContainer: {
    backgroundColor: '#FFFFFF',
  },
  dashboardDivider: {
    height: 16,
    marginTop: '32px',
    backgroundColor: '#E2E7EC',
  },
  dashboardDividerTop: {
    height: 16,
    backgroundColor: theme.palette.widgetBackground.main,
  },
  rightContent: {
    maxWidth: 'calc(100% - 250px)',
    position: 'relative',
    borderRight: 'thin solid #B1B1B1',
  },
  content: {
    display: 'flex',
    maxWidth: `${theme?.custom?.maxContentWidth || '1440px'}`,
    margin: 'auto',
  },
  widgetsContainer: {
    background: theme.palette.widgetBackground.main,
  },
  contentShift: {
    width: `calc(100vw - ${theme.custom.drawerWidth})`,
    marginLeft: theme.custom.drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  card: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    textAlign: 'center',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  sunburst: {
    textAlign: 'center',
  },
  widgetInner: {
    marginTop: '-8px',
    borderBottom: '6px solid #E2E7EC',
  },
  widgetsCollapse: {
    background: theme.palette.widgetBackground.main,
  },
  floatRight: {
    float: 'right',
    marginRight: '80px',
    marginTop: '4px'
  },
  floatLeft: {
    float: 'left',
  },
  customSwitch: {
    marginTop: '-6px',
  },
  customButton: {
    display: 'none',
    borderRadius: '0 0 18px 18px',
    minHeight: '20px',
    fontSize: 8,
    color: '#ffffff',
    textTransform: 'none',
    backgroundColor: '#566672',
    marginRight: '4px',
    fontFamily: theme.custom.fontFamilySans,
    marginTop: '-4px',
    '&:hover': {
      backgroundColor: '#566672',
    },
  },
  backgroundWidgets: {
    background: theme.palette.widgetBackground.main,
    margin: '30px 0px 10px 0',
    border: '0.5px solid #B4B4B4',
  padding: '10px 20px 50px 20px',
    boxSizing: 'border-box',
    '@media (min-width: 1430px)': {
      paddingLeft: 30,
      paddingRight: 30,
    },
    '@media (min-width: 670px)': {
      paddingLeft: 20,
      paddingRight: 20,
    },
    '@media (min-width: 384px) and (max-width: 669px)': {
      paddingLeft: 16,
      paddingRight: 16,
    },
    '@media (max-width: 383px)': {
      paddingLeft: 12,
      paddingRight: 12,
    },
  },
  sideBar: {
    width: '250px',
    overflowX: 'hidden',
    backgroundColor: 'transparent',
    borderRight: 'thin solid #B1B1B1',
    borderLeft: 'thin solid #B1B1B1',
    overflow: 'auto',
    zIndex: '99',
  },
  statsBar: {
    position: 'fixed',
  },
  switchRoot:{
    display: 'none',
  },
  switchBase: {
    color: theme.palette.widgetBackground.contrastText,
    '&$checked': {
      color: theme.palette.widgetBackground.contrastSwicthColor,
    },
    '&$checked + $track': {
      backgroundColor: theme.palette.widgetBackground.contrastText,
    },
  },
  checked: {},
  track: {},
  title: {
    maxWidth: '200px',
    textAlign: 'center',
    margin: '0 auto',
  },
  widgetGridItem: {
    boxSizing: 'border-box',
    flexGrow: 0,
    flexBasis: '100%',
    maxWidth: '100%',
    '@media (min-width: 670px)': {
      flexBasis: '50%',
      maxWidth: '50%',
    },
    '@media (min-width: 1430px)': {
      flexBasis: '33.3333%',
      maxWidth: '33.3333%',
    },
  },
});

export default styles;

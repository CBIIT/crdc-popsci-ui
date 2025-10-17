const SIDEBAR_WIDTH = '285px';

export default (theme) => ({
  dashboardContainer: {
    backgroundColor: '#FFFFFF',
  },
  content: {
    display: 'flex',
    maxWidth: `${theme?.custom?.maxContentWidth || '1440px'}`,
    margin: 'auto',
    padding: '0 32px',
  },
  widgetsContainer: {
    "& svg.recharts-surface, & .MuiPaper-root": {
      overflow: "visible",
    },
    overflow: 'auto',
  },
  sideBar: {
    width: SIDEBAR_WIDTH,
    flex: `0 0 ${SIDEBAR_WIDTH}`,
    boxSizing: 'border-box',
    maxHeight: '1300px',
    overflowX: 'hidden',
    backgroundColor: 'transparent',
    // borderLeft: 'thin solid #B1B1B1',
    overflow: 'auto',
    zIndex: '99',
    paddingBottom: '150px',

    '&::-webkit-scrollbar': {
      width: '0.5em',
      height: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px #ccc',
      borderRadius: '0px',
      backgroundColor: '#CECECE',
      border: '1px solid #003F74',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#003F74',
      outline: '1px solid slategrey',
      borderRadius: '0px',
    },
  },
  rightContent: {
    width: `calc(100% - ${SIDEBAR_WIDTH})`,
    position: 'relative',
    marginLeft: '25px',
  },
  visuallyHidden: {
    visibility: 'hidden',
    pointerEvents: 'none',
    border: 0,
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px',
  }
});

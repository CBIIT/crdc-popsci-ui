const SCROLL_HEIGHT = '700px';
const DETAIL_HEIGHT = '730px';
const COLUMN_GAP = '100px';
const ROW_GAP = '20px';

const styles = theme => ({
  detailContainer: {
    margin: '30px auto',
    marginBottom: '40px',
    paddingLeft: '64px',
    fontFamily: theme.custom.fontFamilySans,
    letterSpacing: '0.014em',
    fontSize: '12px',
    lineHeight: '23px',
    color: '#000000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: DETAIL_HEIGHT,
    maxHeight: DETAIL_HEIGHT,
  },

  scrollDiv: {
    minHeight: SCROLL_HEIGHT,
    maxHeight: SCROLL_HEIGHT,
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

  CancerTypeSwitch: {
    paddingLeft: '9px',
  },

  radioButtonSpacing: {
    marginRight: '89px',
  },

  CancerTypeLabel: {
    fontFamily: 'Open Sans',
    fontSize: '16px !important',
    color: '#4B4B4B',
    fontWeight: 400,
    lineHeight: '22px',
    '.Mui-checked + &': {
      color: '#3B7E97',
      fontWeight: 700,
      fontSize: '16px !important',
      textDecoration: 'underline',
      textDecorationThickness: '1.5px',
      textUnderlineOffset: '4px',
    },
  },

  NumCancerType: {
    paddingLeft: '23px',
    '& > span:first-child': {
      fontFamily: 'Open Sans',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '22px',
      color: '#245F7B',
    },
  },

  mainLabel: {
    '& > span:first-child': {
      fontFamily: 'Open Sans',
      fontSize: '16px',
      fontWeight: 700,
      lineHeight: '105%',
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
    color: '#000000',
    margin: '-20px 0 0 30px',
  },

  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: `${ROW_GAP} ${COLUMN_GAP}`,
    justifyContent: 'center',
    marginTop: '20px',
  },

  neoplasmText: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '6px',
    margin: '5px 0',
    wordBreak: 'break-word',
    fontFamily: 'Open Sans',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '22px',
    letterSpacing: 0,
  },

  code: {
    fontFamily: 'Open Sans',
    fontWeight: 400,
    fontSize: '13px',
    lineHeight: '22px',
    letterSpacing: 0,
    textTransform: 'uppercase',
    color: '#5B7886',
  },

  term: {
    flex: 1,
    color: '#000000',
  },

  count: {
    color: '#245F7B',
    marginLeft: 6,
    fontWeight: 600,
    fontSize: '14px',
  },

  /* Smaller Screen Style */
  [theme.breakpoints.down(950)]: {
    detailContainer: {
      paddingLeft: '24px',
    },
  },

  /* Switch from Three to Two Column */
  [theme.breakpoints.down(1100)]: {
    detailContainer: {
      minHeight: 'fit-content',
      maxHeight: 'fit-content',
      borderRight: 'none',
    },
    scrollDiv: {
      minHeight: 'fit-content',
      maxHeight: 'fit-content',
      overflowY: 'auto',
    },
    borderRight: {
      borderRight: 'none',
    },
    gridContainer: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },

  /* Switch from Two to One Column */
  [theme.breakpoints.down(800)]: {
    detailContainer: {
      paddingLeft: '10px',
      paddingRight: '10px',
    },
    gridContainer: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
});

export default styles;
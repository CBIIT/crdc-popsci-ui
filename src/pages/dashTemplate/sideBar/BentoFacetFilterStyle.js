export default () => ({
  // Clear Facet
  clearAllButtonRoot: {
    margin: 'auto',
  },
  customButton: {
    padding: '0px !important',
    borderRadius: '9px',

    maxWidth: '32px',
    minWidth: '32px',

    maxHeight: '30px',
    minHeight: '30px',

    marginTop: '0px',
    fontSize: 9,
    textTransform: 'none',
    color: '#3d4241',
    marginLeft: '0px',
    '&:hover': {
      backgroundColor: '#415153',
      color: 'white',
      border: '1px solid #435C60 !important',
      '& $resetIcon': {
        fill: '#FFFFFF !important',  // Change SVG color on hover
      },
    },
  },
  floatRight: {
    margin: '17px 0px 14px 20px',
  },
  resetText: {
    marginTop: '0px',
    marginLeft: '8px',
    color: '#415153',
    fontSize: '14px',
    fontWeight: 600,
  },
  resetTextDisabled: {
    marginTop: '0px',
    marginLeft: '10px',
    color: '#AEBDBE',
    fontSize: '14px',
    fontWeight: 600,
  },
  resetIcon: {
    '&:hover': {
      fill: '#FFFFFF',
    },
  },
  // Clear Facet style end
  cases: {
    height: '5px',
  },
  Cases: {
    height: '5px',
    margin: '0px',
    backgroundColor: '#0d8461',
  },
  Samples: {
    height: '5px',
    margin: '0px',
    backgroundColor: '#10beff',
  },
  Files: {
    height: '5px',
    margin: '0px',
    backgroundColor: '#e636e4',
  },
  sectionSummaryText: {
    flexShrink: '0',
    marginLeft: '5px',
    overflowWrap: 'break-word',

    fontFamily: 'Open Sans',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '21.79px',
    letterSpacing: '-0.02em',
    textAlign: 'left',

    color: '#000000',
  },
  dropDownIconSubSection: {
    marginLeft: '0px',
    fill: '#000000',
  },
  customExpansionPanelSummaryRoot: {
    flexDirection: 'row-reverse',
    padding: '19px !important',
    border: '1px solid red !important'
  },
  customExpansionPanelSummaryRoot2: {
    // border: '1px solid red !important',
    padding: '18px 8px 16px 19px !important',

  },
  customExpansionPanelSummaryRootView: {
    flexDirection: 'row-reverse',
    paddingLeft: 8,
    // border: '1px solid black !important',
    minHeight: '42px',
    maxHeight: '42px',
    height: '42px'

  },
  sectionSummaryTextContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
    fontFamily: 'Poppins, Open Sans',
    fontSize: '18.5px', // 20
    fontWeight: 500,
    marginLeft: 3,
    color: '#000000',

    lineHeight: '19.71px',
    letterSpacing: '-0.02em',
  },
  sectionSummaryTitle: {
    position: 'relative', // So the icon can be positioned relative to this container
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: -15,
    cursor: 'pointer',
  },

  customTooltip: {
    fontFamily: 'Nunito',
    color: '#595959',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '19.6px',
    letterSpacing: '0em',
    textAlign: 'left',

    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    border: '1px solid #818181',
    boxShadow: '0px 4px 4px 0px #00000040',

    minWidth: '270px',
    height: '32px',
    padding: '6px 10px'
  },
  customArrow: {},
  CasesCheckbox: {
    color: '#10A075',
  },
  CasesCheckedIcon: {
    color: '#10A075',
  },
  checkboxRoot: {
    marginLeft: '5px',
    height: 12,
  },
  panelDetailText: {
    color: '#323232',
    fontFamily: 'Nunito',
    fontSize: '16px',
    fontWeight: '200',
  },
  panelSubjectText: {
    color: '#323232',
    fontFamily: 'Nunito',
    fontSize: '14px',
    marginRight: '0px',
  },
  "activeFacetFilter_by_Studies": {
    color: '#7A5015',

    fontWeight: 700,
    lineHeight: '20.8px',
    letterSpacing: '-0.01em',
  },
  "activeFacetFilter_by_Participants": {
    color: '#245F75',

    fontWeight: 700,
    lineHeight: '20.8px',
    letterSpacing: '-0.01em',
  },
  searchContainer: {
    paddingTop: '15px',
    margin: '0 2px',
    marginRight: 6,
  },
  findCaseButton: {
    marginLeft: '0px', // 105px
    backgroundColor: '#10A075',
    boxSizing: 'border-box',
    height: 30,
    width: 40,
    border: '1.25px solid #0D8461',
    cursor: 'pointer',
    borderRadius: 11,
    display: 'flex',
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  findCaseIcon: {
    width: 17,
    height: 17,
  },
  uploadButton: {
    boxSizing: 'border-box',
    fontWeight: '400',
    height: 32,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#10A075',
    color: '#fff',
    border: '1px solid #0D8461',
    borderRadius: 10,
    fontFamily: 'Lato',
    fontSize: 11,
    boxShadow: 'none',
    paddingLeft: 16,
    paddingRight: 12,
    '&:hover': {
      backgroundColor: '#10A075',
    },
  },
  iconSpan: {
    marginTop: '5.2px',
  },
  uploadIcon: {
    height: 19,
    width: 19,
  },
  customListPadding: {
    paddingTop: 8,
  },
  customDivider: {
    backgroundColor: '#B1B1B1',
    height: '2px',
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 6,
  },
});

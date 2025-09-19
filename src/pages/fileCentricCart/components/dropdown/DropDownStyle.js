export const DROP_DOWN_WIDTH = '235px';
const MAIN_BUTTON_COLOR = '#487D83';
const DROP_DOWN_OPEN = '#14616A';
const WHITE = '#FFFFFF';
const EXPORT_AND_DOWNLOAD_BTN_HEIGHT = '36px';

const commonTooltipStyle = {
  fontFamily: 'Nunito',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '17px',
  letterSpacing: '0%',


  backgroundColor: '#FFFFFF !important',
  color: '#595959',
  border: '1px solid #818181 !important',
  minWidth: '282px',
  maxWidth: '382px',

  textAlign: 'left',
  padding: '12px',

  boxShadow: '0px 4px 4px 0px #00000040',
}

export default () => ({
  dropDownBtnContainer : {
    float: 'right',
    maxHeight: EXPORT_AND_DOWNLOAD_BTN_HEIGHT
  },
  disableDropDownBtn: {
    opacity: '0.5',
    cursor: 'not-allowed',
  },
  availableDownloadDropdownBtn: {
    backgroundColor: MAIN_BUTTON_COLOR,
    color: '#ffffff',
    border: `1px solid ${MAIN_BUTTON_COLOR}`,
    borderRadius: '30px',

    width: DROP_DOWN_WIDTH,
    boxShadow: 'none',
    textWrap: 'nowrap',
    '&:hover': {
      backgroundColor: DROP_DOWN_OPEN,
      boxShadow: 'none',
    },
  },
  availableDownloadDropdownBtnIsOpen: {
    backgroundColor: DROP_DOWN_OPEN,
    color: '#ffffff',
    borderTopRightRadius: '18px',
    borderTopLeftRadius: '18px',
    borderBottomRightRadius: '0px',
    borderBottomLeftRadius: '0px',

    width: DROP_DOWN_WIDTH,
    boxShadow: 'none',
    textWrap: 'nowrap',
    '&:hover': {
      backgroundColor: DROP_DOWN_OPEN,
      boxShadow: 'none',
    },
  },
  availableDownloadDropdownBtnLabel: {
    fontFamily: 'Raleway',
    fontWeight: 700,
    fontStyle: 'Bold',
    fontSize: 14,
    lineHeight: '100%',
    letterSpacing: '2%',
    textAlign: 'center',
    textTransform: 'uppercase',

    height: EXPORT_AND_DOWNLOAD_BTN_HEIGHT,
    color: WHITE,
    padding: '10px 15px',
  },
  availableDownloadBtn: {
    backgroundColor: '#3C597C !important',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
  },
  availableDownloadDropdownBtnStartIcon: {
    margin: '0px',
  },

  // ------------------------ Drop Down Box ---------------------
  dropdownMenuList: {
    paddingTop: '0px',
    // marginTop: '-1px',
    paddingBottom: '0px',
  },
  dropdownPaper: {
    position: 'absolute',
    left: '1px',
    maxWidth: '500px',
    borderRadius: '0px',
    borderBottomRightRadius: '10px',
    borderBottomLeftRadius: '10px',
    zIndex: 100,
  },
  endIcon: {
    // marginRight: '12px',
    marginLeft: '15px',
    marginRight: '0px'
  },
  downloadFileManifestTooltipWrapper: {
    // display: 'flex',
    gap: '8px',
  },
  downloadFileManifestTooltip: {
    // display: 'flex',
    gap: '8px'
  },
  menuItemTooltip: {
    ...commonTooltipStyle,

    left: '-22px'
  },
  customTooltip: {
    ...commonTooltipStyle
  },
  arrow: {
    color: (props) => props.arrowColor || '#FFFFFF',
    '&::before': {
      border: '1px solid #B1B1B1',
    },
  },
  cgcIcon: {
    // marginTop: '10px',
    // marginLeft: '7px',
    marginTop: '7px'
  },
  dropDownLabel: {
    fontFamily: 'Raleway',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '14px',
    letterSpacing: '2%',
    verticalAlign: 'middle',

    textAlign: 'left',
    textWrap: 'wrap',
    color: DROP_DOWN_OPEN,
  },
  linkIcon: {
    width: '12px',
    height: '12px',
    verticalAlign: 'middle', // Aligns the icon with text
  },
  downloadFileIcon: {
    margin: '3px 2px 0px 0px',
    float: 'right',
  },
});
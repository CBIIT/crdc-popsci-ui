const buttonRoot = {
  height: "46px",
  fontSize: "17.5px",
  marginRight: "0px",
  padding: "10px 12px",
  fontFamily: "Open Sans",
  fontWeight: 400,
  lineHeight: "22.75px",
  textTransform: "none",
};

const styles = () => ({
  global_search_tab_label_1: {
    border: "1px solid black",
  },
  allText: {
    marginLeft: "8px",
  },
  subjectTab: {
    color: "#142D64",
  },
  indicator: {
    backgroundColor: "#073155",
    height: "4px",
  },
  disabledIndicator: {
    display: "none",
  },
  disabledTab: {
    color: "#A4A4A4 !important",
    opacity: "1 !important",
    pointerEvents: "none",
    "& $tabColor": {
      color: "#A4A4A4",
    },
  },
  tabContainter: {
    display: "flex",
    width: "100%",
    height: "46px",
    margin: "0 auto",
    justifyContent: "center",
    minWidth: "0 !important",
    "& .MuiTabs-flexContainer": {
      gap: "60px",
    },
    "& .MuiTab-root": {
      minWidth: "0 !important",
      padding: "10px 12px",
      boxSizing: "border-box",
      borderBottom: "4px solid transparent",
      color: "#000000",
      fontFamily: "Open Sans",
      fontSize: "17.5px",
      fontWeight: 400,
      lineHeight: "22.75px",
      letterSpacing: "0.17px",
      textTransform: "capitalize",
    },
    "& .MuiTab-root.Mui-selected": {
      color: "#000000",
      fontWeight: 600,
      letterSpacing: "0.26px",
    },
    "@media (max-width: 750px)": {
      gap: 0,
      padding: "0 8px",
      boxSizing: "border-box",
      overflow: "hidden",
      "& .MuiTabs-flexContainer": {
        width: "100%",
        gap: 0,
      },
      "& .MuiTab-root": {
        minWidth: "0 !important",
        flex: "1 1 25%",
        padding: "10px 12px",
        fontSize: "14px",
      },
    },
  },
  tabColor: { color: "#000000" },
  allButton: {
    ...buttonRoot,
  },
  studyButton: {
    ...buttonRoot,
  },
  participantButton: {
    ...buttonRoot,
    width: "126px",
    minWidth: "126px",
  },
  biospecimenButton: {
    ...buttonRoot,
    minWidth: "140px",
  },
  aboutButton: {
    ...buttonRoot,
  },
  modelButton: {
    ...buttonRoot,
  },
  input: {
    borderRadius: "8px",
    borderColor: "#616161",
    color: "#747474",
    fontFamily: "Lato",
    fontSize: "25px",
  },
  heroArea: {
    width: "100%",
    minHeight: "227px",
    padding: "73px 20px 46px",
    boxSizing: "border-box",
    background:
      "linear-gradient(107deg, rgba(95, 53, 134, 0.8), rgba(31, 99, 148, 0.8)), #285A6C",
  },
  searchTitle: {
    color: "#FFFFFF",
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: "32px",
    lineHeight: "35px",
    letterSpacing: "0.32px",
    margin: "0px 0px 10px 0px",
    textAlign: "center",
    "@media (max-width: 750px)": {
      fontSize: "24px",
      lineHeight: "30px",
    },
  },
  autocomplete: {
    margin: "0 auto",
    width: "700px",
    '& .MuiAutocomplete-inputRoot[class*="Mui-focused"]': {
      outline: "4px solid #3395CA",
    },
    "&:hover .MuiAutocomplete-inputRoot": {
      outline: "4px solid #3395CA",
    },
    "@media (max-width: 750px)": {
      width: "100%",
      minWidth: "300px",
      maxWidth: "700px",
    },
  },
  chipSection: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: "10px",
    },
  },
  enterIcon: {
    height: "12px",
    margin: "0px 18px 0px 6px",
  },
  button: {
    borderRadius: "30px",
    width: "100px",
    lineHeight: "37px",
    fontSize: "16px",
    textTransform: "uppercase",
    fontFamily: "Lato",
    color: "#000",
    backgroundColor: "#fff",
    marginTop: "32px",
    marginBottom: "32px",
    marginRight: "24px",
    borderWidth: "1px",
    borderColor: "black",
  },
  bodyContainer: {
    background: "#FFFFFF",
    color: "#000000",
    fontSize: "15px",
    lineHeight: "22px",
    marginBottom: "45px",
    "& .MuiTabPanel-root": {
      padding: "0px !important",
      marginTop: "45px",
    },
    paddingTop: "24px",
  },
  noResultsBody: {
    "& .MuiTabPanel-root": {
      display: "none",
    },
  },
  width1100: {
    maxWidth: "1100px",
    margin: "0px auto 0px auto",
  },
  searchItem: {
    minHeight: "100px",
    padding: "16px",
  },
  backdrop: {
    // position: 'absolute',
    zIndex: 99999,
    background: "rgba(0, 0, 0, 0.1)",
  },
  filterIcon: {
    height: "0.86rem",
    margin: "0px 16px 0px 6px",
    display: "inline-flex",
    verticalAlign: "middle",
  },
  textFieldRoot: {
    "& .MuiOutlinedInput-root": {
      background: "#fff",
      paddingLeft: "12px",
      paddingTop: "2px",
      paddingBottom: "3px",
      color: "#1B1B1B",
      fontFamily: "Roboto, Lato",
      fontSize: "16px",
      borderRadius: "0px",
      "& fieldset": {
        border: "1px solid #067CA5",
      },
      "&.Mui-focused fieldset": {
        border: ".5px solid #1B1B1B",
      },
    },
    "& .MuiOutlinedInput-input": {
      "&::placeholder": {
        fontFamily: "Roboto, lato",
        color: "#225987", // Placeholder text color
      },
    },
  },
  // Popper
  root: {
    marginTop: "-5px",
    zIndex: 1100,
    "& .MuiPaper-root": {
      borderRadius: 0,
    },
    "& .MuiAutocomplete-listbox": {
      fontFamily: "Roboto, Lato",
      fontSize: "16px",
      color: "#1B1B1B",
      fontWeight: 500,
      border: ".5px solid #1B1B1B",
      padding: "0px",
      "& li": {
        // list item specific styling
      },
      "& :hover": {
        color: "white",
        backgroundColor: "#007BBD",
      },
    },
  },
  searchIcon: {
    height: "22px",
    margin: "0px 6px 0px 6px",
  },
  searchIconSpan: {
    cursor: "pointer",
    zIndex: 40,
  },
  clearIcon: {
    height: "18px",
  },
  filterByIconContainer: {
    marginRight: "12px",
  },
  filterByIcon: {
    color: "#142D64",
    verticalAlign: "middle",
  },
  filterByTextContainer: {
    marginRight: "60px",
    fontSize: "16px",
    lineHeight: "16px",
    color: "#142D64",
    "@media (max-width: 1000px)": {
      marginRight: "30px",
    },
  },
  totalResults: {
    color: "#27424E",
    fontFamily: "Open Sans",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "20.8px",
    textTransform: "lowercase",
    textAlign: "left",
    paddingLeft: "32px",
    boxSizing: "border-box",
    maxWidth: "1047px",
    margin: "0px auto 20px auto",
  },
  totalCount: {
    fontFamily: "Open Sans",
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: "20.8px",
    color: "#27424E",
  },
  subsection: {
    maxWidth: "1047px",
    margin: "0 auto",
    background: "#FFFFFF",
  },
  subsectionBody: {
    // Override the library's xs={9} 75% width restriction
    maxWidth: "100% !important",
    flexBasis: "100% !important",
    width: "100%",
    minWidth: "0px",
    margin: "0 auto",
  },
  paginationContainer: {
    paddingBottom: "0px",
  },
  noData: {
    display: "none",
  },
  noResultsWrapper: {
    width: "100%",
    padding: "60px max(20px, calc((100% - 1047px) / 2))",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  noResultsContent: {
    width: "100%",
    maxWidth: "1047px",
    paddingTop: "40px",
    boxSizing: "border-box",
  },
  suggestedTopics: {
    width: "100%",
    padding: "0 18px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "20px",
  },
  suggestedTopicsTitle: {
    margin: 0,
    color: "#136071",
    fontFamily: "Poppins",
    fontSize: "28px",
    fontWeight: 500,
    lineHeight: "33px",
  },
  suggestedTopicsGrid: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    columnGap: "30px",
    rowGap: "20px",
    "@media (max-width: 750px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
      rowGap: "10px",
    },
  },
  suggestedTopic: {
    width: "100%",
    minWidth: 0,
    padding: "10px 18px 15px",
    border: 0,
    background: "transparent",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "10px",
    textAlign: "left",
    cursor: "pointer",
    "&:hover $suggestedTopicTitle, &:focus-visible $suggestedTopicTitle": {
      textDecoration: "underline",
    },
    "&:focus-visible": {
      outline: "2px solid #136071",
      outlineOffset: "2px",
    },
  },
  suggestedTopicTitle: {
    color: "#27424E",
    fontFamily: "Open Sans",
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "18px",
  },
  suggestedTopicDescription: {
    width: "100%",
    color: "#4B4B4B",
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "23px",
    letterSpacing: "0.32px",
  },
  noResultsMessage: {
    width: "100%",
    maxWidth: "1047px",
    minHeight: "86px",
    padding: "0 15px",
    borderBottom: "1px solid #CCCED1",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "flex-start",
    color: "#27424E",
    fontFamily: "Poppins",
    fontSize: "18px",
    fontWeight: 500,
    lineHeight: "16px",
    "@media (max-width: 750px)": {
      minHeight: "64px",
      lineHeight: "22px",
    },
  },
});

export default styles;

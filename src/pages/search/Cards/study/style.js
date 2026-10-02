import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => {
  const lgBreakpoint = "@media (min-width: 1000px)";

  return {
    card: {
      "&:last-child $hrContainer": {
        display: "none",
      },
      "&:first-child": {
        borderTop: "0.25px solid #828282",
      },
      width: "100%",
      maxWidth: "100%",
      margin: "0 auto",
      padding: "15px 32px 30px",
      boxSizing: "border-box",
      borderBottom: "0.25px solid #828282",
    },
    keyAndValueRow: {
      display: "flex",
      margin: "0px",
      padding: "0px",
      gap: "15px",
      flexWrap: "wrap",
      alignItems: "center",
    },
    row: {
      display: "flex",
      flexDirection: "column",
      margin: "0px",
      padding: "0px 0px 0px 4px",
    },
    column: {
      flex: 1,
      margin: "0px",
      padding: "0px",
    },
    leftColumn: {
      [lgBreakpoint]: {
        marginLeft: "20px",
      },
    },
    titleRow: {
      marginBottom: "17px",
      display: "flex",
      margin: "0px",
      padding: "0px",
      flexWrap: "wrap",
      alignItems: "center",
    },
    titleKey: {
      margin: "0px",
      padding: "5px 20px",
      borderRadius: "20px",
      gap: "10px",
      flexShrink: 0,
      whiteSpace: "nowrap",
      fontFamily: "Poppins",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "normal",
      color: "#FFFFFF",
      backgroundColor: "#0A8189",
    },
    titleValue: {
      margin: "0px",
      padding: "0px",
      marginLeft: "15px",
      fontFamily: "Open Sans",
      fontSize: "18px",
      fontWeight: 600,
      lineHeight: "19.8px",
      letterSpacing: "0px",
      textAlign: "left",
      color: "#27424E",
    },
    titleLink: {
      color: "#004D73",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    key: {
      fontFamily: "Open Sans",
      fontSize: "16px",
      fontWeight: 700,
      lineHeight: "16.8px",
      letterSpacing: "0px",
      textAlign: "left",
      margin: "0px",
      padding: "0px",
      textTransform: "uppercase",
    },
    value: {
      fontFamily: "Open Sans",
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "22px",
      letterSpacing: "0.32px",
      textAlign: "left",
      margin: "0px",
      padding: "2px 0px",
    },
    hrContainer: {
      paddingTop: "10px",
      paddingBottom: "10px",
      maxWidth: "100%",
      marginLeft: "0px",
    },
    hr: {
      width: "100%",
      border: "0",
      margin: "0",
      padding: "0px",
    },
  };
});

export default useStyles;

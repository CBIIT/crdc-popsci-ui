import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";
import Anchor from "../../../utils/Anchor";

const AboutCard = ({ searchText, data, classes, index }) => {
  const results = data.text.map((result) => result.replaceAll("$", ""));

  function getHighlightedText(text, highlight, classes) {
    // Split on highlight term and include term into parts, ignore case
    const textString = text.reduce((searchResults, currentString) => {
      const punctuationRegex = /[.,:;!?]$/;
      let newResults = searchResults;

      if (punctuationRegex.test(currentString)) {
        newResults = `${`${newResults} ${currentString.slice(0, -1)}`} ...`;
      } else {
        newResults = `${`${newResults} ${currentString}`} ... `;
      }
      return newResults;
    }, "");
    const parts = textString.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {" "}
        {parts.map((part, i) => (
          <span
            id={i}
            className={
              part.toLowerCase() === highlight.toLowerCase()
                ? classes.highlightText
                : {}
            }
          >
            {part}
          </span>
        ))}{" "}
      </span>
    );
  }

  return (
    <Grid
      item
      container
      className={classes.card}
      id={`global_search_card_${index}`}
    >
      <Grid item xs={true} className={classes.propertyContainer}>
        <div className={classes.titleRow}>
          <span className={classes.detailContainerHeader}>GENERAL</span>
          <Typography variant="h3" className={classes.cardTitle}>
            {data.title}
          </Typography>
        </div>
        <div className={classes.cardBody}>
          <div className={classes.text}>
            {getHighlightedText(results, searchText, classes)}
          </div>
          <div className={classes.linkText}>
            <Anchor
              link={data.page}
              text={`${window.location.origin}${data.page}`}
              classes={classes}
            />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

const styles = (theme) => {
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
    linkText: {
      marginTop: "4px",
    },
    link: {
      fontFamily: "Open Sans",
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: "22px",
      letterSpacing: "0em",
      textAlign: "left",
      color: "#005D85",
      textDecoration: "underline",
      "&:hover": {
        textDecoration: "none",
      },
    },
    titleRow: {
      display: "flex",
      alignItems: "center",
      margin: "0px",
      padding: "0px",
      marginBottom: "17px",
    },
    cardTitle: {
      textDecoration: "none",
      fontFamily: "Open Sans",
      fontWeight: 600,
      fontSize: "18px",
      lineHeight: "19.8px",
      color: "#27424E",
      paddingLeft: "15px",
      verticalAlign: "middle",
    },
    detailContainerHeader: {
      textTransform: "uppercase",
      padding: "5px 20px",
      backgroundColor: "#347DA3",
      color: "#FFFFFF",
      flexShrink: 0,
      whiteSpace: "nowrap",
      fontFamily: "Poppins",
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "normal",
      verticalAlign: "middle",
      borderRadius: "20px",
      textAlign: "left",
    },
    cardBody: {
      marginLeft: "3px",
    },
    text: {
      color: "#4B4B4B",
      fontFamily: "Inter",
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "23px",
      letterSpacing: "0.32px",
      textAlign: "left",
    },
    highlightText: {
      color: "#0077B6",
      fontFamily: "Inter",
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: "23px",
      letterSpacing: "0.32px",
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
};

export default withStyles(styles, { withTheme: true })(AboutCard);

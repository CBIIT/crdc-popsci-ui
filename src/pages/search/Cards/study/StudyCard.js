import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { cn } from "@bento-core/util";
import useStyles from "./style";

const formatNumber = (value) => {
  if (!(value || value === 0)) {
    return "";
  }

  const numberValue = Number(value);
  return Number.isNaN(numberValue) ? value : numberValue.toLocaleString();
};

const formatAgeRange = (minimumAge, maximumAge) => {
  if ((minimumAge || minimumAge === 0) && (maximumAge || maximumAge === 0)) {
    return `${minimumAge} - ${maximumAge}`;
  }

  if (minimumAge || minimumAge === 0) {
    return `${minimumAge}+`;
  }

  if (maximumAge || maximumAge === 0) {
    return `0 - ${maximumAge}`;
  }

  return "";
};

const StudyCard = ({ data = {}, index }) => {
  const {
    study_name: studyName,
    study_short_name: studyShortName,
    study_participant_minimum_age: minimumAge,
    study_participant_maximum_age: maximumAge,
    study_design: studyDesign,
    number_of_participants: numberOfParticipants,
    cancer_type_count: cancerTypeCount,
  } = data;
  const classes = useStyles();

  const renderInfo = (label, value = "") => (
    <div className={classes.keyAndValueRow}>
      <Typography variant="h6" className={classes.key}>
        {label}
      </Typography>
      <Typography variant="body1" className={classes.value}>
        {value}
      </Typography>
    </div>
  );

  return (
    <Grid item container className={classes.card}>
      <Grid item xs={true}>
        <div className={classes.titleRow}>
          <span className={classes.titleKey}>STUDY</span>
          <Typography variant="h3" className={classes.titleValue}>
            {studyShortName ? (
              <Link
                to={`/study/${studyShortName}`}
                className={classes.titleLink}
              >
                {studyShortName}
              </Link>
            ) : (
              ""
            )}
          </Typography>
        </div>
        <div className={classes.row}>
          {renderInfo("Study Name:", studyName)}
          {renderInfo("Study Type:", studyDesign)}
          {renderInfo("Cancer Types:", formatNumber(cancerTypeCount))}
          {renderInfo("Participants:", formatNumber(numberOfParticipants))}
          {renderInfo(
            "Participant Age Range:",
            formatAgeRange(minimumAge, maximumAge),
          )}
        </div>
      </Grid>

    </Grid>
  );
};

export default StudyCard;

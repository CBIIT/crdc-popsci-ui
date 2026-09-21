import React from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';
import Anchor from '../../../utils/Anchor';
import LineBreaksRenderer from '../../../utils/LineBreaksRenderer';

/**
 * Property Item component generates the result card key:value element
 * e.g. "Program ID: NCT00000000" or "Age: 33"
 *
 * @param {object} props
 * @param {string} props.label - the label of the property
 * @param {string} props.value - the value of the property
 * @param {string} props.link - the relative link of the value (e.g. a local link)
 * @param {string} props.labelLink - the hyperlink of the label (e.g. to an external site)
 * @param {object} props.classes - the classes object used to style the component
 * @param {number} props.index
 * @param {boolean} props.hasBreakLine - Flag to indicate whether line breaks should be applied.

 * @returns {JSX.Element}
 */
const PropertyItem = ({ ...props }) => {
  const {
    label,
    linkText,
    value,
    link,
    labelLink,
    classes,
    index,
    hasBreakLine,
  } = props;
  const defaultValue = '';

  const renderLabel = () => (
    <Typography
      variant="h6"
      className={classes.title}
      id={`section_title_${index + 1}`}
    >
      {labelLink ? (
        <Anchor link={labelLink} text={label} classes={classes} />
      ) : (
        `${label}:`
      )}
    </Typography>
  );

  const renderValue = () => (
    <Typography
      variant="body1"
      className={classes.content}
      id={`section_description_${index + 1}`}
    >
      {value || value === 0 ? renderValueContent() : defaultValue}
    </Typography>
  );

  const renderValueContent = () => {
    if (link !== undefined) {
      return (
        <Anchor
          link={link}
          text={linkText ? linkText : value}
          classes={classes}
        />
      );
    } else if (hasBreakLine) {
      return <LineBreaksRenderer htmlContent={value} classes={classes} />;
    } else {
      return value;
    }
  };

  return (
    <Grid item container className={classes.propertyContainer}>
      {value && (
        <Grid item xs={12} className={classes.row}>
          {renderLabel()}
          {renderValue()}
        </Grid>
      )}
    </Grid>
  );
};

const styles = () => ({
  row: {
    display: 'flex',
    margin: '0px',
    padding: '0px',
    gap: '15px',
  },
  content: {
    flex: '1 1 auto',
    minWidth: 0,
    color: '#000000',
    fontFamily: 'Open Sans',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '22px',
    letterSpacing: '0.32px',
    textAlign: 'left',
    marginTop: '-2px',
  },
  title: {
    flex: '0 0 auto',
    whiteSpace: 'nowrap',
    textTransform: 'uppercase',
    color: '#27424E',
    fontFamily: 'Open Sans',
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '16.8px',
    letterSpacing: '0px',
    textAlign: 'left',
  },
  propertyContainer: {
    lineHeight: '17px',
    paddingLeft: '4px',
    marginBottom: '9px',
  },
  link: {
    color: '#005D85',
    textDecoration: 'underline',
    fontFamily: 'Open Sans',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '22px',
    letterSpacing: '0px',
    '&:hover': {
      textDecoration: 'none',
    },
  },
});

export default withStyles(styles, { withTheme: true })(PropertyItem);

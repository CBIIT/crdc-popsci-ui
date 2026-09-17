import { Grid, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { prepareLinks } from '@bento-core/util';
import PropertyItem from './PropertyItem';

const CARD_PROPERTIES = [
  {
    label: 'Data Model Node',
    dataField: 'node_name',
  },
  {
    label: 'Property Description',
    dataField: 'property_description',
    hasBreakLine: true,
  },
  // {
  //   label: 'Property Required',
  //   dataField: 'property_required',
  // },
  // {
  //   label: 'Property Type',
  //   dataField: 'property_type',
  // },
  // {
  //   label: 'Property Value',
  //   dataField: 'value',
  // },
  {
    label: 'Page Link',
    dataField: 'node_name',
    link: '/data-model',
    linkText: 'Data Model',
  },
];

const ValueCard = ({ data, classes, index }) => {
  const propertiesWithLinks = prepareLinks(CARD_PROPERTIES, data);
  return (
    <Grid
      item
      container
      className={classes.card}
      id={`global_search_card_${index}`}
    >
      <Grid item xs={true} className={classes.propertyContainer}>
        <div className={classes.titleRow}>
          <span className={classes.detailContainerHeader}>DATA MODEL</span>
          <Typography variant="h3" className={classes.cardTitle}>
            {data.property_name}
          </Typography>
        </div>
        {propertiesWithLinks.map((prop, idx) => (
          <PropertyItem index={idx} value={data[prop.dataField]} {...prop} />
        ))}
      </Grid>
    </Grid>
  );
};

const styles = (theme) => {
  return {
    card: {
      '&:last-child $hrContainer': {
        display: 'none',
      },
      '&:first-child': {
        borderTop: '0.25px solid #828282',
      },
      width: '100%',
      maxWidth: '100%',
      margin: '0 auto',
      padding: '15px 32px 30px',
      boxSizing: 'border-box',
      borderBottom: '0.25px solid #828282',
    },
    titleRow: {
      display: 'flex',
      alignItems: 'flex-start',
      margin: '0px',
      padding: '0px',
      marginBottom: '17px',
    },
    detailContainerHeader: {
      textTransform: 'uppercase',
      backgroundColor: '#4D7E49',
      color: '#FFFFFF',
      verticalAlign: 'middle',
      flexShrink: 0,
      whiteSpace: 'nowrap',

      fontFamily: 'Poppins',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 'normal',
      letterSpacing: '0em',
      textAlign: 'left',
      height: 'auto',
      padding: '5px 20px',
      borderRadius: '20px',
      gap: '10px',
    },
    cardTitle: {
      textDecoration: 'none',
      fontFamily: 'Open Sans',
      fontWeight: 600,
      fontSize: '18px',
      lineHeight: '20.7px',
      color: '#27424E',
      paddingLeft: '15px',
      verticalAlign: 'middle',
    },

    hrContainer: {
      paddingTop: '10px',
      paddingBottom: '10px',
      maxWidth: '100%',
      marginLeft: '0px',
    },
    hr: {
      width: '100%',
      border: '0',
      margin: '0',
      padding: '0px',
    },
  };
};

export default withStyles(styles, { withTheme: true })(ValueCard);

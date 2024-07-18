import React from 'react';
import {
  Grid,
  withStyles,
  Card, 
  CardContent, 
  Typography,
   Link
} from '@material-ui/core';
import themeProvider from './themeConfig';
import { publicationExternalLinkIcon } from '../../../../bento/studyDetailData';
import { cn } from 'bento-components';



const styles = {
  page:{
    width: '100%',
    margin: '0 auto',
  },
  container: {
    padding: '20px',
  },
  item: {
    border: '1.5px solid #AFCEDA',
    borderRadius: '8px',
    padding: '20px',
    margin: '10px',
    backgroundColor: '#F7F7F7',
    maxWidth: 'calc(50% - 20px)',
  },
  link: {
    color: '#245F7B',
    textDecoration: 'none',
  },
  title: {
    marginBottom: '10px',
    fontFamily: 'Open Sans',
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: '23.4px',
    textAlign: 'left',
  },
  content: {
    marginBottom: '5px',
    fontFamily: 'Open Sans',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '22px',
    textAlign: 'left',
  },
  label:{
    fontFamily: 'Open Sans',
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '14.7px',
    textAlign: 'left',
    color: '#245F7B',
  },
  externalLinkIcon: {
    color: '#245F7B',
    marginLeft: '5px',
  },
  noData: {
    fontFamily: 'Open Sans',
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: '23.4px',
    textAlign: 'left',
  }
};


const ExternalLinkIcon = ({ classes }) => {
    return (
      <img 
        src={publicationExternalLinkIcon}
        width={14}
        height={14}
        className={classes.externalLinkIcon}
        alt='outbounnd web site icon'/>
    )
  }

const StyledExternalLinkIcon = withStyles(styles)(ExternalLinkIcon);


const CustomCard = ({ classes, title, author, year, journal, doi, pumID }) => (
  <Grid item xs={12} sm={6} md={6} className={classes.item} spacing={3} >
   
    <Typography className={classes.title} variant="h5" component="div">
      {title}
    </Typography>
    <Grid container>
       <Grid item sm={4} md={4} >
           <Typography className={classes.content} variant="body2">
        <span className={classes.label}>AUTHORS</span>: 
      </Typography>
      </Grid>
      <Grid item sm={7} md={7} >
         <Typography className={classes.content} variant="body2">
        {author || ''}
      </Typography>
      </Grid>
    </Grid>

     <Grid container>
       <Grid item sm={4} md={4} >
           <Typography className={classes.content} variant="body2">
        <span className={classes.label}>YEAR OF PUBLICATION</span>: 
      </Typography>
      </Grid>
       <Grid item sm={7} md={7} >
         <Typography className={classes.content} variant="body2">
        {year || ''}
      </Typography>
      </Grid>
    </Grid>

     <Grid container>
       <Grid item sm={4} md={4} >
           <Typography className={classes.content} variant="body2">
        <span className={classes.label}>JOURNAL</span>: 
      </Typography>
      </Grid>
       <Grid item sm={7} md={7} >
         <Typography className={classes.content} variant="body2">
        {journal || ''}
      </Typography>
      </Grid>
    </Grid>

       <Grid container>
       <Grid item sm={4} md={4} >
           <Typography className={classes.content} variant="body2">
        <span className={classes.label}>DOI</span>: 
      </Typography>
      </Grid>
       <Grid item sm={7} md={7} >
         <Typography className={classes.content} variant="body2">
         {doi ? (
        <Link className={classes.link} href={`https://doi.org/${doi}`} target="_blank" rel="noopener noreferrer">{doi}<StyledExternalLinkIcon/> </Link>
        ) : (
          ''
        )}
      </Typography>
      </Grid>
    </Grid>

      <Grid container>
      <Grid item sm={4} md={4} >
           <Typography className={classes.content} variant="body2">
        <span className={classes.label}>PUBMED ID</span>: 
      </Typography>
      </Grid>
       <Grid item sm={7} md={7} >
         <Typography className={classes.content} variant="body2">
          {pubmedId ? (
        <Link className={classes.link} href={`https://pubmed.ncbi.nlm.nih.gov/${pumID}`} target="_blank" rel="noopener noreferrer">{pumID}<StyledExternalLinkIcon/> </Link>
        ) : (
          ''
        )}
      </Typography>
      </Grid>
    </Grid>
  </Grid>
);


const StyledCard = withStyles(styles)(CustomCard);


const Publications = ({
  classes,
  data,
}) => {

  return (
    <themeProvider>
      <div className={classes.page}>
    <Grid container className={classes.container} spacing={0} justifyContent="left">
       {data.length > 0 ? (
        data.map((card, index) => (
            <StyledCard {...card}  key={index}/>
        ))
      ) : (
        <Typography className={classes.noData} variant="h6">
          This Study currently has no Publication records associated with it
        </Typography>
      )}
    </Grid>
        </div>
  </themeProvider>
  );
};

export default withStyles(styles, { withTheme: true })(Publications);

import React from 'react';
import {
  Grid,
  withStyles,
  Typography,
   Link
} from '@material-ui/core';
import { externalIcon } from '../../../../bento/studyDetailData';
import { customSorting } from '../../../../utils/utils';
import ThemeProvider from './themeConfig'; 

const styles = {
  page:{
    width: '100%',
    margin: '10px auto 50px auto',
  },
  container: {
    padding: '20px 10px',
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
        src={externalIcon}
        width={14}
        height={14}
        className={classes.externalLinkIcon}
        alt='outbounnd web site icon'/>
    )
  }

const StyledExternalLinkIcon = withStyles(styles)(ExternalLinkIcon);


const CustomCard = ({ classes, publication_title, authorship, year_of_publication, journal_citation, digital_object_id, pubmed_id }) => (
  <Grid item xs={12} sm={6} md={6} className={classes.item}>
   
    <Typography className={classes.title} variant="h5" component="div">
      {publication_title}
    </Typography>
    <Grid container>
       <Grid item sm={4} md={4} >
           <Typography className={classes.content} variant="body2">
        <span className={classes.label}>AUTHORS</span>: 
      </Typography>
      </Grid>
      <Grid item sm={7} md={7} >
         <Typography className={classes.content} variant="body2">
        {authorship || ''}
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
        {year_of_publication || ''}
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
        {journal_citation || ''}
      </Typography>
      </Grid>
    </Grid>

       <Grid container>
       <Grid item sm={4} md={4} >
           <Typography className={classes.content} variant="body2">
        <span className={classes.label}>digital_object_id</span>: 
      </Typography>
      </Grid>
       <Grid item sm={7} md={7} >
         <Typography className={classes.content} variant="body2">
         {digital_object_id ? (
        <Link className={classes.link} href={`https://digital_object_id.org/${digital_object_id}`} target="_blank" rel="noopener noreferrer">{digital_object_id}<StyledExternalLinkIcon/> </Link>
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
          {pubmed_id ? (
        <Link className={classes.link} href={`https://pubmed.ncbi.nlm.nih.gov/${pubmed_id}`} target="_blank" rel="noopener noreferrer">{pubmed_id}<StyledExternalLinkIcon/> </Link>
        ) : (
          ''
        )}
      </Typography>
      </Grid>
    </Grid>
  </Grid>
);

const StyledCard = withStyles(styles)(CustomCard);

const Publications = ({ classes, data }) => {
  const { publication } = data;

  const sortedData = [...(publication || [])].sort((a, b) => customSorting(a.publication_record_id, b.publication_record_id));
  
  return (
    <ThemeProvider>
      <div className={classes.page}>
        <Grid container className={classes.container} spacing={0} justifyContent="flex-start">
          {sortedData.length > 0 ? (
            sortedData.map((card, index) => (
              <StyledCard {...card}  key={index}/>
            ))
          ) : (
            <p className={classes.noData}>
              This Study currently has no Publication records associated with it
            </p>
          )}
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default withStyles(styles, { withTheme: true })(Publications);

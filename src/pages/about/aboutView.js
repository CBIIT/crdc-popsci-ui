import React from 'react';
import {
  Button, Grid, withStyles,
} from '@material-ui/core';
import AboutHeader from './aboutHeader';
import Stats from '../../components/Stats/AllStatsController';
import { MarkdownContent } from '../../components/Content';

const StatusMessage = ({ classes, children, role = 'status' }) => (
  <div className={classes.status} role={role} aria-live={role === 'alert' ? 'assertive' : 'polite'}>
    {children}
  </div>
);

const AboutView = ({
  classes, status, page, source, notice, onRetry,
}) => {
  const loading = status === 'loading' && !page;
  const unavailable = ['error', 'configurationError', 'notFound'].includes(status);
  const statusTitle = status === 'notFound' ? 'Content not found' : 'Content unavailable';

  return (
    <>
      <Stats />
      {page && (
        <section aria-label="Page header">
          <AboutHeader title={page.title} />
        </section>
      )}
      {loading && <StatusMessage classes={classes}>Loading page content…</StatusMessage>}
      {unavailable && (
        <StatusMessage classes={classes} role="alert">
          <h1 className={classes.errorTitle}>{statusTitle}</h1>
          <p>{notice || 'The page could not be loaded.'}</p>
          {status !== 'notFound' && <Button variant="contained" color="primary" onClick={onRetry}>Try again</Button>}
        </StatusMessage>
      )}
      {page && (
        <main className={classes.container} aria-busy={status === 'refreshing'}>
          {notice && <StatusMessage classes={classes}>{notice}</StatusMessage>}
          {source === 'fallback' && !notice && (
            <StatusMessage classes={classes}>Remote content is disabled. Showing the bundled fallback.</StatusMessage>
          )}
          <Grid container spacing={16} direction="row" className={classes.aboutSection}>
            {page.primaryImage.position === 'left' && (
              <Grid item lg={3} md={3} sm={12} xs={12} className={classes.imageSection}>
                <img className={classes.primaryImage} src={page.primaryImage.src} alt={page.primaryImage.alt} />
              </Grid>
            )}
            <Grid item lg={9} md={9} sm={12} xs={12} className={classes.contentSection}>
              <MarkdownContent markdown={page.markdown} />
            </Grid>
            {page.primaryImage.position === 'right' && (
              <Grid item lg={3} md={3} sm={12} xs={12} className={classes.imageSection}>
                <img className={classes.primaryImage} src={page.primaryImage.src} alt={page.primaryImage.alt} />
              </Grid>
            )}
          </Grid>
        </main>
      )}
    </>
  );
};

const styles = (theme) => ({
  container: {
    color: '#000000',
    margin: '16px auto',
    maxWidth: `${theme?.custom?.maxContentWidth || '1440px'}`,
  },
  aboutSection: { padding: '60px 45px', [theme.breakpoints.down('sm')]: { padding: '30px 20px' } },
  contentSection: { padding: '0 0 8px 25px !important', [theme.breakpoints.down('sm')]: { padding: '20px 0 8px !important' } },
  imageSection: { margin: '10px 0 20px' },
  primaryImage: { height: 'auto', maxWidth: '100%', width: '100%' },
  status: { fontFamily: 'Nunito, sans-serif', margin: '24px auto', maxWidth: `${theme?.custom?.maxContentWidth || '1440px'}`, padding: '0 24px' },
  errorTitle: { color: '#345D85', fontFamily: 'Inter, sans-serif', fontSize: '28px' },
});

export default withStyles(styles)(AboutView);

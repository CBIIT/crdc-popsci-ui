import React from 'react';
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
// import StatsView from './components/statsView';
import { Button } from '../../components/Wrappers/Wrappers';
import { landingPageData } from '../../bento/landingPageData';
import icon from '../../assets/landing/LP_ReadMore.svg';
import iconAbout from '../../assets/landing/LP_About_Fullarticle.Arrow.svg';

const LandingView = ({ classes, statsData }) => (
  <div className={classes.page}>
    <div className={classes.heroSection}>
      <div className={classes.heroContent}>
        <Grid container direction="row" justifyContent='center' alignItems='flex-start' className={classes.heroImage}>
          <Grid item className={classes.popPieChartImage} />
          <Grid className={classes.heroTextContainer}>
            <div className={classes.heroTextWrapper}>
              <div className={classes.headerTitle1}>
                { landingPageData.callToActionTitle }
              </div>
              <div className={classes.headerTitle2}>
                {landingPageData.callToActionTitle2}
              </div>
              <div className={classes.headerContent}>
                { landingPageData.callToActionDescription}
              </div>
              <div className={classes.headerButtonSection}>
                <Link to={landingPageData.callToActionLink} className={classes.headerLink}>
                  <Button className={classes.buttonText}>
                    {landingPageData.callToActionButtonText}
                  </Button>
                </Link>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
    {/*<div className={classes.whiteSection} /> */}
    {/*<StatsView stats={landingPageData.landingPageStatsBar} statsData={statsData} /> */}
    <div className={classes.texture}>
      <div className={classes.gradientContent}>
        <Grid container spacing={16} direction="row" className={classes.landingContainer}>
          <div className={classes.contentLeft}>
            <div className={classes.about}>
              <div className={classes.aboutImageSection}>
                <img
                  src={landingPageData.tile1.img}
                  className={classes.aboutImage}
                  alt={landingPageData.tile1.alt}
                  id="tile1_image"
                />
              </div>
              <div className={classes.DCWords} id="tile1_title">
                {/* // TODO:- Create new function
                landingPageData.tile1.titleText.match(/\b(\w+)\b/g).map((word) => (
                  <>
                    {word}
                    <br />
                  </>
                ))*/}
                About <br/>
                Population Science <br />
                Data Common <br/>
              </div>
              <div className={classes.aboutContent} id="tile1_description">
                {landingPageData.tile1.descriptionText}
              </div>
              <div className={classes.aboutButtonSection}>
                <div className={classes.aboutButtonLeft}>
                  <img src={iconAbout} className={classes.iconAbout} alt="PopSci about icon" />
                </div>
                <div className={classes.aboutButtonRight} id="tile1_button">
                  <Link
                    to={landingPageData.tile1.callToActionLink}
                    className={classes.aboutButton}
                  >
                    {landingPageData.tile1.callToActionText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.contentRight}>
            <div className={classes.contentRightTop}>
              <div className={classes.program}>
                <div className={classes.programImg}>
                  <img
                    className={classes.image}
                    src={landingPageData.tile2.img}
                    alt={landingPageData.tile2.alt}
                    id="tile2_image"
                  />
                </div>
                <div className={classes.content}>
                  <div className={classes.contentHeader} id="tile2_title">
                    {landingPageData.tile2.titleText}
                  </div>
                  <div className={classes.contentContainer} id="tile2_description">
                    {landingPageData.tile2.descriptionText}
                  </div>

                </div>
                <div className={classes.blueButton}>
                  <div className={classes.blueButtonLeft}>
                    <img className={classes.icon} src={icon} alt="Popsci about " />
                    {' '}
                  </div>
                  <div className={classes.blueButtonRight} id="tile2_button">
                    <Link
                      to={landingPageData.tile2.callToActionLink}
                      className={classes.blueButton}
                    >
                      {landingPageData.tile2.callToActionText}
                    </Link>
                  </div>
                </div>
              </div>
              <div className={classes.studies}>
                <div className={classes.programImg}>
                  <img
                    className={classes.image}
                    src={landingPageData.tile3.img}
                    alt={landingPageData.tile3.src}
                    id="tile3_image"
                  />
                </div>
                <div className={classes.content}>
                  <div className={classes.contentHeader} id="tile3_title">
                    {landingPageData.tile3.titleText}
                  </div>
                  <div className={classes.contentContainer} id="tile3_description">
                    {landingPageData.tile3.descriptionText}
                  </div>

                </div>
                <div className={classes.blueButton}>
                  <div className={classes.blueButtonLeft}>
                    <img className={classes.icon} src={icon} alt="Popsci about " />
                    {' '}
                  </div>
                  <div className={classes.blueButtonRight} id="tile3_button">
                    <Link
                      to={landingPageData.tile3.callToActionLink}
                      className={classes.blueButton}
                    >
                      {landingPageData.tile3.callToActionText}
                    </Link>
                  </div>
                </div>
              </div>

            </div>
            <div className={classes.contentRightBottom}>
              <div className={classes.cases} id="tile4_image">
                <div className={classes.mountainMeadowContentHeader} id="tile4_title">
                  {landingPageData.tile4.titleText}
                </div>
                <div
                  className={classes.mountainMeadowContent}
                  id="tile4_description"
                  // Rendering trusted HTML from data source
                  dangerouslySetInnerHTML={{ __html: landingPageData.tile4.descriptionText }}
                />
              </div>
            </div>
          </div>
        </Grid>
      </div>
    </div>
  </div>
);
const styles = (theme) => ({
  popPieChartImage: {
    width: '570px',
    marginRight: '120px',
    marginTop: '103px',
    height: '530px',
    maxHeight: '530px',
    background: `url(${landingPageData.landingPageHero.img})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      width: '420px',
      height: '390px',
      marginRight: '40px',
      marginTop: '60px',
      backgroundSize: 'contain',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '260px',
      marginRight: 0,
      marginTop: '30px',
      backgroundPosition: 'center',
      backgroundSize: 'contain',
    },
    [theme.breakpoints.down('xs')]: {
      height: '200px',
    },
  },
  page: {
    marginTop: '-47px',
  },
  heroImage: {
    width: '100%',
    background: '#164656',
    height: '668px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
      height: 'auto',
      paddingBottom: '40px',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column-reverse',
      alignItems: 'center',
      padding: '20px 20px 50px',
      backgroundSize: 'cover',
    },
  },
  heroSection: {
    width: '100%',
    background: '#164656',
  },
  heroContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    fontFamily: 'Raleway, sans-serif',
  },
  texture: {
    backgroundSize: 'cover',
    background: 'linear-gradient(180deg, #164656 1.82%, #0E94A9 86.24%)',
    padding: '81px 0 80px 0',
    [theme.breakpoints.down('sm')]: {
      padding: '40px 0 50px',
    },
  },
  gradientContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    fontFamily: 'Raleway, sans-serif',
  },
  container: {
    fontFamily: 'Raleway, sans-serif',
    margin: '0 auto',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '1280px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },

  whiteSection: {
    height: '8px',
    background: 'white',
  },
  redButton: {
    height: '13px',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '2%',
    textAlign: 'center',
    textDecoration: 'none',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
  },
  headerTitle1: {
    paddingTop: '157px',
    fontFamily: 'Poppins, Raleway, sans-serif',
    fontSize: '32px',
    fontWeight: '500',
    lineHeight: '115%',
    color: '#E46BE7',
    letterSpacing: '-0.02em',
    textAlign:'center',
    width:'375px',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '40px',
      fontSize: '26px',
      width: '100%',
      paddingLeft: '10px',
      paddingRight: '10px',
      boxSizing: 'border-box',
    },
  },
  headerTitle2: {
    paddingTop: '10px',
    fontFamily: 'Poppins, Raleway, sans-serif',
    fontSize: '52px',
    fontWeight: '600',
    lineHeight: '115%',
    color: '#FFFFFF',
    letterSpacing: '-0.02em',
    textAlign:'center',
    width: '500px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '40px',
      width: '100%',
      paddingLeft: '10px',
      paddingRight: '10px',
      boxSizing: 'border-box',
      lineHeight: '110%',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '32px',
    },
  },
  paddingLeft50: {
    paddingLeft: '50px',
  },
  headerContent: {
    color: '#ffffff',
    fontFamily: 'Open Sans, Raleway',
    fontSize: '17px',
    fontWeight: '400',
    lineHeight: '165%',
    marginTop: '40px',
    paddingLeft: '20px',
    marginLeft: '40px',
    borderLeft: '2px solid #bbb',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
      paddingLeft: '15px',
      marginTop: '25px',
      fontSize: '16px',
    },
  },
  headerLink: {
    textDecoration: 'none',
  },

  iconAbout: {
    height: '17px',
    width: '9px',
    marginTop: '15px',
    marginLeft: '20px',
  },
  icon: {
    width: '20px',
    marginTop: '13px',
    marginLeft: '23px',
  },

  aboutImage: {
    width: '297px',
    height: '249px',
    padding: '14px',
  },
  aboutImageSection: {
    height: '249px',
  },
  DCWords: {
    height: '144px',
    background: '#480B5E',
    color: '#FFFFFF',
    fontSize: '26px',
    fontWeight: 300,
    textTransform: 'capitalize',
    lineHeight: '27.7px',
    letterSpacing: '-0.02em',
    padding: '30px 23px 30px 30px',
    fontFamily: 'Poppins',
  },
  landingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      paddingLeft: '15px',
      paddingRight: '15px',
      boxSizing: 'border-box',
    },
  },
  contentLeft: {
    float: 'left',
    paddingRight: '10px',
    [theme.breakpoints.down('sm')]: {
      float: 'none',
      width: '100%',
      paddingRight: 0,
      marginBottom: '40px',
    },
  },
  about: {
    width: '300px',
    backgroundColor: '#E0DBD3',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  image: {
    width: '293px',
    height: '249px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 'auto',
    },
  },
  aboutContent: {
    background: '#E0DBD3',
    minHeight: '372px',
    width: '300px',
    padding: '30px 30px 32px 30px',
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '22px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      minHeight: 'unset',
      padding: '25px 20px 28px',
      boxSizing: 'border-box',
    },
  },
  aboutButtonSection: {
    background: '#E0DBD3',
    height: '71px',
  },
  imgIconAbout: {
    width: '49px',
  },
  aboutButtonLeft: {
    float: 'left',
    background: '#373332',
    height: '45px',
    width: '48px',
  },
  aboutButtonRight: {
    background: '#6D5F5B',
    float: 'left',
    height: '45px',
    width: '132px',
  },
  aboutButton: {
    color: '#ffffff',
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '45px',
    paddingLeft: '20px',
    boxShadow: 'none',
    letterSpacing: '1px',
  },

  content: {
    width: '100%',
    height: '220px',
    overflowY: 'auto',
    background: '#fff',
    paddingLeft: '30px',
    paddingTop: '5px',
    minHeight: '138px',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      maxHeight: '320px',
      paddingLeft: '20px',
    },
  },
  contentHeader: {
    color: '#033D6F',
    fontFamily: 'Lato',
    fontSize: '28px',
    fontWeight: 'bold',
    lineHeight: '27px',
    padding: '10px 0',
    [theme.breakpoints.down('sm')]: {
      fontSize: '24px',
      lineHeight: '30px',
    },
  },
  contentContainer: {
    width: '215px',
    color: '#010101',
    fontFamily: 'Nunito',
    fontSize: '16px',
    lineHeight: '22px',
    paddingLeft: '2px',
    paddingBottom: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      paddingRight: '10px',
      boxSizing: 'border-box',
    },
  },

  program: {
    float: 'left',
    padding: '0 10px 6.8px 0px',
    [theme.breakpoints.down('sm')]: {
      float: 'none',
      width: '100%',
      padding: 0,
      marginBottom: '30px',
      display: 'flex',
      flexDirection: 'column',
      background: '#fff',
    },
  },
  programImg: {
    background: '#fff',
    height: '246px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 'auto',
      order: 0,
    },
  },
  studies: {
    float: 'left',
    [theme.breakpoints.down('sm')]: {
      float: 'none',
      width: '100%',
      marginBottom: '30px',
      display: 'flex',
      flexDirection: 'column',
      background: '#fff',
    },
  },

  contentRightBottom: {
    float: 'left',
    width: '597px',
    background: '#fff',
    backgroundImage: `url(${landingPageData.tile4.img})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    [theme.breakpoints.down('sm')]: {
      float: 'none',
      width: '100%',
      minHeight: '340px',
      backgroundPosition: 'center',
      marginTop: '10px',
    },
  },
  cases: {
    height: '403px',
    paddingLeft: '340px',
    paddingTop: '70px',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      paddingLeft: '30px',
      paddingTop: '40px',
      paddingRight: '30px',
      boxSizing: 'border-box',
    },
  },
  mountainMeadowButtonSection: {
    height: '46px',
    width: '176px',
    backgroundColor: '#6D5F5B',
    marginTop: '20px',

  },
  blueButton: {
    height: '45px',
    background: '#24415C',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: '2%',
    paddingLeft: '8px',
    textDecoration: 'none',
    letterSpacing: '1px',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      lineHeight: '36px',
      order: 2,
    },
  },
  blueButtonLeft: {
    float: 'left',
  },
  blueButtonRight: {
    float: 'left',
    lineHeight: '45px',
    marginLeft: '8px',
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#fff',
    textTransform: 'uppercase',
  },
  mountainMeadowContentHeader: {
    color: '#033D6F',
    fontFamily: 'Lato',
    fontSize: '28px',
    fontWeight: 'bold',
    lineHeight: '32px',
    padding: '15px 0',
    [theme.breakpoints.down('sm')]: {
      fontSize: '24px',
      lineHeight: '30px',
    },
  },
  mountainMeadowContent: {
    height: '143px',
    width: '230px',
    color: '#010101',
    fontFamily: 'Nunito',
    fontSize: '15px',
    lineHeight: '22px',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      width: '100%',
      paddingBottom: '20px',
    },
    '& a, & a:visited': {
      color: 'inherit',
      textDecoration: 'none',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      fontWeight: 'inherit',
    },
    '& a:hover, & a:focus, & a:active': {
      color: 'inherit',
      textDecoration: 'none',
      outline: 'none',
    },
  },
  mountainMeadowIcon: {
    width: '20px',
    marginTop: '12px',
    marginLeft: '28px',
  },
  mountainMeadowButton: {
    padding: '15px 5px 0 0',
    height: '9px',
    width: '71px',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '2%',
    textTransform: 'uppercase',
    textDecoration: 'none',
    marginLeft: '8px',
    letterSpacing: '1px',
    '&:hover': {
      color: '#ffffff',
    },
  },
  paddingBottom50: {
    paddingBottom: '50px',
  },
  paddingTop30: {
    paddingTop: '30px',
  },
  animationContainer: {
    position: 'relative',
    left: '33%',
  },

  paddingLeft2: {
    paddingLeft: '2px',
  },
  heroTextContainer: {
    marginLeft: '-63px',
    [theme.breakpoints.down('md')]: {
      marginLeft: '-20px',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      width: '100%',
    },
  },
  heroTextWrapper: {
    maxWidth: '500px',
    width:'max-content',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxWidth: '100%',
    },
  },
  headerButtonSection: {
    width: '100%',
    textAlign: 'center',
    marginTop: '30px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '25px',
    },
  },
  buttonText: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: '14px',
    padding: '12px 30px',
    height: '36px',
    color: '#FFFFFF',
    width: '197px',
    borderRadius: '30px',
    border: '1px solid #ffffff', // 1px stroke
    boxSizing: 'border-box', // ensure border is inside
    lineHeight: '2%',
  },
});
export default withStyles(styles, { withTheme: true })(LandingView);

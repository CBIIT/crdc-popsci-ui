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
    <div className={classes.container}>
      <div className={classes.hero}>
        <Grid container direction="row" justifyContent='center' alignItems='flex-start' className={classes.heroImage}>
          <Grid item className={classes.popPieChartImage}>
          </Grid>
          <Grid item xs={4} className={classes.heroTextContainer}>
            <div className={classes.heroTextWrapper}>
              <div className={classes.headerTitle}>
                { landingPageData.callToActionTitle } <br/> {landingPageData.callToActionTitle2}
              </div>
              <div className={classes.headerContent}>
                { landingPageData.callToActionDescription}
              </div>
              <div className={classes.headerButtonSection}>
                <Link to={landingPageData.callToActionLink} className={classes.headerLink}>
                  <Button className={classes.buttonText}>
                    {landingPageData.callToActionButtonText}
                    <img
                      src={landingPageData.callToActionButtonIcon.img}
                      alt={landingPageData.callToActionButtonIcon.alt}
                      className={classes.searchCaseArrow}
                    />
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
    <div className={classes.container}>
      <div className={classes.texture}>
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
                    <img className={classes.icon} src={icon} alt="CTDC about " />
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
                    <img className={classes.icon} src={icon} alt="CTDC about " />
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
                <div className={classes.mountainMeadowContent} id="tile4_description">
                  {landingPageData.tile4.descriptionText}
                </div>
                <div className={classes.mountainMeadowButtonSection}>
                  <div className={classes.blueButtonLeft}>
                    <img className={classes.mountainMeadowIcon} src={icon} alt="CTDC about " />
                    {' '}
                  </div>
                  <div className={classes.blueButtonRight} id="tile4_button">
                    <Link
                      to={landingPageData.tile4.callToActionLink}
                      className={classes.mountainMeadowButton}
                    >
                      {landingPageData.tile4.callToActionText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </div>

    </div>
  </div>
);
const styles = () => ({
  popPieChartImage: {
    width: '529px',
    height: '668px',
    maxHeight: '668px',
    background: `url(${landingPageData.landingPagePeoplePieChart.img})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    overflow: 'hidden',
  },
  page: {
    marginTop: '-47px',
  },
  heroImage: {
    width: '100%',
    maxHeight: '668px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundImage: `url(${landingPageData.landingPageHero.img})`,
    margin: '0 auto',
  },
  texture: {
    backgroundSize: 'cover',
    background: '#804098',
    padding: '81px 0 80px 0',
  },
  container: {
    fontFamily: 'Raleway, sans-serif',
    margin: '0 auto',
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
    lineHeight: '47px',
    textAlign: 'center',
    textDecoration: 'none',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
  },
  headerTitle: {
    paddingTop: '157px',
    fontFamily: 'Poppins, Raleway, sans-serif',
    fontSize: '45px',
    fontWeight: '600',
    lineHeight: '115%',
    color: '#24415C',
    letterSpacing: '-0.02em',
  },
  paddingLeft50: {
    paddingLeft: '50px',
  },
  headerContent: {
    color: '#F15A2A',
    fontFamily: 'Open Sans, Raleway',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '165%',
    marginTop: '24px',
    marginBottom: '20px',
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
  },
  contentLeft: {
    float: 'left',
    paddingRight: '10px',
  },
  about: {
    width: '300px',
    backgroundColor: '#E0DBD3',
  },
  image: {
    width: '293px',
    height: '249px',
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
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '45px',
    paddingLeft: '20px',
    boxShadow: 'none',
    letterSpacing: '1px',
  },

  content: {
    width: '100%',
    height: '165px',
    overflowY: 'auto',
    background: '#fff',
    paddingLeft: '30px',
    paddingTop: '5px',
    minHeight: '138px',
  },
  contentHeader: {
    color: '#033D6F',
    fontFamily: 'Lato',
    fontSize: '28px',
    fontWeight: 'bold',
    lineHeight: '27px',
    padding: '10px 0',
  },
  contentContainer: {
    width: '215px',
    color: '#010101',
    fontFamily: 'Nunito',
    fontSize: '16px',
    lineHeight: '22px',
    paddingLeft: '2px',
    paddingBottom: '10px',
  },

  program: {
    float: 'left',
    padding: '0 10px 6.8px 0px',
  },
  programImg: {
    background: '#fff',
    height: '246px',
  },
  studies: {
    float: 'left',
  },

  contentRightBottom: {
    float: 'left',
    width: '597px',
    background: '#fff',
    backgroundImage: `url(${landingPageData.tile4.img})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  cases: {
    height: '392px',
    paddingLeft: '340px',
    paddingTop: '70px',
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
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '25px',
    paddingLeft: '8px',
    textDecoration: 'none',
    letterSpacing: '1px',
  },
  blueButtonLeft: {
    float: 'left',
  },
  blueButtonRight: {
    float: 'left',
    lineHeight: '44px',
    marginLeft: '8px',
    fontFamily: 'Lato',
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
  },
  mountainMeadowContent: {
    height: '143px',
    width: '230px',
    color: '#010101',
    fontFamily: 'Nunito',
    fontSize: '15px',
    lineHeight: '22px',
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
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '19.31px',
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
    // position: 'absolute',
    width: '400px',
    // margin: 'auto',
    left: '12px',
    right: 0,
    '@media (min-width: 900px)': {
      width: '906px',
    },
    paddingLeft: '95px'
  },
  heroTextWrapper: {
    width: '394px',
  },
  buttonText: {
    fontFamily: 'Raleway',
    fontWeight: 700,
    fontSize: '15px',
    padding: '12px 30px',
    height: '44px',
    backgroundColor: '#24415C',
    color: '#EDE5D0',
    width: '266px',
    borderRadius: '30px',
    '&:hover': {
      backgroundColor: 'grey'
    },
  },
  searchCaseArrow: {
    marginLeft: '45px'
  },
});
export default withStyles(styles, { withTheme: true })(LandingView);

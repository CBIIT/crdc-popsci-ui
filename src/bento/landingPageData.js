import gql from 'graphql-tag';
// import Test from '../assets/header/CTDC_Logo.svg';

// The ideal image size of landingPageHero 1400x600px
// Tile1 Tile2 Tile3 images 293x349 px
// Tile4 image optimum size 600x 436 px
export const landingPageData = {
  callToActionTitle: 'POPULATION SCIENCE',
  callToActionTitle2: 'DATA COMMONS',
  callToActionDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  callToActionButtonText: 'search cases',
  callToActionButtonIcon: {
    alt: 'Right Arrow',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/popsci/images/icons/svgs/homeRightArrow.svg',
  },
  callToActionLink: '/explore',
  landingPageHero: {
    alt: 'Alt tag1',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/popsci/images/icons/png/landing_Hero_Graphic.png',
  },
  landingPagePeoplePieChart: {
    alt: 'People Pie Chart ',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/popsci/images/icons/svgs/homePagePopImage.svg',
  },
  landingPageStatsBar: [
    {
      statTitle: 'Programs',
      statAPI: 'numberOfPrograms',
    },
    {
      statTitle: 'Studies',
      statAPI: 'numberOfStudies',
    },
    {
      statTitle: 'Cases',
      statAPI: 'numberOfCases',
    },
    {
      statTitle: 'Files',
      statAPI: 'numberOfFiles',
    },
  ],
  tile1: {
    alt: '',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/popsci/images/icons/png/homeImageforAboutCard.png',
    titleText: 'About Population Science Data Commons',
    descriptionText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.',
    callToActionText: 'explore',
    callToActionLink: '/explore', // This links to the "About" static page.
  },
  tile2: {
    alt: '',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/popsci/images/icons/png/TrialsImage.png',
    titleText: 'Studies',
    descriptionText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    callToActionText: 'Read More',
    callToActionLink: '/studies', // This links to the Programs Listing Page.
  },
  tile3: {
    alt: '',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/popsci/images/icons/png/requestAccessImage.png',
    titleText: 'Request Access',
    descriptionText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    callToActionText: 'Read More',
    callToActionLink: '/request', // Link to the Request Access Page
  },
  tile4: {
    alt: '',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/popsci/images/icons/png/CasesImage.png',
    titleText: 'Cases',
    descriptionText: 'Lorem ipsum dolor sit amet, onsectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    callToActionText: 'Read More',
    callToActionLink: '/explore', // This links to the cases dashboard.
  },
};

// --------------- GraphQL query - Retrieve Landing page data --------------
export const GET_LANDING_PAGE_DATA_QUERY = gql`{
  numberOfPrograms
  numberOfStudies
  numberOfCases
  numberOfFiles
  }
  `;

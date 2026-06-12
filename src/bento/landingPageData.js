import gql from 'graphql-tag';
// import Test from '../assets/header/CTDC_Logo.svg';
import externalLinkIcon from '../components/About/assets/About-ExternalIcon.svg';

// The ideal image size of landingPageHero 1400x600px
// Tile1 Tile2 Tile3 images 293x349 px
// Tile4 image optimum size 600x 436 px
export const landingPageData = {
  callToActionTitle: 'Unleashing the power of data for global health',
  callToActionTitle2: 'Welcome to the Population Science Data Commons',
  callToActionDescription:
    'Dive into the Population Science Data Commons, where vast datasets converge to illuminate patterns and help drive innovation in global health.',
  callToActionButtonText: 'EXPLORE STUDIES',
  callToActionButtonIcon: {
    alt: 'Right Arrow',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/popsci/images/icons/svgs/homeRightArrow.svg',
  },
  callToActionLink: '/explore',
  landingPageHero: {
    alt: 'Laptop with image of a crowd of people overlayed with medical research related iconography',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/popsci/images/icons/png/widget.png',
  },
  tile1: {
    alt: 'Male and female researcher looking over data on a computer screen in a lab',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/popsci/images/icons/png/homeImageforAboutCard.png',
    titleText: 'About the Population Science Data Commons (PSDC)',
    descriptionText:
      'Population science research aims to understand the causes and distribution of cancer in populations, monitor and explain cancer trends across different groups defined by geography or demographics, and support the development and implementation of broad-based interventions. The PSDC manages, houses, and shares data from various NCI-funded research programs and awards.',
    callToActionText: 'Read More',
    callToActionLink: '/about', // This links to the 'About' static page.
  },
  tile2: {
    alt: 'Abstract image of network data',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/popsci/images/icons/png/TrialsImage.png',
    titleText: 'Access Data',
    descriptionText:
      'The PSDC portal provides faceted searching for studies of interest using various parameters.',
    callToActionText: 'Read More',
    callToActionLink: '/access_data', // This links to the Programs Listing Page.
  },
  tile3: {
    alt: 'Image of person using laptop with national cancer institute website displayed on laptop',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/popsci/images/icons/png/requestAccessImage.png',
    titleText: 'Analyze Data',
    descriptionText:
      'The Seven Bridges Cancer Genomics Cloud (SB-CGC), powered by Velsera, collaborates with the PSDC to facilitate access to its data for analysis. ',
    callToActionText: 'Read More',
    callToActionLink: '/analyze_data', // Link to the Request Access Page
  },
  tile4: {
    alt: 'Abstract image of hand holding 2 dimensional images of people',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/popsci/images/icons/png/Popsci_Cases.png',
    titleText: 'Submit Data',
    descriptionText: `To get started with a submission please submit a request on the CRDC Submission Portal, at <span style="white-space:nowrap;font-size:14px;"><a href="https://datacommons.cancer.gov/submit" target="_blank" rel="noopener noreferrer">https://datacommons.cancer.gov/submit</a><img src="${externalLinkIcon}" style="margin:0 0 0 2px;padding:0 2px 3px 3px;vertical-align:sub;" alt="outbound web site icon" /></span>`
  },
};

// --------------- GraphQL query - Retrieve Landing page data --------------
export const GET_LANDING_PAGE_DATA_QUERY = gql`
  {
    numberOfPrograms
    numberOfStudies
    numberOfCases
    numberOfFiles
  }
`;

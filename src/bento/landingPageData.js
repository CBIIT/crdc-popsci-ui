import gql from 'graphql-tag';
// import Test from '../assets/header/CTDC_Logo.svg';

// The ideal image size of landingPageHero 1400x600px
// Tile1 Tile2 Tile3 images 293x349 px
// Tile4 image optimum size 600x 436 px
export const landingPageData = {
  callToActionTitle: 'Unleashing the power of data for global health',
  callToActionTitle2: 'Welcome to the Population Science Data Commons',
  callToActionDescription: 'Dive into the Population Science Data Commons, where vast datasets converge to illuminate patterns and help drive innovation in global health.',
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
    descriptionText: 'Population science research aims to understand the causes and distribution of cancer in populations, monitor and explain cancer trends across different groups defined by geography or demographics, and support the development and implementation of broad-based interventions. The PSDC manages, houses, and shares data from various NCI-funded research programs and awards, including the Cancer Epidemiology Cohorts (CECs), supported by the NCI’s Division of Cancer Control and Population Sciences (DCCPS).',
    callToActionText: 'Read More',
    callToActionLink: '/about', // This links to the "About" static page.
  },
  tile2: {
    alt: 'Abstract image of network data',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/popsci/images/icons/png/TrialsImage.png',
    titleText: 'Access Data',
    descriptionText: 'PSDC hosts both open and controlled access data, accessible for analysis and download through the Seven Bridges Cancer Genomics Cloud.',
       callToActionText: 'Read More',
    callToActionLink: '/access_data', // This links to the Programs Listing Page.
  },
  tile3: {
    alt: 'Image of person using laptop with national cancer institute website displayed on laptop',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/popsci/images/icons/png/requestAccessImage.png',
    titleText: 'Analyze Data',
    descriptionText: 'The Seven Bridges Cancer Genomics Cloud (SB-CGC), powered by Velsera, collaborates with the PSDC to facilitate access to its data for analysis. ',
    callToActionText: 'Read More',
    callToActionLink: '/analyze_data', // Link to the Request Access Page
  },
  tile4: {
    alt: 'Abstract image of hand holding 2 dimensional images of people',
    img: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/popsci/images/icons/png/Popsci_Cases.png',
    titleText: 'Submit Data',
  descriptionText: 'Data submission to PSDC will open in early 2026.  To discuss submitting data before then, contact the CRDC Help Desk at <a href="mailto:NCICRDC@mail.nih.gov">NCICRDC@mail.nih.gov</a>',
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

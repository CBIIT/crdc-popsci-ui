const images = {
  about: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/popsci/images/icons/png/homeImageforAboutCard.png',
  access: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/popsci/images/icons/png/TrialsImage.png',
  analyze: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/popsci/images/icons/png/requestAccessImage.png',
  support: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/aboutPages/About_Support.jpeg',
};

const FALLBACK_PAGES = {
  '/about': {
    route: '/about',
    slug: 'about',
    title: 'About the Population Science Data Commons (PSDC)',
    primaryImage: { src: images.about, alt: 'Male and female researcher looking over data on a computer screen in a lab', position: 'left' },
    markdown: 'Population science research aims to understand the causes and distribution of cancer in populations, monitor and explain cancer trends across different groups defined by geography or demographics, and support the development and implementation of broad-based interventions.\n\nThe PSDC manages, houses, and shares data from various NCI-funded research programs and awards. It currently focuses on comprehensive study data with searchable summary data, allowing users to identify potential studies of interest using parameters including study name, study design, enrollment period, number of participants, cancer types, demographics such as age at enrollment, race, ethnicity and sex, and whether or not particular categories of data elements were collected as part of the study.\n\nData types supported by the PSDC include, but are not limited to, demographic data, survey and questionnaire data, biomarker assays, environmental exposure measurements, dietary and anthropometric assessments.\n\nIn addition to making population science data accessible, the PSDC supports integration with other Cancer Research Data Commons (CRDC) data commons. As part of the CRDC, the PSDC\'s data can be linked to -omics data from the same populations stored in other CRDC data commons, such as the Genomics Data Commons, the Proteomic Data Commons, or the General Commons.',
  },
  '/access_data': {
    route: '/access_data',
    slug: 'access-data',
    title: 'Access Data',
    primaryImage: { src: images.access, alt: 'Abstract image of network data', position: 'left' },
    markdown: 'The PSDC portal provides faceted searching for studies of interest using various parameters, including study name, study design, enrollment period, number of participants, cancer types, study country, biospecimen collection, demographics such as age at enrollment, race, ethnicity and sex, and whether or not particular categories of data elements were collected as part of the study.\n\nThe PSDC hosts both open and controlled access data, accessible for analysis and download through the Seven Bridges Cancer Genomics Cloud. Open access data is publicly accessible; no authorization is required. To use controlled-access data, researchers must first obtain authorization from the NCI\'s Data Access Committee (DAC). The DAC manages the authorization process for the database of Genotypes and Phenotypes (dbGaP), maintained by the National Center for Biotechnology Information (NCBI). Users request access to controlled data through [dbGaP](https://dbgap.ncbi.nlm.nih.gov/home) using the pHS study IDs provided by the PSDC portal.\n\nThe PSDC portal does not provide local file download. Users can navigate from the portal to the Seven Bridges Cancer Genomics Cloud (SB-CGC), powered by Velsera, by adding files of interest to the Data Cart and selecting **Export and Download > Export to Cancer Genomics Cloud**. Once on SB-CGC, files are accessible to authorized users for analysis using the wide range of available analysis tools, workflows, notebooks, and collaborative workspaces, or for local download.',
  },
  '/analyze_data': {
    route: '/analyze_data',
    slug: 'analyze-data',
    title: 'Analyze Data',
    primaryImage: { src: images.analyze, alt: 'Image of a person using a laptop with the National Cancer Institute website displayed', position: 'left' },
    markdown: 'The Seven Bridges Cancer Genomics Cloud (SB-CGC), powered by Velsera, collaborates with the PSDC to facilitate access to its data for analysis. SB-CGC offers secure personal workspaces on the AWS cloud platform as well as publicly available analytical tools shared by the research community. Users create a manifest of files of interest through the PSDC portal and, with one click, can access those files for analysis within the secure SB-CGC environment. Users also have the option of downloading data to their local environment from the SB-CGC platform.\n\nLearn more about working within the [Seven Bridges Cancer Genomics Cloud](https://datacommons.cancer.gov/analytical-resource/seven-bridges-cancer-genomics-cloud-developed-velsera#) environment.',
  },
  '/support': {
    route: '/support',
    slug: 'support',
    title: 'Support',
    primaryImage: { src: images.support, alt: 'Abstract representation of a hand interacting with a holographic cloud button', position: 'left' },
    markdown: 'Please direct questions, comments, or concerns to [NCICRDC@mail.nih.gov](mailto:NCICRDC@mail.nih.gov).',
  },
};

export const getFallbackPage = (route) => FALLBACK_PAGES[route] || null;

export default getFallbackPage;

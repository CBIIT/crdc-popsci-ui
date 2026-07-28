import Logo from '../assets/header/Portal_Logo.svg';
import LogoSmall from '../assets/header/Portal_Logo_Small.svg';
import searchbarIcon from '../assets/header/Search_Icon.svg';
import usaFlagSmall from '../assets/header/us_flag_small.svg';

// globalHeaderLogo image 468x100
// globalHeaderImage: image 2200x100
export const headerData = {
  globalHeaderLogo: Logo,
  globalHeaderLogoSmall: LogoSmall,
  globalHeaderLogoLink: '/',
  globalHeaderLogoAltText: 'National Cancer Institute Population Sciences logo',
  globalHeaderSearchIcon: searchbarIcon,
  globalHeaderSearchIconAltText: 'search Icon',
  usaFlagSmall,
  usaFlagSmallAltText: 'usaFlagSmall',
};

export const navDesktopList = [
  {
    name: 'Home',
    link: '/',
    id: 'navbar-link-explore',
    className: 'navMobileItem',
  },
  {
    name: 'Explore',
    link: '/explore',
    id: 'navbar-link-explore',
    className: 'navMobileItem',
  },
  {
    name: 'About',
    link: '',
    id: 'navbar-dropdown-about',
    className: 'navMobileItem clickable',
  },
];

export const navMobileList = [
  ...navDesktopList,
  {
    name: 'Cart',
    link: '/fileCentricCart',
    id: 'navbar-dropdown-cart',
    className: 'navMobileItem',
  },
];

export const navbarSublists = {
  // Example of how to do a navMobileSubTitle and subtext
  About: [
    {
      name: 'About',
      link: '/about',
      id: 'navbar-dropdown-item-about',
      className: 'navMobileSubItem',
    },
    {
      name: 'Access Data',
      link: '/access_data',
      id: 'navbar-dropdown-item-access-data',
      className: 'navMobileSubItem',
    },
    {
      name: 'Analyze Data',
      link: '/analyze_data',
      id: 'navbar-dropdown-item-analyze-data',
      className: 'navMobileSubItem',
    },
      {
      name: 'GraphQL',
      link: '/graphql',
      id: 'navbar-dropdown-item-graphql',
      className: 'navMobileSubItem',
    },
    {
      name: 'Support',
      link: '/support',
      id: 'navbar-dropdown-item-support',
      className: 'navMobileSubItem',
    }
  ],
};

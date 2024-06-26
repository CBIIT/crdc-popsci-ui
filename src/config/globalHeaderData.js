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
  globalHeaderLogoAltText: 'Portal Logo',
  globalHeaderSearchIcon: searchbarIcon,
  globalHeaderSearchIconAltText: 'search Icon',
  usaFlagSmall,
  usaFlagSmallAltText: 'usaFlagSmall',
};

export const navMobileList = [
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
    name: 'Study',
    link: '/study/NCT04314401',
    id: 'navbar-link-study',
    className: 'navMobileItem',
  },
  {
    name: 'About',
    link: '',
    id: 'navbar-dropdown-about',
    className: 'navMobileItem clickable',
  },
];

export const navbarSublists = {
  // Example of how to do a navMobileSubTitle and subtext
  About: [
    {
      name: 'Purpose',
      link: '/purpose',
      id: 'navbar-dropdown-item-purpose',
      className: 'navMobileSubItem',
    },
    {
      name: 'Contact Us',
      link: '/support',
      id: 'navbar-dropdown-item-contact-us',
      className: 'navMobileSubItem',
    },
  ],
};

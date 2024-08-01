import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Logo from './components/LogoDesktop';
import SearchBar from './components/SearchBarDesktop';
import NavBar from './components/NavbarDesktop';
import { useTheme } from '../ThemeContext';
import themes from '../../themes/index';

const HeaderBanner = styled.div`
  width: 100%;
 .shadow{
      position: absolute;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
      width:100%;
      height:10px;
    }
  `;

const HeaderContainer = styled.div`
    margin: 0 auto;
    padding-left: 32px;
    max-width: ${({ theme }) => theme?.custom?.maxContentWidth || '1440px'};
    display: flex;

    .searchBarArea {
        padding: 5px 32px 0 0;
        display: none;
    }

    .headerLowerContainer {
        display: flex;
        margin-left: auto;
    }

    .searchBarArea {
      margin-top: 29px;
    }
`;

const Header = () => {
  const { dark } = useTheme();
  const theme = dark ? themes.dark : themes.light;
  const path = useLocation().pathname;
  
  return (
    <HeaderBanner role="banner">
      <HeaderContainer theme={theme}>
        <Logo />
        <div className="headerLowerContainer">
          { path !== "/sitesearch" && <div className="searchBarArea"><SearchBar /></div> }
        </div>
      </HeaderContainer>
   
      <div className="navbarContainer"><NavBar /></div>
      <div className="shadow"> </div>
    </HeaderBanner>
  );
};

export default Header;

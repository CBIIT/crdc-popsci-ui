import React from 'react';
import styled from 'styled-components';
import { headerData } from '../../../config/globalHeaderData';

const LogoArea = styled.div`
    display: flex;
    img {
      width: fit-content;
      max-width: 400px;
      height: 51px;
    }

    .logoContainer {
      margin-top: 30px;
      margin-bottom: 6px;
    }

`;

const Logo = () => (
  <LogoArea>
    <a id="header-logo-home-link" className="logoContainer" href={headerData.globalHeaderLogoLink}>
      <img src={headerData.globalHeaderLogo} alt={headerData.globalHeaderLogoAltText} />
    </a>
  </LogoArea>
);

export default Logo;

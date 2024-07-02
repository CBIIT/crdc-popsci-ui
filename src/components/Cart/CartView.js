/* eslint-disable */
import React from 'react';
import {
  navBarData, navBarCartData, navBarstyling, externalLinks,
} from '../../bento/navigationBarData';
import styled from 'styled-components';
import { Tooltip as MuiTooltip } from '@material-ui/core';
import {Link} from 'react-router-dom'

const CartView = (props) => {

const CartContainer = styled.div`
  .badge{
    padding-top: 45px;
    display: flex;
    vertical-align: middle;
     padding-right: 20px;
  },
  .cartLink{
    text-decoration: none;
  },
  .cartIcon{
     height: 63px;
     z-index: 1;
  },
  .cartCounter {
    min-width: 16px;
    font-family: inter;
    font-weight: 600;
    letter-spacing: 0.8px;
    transform: scale(1) translate(0%, -50%);
  },
  .cartCounter2Wrapper {
    padding-top: 4px;
    margin-left: -3px;
  },
  .cartCounter2 {
    color: #6D6D6D;
    font-size: 12px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .cartLabel {
    min-width: 16px;
    color: #00846A;
    font-family: Raleway;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-align: start;
    font-size: 12px;
    text-transform: uppercase;
  }
`;

const getCartLabel = (labelType) => {
    switch (labelType) {
      case 'labelUnderCount':
        return (
          <div className="cartCounter2Wrapper">
            <div className="cartCounter2">
              {props.numberOfFiles || 0}
            </div>
            <div className="cartLabel">
              Files
            </div>
          </div>
        );
      default:
        return (
          <span className="" style={{marginLeft: '-16px', marginTop: '10px'}}>
            <span
              className="cartCounter"
              style={{
                backgroundColor: '#24415C',
                color: '#FFFFFF',
                fontFamily: 'Open Sans',
                fontWeight: 700,
                fontSize: '11px',
                lineHeight: '14.98px',
                letterSpacing: '0.08em',
                borderRadius: '5px',
                padding: '0px 5px 0px 15px',
              }}>
              {props.numberOfFiles || 258}
            </span>
          </span>

        );
    }
  };

  const Tooltip =  MuiTooltip;
  return (
    <CartContainer>
      <Link to="/fileCentricCart" className="cartLink">
        <dev className="badge">
            <img
              className="cartIcon"
              src={navBarCartData.cartIcon}
              alt={navBarCartData.cartIconAlt}
            />
          
          {getCartLabel(navBarCartData.cartLabelType)}
        </dev>
      </Link>
    </CartContainer>
  )
}

export default CartView;


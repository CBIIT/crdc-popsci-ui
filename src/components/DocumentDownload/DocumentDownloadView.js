import React from 'react';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core';
import ToolTip from '@bento-core/tool-tip';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import env from '../../utils/env';
import CustomIcon from '../CustomIcon/CustomIconView';


// Function to download the file
const downloadFile = async (signedUrl) => {
    window.open(signedUrl, '_blank');
};

// NOTE: This component is getting more complex, will need to refactor at some point.
const DocumentDownload = ({
  classes,
  signedUrl = "https://d2fztblijod0e6.cloudfront.net/popsci-dev.tfvars?Expires=1724371200&Signature=kW5bWeRHdH1gNQRYOavzkMyvcDPTaQ8lb8MSCa10wSBAgDIfwv2ZF7t2dGMCZixdRpOIJGAykMBnf2evqT-RRybUw2fa0X4Ca1s4nxBPPjIjQMwNBRRC~rJUtpVenksXgPTjvh7dXFUfWxPuki35OjO7IvfhcvD9TBBeYCN330AV7RV2owG3iMxSayDBM8ryzVSWY1CxiaqR-80c~6Cz1VK9D74fnoQsz2Tsb9C3YHI-TVdWyxnZexsNInpj7QmwdcDJxf290f3~OcS1QNWA8DAxXzcxRNILqZWgE7CtYzwQqK6O8ekziUHzBa80z~AwElxAofb12NwuJPL1eRNTxQ__&Key-Pair-Id=K2VYEP14AN5MX4",
  toolTipTextFileDownload = 'Download a copy of this file',
  iconFileDownload = '',
  iconFilePreview = '',
  iconUnauthenticated = '',
}) => {

  return (
    <>
      <div>
              <ToolTip classes={{ tooltip: classes.customTooltip, arrow: classes.customArrow }} title={toolTipTextFileDownload} placement="bottom">
                <div
                  onClick={() => downloadFile(signedUrl)}
                  style={{ textAlign: 'center' }}
                >
                  <CustomIcon imgSrc={iconFileDownload} />
                </div>
              </ToolTip>
      </div>
    </>
  );
};

const styles = () => ({
  customTooltip: {
    borderRadius: '5px',
    border: '.2px solid #C3C3C3',
    // border: 'none',
    boxShadow: '0px 4px 10px 0px #00000040',
    fontFamily: 'Open Sans',
    color: '#223D4C',
    fontSize: '13px',
    fontWeight: 600,
    lineHeight: '19px',
    letterSpacing: '0em',
    textAlign: 'left',
    maxWidth: '103px',
    padding: '10px 15px'
  },
  customArrow: {
  },
  alertStyles: {
    backgroundColor: '#155E6F !important',
  },
  requestAccessLink: {
    fontWeight: 600,
    textDecoration: 'underline !important',
    color:'#FFFFFF',
    fontSize: '16px',
    '&:hover': {
      textDecoration: 'none',
      color: '#FFFFFF'
    },
  },
});

export default withStyles(styles)(DocumentDownload);

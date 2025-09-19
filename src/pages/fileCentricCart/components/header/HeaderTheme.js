import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { DROP_DOWN_WIDTH } from '../dropdown/DropDownStyle';

export default ({
    children,
  }) => {
  const theme = {
    overrides: {
      MuiRadio: {
        root: {
          color: '#09557B',
        },
        colorSecondary: {
          '&$checked': {
            color: '#09557B',
          },
        },
      },
      MuiFormControlLabel: {
        label: {
          color: '#525252',
          fontFamily: 'Roboto',
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '16px',
        },
        root: {
          "&.selectFilesBtn":{
              marginRight: '51px',
          }
        }
      },
      MuiList: {
        root: {
            width: DROP_DOWN_WIDTH,
        }
      },
      MuiListItem: {
        root: {
          padding: '2px 12px',
          color: '#fff',
          overflow: 'auto',
          whiteSpace: 'wrap',
          '&:hover': {
            background: '#1A3D69',
          }
        },
      },
      MuiOutlinedInput: {
        root: {
          height: '100%',
          '& textarea': {
            height: '172px !important',
          },
        },
      },
      MuiButton: {
        root: {
          padding: '0px'
        },
        text: {
          padding: '0px'
        }
      },
      MuiMenuItem: {
        root: {
          backgroundColor: '#ffffff',
          color: '#000000',
          border: '1px solid #14616A',
          borderTop: '0px',
          maxHeight: '41px',

          '&.downloadManifestBtn': {
            borderTop: '0px',
            borderBottomRightRadius: '18px',
            borderBottomLeftRadius: '18px',
          },
          '&:hover': {
            backgroundColor: '#D9EAEC',
            color: '#14616A'
          },
        }
        
      },
    }
  };
  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  );
};
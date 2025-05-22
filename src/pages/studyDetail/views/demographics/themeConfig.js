// themeConfig.jsx
import React from 'react';
import _ from 'lodash';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import themes, { overrides as rootOverrides } from '../../../../themes';

const AppTheme = ({ children }) => {
  // Deep-clone the base “light” theme so we don’t mutate the original
  const baseTheme = _.cloneDeep(themes.light);

  // Define only our component-specific overrides
  const componentOverrides = {
    MuiTab: {
      root: {
        maxHeight: '45px',
        paddingTop: 0,
        '& .last-child': {
          border: '1px solid black',
        },
      },
    },
    MuiGrid: {
      item: {
        marginBottom: 0,
      },
    },
    MuiTableRow: {
      head: {
        // Remove the bottom border on header rows
        borderBottom: 'none',
      },
    },
    MuiTableCell: {
      root: {
        fontFamily: 'Open Sans',
        padding: 0,
      },
      head: {
        fontWeight: 700,
        fontSize: '11px',
        lineHeight: '9px',
        letterSpacing: '-2%',
        textAlign: 'center',
        textTransform: 'capitalize',
        color: '#2D3E47',
        padding: '3px 3px 8px',
      },
      body: {
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '22px',
        letterSpacing: 0,
        color: '#4B4B4B',
        maxHeight: '22px',
        '&:first-of-type': {
          paddingLeft: '44px',
        },
      },
    },
    MuiButton: {
      root: { padding: 0 },
      text: { padding: 0 },
      textSizeSmall: { padding: 0 },
    },
  };

  // Merge any existing overrides, our component overrides, and any root-level overrides
  baseTheme.overrides = {
    ...(baseTheme.overrides || {}),
    ...componentOverrides,
    ...rootOverrides,
  };

  // Create the final theme, adjusting breakpoints as needed
  const theme = createTheme({
    ...baseTheme,
    breakpoints: {
      ...baseTheme.custom.breakpoints,
      values: {
        ...baseTheme.custom.breakpoints.values,
        md: baseTheme.custom.breakpoints.values.customMd,
        sm: baseTheme.custom.breakpoints.values.customSm,
      },
    },
  });

  // Wrap children in ThemeProvider
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppTheme;
import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = {
  overrides: {
    Mui: {
      '&$expanded': {
        margin: '0px 0px',
      },
      checked: {
        color: 'red',
      },
    },
    MuiAccordionDetails: {
      root: {
        padding: '0px 1px 0px',
      },
    },
    MuiAccordion: {
      root: {
        '&$expanded': {
          margin: 'auto',
        },
        '&#Filter\\ by\\ Studies': {
          // Target Each facet under the Filter By Studies
        },
      },
    },
    MuiAccordionSummary: {
      content: {
        margin: '0',
      },
    },
    MuiList: {
      padding: {
        paddingTop: '0',
        paddingBottom: '0',
      },
    },
    MuiCheckbox: {
      colorSecondary: {
        '&:first-child': {
          color: '#000000',
        },
      },
    },
    MuiListItem: {
      root: {
        '&.filter_by_studiesCheckedEven': {
          backgroundColor: '#FFF6EA',
        },
        '&.filter_by_studiesCheckedOdd': {
          backgroundColor: '#F4EEE5',
        },
        '&.filter_by_participantsCheckedEven': {
          backgroundColor: '#E2F1F5',
        },
        '&.filter_by_participantsCheckedOdd': {
          backgroundColor: '#DBE7E9',
        },
      },
    },
    MuiSvgIcon: {
      root: {
        '&.filter_by_studiesCheckedIcon': {
          color: '#6D5F5B',
        },
        '&.filter_by_participantsCheckedIcon': {
          color: '#6D5F5B',
        },
      },
    },
    MuiTypography: {
      root: {
        '&.filter_by_studiesSubjects': {
          // Tagret Count (XX)
        },
        '&.filter_by_participantsSubjects': {
          color: '#065B43',
          fontSize: '12px',
          fontFamily: 'Nunito',
          fontWeight: 400,
          marginRight: '0px',
        },
        '&.filter_by_biospecimensSubjects': {
          color: '#843806',
          fontSize: '12px',
          fontFamily: 'Nunito',
          fontWeight: 400,
          marginRight: '0px',
        },
        '&.filter_by_data_filesSubjects': {
          color: '#005A7A',
          fontSize: '12px',
          fontFamily: 'Nunito',
          fontWeight: 400,
          marginRight: '0px',
        },
      },
    },
    MuiDivider: {
      middle: {
        marginLeft: '0px',
        marginRight: '0px',
      },
      root: {
        height: '5px',
        '&.divider0': {
          backgroundColor: '#7A5015',
        },
        '&.divider1': {
          backgroundColor: '#3388A6',
        }
      },
    },
    checkboxRoot: {
      color: 'inherit',
      '&$checked': {
        color: '#8DCAFF',
      },
    },
    MuiListItemText: {
      root: {
        '&.filter_by_studies_md_space': {
          // Target the space between group and subjects - display: 'none !important'
        }
      },
    },
  },
};

export default ({
  children,
}) => {
  const computedTheme = createTheme(theme);
  return (
    <ThemeProvider theme={computedTheme}>
      {children}
    </ThemeProvider>
  );
};

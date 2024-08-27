import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { Height } from '@material-ui/icons';

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
        '&#Filter\\ by\\ Participants': {
          // Target Each facet under the Filter By Studies
        },
      },
    },
    // Both Facet section and individual facet
    MuiAccordionSummary: {
      content: {
        // border: '2px solid green !important',
        margin: '0px !important',
        padding: '0px !important'
      },
      root: {
        margin: '0px !important', 
        padding: '0px !important',

        // individual facet item
        '&#Study\\ Design': {
        }
      }
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
        fontFamily: 'Open Sans !important',
          fontSize: '16px !important',
          fontWeight: 400,
          lineHeight: '21.79px !important',
        // Facet Item
        '&.filter_by_studiesNameUnChecked, &.filter_by_studiesNameChecked, &.filter_by_participantsNameUnChecked, &.filter_by_participantsNameChecked': {
          fontFamily: 'Open Sans !important',
          fontSize: '16px !important',
          fontWeight: 400,
          lineHeight: '21.79px !important',
        },
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
        // Tagret Facet Count (XX)
        '&.filter_by_studiesSubjects, &.filter_by_participantsSubjects': {
          color: '#000000',
          fontFamily: 'Open Sans',
          fontSize: '14px',
          fontWeight: 300,
          lineHeight: '21.79px',
          marginLeft: '5px',
          marginTop: '-2px',
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
          height: '8px',
        },
        '&.divider1': {
          backgroundColor: '#3388A6',
          height: '8px',
        },
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
        // Target the space between group and subjects
        '&.filter_by_studies_md_space, &.filter_by_participants_md_space': {
          display: 'none !important',
        },
      },
    },
    MuiSlider: {
      root: {
        textTransform: 'capitalize',
      },
      rail: {
        backgroundColor: '#D4D4D4 !important',  // Slider rail
      },
      track: {
        backgroundColor: '#794900 !important',   // Slider track
      },
      thumb: {
        backgroundColor: '#794900 !important',    // Slider thumb
        background: '#794900 !important',
      },
    },

    MuiInput: {
      root: {
        width: 'fit-content !important',
        backgroundColor: '#F0F0F0 !important',
        borderBottom: '2px solid #000000',
      },
      input: {
        width: 'fit-content',
        margin: 'auto 3px',
        textAlign: 'center',
      }
    },
    MuiCollapse: {
      root: {
        '& > div > div > div > p': {
          // Targeting Slider XXX-XXX
          color: '#000000 !important',
          background: '#FFFAF2 !important',
          textAlign: 'left',
          paddingLeft: '20px',
          borderTop: '0.5px solid #969696',

          fontFamily: 'Open Sans',
          fontSize: '14px',
          fontWeight: 300,
          lineHeight: '19.07px',
        },
      }
    },
  }

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

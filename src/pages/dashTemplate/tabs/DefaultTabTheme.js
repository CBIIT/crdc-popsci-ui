export const customTheme = {
  MuiTabs: {
    root: {
       width:'100%',
      borderBottom: '3px solid #71767A',
    },
  },
  MuiTab: {
    root: {
      marginTop: '15px',
      color: '#000000',
      height: '45px',
      overflow: 'hidden',
      background: '#F4F4F4',
      borderTop: '6px solid #8A7F7C',
      borderLeft: '1px solid black',
      borderRight: '1px solid black',
      fontWeight: '500',
      lineHeight: '24px',
      letterSpacing: '0.25px',
      marginRight: '10px',
      marginLeft: '10px',
      fontSize: '20px',
      width: '250px',
      textTransform: 'none',
      fontFamily: 'Inter',
      '&.Mui-selected': {
        fontWeight: '500',
        '&.participants': {
          background: '#D7F2EB',
          color: '#26785F',
          borderTop: '5px solid #08A383',
        },
        '&.biospecimens': {
          background: '#FFF0E7',
          color: '#843806',
          borderTop: '5px solid #EF660B',
        },
        '&.files': {
          background: '#EDF8FD',
          color: '#035877',
          borderTop: '5px solid #0696C9',
        },
        '&.MuiTypography-body1': {
          color: 'red',
        },
      },
      '& span.participants_count': {
        fontFamily: 'Roboto',
        fontWeight: '400',
        marginLeft: '5px',
        fontSize: '16px',
      },
      '& span.biospecimens_count': {
        fontFamily: 'Roboto',
        fontWeight: '400',
        marginLeft: '5px',
        fontSize: '16px',
      },
      '& span.files_count': {
        fontFamily: 'Roboto',
        fontWeight: '400',
        marginLeft: '5px',
        fontSize: '16px',
      },
    },
  },
};

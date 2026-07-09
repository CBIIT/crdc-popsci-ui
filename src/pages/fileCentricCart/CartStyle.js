export default (theme) => ({
  myFilesContainer: {
    padding: '0px 32px',
    margin: '60px auto 190px auto',
    maxWidth: `${theme?.custom?.maxContentWidth || '1622px'}`,
  },
  '@media (max-width: 1024px)': {
    myFilesContainer: {
      padding: '0px 16px !important',
    },
  },
  myFilesWrapper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: '27px',
    background: 'white',
  },
  customTooltip: {
    border: '#03A383 1px solid',
  },
  text_instruction: {
    border: '#03A383 1px solid',
  },
});

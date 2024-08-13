export default (theme) => ({
  dashboardContainer: {
    backgroundColor: '#FFFFFF',
  },
  content: {
    display: 'flex',
    maxWidth: `${theme?.custom?.maxContentWidth || '1440px'}`,
    margin: 'auto',
    padding: '0 32px',
  },
  sideBar: {
    width: '250px',
    maxHeight: '1300px',
    overflowX: 'hidden',
    backgroundColor: 'transparent',
    borderLeft: 'thin solid #B1B1B1',
    overflow: 'scroll',
    zIndex: '99',
    paddingBottom: '150px',
  },
  rightContent: {
    width: 'calc(100% - 275px)',
    position: 'relative',
    marginLeft: '25px',
  },
});

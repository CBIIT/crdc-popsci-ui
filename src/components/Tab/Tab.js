import React from 'react';
import {
  Tabs, Tab, withStyles,
} from '@material-ui/core';
import TabLabel from './TabLable';

const TabItems = ({
  tabItems,
  styleClasses,
  handleTabChange,
  currentTab,
  orientation,
  disable=false,
}) => {
  function getTabLalbel(title, image, index) {
    return (
      <TabLabel
        title={title}
        icon={image}
        primaryColorClass={(currentTab === index)
          ? styleClasses.tabHighlightColor : styleClasses.tabPrimaryColor}
      />
    );
  }

  const TABs = tabItems.map((tab, index) => (
    <Tab
      index={tab.index}
      label={
        getTabLalbel(tab.label, tab.icon, tab.index)
      }
      key={index}
      disableRipple
      disabled={tab.disable || false}
    />
  ));

  return (
    <>
      <Tabs
        onChange={(event, value) => handleTabChange(event, value)}
        value={currentTab}
        TabIndicatorProps={{ style: { background: 'none' } }}
        orientation={orientation}
      >
        {TABs}
      </Tabs>
    </>
  );
};

const styles = () => ({
  defaultStyle: {
    fontFamily: 'Open Sans',
    textTransform: 'none',
    fontSize: '17px',
  },
  flexContainer: {
    flexDirection: 'column',
  },
  indicator: {
    display: 'none',
  },
  tabHighlightColor: {
    color: '#ffffff',
  },
});

export default withStyles(styles)(TabItems);

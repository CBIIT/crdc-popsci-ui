import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './DashTemplateStyle';
import BentoFacetFilter from './sideBar/BentoFacetFilter';
import WidgetView from './widget/WidgetView';
import StatsView from '../../components/Stats/StatsView';
import TabsView from './tabs/TabsView';
import QueryBarView from './filterQueryBar/QueryBarView';
import { useHideRechartsSpan } from '../../hooks/useHideRechartsSpan';

const DashTemplate = ({
  classes,
  dashData,
  activeFilters,
  tabIndex=0,
}) => {
    useHideRechartsSpan();

  return (
    <main className={classes.dashboardContainer}>
      <h1 className={classes.visuallyHidden}>Dashboard</h1>
      <h2 className={classes.visuallyHidden}>Explore</h2>
      <StatsView data={dashData} />
      <div>
        <div className={classes.content}>
          <div className={classes.sideBar}>
            <BentoFacetFilter
              searchData={dashData}
              activeFilters={activeFilters}
            />
          </div>
          <div className={classes.rightContent}>
            <div className={classes.widgetsContainer}>
              <QueryBarView data={dashData} />
              <WidgetView
                data={dashData}
              />
              <TabsView
                dashboardStats={dashData}
                activeFilters={activeFilters}
                tabIndex={tabIndex}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
)};

export default withStyles(styles)(DashTemplate);

import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { getFilters } from '@bento-core/facet-filter';
import DashTemplateView from './DashTemplateView';
import { DASHBOARD_QUERY_NEW } from '../../bento/dashboardTabData';

/*
function calculateStatsTotals(data) {
  return data.reduce((acc, item) => {
    acc.data_volume += item.dataolume;
    acc.number_of_participants += item.number_of_participants;
    return acc;
  }, { data_volume: 0, number_of_participants: 0 });
}*/

const getDashData = (states) => {
  const {
    filterState,
    localFindUpload, localFindAutocomplete,
  } = states;

  const tabIndexMap = {
    'participants': 0,
    'biospecimens': 1,
    'files': 2,
  };
  const { search } = useLocation();
  const tabName = search ? new URLSearchParams(search).get('selectedTab').toLowerCase() : 'participants';
  const tabIndex = tabIndexMap[tabName];

  const client = useApolloClient();
  async function getData(activeFilters) {
    const result = await client.query({
      query: DASHBOARD_QUERY_NEW,
      variables: activeFilters,
      // context: { clientName: 'ctdcOldService' },
    })
      .then((response) => response.data);
      // Change data from two property to one
    return result;
  }

  const [dashData, setDashData] = useState(null);

  const activeFilters = {
    ...getFilters(filterState),
    subject_ids: [
      ...(localFindUpload || []).map((obj) => obj.subject_id),
      ...(localFindAutocomplete || []).map((obj) => obj.title),
    ],
    // take out lower and upper bound one tinto two
    // study_short_name:["HLBB"], // TODO: Leave adding default filter
  };

  useEffect(() => {
    const controller = new AbortController();
    getData(activeFilters).then((result) => {
      if (result.searchStudies) {

        setDashData(prevData => {
          const updatedData = { ...result.searchStudies, ...result.globalStatsBar };
          console.log('Updated Dash Data:', updatedData);
          return updatedData;
        });
      }
    });
    return () => controller.abort();
  }, [filterState, localFindUpload, localFindAutocomplete]);
  return { dashData, activeFilters, tabIndex };
};

const DashTemplateController = ((props) => {
  const { dashData, activeFilters, tabIndex } = getDashData(props);
  if (!dashData) {
    return (<CircularProgress />);
  }

  return (
    <DashTemplateView
      {...props}
      dashData={dashData}
      activeFilters={activeFilters}
      tabIndex={tabIndex}
    />
  );
});

const mapStateToProps = (state) => ({
  filterState: state.statusReducer.filterState,
  localFindUpload: state.localFind.upload,
  localFindAutocomplete: state.localFind.autocomplete,
});

export default connect(mapStateToProps, null)(DashTemplateController);
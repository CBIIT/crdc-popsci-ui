import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { DASHBOARD_QUERY_NEW } from '../../bento/dashboardTabData';
import { calculateStatsTotals } from '../../components/Stats/utils';
import DashTemplateView from './DashTemplateView';
import { prepareActiveFilters, sortWidgetDataByKey, updateSliderData } from './dashUtils';

const fetchDashData = async (client, activeFilters) => {
  const result = await client.query({
    query: DASHBOARD_QUERY_NEW,
    variables: activeFilters,
    // context: { clientName: 'ctdcOldService' },
  });
  return result.data;
};

// Hook to manage fetching and setting dashboard data
const useDashData = (states) => {
  const { filterState, localFindUpload, localFindAutocomplete } = states;
  const client = useApolloClient();
  const [dashData, setDashData] = useState(null);

  const activeFilters = prepareActiveFilters(filterState, localFindUpload, localFindAutocomplete, dashData);

  useEffect(() => {
    const controller = new AbortController();

    fetchDashData(client, activeFilters).then((result) => {
      if (result.searchStudies) {
        // Calculate global stats - number_of_participants
        const numberOfParticipantsGlobalStats = calculateStatsTotals(result?.globalStatsBar || []);

        // Update slider data for different types
        const enrollmentPeriod = updateSliderData(result.searchStudies, result.minMaxBoundQuery, 'enrollmentPeriod')
        const studyPeriod = updateSliderData(result.searchStudies, result.minMaxBoundQuery, 'studyPeriod', true)
        const ageAtEnrollment = updateSliderData(result.searchStudies, result.minMaxBoundQuery, 'ageAtEnrollment')
        const studyCountByNumberOfParticipants = updateSliderData(result.searchStudies, result.minMaxBoundQuery, 'studyCountByNumberOfParticipants')

        // Sort widget data
        sortWidgetDataByKey(result?.searchStudies?.studyCountByStudyDesign, 'group')
        sortWidgetDataByKey(result?.globalStatsBar, 'study_short_name')
        sortWidgetDataByKey(result?.searchStudies?.neoplasmCountByStudy, 'group')

        // Set the dashboard data with updated values
        setDashData(prevData => {
          const updatedData = {
            ...result.searchStudies, // All other Facet and widget
            globalStatsBar: result.globalStatsBar, // Used to populate Studies widget data
            ...numberOfParticipantsGlobalStats, // Global Stats - Participants 

            ...enrollmentPeriod, // Facet->Slider - Enrollment Period
            ...studyPeriod, // Facet->Slider - Study Period
            ...ageAtEnrollment, // Facet->Slider - Age At Enrollment
            ...studyCountByNumberOfParticipants // Facet->Slider - Number of Participants
          };
          return updatedData;
        });
      }
    });

    /* Cleanup function that runs when the component unmounts or before the effect re-runs.
     * If the API request is still in progress when this happens, it will be aborted to prevent
     * memory leaks and unnecessary state updates.
     */ 
    return () => controller.abort();
  }, [filterState, localFindUpload, localFindAutocomplete]);

  return { dashData, activeFilters };
};

const DashTemplateController = ((props) => {
  const { dashData, activeFilters } = useDashData(props);

  if (!dashData) {
    return (<CircularProgress />);
  }

  return (
    <DashTemplateView {...props} dashData={dashData} activeFilters={activeFilters} />
  );
});

const mapStateToProps = (state) => ({
  filterState: state.statusReducer.filterState,
  localFindUpload: state.localFind.upload,
  localFindAutocomplete: state.localFind.autocomplete,
});

export default connect(mapStateToProps, null)(DashTemplateController);
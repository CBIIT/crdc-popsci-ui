import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { getFilters } from '@bento-core/facet-filter';
import { DASHBOARD_QUERY_NEW } from '../../bento/dashboardTabData';
import { calculateStatsTotals } from '../../components/Stats/utils';
import DashTemplateView from './DashTemplateView';
import { sortWidgetDataByKey, updateSliderData } from './dashUtils';

const fetchDashData = async (client, activeFilters) => {
  const result = await client.query({
    query: DASHBOARD_QUERY_NEW,
    variables: activeFilters,
    // context: { clientName: 'ctdcOldService' },
  });
  return result.data;
};

// Helper Function to prepare active filters for the query
const prepareActiveFilters = (filterState, localFindUpload, localFindAutocomplete) => ({
  ...getFilters(filterState),
  subject_ids: [
    ...(localFindUpload || []).map((obj) => obj.subject_id),
    ...(localFindAutocomplete || []).map((obj) => obj.title),
  ],
  enrollment_beginning_year: filterState?.enrollment_year || [], // Enrollment Period (enrollmentPeriodMin)
  enrollment_ending_year: filterState?.enrollment_year || [], // Enrollment Period (enrollmentPeriodMax)

  study_beginning_year: filterState?.study_year || [], // Study Period (studyPeriodMin)
  study_ending_year: filterState?.study_year || [], // Study Period (studyPeriodMax)

  study_participant_minimum_age: filterState?.study_participant_age || [], // Age at Enrollment (participantAgeAtEnrollmentMin)
  study_participant_maximum_age: filterState?.study_participant_age || [] // Age at Enrollment (participantAgeAtEnrollmentMax)
});

// Hook to manage fetching and setting dashboard data
const useDashData = (states) => {
  const { filterState, localFindUpload, localFindAutocomplete } = states;
  const client = useApolloClient();
  const [dashData, setDashData] = useState(null);

  const activeFilters = prepareActiveFilters(filterState, localFindUpload, localFindAutocomplete);

  useEffect(() => {
    const controller = new AbortController();

    fetchDashData(client, activeFilters).then((result) => {
      if (result.searchStudies) {
        // Calculate global stats - number_of_participants
        const numberOfParticipantsGlobalStats = calculateStatsTotals(result?.globalStatsBar || []);

        // Update slider data for different types
        const enrollmentPeriod = updateSliderData(result.searchStudies, result.minMaxBoundQuery, 'enrollmentPeriod')
        const studyPeriod = updateSliderData(result.searchStudies, result.minMaxBoundQuery, 'studyPeriod')
        const ageAtEnrollment = updateSliderData(result.searchStudies, result.minMaxBoundQuery, 'ageAtEnrollment')
        const studyCountByNumberOfParticipants = updateSliderData(result.searchStudies, result.minMaxBoundQuery, 'studyCountByNumberOfParticipants')

        // Sort widget data
        sortWidgetDataByKey(result?.searchStudies?.studyCountByStudyDesign, 'group')
        sortWidgetDataByKey(result?.globalStatsBar, 'study_short_name')
        sortWidgetDataByKey(result?.searchStudies?.studyCountByDataCollection, 'group')

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
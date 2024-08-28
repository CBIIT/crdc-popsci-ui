import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { getFilters } from '@bento-core/facet-filter';
import DashTemplateView from './DashTemplateView';
import { DASHBOARD_QUERY_NEW } from '../../bento/dashboardTabData';

// Calculate the total number of participants
function calculateStatsTotals(data) {
  return data.reduce((acc, item) => {
    acc.number_of_participants += item.number_of_participants;
    return acc;
  }, { number_of_participants: 0 });
}

// Mapping object to handle different keys for min, max, lower, and upper bounds
const boundMapping = {
  enrollmentPeriod: {
    min: 'enrollmentPeriodMin',
    max: 'enrollmentPeriodMax',
    lower: 'enrollment_beginning_year_lower_bound',
    upper: 'enrollment_ending_year_upper_bound',
  },
  studyPeriod: {
    min: 'studyPeriodMin',
    max: 'studyPeriodMax',
    lower: 'study_beginning_year_lower_bound',
    upper: 'study_ending_year_upper_bound',
  },
  ageAtEnrollment: {
    min: 'participantAgeAtEnrollmentMin',
    max: 'participantAgeAtEnrollmentMax',
    lower: 'participant_minimum_age_lower_bound',
    upper: 'participant_maximum_age_upper_bound',
  },
  studyCountByNumberOfParticipants: {
    min: 'studyCountByNumberOfParticipants',
    max: 'studyCountByNumberOfParticipants',
    lower: 'number_of_participant_lower_bound',
    upper: 'number_of_participant_upper_bound',
  },
};

// Function to update slider data for different types (enrollment period, study period, etc.)
const updateSliderData = (searchStudiesData, minMaxBoundQuery, key) => {
  const minBoundKey = boundMapping[key].min;
  const maxBoundKey = boundMapping[key].max;
  
  const { lowerBound: absoluteMinimum, subjects: minSubjects } = searchStudiesData?.[minBoundKey] || {};
  const { upperBound: absoluteMaximum, subjects: maxSubjects } = searchStudiesData?.[maxBoundKey] || {};

  const lowerBound = minMaxBoundQuery?.[0]?.[boundMapping[key].lower] || absoluteMinimum;
  const upperBound = minMaxBoundQuery?.[0]?.[boundMapping[key].upper] || absoluteMaximum;

  return {
    [key]: {
      lowerBound,
      upperBound,
      subjects: Math.max(minSubjects || 0, maxSubjects || 0),
    },
  };
};

const getDashData = (states) => {
  const {
    filterState,
    localFindUpload, localFindAutocomplete,
  } = states;

  const client = useApolloClient();
  async function getData(activeFilters) {
    const result = await client.query({
      query: DASHBOARD_QUERY_NEW,
      variables: activeFilters,
      // context: { clientName: 'ctdcOldService' },
    })
      .then((response) => response.data);
    return result;
  }

  const [dashData, setDashData] = useState(null);
  // const [enrollmentPeriodData, setEnrollmentPeriodData] = useState(null);
  
  // const { enrollment_year } = getFilters(filterState)

  let activeFilters = {
    ...getFilters(filterState),
    subject_ids: [
      ...(localFindUpload || []).map((obj) => obj.subject_id),
      ...(localFindAutocomplete || []).map((obj) => obj.title),
    ],
    // Enrollment Period (enrollmentPeriodMin)
    enrollment_beginning_year: filterState?.enrollment_year || [],
    // Enrollment Period (enrollmentPeriodMax)
    enrollment_ending_year: filterState?.enrollment_year || [],

    // Study Period (studyPeriodMin)
    study_beginning_year: filterState?.study_year || [],
    // Study Period (studyPeriodMax)
    study_ending_year: filterState?.study_year || [],

    // Age at Enrollment (participantAgeAtEnrollmentMin)
    study_participant_minimum_age: filterState?.study_participant_age || [],
    // Age at Enrollment (participantAgeAtEnrollmentMax)
    study_participant_maximum_age: filterState?.study_participant_age || []
  };

  useEffect(() => {
    const controller = new AbortController();
    getData(activeFilters).then((result) => {
      if (result.searchStudies) {
        const globalStatsBar = calculateStatsTotals(result.globalStatsBar);
        const enrollmentPeriod = updateSliderData(result.searchStudies, result.minMaxBoundQuery, 'enrollmentPeriod')
        const studyPeriod = updateSliderData(result.searchStudies, result.minMaxBoundQuery, 'studyPeriod')
        const ageAtEnrollment = updateSliderData(result.searchStudies, result.minMaxBoundQuery, 'ageAtEnrollment')
        const studyCountByNumberOfParticipants = updateSliderData(result.searchStudies, result.minMaxBoundQuery, 'studyCountByNumberOfParticipants')

        setDashData(prevData => {
          const updatedData = {
            ...result.searchStudies, 
            ...globalStatsBar,
            globalStatsBar: result.globalStatsBar,
            ...enrollmentPeriod,
            ...studyPeriod,
            ...ageAtEnrollment,
            ...studyCountByNumberOfParticipants
          };

          return updatedData;
        });
      }
    });
    return () => controller.abort();
  }, [filterState, localFindUpload, localFindAutocomplete]);

  return { dashData, activeFilters };
};

const DashTemplateController = ((props) => {
  const { dashData, activeFilters } = getDashData(props);

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
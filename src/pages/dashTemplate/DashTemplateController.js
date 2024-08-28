import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { getFilters } from '@bento-core/facet-filter';
import DashTemplateView from './DashTemplateView';
import { DASHBOARD_QUERY_NEW } from '../../bento/dashboardTabData';

function calculateStatsTotals(data) {
  return data.reduce((acc, item) => {
    acc.number_of_participants += item.number_of_participants;
    return acc;
  }, { number_of_participants: 0 });
}

const updateSliderData = (searchStudiesData, minMaxBoundQuery, key) => {
  const { lowerBound: absoluteMinimum, subjects: minSubjects } = searchStudiesData?.[`${key}Min`] || {};
  const { upperBound: absoluteMaximum, subjects: maxSubjects } = searchStudiesData?.[`${key}Max`] || {};
  const lowerBound = minMaxBoundQuery?.[0]?.[`${key}_lower_bound`] || absoluteMinimum;
  const upperBound = minMaxBoundQuery?.[0]?.[`${key}_upper_bound`] || absoluteMaximum;

  return {
    [key]: {
      lowerBound,
      upperBound,
      subjects: Math.max(minSubjects || 0, maxSubjects || 0),
    }
  };
};

function updateSliderDataForEnrollmentPeriod(searchStudiesData, minMaxBoundQuery) {
  const { lowerBound: absoluteMinimum, subjects: minSubjects} = searchStudiesData?.enrollmentPeriodMin
  const { upperBound: absoluteMaximum, subjects: maxSubjects} = searchStudiesData?.enrollmentPeriodMax

  const enrollment_beginning_year_lower_bound = minMaxBoundQuery?.at(0)?.enrollment_beginning_year_lower_bound
  const enrollment_ending_year_upper_bound = minMaxBoundQuery?.at(0)?.enrollment_ending_year_upper_bound


  console.log("## enrollment_beginning_year_lower_bound: ", enrollment_beginning_year_lower_bound)
  console.log("## enrollment_ending_year_upper_bound: ", enrollment_ending_year_upper_bound)

  // result.searchStudies.enrollmentPeriodMax)

  return { 
    enrollmentPeriod: {
      lowerBound: enrollment_beginning_year_lower_bound || absoluteMinimum,
      upperBound: enrollment_ending_year_upper_bound || absoluteMaximum,
      subjects: Math.max(minSubjects, maxSubjects) // This can be relace by the numberOfStudies
    }
  }
}


function updateSliderDataForStudyPeriod(searchStudiesData, minMaxBoundQuery) {
  const { lowerBound: absoluteMinimum, subjects: minSubjects} = searchStudiesData?.studyPeriodMin
  const { upperBound: absoluteMaximum, subjects: maxSubjects} = searchStudiesData?.studyPeriodMax

  const study_beginning_year_lower_bound = minMaxBoundQuery?.at(0)?.study_beginning_year_lower_bound
  const study_ending_year_upper_bound = minMaxBoundQuery?.at(0)?.study_ending_year_upper_bound


  console.log("## study_beginning_year_lower_bound: ", study_beginning_year_lower_bound)
  console.log("## study_ending_year_upper_bound: ", study_ending_year_upper_bound)


  return { 
    studyPeriod: {
      lowerBound: study_beginning_year_lower_bound || absoluteMinimum,
      upperBound: study_ending_year_upper_bound || absoluteMaximum,
      subjects: Math.max(minSubjects, maxSubjects) // This can be relace by the numberOfStudies
    }
  }
}

function updateSliderDataForNumberOfParticipants(searchStudiesData, minMaxBoundQuery) {
  const { lowerBound: absoluteMinimum, upperBound: absoluteMaximum, subjects} = searchStudiesData?.studyCountByNumberOfParticipants

  const number_of_participant_lower_bound = minMaxBoundQuery?.at(0)?.number_of_participant_lower_bound
  const number_of_participant_upper_bound = minMaxBoundQuery?.at(0)?.number_of_participant_upper_bound

  return {
    studyCountByNumberOfParticipants: {
      lowerBound: number_of_participant_lower_bound || absoluteMinimum,
      upperBound: number_of_participant_upper_bound || absoluteMaximum,
      subjects: subjects // This can be relace by the numberOfStudies
    }
  }
}

function updateSliderDataForAgeAtEnrollment(searchStudiesData, minMaxBoundQuery) {
  const { lowerBound: absoluteMinimum, subjects: minSubjects} = searchStudiesData?.participantAgeAtEnrollmentMin
  const { upperBound: absoluteMaximum, subjects: maxSubjects} = searchStudiesData?.participantAgeAtEnrollmentMax

  const participant_minimum_age_lower_bound = minMaxBoundQuery?.at(0)?.participant_minimum_age_lower_bound
  const participant_maximum_age_upper_bound = minMaxBoundQuery?.at(0)?.participant_maximum_age_upper_bound


  console.log("## participant_minimum_age_lower_bound: ", participant_minimum_age_lower_bound)
  console.log("## participant_maximum_age_upper_bound: ", participant_maximum_age_upper_bound)
  
  // result.searchStudies.enrollmentPeriodMax)
  return { 
    ageAtEnrollment: {
      lowerBound: participant_minimum_age_lower_bound || absoluteMinimum,
      upperBound: participant_maximum_age_upper_bound || absoluteMaximum,
      subjects: Math.max(minSubjects, maxSubjects) // This can be relace by the numberOfStudies
    }
  }
}


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
        const enrollmentPeriod = updateSliderDataForEnrollmentPeriod(result.searchStudies, result.minMaxBoundQuery)
        const studyPeriod = updateSliderDataForStudyPeriod(result.searchStudies, result.minMaxBoundQuery)
        const studyCountByNumberOfParticipants = updateSliderDataForNumberOfParticipants(result.searchStudies, result.minMaxBoundQuery)
        const ageAtEnrollment = updateSliderDataForAgeAtEnrollment(result.searchStudies, result.minMaxBoundQuery)

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
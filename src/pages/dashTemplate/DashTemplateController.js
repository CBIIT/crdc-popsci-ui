import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { getFilters } from '@bento-core/facet-filter';
import DashTemplateView from './DashTemplateView';
import { DASHBOARD_QUERY_NEW } from '../../bento/dashboardTabData';

let abs_min = 0;
let abs_max = 0;
function calculateStatsTotals(data) {
  return data.reduce((acc, item) => {
    acc.number_of_participants += item.number_of_participants;
    return acc;
  }, { number_of_participants: 0 });
}

function updateSliderDataForEnrollmentPeriod(searchStudiesData) {
  const { lowerBound: absoluteMinimum , upperBound: relativeMinimum, subjects: minSubjects} = searchStudiesData.enrollmentPeriodMin
  const { lowerBound: relativeMaximum, upperBound: absoluteMaximum, subjects: maxSubjects} = searchStudiesData.enrollmentPeriodMax

  abs_min = absoluteMinimum
  abs_max = absoluteMaximum

  // result.searchStudies.enrollmentPeriodMax)

  return { 
    enrollmentPeriod: {
      lowerBound: 1970 || absoluteMinimum,
      upperBound: 2021 || absoluteMaximum,
      subjects: Math.max(minSubjects, maxSubjects) // This can be relace by the numberOfStudies
    }
  }
}

function updateSliderDataForStudyPeriod(searchStudiesData) {
  const { lowerBound: absoluteMinimum , upperBound: relativeMinimum, subjects: minSubjects} = searchStudiesData.studyPeriodMin
  const { lowerBound: relativeMaximum, upperBound: absoluteMaximum, subjects: maxSubjects} = searchStudiesData.studyPeriodMax

  
  // result.searchStudies.enrollmentPeriodMax)
  return { 
    studyPeriod: {
      lowerBound: absoluteMinimum,
      upperBound: absoluteMaximum,
      subjects: Math.max(minSubjects, maxSubjects) // This can be relace by the numberOfStudies
    }
  }
}

function updateSliderDataForAgeAtEnrollment(searchStudiesData) {
  const { lowerBound: absoluteMinimum , upperBound: relativeMinimum, subjects: minSubjects} = searchStudiesData.participantAgeAtEnrollmentMin
  const { lowerBound: relativeMaximum, upperBound: absoluteMaximum, subjects: maxSubjects} = searchStudiesData.participantAgeAtEnrollmentMax

  
  // result.searchStudies.enrollmentPeriodMax)
  return { 
    ageAtEnrollment: {
      lowerBound: absoluteMinimum,
      upperBound: absoluteMaximum,
      subjects: Math.max(minSubjects, maxSubjects) // This can be relace by the numberOfStudies
    }
  }
}


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
  // const [enrollmentPeriodData, setEnrollmentPeriodData] = useState(null);
  
  // const { enrollment_year } = getFilters(filterState)

  let activeFilters = {
    ...getFilters(filterState),
    subject_ids: [
      ...(localFindUpload || []).map((obj) => obj.subject_id),
      ...(localFindAutocomplete || []).map((obj) => obj.title),
    ],
  };

  console.log("|| activeFilters: ", activeFilters)

  // Enrollment Period (enrollmentPeriodMin)
  activeFilters.enrollment_beginning_year = activeFilters?.enrollment_year ? [1969, activeFilters?.enrollment_year?.at(0) || 2022] : [] // [abs_min,activeFilters?.enrollment_year?.at(0)] // activeFilters?.enrollment_year || []
  // Enrollment Period (enrollmentPeriodMax)
  activeFilters.enrollment_ending_year = activeFilters?.enrollment_year ? [activeFilters?.enrollment_year?.at(1) || 1969, 2022] : [] // [activeFilters?.enrollment_year?.at(0), abs_max] // activeFilters?.enrollment_year || []

  // Study Period (studyPeriodMin)
  activeFilters.study_beginning_year = activeFilters?.study_year || []
  // Study Period (studyPeriodMax)
  activeFilters.study_ending_year = activeFilters?.study_year || []

  // Age at Enrollment (participantAgeAtEnrollmentMin)
  activeFilters.study_participant_minimum_age = activeFilters?.study_participant_age || []
  // Age at Enrollment (participantAgeAtEnrollmentMax)
  activeFilters.study_participant_maximum_age = activeFilters?.study_participant_age || []



  useEffect(() => {
    const controller = new AbortController();
    getData(activeFilters).then((result) => {
      if (result.searchStudies) {

        // Calculate totals using the copy
        const globalStatsBar = calculateStatsTotals(result.globalStatsBar);
        
        const enrollmentPeriod = updateSliderDataForEnrollmentPeriod(result.searchStudies)
        console.log("|| enrollmentPeriod: ", enrollmentPeriod)
        const studyPeriod = updateSliderDataForStudyPeriod(result.searchStudies)
        const ageAtEnrollment = updateSliderDataForAgeAtEnrollment(result.searchStudies)


        

        setDashData(prevData => {
          const updatedData = {
            ...result.searchStudies, 
            ...globalStatsBar,
            ...enrollmentPeriod,
            ...studyPeriod,
            ...ageAtEnrollment
          };


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
  console.log("|| \t\t--------------------------------------")
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
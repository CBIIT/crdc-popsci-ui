import { getFilters } from "@bento-core/facet-filter";

export const sortWidgetDataByKey = (array = [], key='group') => {
	return array.sort((a, b) => {
		let valueA = a[key];
		let valueB = b[key];

		// If the values are strings, clean them before comparison
		if (typeof valueA === 'string' && typeof valueB === 'string') {
			valueA = valueA.replace(/[^a-zA-Z ]/g, '').trim();
			valueB = valueB.replace(/[^a-zA-Z ]/g, '').trim();
			return valueB.localeCompare(valueA);
		}

		// For non-string types, use simple comparison
		return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
	});
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
  
/* 
	Function to update slider data for different types (enrollment period, study period, etc.).
	For now, the slider's lower and upper bounds are determined using fixed values from `minMaxBoundQuery`. 
	This approach prevents issues where the slider's maximum value could be lower than the input value, 
	which would otherwise create inconsistencies.

	Note: This solution has a downside—the slider will not dynamically update to reflect changes 
	in other facets (filters). However, the data will still be filtered correctly according to the user's input.

	The ideal solution will involve using `absoluteMinimum` and `absoluteMaximum` 
	instead of fixed lower and upper bounds, allowing the slider to adjust dynamically.
*/
export const updateSliderData = (searchStudiesData, minMaxBoundQuery, key, limitUpperBoundToCurrentYear = false) => {
	const minBoundKey = boundMapping[key].min;
	const maxBoundKey = boundMapping[key].max;
	
	const { lowerBound: absoluteMinimum, subjects: minSubjects } = searchStudiesData?.[minBoundKey] || {};
	const { upperBound: absoluteMaximum, subjects: maxSubjects } = searchStudiesData?.[maxBoundKey] || {};

	const lowerBound = minMaxBoundQuery?.[0]?.[boundMapping[key].lower] || absoluteMinimum;
	let upperBound = minMaxBoundQuery?.[0]?.[boundMapping[key].upper] || absoluteMaximum;

	if (limitUpperBoundToCurrentYear) {
		if (upperBound > new Date().getFullYear()) upperBound = new Date().getFullYear()
	}
	return {
		[key]: {
			lowerBound,
			upperBound,
			subjects: Math.max(minSubjects || 0, maxSubjects || 0),
		},
	};
};

// Helper Function to prepare active filters for the query
export const prepareActiveFilters = (filterState, localFindUpload, localFindAutocomplete, dashData) => {
	const activeFilters = {
	  ...getFilters(filterState),
	  subject_ids: [
		...(localFindUpload || []).map((obj) => obj.subject_id),
		...(localFindAutocomplete || []).map((obj) => obj.title),
	  ],
	};
  
	/* 
	  Apply additional filters based on the current dashboard data (dashData) and user filter selections. 
	  The checks ensure that filters are only applied when they differ from the default dataset boundaries, 
	  avoiding unnecessary filters.
	*/
	if (dashData) {
  
	  /*
	  	Apply *** Enrollment Period *** filters
	   	(enrollmentPeriodMin and enrollmentPeriodMax) => enrollmentPeriod
	    enrollment_year => (enrollment_beginning_year and enrollment_ending_year)
	  */
	  if (filterState?.enrollment_year?.[0] > dashData?.enrollmentPeriod?.lowerBound) {
		activeFilters.enrollment_beginning_year = filterState?.enrollment_year || [];
	  }
	  if (filterState?.enrollment_year?.[1] < dashData?.enrollmentPeriod?.upperBound) {
		activeFilters.enrollment_ending_year = filterState?.enrollment_year || [];
	  }
  
	  /*
	  	Apply *** Study Period *** filters
	   	(studyPeriodMin and studyPeriodMax) => studyPeriod
	    study_year => (study_beginning_year and study_ending_year)
	  */
	  if (filterState?.study_year?.[0] > dashData?.studyPeriod?.lowerBound) {
		activeFilters.study_beginning_year = filterState?.study_year || [];
	  }
	  if (filterState?.study_year?.[1] < dashData?.studyPeriod?.upperBound) {
		activeFilters.study_ending_year = filterState?.study_year || [];
	  }
  
	  /*
	  	Apply *** Age at Enrollment *** filters
	   	(participantAgeAtEnrollmentMin and participantAgeAtEnrollmentMax) => ageAtEnrollment
	    study_participant_age => (study_participant_minimum_age and study_participant_maximum_age)
	  */
	  if ( filterState?.study_participant_age?.[0] > dashData?.ageAtEnrollment?.lowerBound) {
		activeFilters.study_participant_minimum_age = filterState?.study_participant_age || [];
	  }
	  if ( filterState?.study_participant_age?.[1] < dashData?.ageAtEnrollment?.upperBound) {
		activeFilters.study_participant_maximum_age = filterState?.study_participant_age || [];
	  }
	}
  
	return activeFilters;
};
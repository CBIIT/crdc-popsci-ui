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
export const updateSliderData = (searchStudiesData, minMaxBoundQuery, key) => {
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
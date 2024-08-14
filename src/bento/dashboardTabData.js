/* eslint-disable */
import gql from 'graphql-tag';
import { cellTypes, dataFormatTypes, headerTypes } from '@bento-core/table';
// import { customCasesTabDownloadCSV, customFilesTabDownloadCSV, customSamplesTabDownloadCSV } from './tableDownloadCSV';
import downloadSuccess from '../assets/dash/downloadSuccess.svg'
import downloadLock from '../assets/dash/downloadLock.svg'
import previewLarge from '../assets/dash/previewLarge.svg'

// --------------- Tooltip configuration --------------
export const tooltipContent = {
  //  use as aletrative
  icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  alt: 'tooltipIcon',
  arrow: false,
  Participants: 'Add filtered files associated with selected participants(s) to My Files',
  Biospecimens: 'Add filtered files associated with selected biospecimen(s) to My Files',
  Files: 'Add selected files to My Files',
};

  export const tooltipContentAllFile = {
  icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  alt: 'tooltipIcon',
  arrow: false,
  Participants: 'Add filtered files associated with all participants in the current results set to My Files',
  Biospecimens: 'Add filtered files associated with all biospecimens in the current results set to My Files',
  Files: 'Add all filtered files to My Files',
};

// --------------- Dahboard Table external link configuration --------------
// Ideal size for externalLinkIcon is 16x16 px
export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};


// --------------- Tabs Header Data configuration --------------
export const tabs = [
  {
    id: 'study_tab',
    title: 'Studies',
    dataField: 'dataCase',
    count: 'numberOfParticipants',
  },
  // {
  //   id: 'biospecimens_tab',
  //   title: 'Biospecimens',
  //   dataField: 'dataSample',
  //   count: 'numberOfSamples',
  // },
  // {
  //   id: 'file_tab',
  //   title: 'Files',
  //   dataField: 'dataFile',
  //   count: 'numberOfFiles',
  // },
];

export const multiStudyData = {
  icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/icon-multiStudy.svg',
  alt: 'Multi-study icon',
  toolTipText: 'Multi-study participant also enrolled as:',
};
// --------------- Tabs Header Style configuration --------------
export const tabIndex = [
  {
    title: 'Studies',
    primaryColor: '#D6F2EA',
    secondaryColor: '#FFDFB8',
    selectedColor: '#10A075',
  }
];

// Main Query used to populate Facet, Widget components
export const DASHBOARD_QUERY_NEW = gql`
  query search(
    $study_short_name: [String]
    $study_name: [String]
    $study_id: [String]
    $study_description: [String]
    $study_type: [String]
    $study_design: [String]
    $enrollment_beginning_year: [Int]
    $enrollment_ending_year: [Int]
    $study_beginning_year: [Int]
    $study_ending_year: [Int]
    $biospecimen_collection: [String]
    $study_status: [String]
    $dbgap_accession_id: [String]
    $associated_links: [String]
    $number_of_participants: [Int]
    $study_participant_maximum_age: [Float]
    $study_participant_median_age: [Float]
    $study_participant_minimum_age: [Float]
    $races: [String]
    $ethnicities: [String]
    $sexes: [String]
    $genders: [String]
    $study_country: [String]
    $number_of_countries: [Int]
    $study_state_province_territory: [String]
    $number_of_states_provinces_territories: [Int]
    $primary_diagnosis_disease_term: [String]
  ){
    searchStudies(
      study_short_name: $study_short_name
      study_name: $study_name
      study_id: $study_id
      study_description: $study_description
      study_type: $study_type
      study_design: $study_design
      enrollment_beginning_year: $enrollment_beginning_year
      enrollment_ending_year: $enrollment_ending_year
      study_beginning_year: $study_beginning_year
      study_ending_year: $study_ending_year
      biospecimen_collection: $biospecimen_collection
      study_status: $study_status
      dbgap_accession_id: $dbgap_accession_id
      associated_links: $associated_links
      number_of_participants: $number_of_participants
      study_participant_maximum_age: $study_participant_maximum_age
      study_participant_median_age: $study_participant_median_age
      study_participant_minimum_age: $study_participant_minimum_age
      races: $races
      ethnicities: $ethnicities
      sexes: $sexes
      genders: $genders
      study_country: $study_country
      number_of_countries: $number_of_countries
      study_state_province_territory: $study_state_province_territory
      number_of_states_provinces_territories: $number_of_states_provinces_territories
      primary_diagnosis_disease_term: $primary_diagnosis_disease_term
    ){  
      numberOfStudies
      numberOfDataCollectionCatagory
      numberOfDiagnosis
      numberOfDataFiles

      # Study Acronym(study_short_name)
      studyCountByStudy{
        group
        subjects
      }
      filterStudyCountByStudy{
        group
        subjects
      }

      # Study Type(study_type)
      studyCountByStudyType{
        group
        subjects
      }
      filterStudyCountByStudyType{
        group
        subjects
      }

      # Study Design (study_design)
      studyCountByStudyDesign{
        group
        subjects
      }
      filterStudyCountByStudyDesign{
        group
        subjects
      }

      # Enrollment Period(enrollment_beginning_year, enrollment_ending_year)
      enrollmentPeriodMin{
        lowerBound
        upperBound
        subjects
      }
      enrollmentPeriodMax{
        lowerBound
        upperBound
        subjects
      }

      # Study Period (study_beginning_year, study_ending_year)
      studyPeriodMin{
        lowerBound
        upperBound
        subjects
      }
      studyPeriodMax{
        lowerBound
        upperBound
        subjects
      }

      # Number of Participants (number_of_participants)
      studyCountByNumberOfParticipants{
        lowerBound
        upperBound
        subjects
      }

      # Neoplasms (primary_diagnosis_disease_term)
      studyCountByNeoplasm{
        group
        subjects
      }
      filterStudyCountByNeoplasm{
        group
        subjects
      }

      # Countries (study_country)
      studyCountByCountries{
        group
        subjects
      }
      filterStudyCountByCountries{
        group
        subjects
      }

      # Biospecimen Collection (biospecimen_collection)
      studyCountByBiospecimenCollection{
        group
        subjects
      }
      filterStudyCountByBiospecimenCollection{
        group
        subjects
      }
      # Data Collection Categories (data_collection_category): Will only be used for Widget for now
      studyCountByDataCollection{
        group
        subjects
      }
      filterStudyCountByDataCollection{
        group
        subjects
      }

      # Age at Enrollment (study_participant_minimum_age, study_participant_maximum_age)
      participantAgeAtEnrollmentMin{
        lowerBound
        upperBound
        subjects
      }
      participantAgeAtEnrollmentMax{
        lowerBound
        upperBound
        subjects
      }

      # Race Representation (race)
      studyCountByRace{
        group
        subjects
      }
      filterStudyCountByRace{
        group
        subjects
      }

      # Ethnic Representation (ethnicity)
      studyCountByEthnicity{
        group
        subjects
      }
      filterStudyCountByEthnicity{
        group
        subjects
      }

      # Sex Representation (sex)
      studyCountBySex{
        group
        subjects
      }
      filterStudyCountBySex{
        group
        subjects
      }
      
      # Gender Representation (gender)
      studyCountByGender{
        group
        subjects
      }
      filterStudyCountByGender{
        group
        subjects
      }
    }
    
    # Global Stats
    globalStatsBar(
      study_short_name: $study_short_name
      study_type: $study_type
      study_design: $study_design
      enrollment_beginning_year: $enrollment_beginning_year
      enrollment_ending_year: $enrollment_ending_year
      study_beginning_year: $study_beginning_year
      study_ending_year: $study_ending_year
      number_of_participants: $number_of_participants
      primary_diagnosis_disease_term: $primary_diagnosis_disease_term
      study_country: $study_country
      biospecimen_collection: $biospecimen_collection
      study_participant_maximum_age: $study_participant_maximum_age
      study_participant_minimum_age: $study_participant_minimum_age
      races: $races
      ethnicities: $ethnicities
      sexes: $sexes
      genders: $genders
    ){
      study_short_name
      data_volume
      number_of_participants
    }
  }
`;

// Main Query used to populate Facet, Widget components
export const CTDC_DASHBOARD_QUERY_NEW = gql`
query search(
  $subject_id: [String],
  $ctep_disease_term: [String],
  $stage_of_disease: [String],
  $tumor_grade: [String], 
  $sex: [String], 
  $reported_gender: [String], 
  $race: [String], $ethnicity: [String],
  $carcinogen_exposure: [String], 
  $targeted_therapy: [String],
  $anatomical_collection_site: [String],
  $tissue_category: [String],
  $assessment_timepoint: [String],
  $data_file_type: [String],
  $data_file_format: [String]) {
  searchParticipants(
    subject_id: $subject_id
    ctep_disease_term: $ctep_disease_term
    stage_of_disease: $stage_of_disease
    tumor_grade: $tumor_grade
    sex: $sex
    reported_gender: $reported_gender
    race: $race
    ethnicity: $ethnicity
    carcinogen_exposure: $carcinogen_exposure
    targeted_therapy: $targeted_therapy
    anatomical_collection_site: $anatomical_collection_site
    tissue_category: $tissue_category
    assessment_timepoint: $assessment_timepoint
    data_file_type: $data_file_type
    data_file_format: $data_file_format
  ) {
    numberOfStudies
    numberOfParticipants
    numberOfDiagnoses
    numberOfTargetedTherapies
    numberOfSpecimens
    numberOfFiles
    
    diagnosesAndStageOfDiseases {
      program
      caseSize
      children {
        arm
        caseSize
        size
        __typename
      }
      __typename
    }
    sexesAndGenders {
      program
      caseSize
      children {
        arm
        caseSize
        size
        __typename
      }
      __typename
    }
    racesAndEthnicities {
      program
      caseSize
      children {
        arm
        caseSize
        size
        __typename
      }
      __typename
    }
    timepointsAndBiospecimensTypes {
      program
      caseSize
      children {
        arm
        caseSize
        size
        __typename
      }
      __typename
    }
    participantCountByStageOfDisease {
      group
      subjects
      __typename
    }
    filterParticipantCountByStageOfDisease {
      group
      subjects
      __typename
    }
    participantCountByCtepDiseaseTerm {
      group
      subjects
      __typename
    }
    filterParticipantCountByCtepDiseaseTerm {
      group
      subjects
      __typename
    }
    participantCountBySnomedDiseaseCode{
      group
      subjects
      __typename
    }
    filterParticipantCountBySnomedDiseaseCode{
      group
      subjects
      __typename
    }
    participantCountByTumorGrade {
      group
      subjects
    #   __typename
    }
    filterParticipantCountByTumorGrade {
      group
      subjects
    #   __typename
    }
    participantCountBySex {
      group
      subjects
      __typename
    }
    filterParticipantCountBySex {
      group
      subjects
      __typename
    }
    participantCountByReportedGender {
      group
      subjects
      __typename
    }
    filterParticipantCountByReportedGender {
      group
      subjects
      __typename
    }
    participantCountByRace {
      group
      subjects
      __typename
    }
    filterParticipantCountByRace {
      group
      subjects
      __typename
    }
    participantCountByEthnicity {
      group
      subjects
      __typename
    }
    filterParticipantCountByEthnicity {
      group
      subjects
      __typename
    }
    participantCountByCarcinogenExposure {
      group
      subjects
      __typename
    }
    filterParticipantCountByCarcinogenExposure {
      group
      subjects
      __typename
    }
    participantCountByTargetedTherapy {
      group
      subjects
      __typename
    }
    filterParticipantCountByTargetedTherapy {
      group
      subjects
      __typename
    }
    specimenCountByAnatomicalCollectionSite {
      group
      subjects
      __typename
    }
    filterSpecimenCountByAnatomicalCollectionSite {
      group
      subjects
      __typename
    }
    specimenCountByTissueCategory {
      group
      subjects
      __typename
    }
    filterSpecimenCountByTissueCategory {
      group
      subjects
      __typename
    }
    specimenCountBySpecimenType {
      group
      subjects
      __typename
    }
    filterSpecimenCountBySpecimenType {
      group
      subjects
      __typename
    }
    participantCountByAssessmentTimepoint {
      group
      subjects
      __typename
    }
    filterParticipantCountByAssessmentTimepoint {
      group
      subjects
      __typename
    }
    dataFileCountByDataFileType {
      group
      subjects
      __typename
    }
    filterDataFileCountByDataFileType {
      group
      subjects
      __typename
    }
    dataFileCountByDataFileFormat {
      group
      subjects
      __typename
    }
    filterDataFileCountByDataFileFormat {
      group
      subjects
      __typename
    }
    __typename
  }
}
`;

export const GET_STUDY_OVERVIEW_QUERY = gql`
query study($study_name: [String],
$study_short_name: [String],
$study_id: [String],
$study_description: [String],
$study_type: [String],
$study_design: [String],
$enrollment_beginning_year: [Int],
$enrollment_ending_year: [Int],
$study_beginning_year: [Int],
$study_ending_year: [Int],
$biospecimen_collection: [String],
$study_status: [String],
$dbgap_accession_id: [String],
$associated_links: [String],
$number_of_participants: [Int],
$study_participant_maximum_age: [Float],
$study_participant_median_age: [Float],
$study_participant_minimum_age: [Float],
$race: [String],
$ethnicity: [String],
$sex: [String],
$gender: [String],
$races: [String],
$ethnicities: [String],
$sexes: [String],
$genders: [String],
$study_country: [String],
$number_of_countries: [Int],
$study_state_province_territory: [String],
$number_of_states_provinces_territories: [Int],
$primary_diagnosis_disease_term: [String],
$primary_diagnosis_disease_count: [Int],
$first: Int,
$offset: Int,
$order_by: String,
$sort_direction: String) {
 
  tabStudy(
    study_name: $study_name,
study_short_name: $study_short_name,
study_id: $study_id,
study_description: $study_description,
study_type: $study_type,
study_design: $study_design,
enrollment_beginning_year: $enrollment_beginning_year,
enrollment_ending_year: $enrollment_ending_year,
study_beginning_year: $study_beginning_year,
study_ending_year: $study_ending_year,
biospecimen_collection: $biospecimen_collection,
study_status: $study_status,
dbgap_accession_id: $dbgap_accession_id,
associated_links: $associated_links,
number_of_participants: $number_of_participants,
study_participant_maximum_age: $study_participant_maximum_age,
study_participant_median_age: $study_participant_median_age,
study_participant_minimum_age: $study_participant_minimum_age,
race: $race,
ethnicity: $ethnicity,
sex: $sex,
gender: $gender,
races: $races,
ethnicities: $ethnicities,
sexes: $sexes,
genders: $genders,
study_country: $study_country,
number_of_countries: $number_of_countries,
study_state_province_territory: $study_state_province_territory,
number_of_states_provinces_territories: $number_of_states_provinces_territories,
primary_diagnosis_disease_term: $primary_diagnosis_disease_term,
primary_diagnosis_disease_count: $primary_diagnosis_disease_count,
first: $first,
offset: $offset,
order_by: $order_by,
sort_direction: $sort_direction
  ) {
    study_name
    study_short_name
    study_id
    study_description
    study_type
    study_design
    enrollment_beginning_year
    enrollment_ending_year
    study_beginning_year
    study_ending_year
    biospecimen_collection
    study_status
    dbgap_accession_id
    number_of_participants
    study_participant_maximum_age
    study_participant_median_age
    study_participant_minimum_age
    race
    ethnicity
    sex
    gender
    races
    ethnicities
    sexes
    genders
    study_country
    number_of_countries
    study_state_province_territory
    number_of_states_provinces_territories
    primary_diagnosis_disease_term
    primary_diagnosis_disease_count
    enrollment_period
    study_period
    enrollment_age
    data_collection{
        data_collection_category
        data_collection_category_annotation_count
    }
    __typename
  }
  
}

`;


export const GET_PARTICIPANTS_OVERVIEW_QUERY = gql`
  query participantOverview(
    $subject_id: [String],
    $ctep_disease_term: [String],
    $stage_of_disease: [String],
    $tumor_grade: [String],
    $sex: [String],
    $reported_gender: [String],
    $race: [String],
    $ethnicity: [String],
    $carcinogen_exposure: [String],
    $targeted_therapy: [String],
    $anatomical_collection_site: [String],
    $tissue_category: [String],
    $assessment_timepoint: [String],
    $data_file_type: [String],
    $data_file_format: [String],
    $first: Int,
    $offset: Int,
    $order_by: String,
    $sort_direction: String
  ){
    participantOverview(
      subject_id: $subject_id
      ctep_disease_term: $ctep_disease_term
      stage_of_disease: $stage_of_disease
      tumor_grade: $tumor_grade
      sex: $sex
      reported_gender: $reported_gender
      race: $race
      ethnicity: $ethnicity
      carcinogen_exposure: $carcinogen_exposure
      targeted_therapy: $targeted_therapy
      anatomical_collection_site: $anatomical_collection_site
      tissue_category: $tissue_category
      assessment_timepoint: $assessment_timepoint
      data_file_type: $data_file_type
      data_file_format: $data_file_format
      first: $first
      offset: $offset
      order_by: $order_by
      sort_direction: $sort_direction
    ){
      subject_id,
      ctep_disease_term,
      stage_of_disease,
      tumor_grade,
      age_at_enrollment,
      sex,
      reported_gender,
      race,
      ethnicity,
      carcinogen_exposure,
      targeted_therapy

      data_file_uuid
    }
  }
`;

export const GET_BIOSPECIMENS_OVERVIEW_QUERY = gql`
  query biospecimenOverview(
    $subject_id: [String],
    $ctep_disease_term: [String],
    $stage_of_disease: [String],
    $tumor_grade: [String],
    $sex: [String],
    $reported_gender: [String],
    $race: [String],
    $ethnicity: [String],
    $carcinogen_exposure: [String],
    $targeted_therapy: [String],
    $anatomical_collection_site: [String],
    $tissue_category: [String],
    $assessment_timepoint: [String],
    $data_file_type: [String],
    $data_file_format: [String],
    $first: Int,
    $offset: Int,
    $order_by: String,
    $sort_direction: String
  ){
    biospecimenOverview(
      subject_id: $subject_id
      ctep_disease_term: $ctep_disease_term
      stage_of_disease: $stage_of_disease
      tumor_grade: $tumor_grade
      sex: $sex
      reported_gender: $reported_gender
      race: $race
      ethnicity: $ethnicity
      carcinogen_exposure: $carcinogen_exposure
      targeted_therapy: $targeted_therapy
      anatomical_collection_site: $anatomical_collection_site
      tissue_category: $tissue_category
      assessment_timepoint: $assessment_timepoint
      data_file_type: $data_file_type
      data_file_format: $data_file_format
      first: $first
      offset: $offset
      order_by: $order_by
      sort_direction: $sort_direction
    ){
      subject_id,
      ctep_disease_term,
      stage_of_disease
      primary_disease_site,
      specimen_id,
      parent_specimen_id,
      anatomical_collection_site,
      tissue_category,
      assessment_timepoint

      data_file_uuid
    }
  }
`;

export const GET_FILES_OVERVIEW_QUERY = gql`
  query fileOverview(
    $subject_id: [String],
    $ctep_disease_term: [String],
    $stage_of_disease: [String],
    $tumor_grade: [String],
    $sex: [String],
    $reported_gender: [String],
    $race: [String],
    $ethnicity: [String],
    $carcinogen_exposure: [String],
    $targeted_therapy: [String],
    $anatomical_collection_site: [String],
    $tissue_category: [String],
    $assessment_timepoint: [String],
    $data_file_type: [String],
    $data_file_format: [String],
    $first: Int,
    $offset: Int,
    $order_by: String,
    $sort_direction: String
  ){
    fileOverview(
      subject_id: $subject_id
      ctep_disease_term: $ctep_disease_term
      stage_of_disease: $stage_of_disease
      tumor_grade: $tumor_grade
      sex: $sex
      reported_gender: $reported_gender
      race: $race
      ethnicity: $ethnicity
      carcinogen_exposure: $carcinogen_exposure
      targeted_therapy: $targeted_therapy
      anatomical_collection_site: $anatomical_collection_site
      tissue_category: $tissue_category
      assessment_timepoint: $assessment_timepoint
      data_file_type: $data_file_type
      data_file_format: $data_file_format
      first: $first
      offset: $offset
      order_by: $order_by
      sort_direction: $sort_direction
    ){
      subject_id,
      data_file_name,
      data_file_format,
      data_file_type,
      data_file_size,
      association,
      data_file_description,
      specimen_id,
      ctep_disease_term
      parent_specimen_id
      data_file_uuid
    }
  }
`;

// Original DASHBOARD_QUERY_NEW for reference
export const ORIGINAL_DASHBOARD_QUERY_NEW = gql`
query search (          
    $subject_ids: [String],
    $programs: [String] ,
    $studies: [String] ,
    $diagnoses: [String] ,
    $rc_scores: [String] ,
    $tumor_sizes: [String] ,
    $chemo_regimen: [String] ,
    $tumor_grades: [String] ,
    $er_status: [String] ,
    $pr_status: [String] ,
    $endo_therapies: [String] ,
    $meno_status: [String] ,
    $tissue_type: [String],
    $composition: [String],
    $association: [String],
    $file_type: [String],
    $age_at_index: [Float]
){
    searchSubjects (          
        subject_ids: $subject_ids,
        programs: $programs,
        studies: $studies,
        diagnoses: $diagnoses,
        rc_scores: $rc_scores,
        tumor_sizes: $tumor_sizes,
        chemo_regimen: $chemo_regimen,
        tumor_grades: $tumor_grades,
        er_status: $er_status,
        pr_status: $pr_status,
        endo_therapies: $endo_therapies,
        meno_status: $meno_status,
        tissue_type: $tissue_type,
        composition: $composition,
        association: $association,       
        file_type: $file_type,
        age_at_index: $age_at_index
    ) {
        numberOfPrograms
        numberOfStudies
        numberOfSubjects
        numberOfSamples
        numberOfLabProcedures
        numberOfFiles
        armsByPrograms {
            program
            caseSize
            children {
                arm
                caseSize
                size
            }
        }
        subjectCountByProgram {
            group
            subjects
        }
        subjectCountByStudy {
            group
            subjects
        }
        subjectCountByDiagnoses {
            group
            subjects
        }
        subjectCountByRecurrenceScore {
            group
            subjects
        }
        subjectCountByTumorSize {
            group
            subjects
        }
        subjectCountByChemotherapyRegimen {
            group
            subjects
        }
        subjectCountByEndocrineTherapy {
            group
            subjects
        }
        subjectCountByTumorGrade{
            group
            subjects
        }
        subjectCountByErStatus{
            group
            subjects
        }
        subjectCountByPrStatus{
            group
            subjects
        }
        subjectCountByMenopauseStatus{
            group
            subjects
        }
        subjectCountByFileType {
            group
            subjects
        }
        subjectCountByFileAssociation {
            group
            subjects
        }
        subjectCountByTissueComposition {
            group
            subjects
        }
        subjectCountByTissueType {
            group
            subjects
        }
        filterSubjectCountByProgram {
            group
            subjects
        }
        filterSubjectCountByStudy{
            group
            subjects
        }
        filterSubjectCountByDiagnoses{
            group
            subjects
        }
        filterSubjectCountByRecurrenceScore{
            group
            subjects
        }
        filterSubjectCountByTumorSize{
            group
            subjects
        }
        filterSubjectCountByTumorGrade{
            group
            subjects
        }
        filterSubjectCountByErStatus{
            group
            subjects
        }
        filterSubjectCountByPrStatus{
            group
            subjects
        }
        filterSubjectCountByChemotherapyRegimen{
            group
            subjects
        }
        filterSubjectCountByEndocrineTherapy{
            group
            subjects
        }
        filterSubjectCountByMenopauseStatus{
            group
            subjects
        }
        filterSubjectCountByTissueType{
            group
            subjects
        }
        filterSubjectCountByTissueComposition{
            group
            subjects
        }
        filterSubjectCountByFileAssociation{
            group
            subjects
        }
        filterSubjectCountByFileType{
            group
            subjects
        }
        filterSubjectCountByAge{
            lowerBound
            upperBound
            subjects
        }
    }
}
`;

// Unused Query
export const DASHBOARD_QUERY = gql`
    query search (          
      $programs: [String] ,
      $studies: [String] ,
      $diagnoses: [String] ,
      $rc_scores: [String] ,
      $tumor_sizes: [String] ,
      $chemo_regimen: [String] ,
      $tumor_grades: [String] ,
      $er_status: [String] ,
      $pr_status: [String] ,
      $endo_therapies: [String] ,
      $meno_status: [String] ,
      $tissue_type: [String],
      $composition: [String],
      $association: [String],
      $file_type: [String],
      $age_at_index: [Float]
  ){
      searchSubjects (          
          programs: $programs,
          studies: $studies,
          diagnoses: $diagnoses,
          rc_scores: $rc_scores,
          tumor_sizes: $tumor_sizes,
          chemo_regimen: $chemo_regimen,
          tumor_grades: $tumor_grades,
          er_status: $er_status,
          pr_status: $pr_status,
          endo_therapies: $endo_therapies,
          meno_status: $meno_status,
          tissue_type: $tissue_type,
          composition: $composition,
          association: $association,       
          file_type: $file_type,
          age_at_index: $age_at_index
      ) {
          numberOfPrograms
          numberOfStudies
          numberOfSubjects
          numberOfSamples
          numberOfLabProcedures
          numberOfFiles
          armsByPrograms {
              program
              caseSize
              children {
                  arm
                  caseSize
                  size
              }
  
          }
  
      subjectCountByProgram {
              group
              subjects
          }
          subjectCountByStudy {
              group
              subjects
          }
          subjectCountByDiagnoses {
              group
              subjects
          }
          subjectCountByRecurrenceScore {
              group
              subjects
          }
          subjectCountByTumorSize {
              group
              subjects
          }
          subjectCountByChemotherapyRegimen {
              group
              subjects
          }
          subjectCountByEndocrineTherapy {
              group
              subjects
          }
          subjectCountByTumorGrade{
              group
              subjects
          }
          subjectCountByErStatus{
              group
              subjects
          }
          subjectCountByPrStatus{
              group
              subjects
          }
          subjectCountByMenopauseStatus{
              group
              subjects
          }
          subjectCountByFileType {
              group
              subjects
          }
          subjectCountByFileAssociation {
              group
              subjects
          }
          subjectCountByTissueComposition {
              group
              subjects
          }
          subjectCountByTissueType {
              group
              subjects
          }
  
          filterSubjectCountByProgram {
              group
              subjects
          }
          filterSubjectCountByStudy{
              group
              subjects
          }
          filterSubjectCountByDiagnoses{
              group
              subjects
          }
          filterSubjectCountByRecurrenceScore{
              group
              subjects
          }
          filterSubjectCountByTumorSize{
              group
              subjects
          }
          filterSubjectCountByTumorGrade{
              group
              subjects
          }
          filterSubjectCountByErStatus{
              group
              subjects
          }
          filterSubjectCountByPrStatus{
              group
              subjects
          }
          filterSubjectCountByChemotherapyRegimen{
              group
              subjects
          }
          filterSubjectCountByEndocrineTherapy{
              group
              subjects
          }
          filterSubjectCountByMenopauseStatus{
              group
              subjects
          }
          filterSubjectCountByTissueType{
              group
              subjects
          }
          filterSubjectCountByTissueComposition{
              group
              subjects
          }
          filterSubjectCountByFileAssociation{
              group
              subjects
          }
          filterSubjectCountByFileType{
              group
              subjects
          }
          filterSubjectCountByAge{
            lowerBound
            upperBound
            subjects
        }
  
      }
  }
  
   `;

// Unused Query
export const FILTER_GROUP_QUERY = gql`
  query groupCounts($subject_ids: [String]){
   armsByPrograms(subject_ids: $subject_ids) {
     program
     caseSize
     children {
         arm
         caseSize
         size
     }
 }
 subjectCountByDiagnoses (subject_ids: $subject_ids){
  group
  subjects
}
subjectCountByRecurrenceScore (subject_ids: $subject_ids){
  group
  subjects
}
subjectCountByTumorSize(subject_ids: $subject_ids) {
  group
  subjects
}
subjectCountByChemotherapyRegimen(subject_ids: $subject_ids) {
  group
  subjects
}
subjectCountByEndocrineTherapy (subject_ids: $subject_ids){
  group
  subjects
}
   
}
 `;

// Unused Query
export const FILTER_QUERY = gql`
query search (          
  $programs: [String] ,
  $studies: [String] ,
  $diagnoses: [String] ,
  $rc_scores: [String] ,
  $tumor_sizes: [String] ,
  $chemo_regimen: [String] ,
  $tumor_grades: [String] ,
  $er_status: [String] ,
  $pr_status: [String] ,
  $endo_therapies: [String] ,
  $meno_status: [String] ,
  $tissue_type: [String],
  $composition: [String],
  $association: [String],
  $file_type: [String],
  $age_at_index: [Float]
){
  searchSubjects (          
      programs: $programs,
      studies: $studies,
      diagnoses: $diagnoses,
      rc_scores: $rc_scores,
      tumor_sizes: $tumor_sizes,
      chemo_regimen: $chemo_regimen,
      tumor_grades: $tumor_grades,
      er_status: $er_status,
      pr_status: $pr_status,
      endo_therapies: $endo_therapies,
      meno_status: $meno_status,
      tissue_type: $tissue_type,
      composition: $composition,
      association: $association,       
      file_type: $file_type,
      age_at_index: $age_at_index
  ) {
      numberOfPrograms
      numberOfStudies
      numberOfSubjects
      numberOfSamples
      numberOfLabProcedures
      numberOfFiles
      armsByPrograms {
          program
          caseSize
          children {
              arm
              caseSize
              size
          }

      }

  subjectCountByProgram {
          group
          subjects
      }
      subjectCountByStudy {
          group
          subjects
      }
      subjectCountByDiagnoses {
          group
          subjects
      }
      subjectCountByRecurrenceScore {
          group
          subjects
      }
      subjectCountByTumorSize {
          group
          subjects
      }
      subjectCountByChemotherapyRegimen {
          group
          subjects
      }
      subjectCountByEndocrineTherapy {
          group
          subjects
      }
      subjectCountByTumorGrade{
          group
          subjects
      }
      subjectCountByErStatus{
          group
          subjects
      }
      subjectCountByPrStatus{
          group
          subjects
      }
      subjectCountByMenopauseStatus{
          group
          subjects
      }
      subjectCountByFileType {
          group
          subjects
      }
      subjectCountByFileAssociation {
          group
          subjects
      }
      subjectCountByTissueComposition {
          group
          subjects
      }
      subjectCountByTissueType {
          group
          subjects
      }

      filterSubjectCountByProgram {
          group
          subjects
      }
      filterSubjectCountByStudy{
          group
          subjects
      }
      filterSubjectCountByDiagnoses{
          group
          subjects
      }
      filterSubjectCountByRecurrenceScore{
          group
          subjects
      }
      filterSubjectCountByTumorSize{
          group
          subjects
      }
      filterSubjectCountByTumorGrade{
          group
          subjects
      }
      filterSubjectCountByErStatus{
          group
          subjects
      }
      filterSubjectCountByPrStatus{
          group
          subjects
      }
      filterSubjectCountByChemotherapyRegimen{
          group
          subjects
      }
      filterSubjectCountByEndocrineTherapy{
          group
          subjects
      }
      filterSubjectCountByMenopauseStatus{
          group
          subjects
      }
      filterSubjectCountByTissueType{
          group
          subjects
      }
      filterSubjectCountByTissueComposition{
          group
          subjects
      }
      filterSubjectCountByFileAssociation{
          group
          subjects
      }
      filterSubjectCountByFileType{
          group
          subjects
      }
      filterSubjectCountByAge{
        lowerBound
        upperBound
        subjects
      }

  }
}
`;

// Query for Tab - Files Table
export const GET_FILES_OVERVIEW_QUERY_ORIGINAL = gql`
query fileOverview(
    $subject_ids: [String],
    $file_ids: [String],
    $programs: [String] ,
    $studies: [String] ,
    $diagnoses: [String] ,
    $rc_scores: [String] ,
    $tumor_sizes: [String] ,
    $chemo_regimen: [String] ,
    $tumor_grades: [String] ,
    $er_status: [String] ,
    $pr_status: [String] ,
    $endo_therapies: [String] ,
    $meno_status: [String] ,
    $tissue_type: [String],
    $composition: [String],
    $association: [String],
    $file_type: [String],
    $age_at_index: [Float],
    $first: Int, 
    $offset: Int, 
    $order_by:  String
    $sort_direction: String ){
    fileOverview(
        subject_ids: $subject_ids,
        file_ids: $file_ids,
        programs: $programs,
        studies: $studies,
        diagnoses: $diagnoses,
        rc_scores: $rc_scores,
        tumor_sizes: $tumor_sizes,
        chemo_regimen: $chemo_regimen,
        tumor_grades: $tumor_grades,
        er_status: $er_status,
        pr_status: $pr_status,
        endo_therapies: $endo_therapies,
        meno_status: $meno_status,
        tissue_type: $tissue_type,
        composition: $composition,
        association: $association,       
        file_type: $file_type,
        age_at_index: $age_at_index,
        first: $first, 
        offset: $offset, 
        order_by: $order_by,
        sort_direction: $sort_direction
    ){
        file_id,
        program_id,
        file_name,
        association,
        file_description,
        file_format,
        file_size,
        program,
        arm,
        acl,
        subject_id,
        sample_id,
        diagnosis,
    }
}
`;

// Query for Tab - Samples Table
export const GET_SAMPLES_OVERVIEW_QUERY = gql`
query sampleOverview(
    $subject_ids: [String],
    $sample_ids: [String],
    $programs: [String] ,
    $studies: [String] ,
    $diagnoses: [String] ,
    $rc_scores: [String] ,
    $tumor_sizes: [String] ,
    $chemo_regimen: [String] ,
    $tumor_grades: [String] ,
    $er_status: [String] ,
    $pr_status: [String] ,
    $endo_therapies: [String] ,
    $meno_status: [String] ,
    $tissue_type: [String],
    $composition: [String],
    $association: [String],
    $file_type: [String],
    $age_at_index: [Float],
    $first: Int, 
    $offset: Int, 
    $order_by:  String
    $sort_direction: String ){
    sampleOverview(
        subject_ids: $subject_ids,
        sample_ids: $sample_ids,
        programs: $programs,
        studies: $studies,
        diagnoses: $diagnoses,
        rc_scores: $rc_scores,
        tumor_sizes: $tumor_sizes,
        chemo_regimen: $chemo_regimen,
        tumor_grades: $tumor_grades,
        er_status: $er_status,
        pr_status: $pr_status,
        endo_therapies: $endo_therapies,
        meno_status: $meno_status,
        tissue_type: $tissue_type,
        composition: $composition,
        association: $association,       
        file_type: $file_type,
        age_at_index: $age_at_index,
        first: $first, 
        offset: $offset, 
        order_by: $order_by,
        sort_direction: $sort_direction
    ){
        sample_id,
        subject_id,
        program,
        program_id,
        arm,
        diagnosis,
        tissue_type,
        tissue_composition,
        sample_anatomic_site,
        sample_procurement_method,
        platform,
        files 
    }
}
`;

// Query for Tab - Cases Table
export const GET_CASES_OVERVIEW_QUERY = gql`
query subjectOverview(
    $subject_ids: [String],
    $programs: [String] ,
    $studies: [String] ,
    $diagnoses: [String] ,
    $rc_scores: [String] ,
    $tumor_sizes: [String] ,
    $chemo_regimen: [String] ,
    $tumor_grades: [String] ,
    $er_status: [String] ,
    $pr_status: [String] ,
    $endo_therapies: [String] ,
    $meno_status: [String] ,
    $tissue_type: [String],
    $composition: [String],
    $association: [String],
    $file_type: [String],
    $age_at_index: [Float],
    $first: Int, 
    $offset: Int, 
    $order_by:  String
    $sort_direction: String ){
    subjectOverview(
        subject_ids: $subject_ids,
        programs: $programs,
        studies: $studies,
        diagnoses: $diagnoses,
        rc_scores: $rc_scores,
        tumor_sizes: $tumor_sizes,
        chemo_regimen: $chemo_regimen,
        tumor_grades: $tumor_grades,
        er_status: $er_status,
        pr_status: $pr_status,
        endo_therapies: $endo_therapies,
        meno_status: $meno_status,
        tissue_type: $tissue_type,
        composition: $composition,
        association: $association,       
        file_type: $file_type,
        age_at_index: $age_at_index,
        first: $first, 
        offset: $offset, 
        order_by: $order_by,
        sort_direction: $sort_direction
        
        ) {
        subject_id
        program
        program_id
        study_acronym
        study_short_description
        study_info
        diagnosis
        recurrence_score
        tumor_size
        tumor_grade
        er_status
        pr_status
        chemotherapy
        endocrine_therapy
        menopause_status
        age_at_index
        survival_time
        survival_time_unit
        files
        lab_procedures
        samples
    }
}
`;

// --------------- GraphQL Query - Add Associated Files under Cases table to Cart ---------------
export const GET_ALL_FILEIDS_PARTICIPANTS_TAB_FOR_SELECT_ALL = gql`
query participant_data_files(
  $subject_id: [String],
  $ctep_disease_term: [String],
  $stage_of_disease: [String],
  $tumor_grade: [String],
  $sex: [String],
  $reported_gender: [String],
  $race: [String],
  $ethnicity: [String],
  $carcinogen_exposure: [String],
  $targeted_therapy: [String],
  $anatomical_collection_site: [String],
  $tissue_category: [String],
  $assessment_timepoint: [String],
  $data_file_type: [String],
  $data_file_format: [String],
  $first: Int,
  $offset: Int,
  $order_by: String,
  $sort_direction: String
) {
  participant_data_files(
      subject_id: $subject_id
      ctep_disease_term: $ctep_disease_term
      stage_of_disease: $stage_of_disease
      tumor_grade: $tumor_grade
      sex: $sex
      reported_gender: $reported_gender
      race: $race
      ethnicity: $ethnicity
      carcinogen_exposure: $carcinogen_exposure
      targeted_therapy: $targeted_therapy
      anatomical_collection_site: $anatomical_collection_site
      tissue_category: $tissue_category
      assessment_timepoint: $assessment_timepoint
      data_file_type: $data_file_type
      data_file_format: $data_file_format
      first: $first
      offset: $offset
      order_by: $order_by
      sort_direction: $sort_direction
) {
  data_file_uuid
  __typename
}
}
  `;

// --------------- GraphQL Query - Add Associated Files under Biospecimens table to Cart ---------------
export const GET_ALL_FILEIDS_BIOSPECIMENS_TAB_FOR_SELECT_ALL = gql`
query biospecimenAddAllToCart(
  $subject_id: [String],
  $ctep_disease_term: [String],
  $stage_of_disease: [String],
  $tumor_grade: [String],
  $sex: [String],
  $reported_gender: [String],
  $race: [String],
  $ethnicity: [String],
  $carcinogen_exposure: [String],
  $targeted_therapy: [String],

  $anatomical_collection_site: [String],
  $tissue_category: [String],
  $assessment_timepoint: [String],
  $parent_specimen_id: [String],

  $data_file_type: [String],
  $data_file_format: [String],

  $first: Int,
  $offset: Int= 0, 
  $order_by: String = "data_file_uuid",
  $sort_direction: String = "asc"
){
  biospecimen_data_files(
    subject_id: $subject_id
    ctep_disease_term: $ctep_disease_term
    stage_of_disease: $stage_of_disease
    tumor_grade: $tumor_grade
    sex: $sex
    reported_gender: $reported_gender
    race: $race
    ethnicity: $ethnicity
    carcinogen_exposure: $carcinogen_exposure
    targeted_therapy: $targeted_therapy
    
    anatomical_collection_site: $anatomical_collection_site
    tissue_category: $tissue_category
    assessment_timepoint: $assessment_timepoint
    parent_specimen_id: $parent_specimen_id

    data_file_type: $data_file_type
    data_file_format: $data_file_format

    first: $first,
    offset: $offset,
    order_by: $order_by,
    sort_direction: $sort_direction
  ){
      data_file_uuid
  }
}
`;

// --------------- GraphQL Query - Add Associated Files under Files table to Cart ---------------
export const GET_ALL_FILEIDS_FILES_TAB_FOR_SELECT_ALL = gql`
query fileAddSelectedToCart(
  $data_file_uuid: [String],
  $subject_id: [String],
  $ctep_disease_term: [String],
  $stage_of_disease: [String],
  $tumor_grade: [String],
  $sex: [String],
  $reported_gender: [String],
  $race: [String],
  $ethnicity: [String],
  $carcinogen_exposure: [String],
  $targeted_therapy: [String],
  $anatomical_collection_site: [String],
  $tissue_category: [String],
  $assessment_timepoint: [String],
  $data_file_type: [String],
  $data_file_format: [String],
  $first: Int,
  $offset: Int= 0, 
  $order_by: String = "data_file_uuid",
  $sort_direction: String = "asc"
 ){
  fileOverview(
    data_file_uuid: $data_file_uuid,
    subject_id: $subject_id
    ctep_disease_term: $ctep_disease_term
    stage_of_disease: $stage_of_disease
    tumor_grade: $tumor_grade
    sex: $sex
    reported_gender: $reported_gender
    race: $race
    ethnicity: $ethnicity
    carcinogen_exposure: $carcinogen_exposure
    targeted_therapy: $targeted_therapy
    anatomical_collection_site: $anatomical_collection_site
    tissue_category: $tissue_category
    assessment_timepoint: $assessment_timepoint
    data_file_type: $data_file_type
    data_file_format: $data_file_format
    first: $first
    offset: $offset
    order_by: $order_by
    sort_direction: $sort_direction
  ){
      data_file_uuid,
  }
}
`;

// --------------- GraphQL Query - Add all files under Cases table to Cart ---------------
export const GET_ALL_FILEIDS_FROM_PARTICIPANTS_TAB_FOR_ADD_ALL_CART = gql`
query participant_data_files(
  $subject_id: [String],
  $ctep_disease_term: [String],
  $stage_of_disease: [String],
  $tumor_grade: [String],
  $sex: [String],
  $reported_gender: [String],
  $race: [String],
  $ethnicity: [String],
  $carcinogen_exposure: [String],
  $targeted_therapy: [String],
  $anatomical_collection_site: [String],
  $tissue_category: [String],
  $assessment_timepoint: [String],
  $data_file_type: [String],
  $data_file_format: [String],
  $first: Int,
  $offset: Int,
  $order_by: String,
  $sort_direction: String
) {
  participant_data_files(
      subject_id: $subject_id
      ctep_disease_term: $ctep_disease_term
      stage_of_disease: $stage_of_disease
      tumor_grade: $tumor_grade
      sex: $sex
      reported_gender: $reported_gender
      race: $race
      ethnicity: $ethnicity
      carcinogen_exposure: $carcinogen_exposure
      targeted_therapy: $targeted_therapy
      anatomical_collection_site: $anatomical_collection_site
      tissue_category: $tissue_category
      assessment_timepoint: $assessment_timepoint
      data_file_type: $data_file_type
      data_file_format: $data_file_format
      first: $first
      offset: $offset
      order_by: $order_by
      sort_direction: $sort_direction
) {
  data_file_uuid
  __typename
}
}`;

// --------------- GraphQL Query - Add all files under Biospecimens table to Cart ---------------
export const GET_ALL_FILEIDS_FROM_BIOSPECIMENS_TAB_FOR_ADD_ALL_CART = gql`
  query biospecimenAddAllToCart(
    $subject_id: [String],
    $ctep_disease_term: [String],
    $stage_of_disease: [String],
    $tumor_grade: [String],
    $sex: [String],
    $reported_gender: [String],
    $race: [String],
    $ethnicity: [String],
    $carcinogen_exposure: [String],
    $targeted_therapy: [String],
    $parent_specimen_id: [String],

    $anatomical_collection_site: [String],
    $tissue_category: [String],
    $assessment_timepoint: [String],

    $data_file_type: [String],
    $data_file_format: [String],

    $first: Int,
    $offset: Int= 0, 
    $order_by: String = "file_id",
    $sort_direction: String = "asc"
  ){
    biospecimen_data_files(
      subject_id: $subject_id
      ctep_disease_term: $ctep_disease_term
      stage_of_disease: $stage_of_disease
      tumor_grade: $tumor_grade
      sex: $sex
      reported_gender: $reported_gender
      race: $race
      ethnicity: $ethnicity
      carcinogen_exposure: $carcinogen_exposure
      targeted_therapy: $targeted_therapy
      anatomical_collection_site: $anatomical_collection_site
      tissue_category: $tissue_category
      assessment_timepoint: $assessment_timepoint
      data_file_type: $data_file_type
      data_file_format: $data_file_format
      parent_specimen_id: $parent_specimen_id

      first: $first,
      offset: $offset,
      order_by: $order_by,
      sort_direction: $sort_direction
    ){
        data_file_uuid
    }
  }
`;

// --------------- GraphQL Query - Add all files under Files table to Cart ---------------
export const GET_ALL_FILEIDS_FROM_FILES_TAB_FOR_ADD_ALL_CART = gql`
query fileAddAllToCart(
  $subject_id: [String],
  $ctep_disease_term: [String],
  $stage_of_disease: [String],
  $tumor_grade: [String],
  $sex: [String],
  $reported_gender: [String],
  $race: [String],
  $ethnicity: [String],
  $carcinogen_exposure: [String],
  $targeted_therapy: [String],
  $anatomical_collection_site: [String],
  $tissue_category: [String],
  $assessment_timepoint: [String],
  $data_file_type: [String],
  $data_file_format: [String],
  $first: Int,
  $offset: Int= 0, 
  $order_by: String = "data_file_uuid",
  $sort_direction: String = "asc"
 ){
  fileOverview(
    subject_id: $subject_id
    ctep_disease_term: $ctep_disease_term
    stage_of_disease: $stage_of_disease
    tumor_grade: $tumor_grade
    sex: $sex
    reported_gender: $reported_gender
    race: $race
    ethnicity: $ethnicity
    carcinogen_exposure: $carcinogen_exposure
    targeted_therapy: $targeted_therapy
    anatomical_collection_site: $anatomical_collection_site
    tissue_category: $tissue_category
    assessment_timepoint: $assessment_timepoint
    data_file_type: $data_file_type
    data_file_format: $data_file_format
    first: $first
    offset: $offset
    order_by: $order_by
    sort_direction: $sort_direction
  ){
      data_file_uuid,
  }
}
`;

// --------------- GraphQL query - Retrieve files tab details --------------
export const GET_FILES_NAME_QUERY = gql`
query fileOverview($file_ids: [String], $offset: Int = 0, $first: Int = 100000, $order_by:String ="file_name"){
  fileOverview(file_ids: $file_ids, offset: $offset,first: $first, order_by: $order_by) {
    file_name
  }
}
  `;

export const GET_FILE_IDS_FROM_FILE_NAME = gql`
  query (
      $file_name: [String],
      $offset: Int,
      $first: Int,
      $order_by: String
  )
  {
      fileIdsFromFileNameDesc(
          file_name:$file_name, 
          offset:$offset,
          first:$first,
          order_by:$order_by
      )
      {
          file_id
      }
  }`;

// --------------- Tabs Table configuration --------------
export const tabContainers = [
  {
    name: 'Studies',
    api: GET_STUDY_OVERVIEW_QUERY,
    paginationAPIField: 'tabStudy',
    count: 'numberOfStudies',
    dataKey: 'study_short_name',
    defaultSortField: 'study_short_name',
    defaultSortDirection: 'asc',
    tableID: 'study_tab_table',
    extendedViewConfig: {
      pagination: false,
      manageViewColumns: {
        title: "View Columns"
      },
      download: {
        downloadCsv: "Download Table Contents As CSV",
        downloadFileName: "popsci_download",
      },
    },
    columns: [
      {
        dataField: 'study_short_name',
        header: 'Study Acronym',
        display: true,
        tooltipText: 'sort',
        link: '/study/{study_short_name}',
        cellType: cellTypes.LINK,
        linkAttr : {
          rootPath: '/study',
          pathParams: ['study_short_name'],
        },
        headerType: headerTypes.CUSTOM_ELEM,
      },
      {
        dataField: 'study_name',
        header: 'Study Name',
        display: true,
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
        headerType: headerTypes.CUSTOM_ELEM,
      },
      {
        dataField: 'enrollment_period',
        header: 'Enrollment Period',
        display: true,
        tooltipText: 'sort',
      },
      {
        dataField: 'study_period',
        header: 'Study Period',
        display: true,
        tooltipText: 'sort',
      },
      {
        dataField: 'study_design',
        header: 'Study Design',
        display: true,
        tooltipText: 'sort',
      },
      {
        dataField: 'study_status',
        header: 'Study Status',
        display: true,
        tooltipText: 'sort',
      },
      {
        dataField: 'primary_diagnosis_disease_count',
        header: 'Neoplasms',
        display: true,
        tooltipText: 'sort',
      },
      {
        dataField: 'data_collection',
        header: 'Data Categories',
        display: true,
        tooltipText: 'sort',
        isDataCateColumn: true,
        cellType: cellTypes.CUSTOM_ELEM,
        dataCateColumnProps:{
          dataField: 'data_collection'
        }
      },
      {
        dataField: 'biospecimen_collection',
        header: 'Biospecimens',
        display: true,
        tooltipText: 'sort',
      },
      {
        dataField: 'enrollment_age',
        header: 'Enrollment Age',
        display: true,
        tooltipText: 'sort',
      },
      {
        dataField: 'number_of_participants',
        header: 'Participants',
        display: true,
        isNumber: true,
        tooltipText: 'sort',
        cellType: cellTypes.CUSTOM_ELEM,
        dataCateColumnProps:{
          dataField: 'number_of_participants'
        }
      },
    ],
    id: 'study_tab',
    tableID: 'study_tab_table',
    // tableDownloadCSV: customCasesTabDownloadCSV,
    tabIndex: '0',
    // downloadFileName: 'Bento_Dashboard_cases_download',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    }
      }
];

  
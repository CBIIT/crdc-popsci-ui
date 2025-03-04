/* eslint-disable */
import gql from 'graphql-tag';
import { cellTypes, dataFormatTypes, headerTypes } from '@bento-core/table';
// import { customCasesTabDownloadCSV, customFilesTabDownloadCSV, customSamplesTabDownloadCSV } from './tableDownloadCSV';
import downloadSuccess from '../assets/dash/downloadSuccess.svg'
import downloadLock from '../assets/dash/downloadLock.svg'
import previewLarge from '../assets/dash/previewLarge.svg'
import questionMarkCircle from '../assets/dash/questionMarkCircle.svg'

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

export const facetSectionTooltip = {
  src: questionMarkCircle,
  alt: 'Count details tooltip',
  tooltipText: 'All counts reflect the number of studies',
}

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
    $study_type: [String] # Hidden for now
    $study_design: [String]
    $enrollment_beginning_year: [Int]
    $enrollment_ending_year: [Int]
    $study_beginning_year: [Int]
    $study_ending_year: [Int]
    $number_of_participants: [Int]
    $primary_diagnosis_disease_term: [String]
    $study_country: [String]
    $biospecimen_collection: [String]
    $study_participant_maximum_age: [Float]
    $study_participant_minimum_age: [Float]
    $races: [String]
    $ethnicities: [String]
    $sexes: [String]
  ){
    searchStudies(
      study_short_name: $study_short_name
      study_type: $study_type # Hidden for now
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
    ){  
      dataVolume
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

      # Study Type(study_type) - Hidden
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
      neoplasmCountByStudy{
        group
        subjects
      }
      filterNeoplasmCountByStudy{
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
    ){
      study_short_name
      number_of_participants
    }

    minMaxBoundQuery {
      number_of_participant_lower_bound
      number_of_participant_upper_bound
      
      enrollment_beginning_year_lower_bound
      enrollment_ending_year_upper_bound

      study_beginning_year_lower_bound
      study_ending_year_upper_bound
      
      participant_minimum_age_lower_bound
      participant_maximum_age_upper_bound
    }
  }
`;

// Query used to populate Explore - Tables/Grid
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
$races: [String],
$ethnicities: [String],
$sexes: [String],
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
races: $races,
ethnicities: $ethnicities,
sexes: $sexes,
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
    races
    ethnicities
    sexes
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

// Query for Tab - Files Table -  (UNUSED; HERE FOR REFERENCE)
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

// --------------- (UNUSED; HERE FOR REFERENCE) GraphQL Query - Add Associated Files under Cases table to Cart ---------------
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

// --------------- (UNUSED; HERE FOR REFERENCE) GraphQL Query - Add Associated Files under Biospecimens table to Cart ---------------
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

// --------------- (UNUSED; HERE FOR REFERENCE) GraphQL Query - Add Associated Files under Files table to Cart ---------------
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

// --------------- (UNUSED; HERE FOR REFERENCE) GraphQL Query - Add all files under Cases table to Cart ---------------
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

// --------------- (UNUSED; HERE FOR REFERENCE) GraphQL Query - Add all files under Biospecimens table to Cart ---------------
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

// --------------- (UNUSED; HERE FOR REFERENCE) GraphQL Query - Add all files under Files table to Cart ---------------
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

// --------------- (UNUSED; HERE FOR REFERENCE) GraphQL query - Retrieve files tab details --------------
export const GET_FILES_NAME_QUERY = gql`
query fileOverview($file_ids: [String], $offset: Int = 0, $first: Int = 100000, $order_by:String ="file_name"){
  fileOverview(file_ids: $file_ids, offset: $offset,first: $first, order_by: $order_by) {
    file_name
  }
}
  `;
// (UNUSED; HERE FOR REFERENCE)
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

  
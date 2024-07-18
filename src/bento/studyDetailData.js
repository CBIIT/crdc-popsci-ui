import gql from 'graphql-tag';
import studyHeaderIcon from '../assets/study/studyHeaderIcon.svg'
import externalLinkIcon from '../assets/externalLinkIcon.svg'
import publication_external  from '../assets/icons/publication_external.png'
// --------------- Tooltip configuration --------------
export const tooltipContent = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/Tooltip.SpeechBubble.svg',
  alt: 'tooltipIcon',
};

export const title = {
  studyFile: '',
  armsAndCohort: '',
};

export const headerIcon = studyHeaderIcon;
export const externalIcon = externalLinkIcon;
export const publicationExternalLinkIcon = publication_external;

export const GET_STUDY_DETAIL_DATA_QUERY = gql`
  query study($study_short_name: [String]){
    studyGeneral(study_short_name:$study_short_name) {
      study_name
      study_short_name
      study_description
      study_type
      study_design
      enrollment_period_start
      enrollment_period_end
      study_period_start
      study_period_end
      biospecimens_collected
      study_status
      dbGap_id
      associated_links
      number_of_participants
      max_age
      medium_age
      min_age
      study_race
      study_ethnicity
      study_sex
      country_list
      country_count
      state_list
      state_count
      primary_diagnosis_disease_term
      primary_diagnosis_disease_count

      study_personal {
        first_name
        last_name
        email
        person_role
      }

      study_publication {
        author
        title
        year
        journal
        doi
        pumID
      }

      study_files {
        file_name
        file_type
        description
        format
        size
      }

      study_links {
        associated_link_name
        associated_link_id
        associated_link_url
      }
    }
  }
`;



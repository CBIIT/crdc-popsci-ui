import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import StudyDetailView from './studyDetailView';
import { GET_STUDY_DETAIL_DATA_QUERY } from '../../bento/studyDetailData';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const StudyDetailController =  ({ match }) => {
  
  const { loading, error, data } = useQuery(GET_STUDY_DETAIL_DATA_QUERY, {
    variables: { 
      study_short_name: [match.params.id],
      first: 0,
      offset: 10,
      order_by: 'study_short_name',
      sort_direction: 'ASC'
    },
  });

  if (loading) return <CircularProgress />;

  if (error || !data) {
    return <ErrorMessage message={`An error has occurred in loading Study Detail page: ${error}`} />;
  }

  const studyGeneral = data?.studyGeneral || [];
  if (studyGeneral?.length === 0 || data?.tabStudy?.length === 0) {
    return (
      <ErrorMessage>
        An error occurred while loading the Study Detail page, or no study matches the acronym <strong>"{match.params.id}"</strong>.
        Please return to <a href="/#/explore">Explore</a>.
      </ErrorMessage>
    );
  }
  return <StudyDetailView data={data || {}} studyShortName={match.params.id}/>;
};

export default StudyDetailController;



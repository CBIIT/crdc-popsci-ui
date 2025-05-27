import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import StudyDetailView from './studyDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_STUDY_DETAIL_DATA_QUERY } from '../../bento/studyDetailData';

const StudyDetailController =  ({ match }) => {
  
  const { loading, error, data } = useQuery(GET_STUDY_DETAIL_DATA_QUERY, {
    variables: { 
    study_short_name: [match.params.id],
    first: 0,
    offset: 10,
    order_by: 'study_short_name',
    sort_direction: 'ASC'},
  });

  if (data && data.studyGeneral) {
    const { studyGeneral } = data;
    if (studyGeneral.length === 0) {
      // TODO: Handle invalid study_short_name better ex. Like ICDC
      return (
        <p variant="headline" color="error" size="lg" style={{textAlign: 'center', color: 'red', fontSize: '20px', margin: '50px auto'}}>
          Unfortunately, we found no study that matched <strong>{match.params.id}</strong>. Go Back to <a href="/#/explore">Explore</a>
        </p>
      );
      // return <Explore invalid />;
    }
  }
  if (loading) return <CircularProgress />;
  if (error || !data) {
    return (
      <Typography variant="headline" color="error" size="sm">
        {error ? `An error has occurred in loading stats component: ${error}` : 'Recieved wrong data'}
      </Typography>
    );
  }
  return <StudyDetailView data={data || {}} studyShortName={match.params.id}/>;
};

export default StudyDetailController;



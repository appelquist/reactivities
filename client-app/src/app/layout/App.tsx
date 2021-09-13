import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../store';



function App() {

  const dispatch = useDispatch();
  const { fetchActivities } = bindActionCreators(actionCreators, dispatch);
  const { fetching } = useSelector((state: State) => state.activities);

  useEffect(() => {
    fetchActivities();
  }, [])

  if (fetching) return <LoadingComponent content='Loading app' />

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7rem" }}>
        <ActivityDashBoard />
      </Container>
    </>
  );
}

export default App;

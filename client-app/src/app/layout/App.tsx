import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Button, Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../store';



function App() {
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();
  const {
    getAllActivities,
    selectActivity,
    cancelSelectActivity,
    openEditMode,
    closeEditMode,
    fetchActivities,
  } = bindActionCreators(actionCreators, dispatch);
  const { activities, loading, selectedActivity, editMode } = useSelector((state: State) => state.activities);

  useEffect(() => {
    fetchActivities();
  }, [])

  if (loading) return <LoadingComponent content='Loading app' />

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7rem" }}>
        <ActivityDashBoard
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;

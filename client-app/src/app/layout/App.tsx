import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashboard';
import { Route } from 'react-router';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7rem" }}>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/activities" component={ActivityDashBoard} />
        <Route path="/activities/:id" render={(routeProps) => <ActivityDetails id={routeProps.match.params.id} /> } />
        <Route path="/createActivity" component={ActivityForm} />
      </Container>
    </>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GuestHomePage from "../pages/GuestHomePage";
import UserHomePage from "../pages/UserHomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import EventsPage from "../pages/EventsPage";
import Event from "../pages/Event";
import CreateEvent from "../pages/CreateEvent";
import Contact from "../pages/Contact";
import { UserProvider } from "../pages/context/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <Switch>
          <Route exact path="/" component={GuestHomePage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/user" component={UserHomePage} />
          <Route exact path="/events" component={EventsPage} />
          <Route path="/events/:id" component={Event} />
          <Route path="/event-form" component={CreateEvent} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </UserProvider>  
    </Router>
  );
}

export default App;

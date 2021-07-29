import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Create from "./Components/Create";
import Edit from "./Components/Edit";
import Read from "./Components/Read";

function App() {
  return (
    <div>
      <Router>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Nav.Link>
              <Navbar.Brand as={NavLink} to="/">
                CRUD APP
              </Navbar.Brand>
            </Nav.Link>
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Create
              </Nav.Link>
              <Nav.Link as={NavLink} to="/read">
                List All Users
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Switch>
          <Route exact path="/" component={Create} />
          <Route exact path="/edit/:id" component={Edit} />
          <Route exact path="/read" component={Read} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

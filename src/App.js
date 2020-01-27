import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebookF,
  faInstagram,
  faVk
} from "@fortawesome/free-brands-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

import Admin from "./Admin";
import "./App.css";
import Work from "./Work";
import About from "./About";
import Login from "./Login";
import Contact from "./Contact";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./Auth";

library.add(faFacebookF, faInstagram, faVk);

function App() {
  return (
    <div className="portfolio-main">
      <AuthProvider>
        <Router>
          <div>
            <Navbar className="name-wrapper">
              <Navbar.Brand className="name">
                {" "}
                Kiril Andreev Photography
              </Navbar.Brand>
            </Navbar>
            <Navbar className="nav">
              <Nav>
                <Link to="/" className="btn-2">
                  {" "}
                  About{" "}
                </Link>
                <Link to="/work" className="btn-2">
                  {" "}
                  Works{" "}
                </Link>
                <Link to="/contact" className="btn-2">
                  {" "}
                  Contact{" "}
                </Link>
              </Nav>
            </Navbar>

            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/work" component={Work} />
            <Route exact={true} path="/contact" component={Contact} />
            <PrivateRoute exact={true} path="/admin" component={Admin} />
            <Route exact={true} path="/" component={About} />
          </div>
        </Router>
      </AuthProvider>
      <footer>
        <a
          className="icon"
          href="https://www.facebook.com/profile.php?id=100009558171191/"
        >
          <FontAwesomeIcon icon={["fab", "facebook-f"]} />
        </a>
        <a className="icon" href="https://www.instagram.com/keriiiiiiil/">
          <FontAwesomeIcon icon={["fab", "instagram"]} />
        </a>
        <a className="icon" href="https://vk.com/id217801758/">
          <FontAwesomeIcon icon={["fab", "vk"]} />
        </a>
      </footer>
    </div>
  );
}

export default App;

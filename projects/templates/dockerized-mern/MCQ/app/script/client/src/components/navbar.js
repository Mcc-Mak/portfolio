import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import icon from "../static/image/linux.PNG";
// import icon from "../static/image/Linux.PNG";

export default function NavbarHtml() {
  useEffect(() => {}, []);

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container fluid className="m-0 p-0">
        <Navbar.Brand href="/#home">
        <img
            style={{ width: 40 + "%" }}
            src={icon}
            className="m-0 p-0"
            // onClick={console.log("Hello, I'm Linux.")}
          ></img>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/progress">Completion Progress</Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login:anonymous">ANONYMOUS</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

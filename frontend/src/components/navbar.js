import React, { useEffect, useState, useContext } from "react";
import getUserInfo from '../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';
import { UserContext } from "../App";

// Here, we display our Navbar
export default function Navbar() {

 const { user } = useContext(UserContext);

 if (!user){
  return null;
 }
  
  
  return (
    <ReactNavbar bg="dark" variant="dark">
    <Container>
      <Nav className="me-auto">
        <Nav.Link href="/privateUserProfile">Home</Nav.Link>
        <Nav.Link href="/gamePage">Game</Nav.Link>




      </Nav>
    </Container>
  </ReactNavbar>

  );
}
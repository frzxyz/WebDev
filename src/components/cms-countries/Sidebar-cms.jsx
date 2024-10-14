import Navbar from "react-bootstrap/Navbar";
import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Logo from "../../assets/logo-movienow.png";
import { BiSolidCameraMovie, BiSolidTrophy } from "react-icons/bi";
import { MdTheaterComedy } from "react-icons/md";
import {
  IoEarth,
  IoPerson,
  IoChatboxEllipses,
  IoPeople,
  IoLogOut,
} from "react-icons/io5";
import 'bootstrap/dist/css/bootstrap.min.css';
import { signOut } from 'next-auth/react';  // Import next-auth hooks

function Sidebar() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleClose = () => setShowLogoutModal(false);
  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    signOut();
    window.location.href = "/";
  };

  return (
    <div>
      <nav className="col-auto col-md-2 d-flex justify-content-between flex-column sidebar">
        <div className="position-sticky">
        <Nav.Item className="text-center my-3">
              <Nav.Link href="#" className="d-flex align-items-center justify-content-center text-white">
                <img
                  alt="Logo"
                  src="https://i.imgur.com/fUTK20b.png"
                  width="50"
                  height="50"
                  className="me-2"
                />
                <h1 className="d-inline-block align-top m-0 text-white" style={{fontSize: "30px"}}>MovNow</h1>
              </Nav.Link>
            </Nav.Item>
          <hr />
          <Nav className="nav nav-pills flex-column">
            <Nav.Item>
              <Nav.Link
                className="text-white"
                href="/cms-movies"
              >
                <BiSolidCameraMovie />
                <span className="ms-2">Movies</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="text-white active" href="/cms-countries">
                <IoEarth />
                <span className="ms-2">Countries</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="text-white" href="/cms-awards">
                <BiSolidTrophy />
                <span className="ms-2">Awards</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="text-white" href="/cms-genres">
                <MdTheaterComedy />
                <span className="ms-2">Genre</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="text-white" href="/cms-actors">
                <IoPeople />
                <span className="ms-2">Actors</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="text-white" href="/cms-comments">
                <IoChatboxEllipses />
                <span className="ms-2">Comments</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="text-white" href="/cms-users">
                <IoPerson />
                <span className="ms-2">Users</span>
              </Nav.Link>
            </Nav.Item>
            <hr />
            <Nav.Item>
              <Nav.Link className="text-white" onClick={handleLogoutClick}>
                <IoLogOut />
                <span className="ms-2">Logout</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah anda yakin ingin keluar?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleConfirmLogout}>
            Keluar
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Sidebar;

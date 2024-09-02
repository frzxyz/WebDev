import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
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

function Sidebar() {
  return (
    <div>
      <nav className="col-auto col-md-2 d-flex justify-content-between flex-column sidebar">
        <div className="position-sticky">
        <Nav.Item className="text-center my-3">
              <Nav.Link href="#" className="d-flex align-items-center justify-content-center text-white">
                <img
                  alt=""
                  src={Logo}
                  width="50"
                  height="50"
                  className="me-2"
                />
                <h1 className="d-inline-block align-top m-0 text-white">MovieNow</h1>
              </Nav.Link>
            </Nav.Item>
          <hr />
          <Nav className="nav nav-pills flex-column">
            <Nav.Item>
              <Nav.Link
                className="text-white"
                href="#"
              >
                <BiSolidCameraMovie />
                <span className="ms-2">Movies</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="text-white active" href="#">
                <IoEarth />
                <span className="ms-2">Countries</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="text-white" href="#">
                <BiSolidTrophy />
                <span className="ms-2">Awards</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="text-white" href="#">
                <MdTheaterComedy />
                <span className="ms-2">Genre</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="text-white" href="#">
                <IoPeople />
                <span className="ms-2">Actors</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="text-white" href="#">
                <IoChatboxEllipses />
                <span className="ms-2">Comments</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="text-white" href="#">
                <IoPerson />
                <span className="ms-2">Users</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;

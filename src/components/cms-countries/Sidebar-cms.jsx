import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "../../assets/movnow.png";
import { BiSolidCameraMovie, BiSolidTrophy } from "react-icons/bi";
import { MdTheaterComedy } from "react-icons/md";
import {
  IoEarth,
  IoPerson,
  IoChatboxEllipses,
  IoPeople,
  IoLogOut,
} from "react-icons/io5";

function Sidebar() {
  return (
    <div className="container-fluid">
      <nav className="col-auto col-md-2 d-flex justify-content-between flex-column sidebar">
        <div className="position-sticky">
          <div className="col-auto text-decoration-none d-flex text-white align-item-center">

          <Navbar.Brand href="#home">
            <img
              alt=""
              src={Logo}
              width="50"
              height="50"
            />
            <h1 className="d-inline-block align-top text-white">MovNow</h1>
          </Navbar.Brand>
          </div>
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

import { slide as Menu } from "react-burger-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faHeart, faMusic } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default (props) => {
  return (
    <Menu>
      <Link className="menu-item" to="/">
        Home <FontAwesomeIcon icon={faHome} className="icon" />
      </Link>
      <a className="menu-item" href="/liked">
        Liked <FontAwesomeIcon icon={faHeart} className="icon" />
      </a>
      <a className="menu-item" href="/Play">
        PlayList <FontAwesomeIcon icon={faMusic} className="icon" />
      </a>
    </Menu>
  );
};

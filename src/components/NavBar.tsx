import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav
      className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark shadow"
      style={{ opacity: "95%" }}
    >
      <div className="container-fluid">
        <div className="navbar-brand">
          <NavLink to="/" className="nav-link">
            <img
              src={process.env.PUBLIC_URL + "/assets/kimono.svg"}
              width={32}
              alt="logo de karate"
            />{" "}
            | Karaté Club Fosses
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

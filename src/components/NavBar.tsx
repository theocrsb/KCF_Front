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
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

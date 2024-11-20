import { useMediaQuery } from "react-responsive";

const Home = () => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 700.1px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 700px)" });

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="d-flex flex-wrap justify-content-around m-3 border border-light rounded shadow-lg p-3 mb-5 bgCard">
        <div className="m-3">
          <img
            className="img-responsive"
            src={process.env.PUBLIC_URL + "/assets/logoOffi.svg"}
            style={{ width: "15rem" }}
            alt={"logo du club de karaté club de Fosses"}
          />
        </div>
        <div className="align-self-center m-3">
          <div className="card " style={{ width: "15rem" }}>
            <div
              className="card-header text-center -3"
              style={{ fontWeight: "bold" }}
            >
              Information
            </div>
            <ul className="list-group list-group-flush text-center">
              <li className="list-group-item">Responsable : M. Niazul MIAH</li>
              <li className="list-group-item">
                Adresse : Avenue de la Haute Grève 95470 FOSSES
              </li>
              <li className="list-group-item">
                Kata | Kumite | Baby Karaté | Cardio Training 100% Girls
              </li>
            </ul>
          </div>
        </div>
      </div>

      {isBigScreen && (
        <div>
          <div className="d-flex justify-content-center m-3 mt-5">
            <img
              src={process.env.PUBLIC_URL + "/assets/planningBrut.svg"}
              alt="planning club karaté"
              style={{ width: "672px" }}
            />
          </div>
          <div className="d-flex justify-content-center m-3"></div>
        </div>
      )}

      {isTabletOrMobile && (
        <div>
          <div className="d-flex justify-content-center m-3 mt-5">
            <img
              src={process.env.PUBLIC_URL + "/assets/planningBrut.svg"}
              alt="planning club karaté"
              style={{ width: "90%" }}
            />
          </div>
          <div className="d-flex justify-content-center m-3"></div>
        </div>
      )}
    </div>
  );
};

export default Home;

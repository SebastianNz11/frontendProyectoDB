import logo from "../img/logo.png";
import { Login } from "../components/Login";

export const Home = () => {
  return (
    <div className="container d-flex justify-content-between">
      <div className="row col-6">
        <img src={logo} alt="logo" className="mx-auto mt-5" />
      </div>
      <div className="row col-6 p-5 mt-5 me-5">
        <Login />
      </div>
    </div>
  );
};

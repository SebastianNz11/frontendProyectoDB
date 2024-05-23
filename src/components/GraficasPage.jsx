import { Navbar } from "./Navbar";
import { Graficas } from "./Graficas";

export const GraficasPage = () => {
  return (
    <>
      <Navbar />
      <div className="container d-flex justify-content-center">
        <div className="row col-10 pt-5">
          <Graficas />
        </div>
      </div>
    </>
  );
};

import NavBarHeaderLogin from "../components/NavBarHeaderLogin";
import { RegistroPage } from "../components/RegistroPage";
import Footer from "../shared/Footer";
import "../styles/loginPage.css";

export const LoginPages = ({ setUsuarioLogeado }) => {
  return (
    <div className="app-layout">
      <NavBarHeaderLogin />
      <main className="main-content">
        <RegistroPage setUsuarioLogeado={setUsuarioLogeado} />
      </main>
      <Footer />
    </div>
  );
};

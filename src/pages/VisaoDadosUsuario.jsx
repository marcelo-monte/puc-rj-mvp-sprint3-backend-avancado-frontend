/* Componentes */
import { DadosUsuario } from "../components/DadosUsuario";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";

/* CSS */
import styles from "./VisaoDadosUsuario.module.css";

export function VisaoDadosUsuario() {

    // Renderiza essa página.
    return (
        <>
            <div className={styles.VisaoDadosUsuario}>
                <Menu />
                <Header />
                <DadosUsuario />
            </div>
        </>
    );
}
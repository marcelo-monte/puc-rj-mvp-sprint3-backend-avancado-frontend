/* Componentes */
import { Contas } from "../components/Contas";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";

/* CSS */
import styles from "./VisaoGeral.module.css";

export function VisaoGeral() {

    // Renderiza essa página.
    return (
        <>
            <div className={styles.VisaoGeral}>
                <Menu paginaAtiva="VisaoGeral" />
                <Header />
                <Contas />
            </div>
        </>
    );
}
/* Componentes */
import { ExtratoConta } from "../components/ExtratoConta";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";

/* CSS */
import styles from "./VisaoExtratoConta.module.css";

export function VisaoExtratoConta() {

    // Renderiza essa página.
    return (
        <>
            <div className={styles.VisaoExtratoConta}>
                <Menu paginaAtiva="VisaoExtratoConta" />
                <Header />
                <ExtratoConta />
            </div>
        </>
    );
}
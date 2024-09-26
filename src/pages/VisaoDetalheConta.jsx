/* Componentes */
import { DetalheConta } from "../components/DetalheConta";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";

/* CSS */
import styles from "./VisaoDetalheConta.module.css";

export function VisaoDetalheConta() {

    // Renderiza essa página.
    return (
        <>
            <div className={styles.VisaoDetalheConta}>
                <Menu paginaAtiva="VisaoDetalheConta" />
                <Header />
                <DetalheConta />
            </div>
        </>
    );
}
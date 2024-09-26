/* Imagens */
import Setas from "../assets/setas.png";
import Notificacao from "../assets/notificacao.png";
import Procurar from "../assets/procurar.png";

/* CSS */
import styles from "./Header.module.css";

export function Header() {

    // Renderiza esse componente.
    return (
        <>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.hello}>Olá Fulano</div>
                    <div className={styles.dataContainer}>
                        <div><img src={Setas} /></div>
                        <div className={styles.data}>27 de Setembro de 2024</div>
                    </div>
                </div>
                <div className={styles.procurarContainer}>
                    <div><img src={Notificacao} /></div>
                    <div className={styles.procurarBox}>
                        <div className={styles.procurarText}>Procurar</div>
                        <div><img src={Procurar} /></div>
                    </div>
                </div>
            </div>
        </>
    );
}
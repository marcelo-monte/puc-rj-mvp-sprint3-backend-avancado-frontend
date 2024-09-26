/* Componentes */
import { ResumoConta } from "../components/ResumoConta";
import { TransacoesRecentes } from "./TransacoesRecentes";

/* CSS */
import styles from "./DetalheConta.module.css";

export function DetalheConta() {

    // Renderiza esse componente, e os componentes Resumo
    // e TransacoesRecentes.
    return (
        <>
            <div className={styles.DetalheConta}>
                <div className={`${styles.DetalhesDaConta} ${styles.titulo}`}> Detalhes da Conta</div>
                <div className={`${styles.DetalhesDaConta} ${styles.container}`}>
                    <div className={styles.Detalhes}>
                        <div className={styles.TopLine}>
                            <div className={styles.NomeBanco}>
                                <div className={styles.NomeDoBanco}>Nome do Banco</div>
                                <div className={styles.BancoAbLtda}>Banco AB Ltda</div>
                            </div>
                            <div className={styles.TipoConta}>
                                <div className={styles.TipoConta}>Tipo de Conta</div>
                                <div className={styles.ContaCorrente}>Conta Corrente</div>
                            </div>
                            <div className={styles.Saldo}>
                                <div className={styles.DataDeAbertura}>Data de Abertura</div>
                                <div className={styles.Data}>05/11/2020</div>
                            </div>
                            <div className={styles.NMeroConta}>
                                <div className={styles.NMeroDaConta}>Número da Conta</div>
                                <div className={styles.Conta}>123.456.789-0</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.Button}>
                        <div className={styles.ButtonBig}>
                            <div className={styles.Editar}>Editar</div>
                        </div>
                        <div className={styles.Remover}>Remover</div>
                    </div>
                </div>

                <ResumoConta />
                <TransacoesRecentes />
            </div>
        </>
    );
}
/* React use Handlers */
import { useEffect, useState, useContext } from "react"

/* Context */
import { IdContaContext } from "../contexts/IdContaContext";

/* Imagens */
import SaldoIcon from "../assets/saldo.png";
import ReceitasIcon from "../assets/receitas.png";
import DespesasIcon from "../assets/despesas.png";

/* CSS */
import styles from "./ResumoConta.module.css";

/* Função utilitária */
import { formatarMoeda } from '../util.js'

/* JSON */
import contasPessoais from '../contas.json'

export function ResumoConta() {
    const [resumo, setResumo] = useState([]);
    const { idConta } = useContext(IdContaContext);

    // Guarda o resumo da conta cujo id está no contexto.
    useEffect(() => {
        var conta = contasPessoais.contas.find(item => item.id === idConta);
        setResumo(conta.resumo);
    }, [resumo, idConta]);

    // Renderiza esse componente. Usado em 02 páginas.
    return (
        <>
            <div className={styles.ChartsBar}>
                <div className={styles.Integration}>
                    <div className={styles.Frame199}>
                        <div className={styles.Frame197}>
                            <div className={styles.IconBg}>
                                <img src={SaldoIcon} />
                            </div>
                            <div className={styles.Frame196}>
                                <div className={styles.Pages}>Saldo</div>
                                <div className={styles.SaldoValue}>R$ {formatarMoeda(resumo.receitas - resumo.despesas)}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.Integration}>
                    <div className={styles.Frame199}>
                        <div className={styles.Frame197}>
                            <div className={styles.IconBg}>
                                <img src={ReceitasIcon} />
                            </div>
                            <div className={styles.Frame196}>
                                <div className={styles.Pages}>Receitas</div>
                                <div className={styles.ReceitasValue}>R$ {formatarMoeda(resumo.receitas)}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.Integration}>
                    <div className={styles.Frame199}>
                        <div className={styles.Frame197}>
                            <div className={styles.IconBg}>
                                <img src={DespesasIcon} />
                            </div>
                            <div className={styles.Frame196}>
                                <div className={styles.Pages}>Despesas</div>
                                <div className={styles.DespesasValue}>R$ {formatarMoeda(resumo.despesas)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
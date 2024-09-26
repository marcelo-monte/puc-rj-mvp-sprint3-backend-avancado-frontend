/* React use Handlers */
import { useEffect, useState, useContext } from "react"

/* Context */
import { IdContaContext } from "../contexts/IdContaContext";

/* Componentes */
import { ResumoConta } from "./ResumoConta";
import { LinhaExtrato } from "./LinhaExtrato";

/* CSS */
import styles from "./ExtratoConta.module.css";

/* JSON */
import contasPessoais from '../contas.json'

export function ExtratoConta() {
    const [transacoesList, setTransacoesList] = useState([]);
    const { idConta } = useContext(IdContaContext);

    // Guarda as transações da conta cujo id está no contexto.
    useEffect(() => {
        var conta = contasPessoais.contas.find(item => item.id === idConta);
        setTransacoesList(conta.transacoes);
    }, [transacoesList, idConta]);

    // Renderiza esse componente, junto com o componente LinhaExtrato mais abaixo.
    return (
        <>
            <div className={styles.RecentTransaction}>
                <div className={`${styles.DetalhesDaConta} ${styles.titulo}`}>Extrato Mensal</div>
                <ResumoConta />
                <div className={styles.MainContent}>
                    <div className={styles.Header}>
                        <div className={styles.HeaderContent}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className={styles.Data}>Data</td>
                                        <td className={styles.Categoria}>Categoria</td>
                                        <td className={styles.Descricao}>Descrição</td>
                                        <td className={styles.Estabelecimento}>Estabelecimento</td>
                                        <td className={styles.Valor}>Valor</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={styles.TransactionList}>
                        <div className={styles.Frame133543}>
                            {transacoesList.map((item) => (
                                <LinhaExtrato key={item.transacao.id} transacao={item.transacao} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
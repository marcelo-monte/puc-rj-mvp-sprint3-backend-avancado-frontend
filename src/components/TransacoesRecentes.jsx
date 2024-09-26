/* React use Handlers */
import { useEffect, useState, useContext } from "react"

/* React Router */
import { Link } from "react-router-dom"

/* Componentes */
import { LinhaExtrato } from "./LinhaExtrato";

/* Context */
import { IdContaContext } from "../contexts/IdContaContext";

/* CSS */
import styles from "./TransacoesRecentes.module.css";

/* JSON */
import contasPessoais from '../contas.json'

export function TransacoesRecentes() {
    const [transacoesList, setTransacoesList] = useState([]);
    const { idConta } = useContext(IdContaContext);

    // Guarda as transações da conta cujo id está no contexto.
    useEffect(() => {
        var conta = contasPessoais.contas.find(item => item.id === idConta);
        setTransacoesList(conta.transacoes);
    }, [transacoesList, idConta]);

    // Renderiza apenas as 04 primeiras transações da conta, no máximo.
    const renderQuatroTransacoes = () => {
        var limite = transacoesList.length;
        var elementos = [];
        var item;

        // Se tivermos mais de 04 transações na lista, limita a
        // quantidade a ser apresentada a 4. Se tivermos menos
        // de 4 transações, o limite vai ser o length da lista,
        // apresentando todas as transações.
        if (limite > 4) {
            limite = 4;
        }

        for (var i = 0; i < limite; i++) {
            item = transacoesList[i];
            elementos.push(<LinhaExtrato key={item.transacao.id} transacao={item.transacao} />);
        }

        return elementos;
    }

    // Renderiza esse componente.
    return (
        <>
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
                        {renderQuatroTransacoes()}
                    </div>
                    <Link to="/conta/extrato">
                        <div className={styles.ButtonBig}>
                            <div className={styles.AddAccounts}>Extrato Completo</div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
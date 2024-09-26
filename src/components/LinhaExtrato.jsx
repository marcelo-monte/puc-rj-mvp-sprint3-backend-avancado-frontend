/* eslint-disable react/prop-types */

/* CSS */
import styles from "./LinhaExtrato.module.css";

/* Função utilitária */
import { formatarMoeda } from '../util.js'

// Renderiza o atributo valor com cores vermelha ou verde,
// caso seja uma despesa ou uma receita respectivamente.
const renderValor = (valor) => {

    if (valor < 0) {
        return <>
            <td className={styles.ColunaDespesa}>R$ {formatarMoeda(-valor)}</td>
        </>
    } else {
        return <>
            <td className={styles.ColunaReceita}>R$ {formatarMoeda(valor)}</td>
        </>
    }
}

export function LinhaExtrato(props) {
    const transacao = props.transacao;

    // Renderiza esse componente. Usado em 02 páginas.
    return (
        <>
            <div className={styles.TransactionItem}>
                <table>
                    <tbody>
                        <tr>
                            <td className={styles.ColunaData}>{transacao.data}</td>
                            <td className={styles.ColunaCategoria}>{transacao.categoria}</td>
                            <td className={styles.ColunaDescricao}>{transacao.descricao}</td>
                            <td className={styles.ColunaEstabelecimento}>{transacao.estabelecimento}</td>
                            {renderValor(transacao.valor)}
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
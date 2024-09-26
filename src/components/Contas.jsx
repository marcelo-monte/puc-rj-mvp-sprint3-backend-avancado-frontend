/* React use Handlers */
import { useEffect, useState, useContext } from "react"
import { useNavigate } from 'react-router-dom';

/* Context */
import { IdContaContext } from "../contexts/IdContaContext";

/* Imagens */
import SetaBotao from "../assets/setaBotao.png";

/* CSS */
import styles from "./Contas.module.css";

/* JSON */
import contasPessoais from '../contas.json'

/* Função utilitária */
import { formatarMoeda } from '../util.js'

export function Contas() {
    const [contasList, setContasList] = useState([])
    const navigate = useNavigate();
    const { handleChangeIdConta } = useContext(IdContaContext);

    // Guarda a lista de contas.
    useEffect(() => {
        setContasList(contasPessoais.contas)
    }, [contasList]);

    // Seta o idConta no contexto para o id da conta que
    // foi clicada, navegando logo em seguida para a
    // página de detalhes da conta.
    const changeContaContext = (novoId) => {
        handleChangeIdConta(novoId);
        navigate('/conta');
    };

    // Renderiza os cards de contas junto com o card final de
    // botões para adicionar e editar contas.
    const renderContas = () => {
        const elementos = [];

        // Renderiza cada uma das contas.
        contasList.forEach((item) => {
            elementos.push(
                <div className={styles.Conta}>
                    <div className={styles.Header}>
                        <div key={item.id} className={styles.Tipo}>{item.tipo}</div>
                        <div className={styles.Type}>
                            <div className={styles.Frame40714}>
                                <div className={styles.NomeBanco}>{item.banco}</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.Content}>
                        <div className={styles.Detalhes}>
                            <div className={styles.NMero}>
                                <div className={styles.NumeroConta}>{item.numero}</div>
                                <div className={styles.Label}>Número</div>
                            </div>
                            <div className={styles.Saldo}>
                                <div className={styles.Valor}>R$ {formatarMoeda(item.saldo)}</div>
                                <div className={styles.Label}>Saldo</div>
                            </div>
                        </div>
                        <div className={styles.Footer}>
                            <div className={styles.Remover}>Remover</div>
                            <div className={styles.Button} onClick={() => changeContaContext(item.id)}>
                                <div className={styles.Detalhes}>Detalhes</div>
                                <div className={styles.Detalhes}><img src={SetaBotao} /></div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

        // Renderiza o card com os botões de Adicionar/Editar Contas.
        elementos.push(
            <div className={styles.AddAccount}>
                <div className={styles.Button2}>
                    <div className={styles.ButtonBig}>
                        <div className={styles.AddAccounts}>Adicionar Contas</div>
                    </div>
                    <div className={styles.Frame133537}>
                        <div className={styles.EditAccounts}>Editar Contas</div>
                    </div>
                </div>
            </div>
        );

        return elementos;
    }

    // Renderiza esse componente.
    return (
        <>
            <div className={styles.Contas}>
                <div className={styles.ContasTitle}>Contas</div>
                <div className={styles.ContaContainer}>
                    {renderContas()}
                </div>
            </div>
        </>
    );
}
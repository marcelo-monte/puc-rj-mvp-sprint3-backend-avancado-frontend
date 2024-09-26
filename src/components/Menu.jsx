/* eslint-disable react/prop-types */

/* React use Handlers */
import { useNavigate } from "react-router-dom"

/* Imagens gerais */
import Usuario from "../assets/usuario.png";

/* Ícones dos itens do Menu */
import VisaoGeral from "../assets/visaoGeral.png";
import Conta from "../assets/conta.png";
import Extrato from "../assets/extrato.png";
import Faturas from "../assets/faturas.png";
import Despesas from "../assets/menuDespesas.png";
import Objetivos from "../assets/objetivos.png";
import Configuracoes from "../assets/configuracoes.png";
import Logout from "../assets/logout.png";

/* Ícones dos itens do Menu, quando estiverem em suas respectivas páginas */
import VisaoGeralAtivo from "../assets/visaoGeralAtivo.png";
import ContaAtivo from "../assets/contaAtivo.png";
import ExtratoAtivo from "../assets/extratoAtivo.png";

/* CSS */
import styles from "./Menu.module.css";

export function Menu(props) {
    const paginaAtiva = props.paginaAtiva;
    const navigate = useNavigate();

    // Renderiza o item de menu da tela Visão Geral como ativo, se estivermos
    // nessa página.
    const renderMenuVisaoGeral = () => {
        if (paginaAtiva == "VisaoGeral") {
            return <div className={styles.MenuItemVerde} onClick={() => navigate('/')}>
                <div><img src={VisaoGeralAtivo} /></div>
                <div>Visão Geral</div>
            </div>;
        } else {
            return <div className={styles.MenuItemNormal} onClick={() => navigate('/')}>
                <div><img src={VisaoGeral} /></div>
                <div>Visão Geral</div>
            </div>;
        }
    }

    // Renderiza o item de menu da tela Detalhe de Conta como ativo, se estivermos
    // nessa página.
    const renderMenuConta = () => {
        if (paginaAtiva == "VisaoDetalheConta") {
            return <div className={styles.MenuItemVerde} onClick={() => navigate('/conta')}>
                <div><img src={ContaAtivo} /></div>
                <div>Conta</div>
            </div>;
        } else {
            return <div className={styles.MenuItemNormal} onClick={() => navigate('/conta')}>
                <div><img src={Conta} /></div>
                <div>Conta</div>
            </div>;
        }
    }

    // Renderiza o item de menu da tela Extrato da Conta como ativo, se estivermos
    // nessa página.
    const renderMenuExtrato = () => {
        if (paginaAtiva == "VisaoExtratoConta") {
            return <div className={styles.MenuItemVerde} onClick={() => navigate('/conta/extrato')}>
                <div><img src={ExtratoAtivo} /></div>
                <div>Extrato</div>
            </div>;
        } else {
            return <div className={styles.MenuItemNormal} onClick={() => navigate('/conta/extrato')}>
                <div><img src={Extrato} /></div>
                <div>Extrato</div>
            </div>;
        }
    }

    // Renderiza esse componente. Usado nas 03 páginas.
    return (
        <>
            <div className={styles.NavBar}>
                <div className={styles.LogoMenu}>
                    <div className={styles.Montebank}>
                        <span className={styles.Monte}>MONTE</span><span className={styles.Bank}>bank</span>
                    </div>
                    <div className={styles.Menu}>
                        {renderMenuVisaoGeral()}
                        {renderMenuConta()}
                        {renderMenuExtrato()}
                        <div className={styles.MenuItemNormal}>
                            <div><img src={Faturas} /></div>
                            <div>Faturas</div>
                        </div>
                        <div className={styles.MenuItemNormal}>
                            <div><img src={Despesas} /></div>
                            <div>Despesas</div>
                        </div>
                        <div className={styles.MenuItemNormal}>
                            <div><img src={Objetivos} /></div>
                            <div>Objetivos</div>
                        </div>
                        <div className={styles.MenuItemNormal}>
                            <div><img src={Configuracoes} /></div>
                            <div>Configurações</div>
                        </div>
                    </div>
                </div>
                <div className={styles.Footer}>
                    <div className={styles.LogoutButton}>
                        <div className={styles.Icon}>
                            <div><img src={Logout} /></div>
                        </div>
                        <div className={styles.LogoutText}>Logout</div>
                    </div>
                    <div className={styles.Profile} onClick={() => navigate('/usuario')}>
                        <div className={styles.NamePicture}>
                            <img className={styles.Image} src={Usuario} />
                            <div className={styles.Name}>
                                <div className={styles.FulanoDaSilva}>Fulano da Silva</div>
                                <div className={styles.VerProfile}>Ver profile</div>
                            </div>
                        </div>
                        <div className={styles.Icon}>
                            <div className={styles.Ellipse}></div>
                            <div className={styles.Ellipse}></div>
                            <div className={styles.Ellipse}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
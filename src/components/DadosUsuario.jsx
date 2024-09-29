/* CSS */
import styles from "./DadosUsuario.module.css";

import { useEffect, useState } from "react"

export function DadosUsuario() {
    const [usuario, setUsuario] = useState([]);
    const [classAddBtn, setClassAddBtn] = useState([]);
    const [classEdtBtn, setClassEdtBtn] = useState([]);
    const [classDelBtn, setClassDelBtn] = useState([]);

    // Rota GET para recuperar dados do usuário e seu endereço
    // da base de dados.
    useEffect(() => {
        let url = 'http://localhost:5000/usuario';
        fetch(url, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((usuario) => {
                setUsuario(usuario);
                if (usuario.cep == "") {
                    ativaBtnAdicao();
                } else {
                    desativaBtnAdicao();
                }
            })
            .catch((error) => {
                console.error('Erro: ', error);
            });
    }, []);

    // Habilita o botão Adicionar, desabilita os demais
    const ativaBtnAdicao = () => {
        setClassAddBtn(styles.Button);
        setClassEdtBtn(styles.ButtonEditInativo);
        setClassDelBtn(styles.ButtonDelInativo);
    };

    // Desabilita o botão Adicionar, habilita os demais
    const desativaBtnAdicao = () => {
        setClassAddBtn(styles.ButtonInativo);
        setClassEdtBtn(styles.ButtonEdit);
        setClassDelBtn(styles.ButtonDel);
    };

    const isNumeric = (string) => string == Number.parseFloat(string);

    // Acessa a API externa ViaCEP
    const buscaCEP = () => {
        let cep = document.getElementById("cep").value;

        if (!isNumeric(cep)) {
            alert("Informe apenas números!");
        } else if (cep.length != 8) {
            alert("CEP deve ter 8 dígitos!");
        } else {
            let url = 'https://viacep.com.br/ws/' + cep + '/json/';
            fetch(url, {
                method: 'GET'
            })
                .then((response) => response.json())
                .then((data) => {
                    document.getElementById("logradouro").value = data.logradouro;
                    document.getElementById("bairro").value = data.bairro;
                    document.getElementById("cidade").value = data.localidade;
                    document.getElementById("uf").value = data.uf;
                    document.getElementById("complemento").value = data.complemento;
                })
                .catch((error) => {
                    console.error('Erro: ', error);
                });
        }
    };

    // Monta os dados de form para posterior envio pelo fetch
    const montaFormData = () => {
        let formData = new URLSearchParams();

        formData.append("id", document.getElementById("id").value);
        formData.append("cep", document.getElementById("cep").value);
        formData.append("logradouro", document.getElementById("logradouro").value);
        formData.append("bairro", document.getElementById("bairro").value);
        formData.append("cidade", document.getElementById("cidade").value);
        formData.append("uf", document.getElementById("uf").value);
        formData.append("complemento", document.getElementById("complemento").value);

        return formData;
    };

    // Atualiza os dados dos campos disabled do form HTML e seus pares no state
    // do componente após adicionar ou editar um endereço.
    const loadFormData = (data) => {

        document.getElementById("logradouro").value = data.logradouro;
        document.getElementById("bairro").value = data.bairro;
        document.getElementById("cidade").value = data.cidade;
        document.getElementById("uf").value = data.uf;
        usuario.logradouro = data.logradouro;
        usuario.bairro = data.bairro;
        usuario.cidade = data.cidade;
        usuario.uf = data.uf;
    };

    // Apaga os dados dos campos do form HTML e seus pares no state
    // do componente após remover um endereço.
    const limpaFormData = () => {

        document.getElementById("cep").value = "";
        document.getElementById("logradouro").value = "";
        document.getElementById("bairro").value = "";
        document.getElementById("cidade").value = "";
        document.getElementById("uf").value = "";
        document.getElementById("complemento").value = "";
        usuario.cep = "";
        usuario.logradouro = "";
        usuario.bairro = "";
        usuario.cidade = "";
        usuario.uf = "";
        usuario.complemento = "";
    };

    // Rota POST para adicionar o endereço na base de dados e
    // a rota PUT para editar o endereço na base de dados.
    const enviaForm = (metodo) => {
        let cep = document.getElementById("cep").value;

        // Executa somente se:
        // o botão de Adicionar estiver ativo e o método for POST;
        // ou se
        // o botão de Editar estiver ativo e o método for 'PUT'.
        if ((classAddBtn == styles.Button && metodo == 'POST') || (classEdtBtn == styles.ButtonEdit && metodo == 'PUT')) {

            if (!isNumeric(cep)) {
                alert("Informe apenas números!");
            } else if (cep.length != 8) {
                alert("CEP deve ter 8 dígitos!");
            } else {
                let formData = montaFormData();
                let url = "http://127.0.0.1:5000/endereco";

                fetch(url, {
                    method: metodo,
                    body: formData
                })
                    .then((response) => response.json())
                    .then((data) => {

                        if (data.cep != "") {
                            loadFormData(data);

                            if (metodo == 'POST') {
                                document.getElementById("mensagem").innerHTML = "Endereço inserido!";
                                desativaBtnAdicao();
                            } else {
                                document.getElementById("mensagem").innerHTML = "Endereço atualizado!";
                            }
                        }
                    })
                    .catch((error) => {
                        console.error('Erro: ', error);
                    });
            }
        }
    };

    // Rota DELETE para remover o endereço da base de dados.
    const enviaFormDel = () => {

        // o botão de Remover estiver ativo
        if (classDelBtn == styles.ButtonDel && confirm("Remover o endereço?")) {
            let url = `http://127.0.0.1:5000/endereco?id=${usuario.id}`;

            fetch(url, {
                method: 'DELETE'
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    limpaFormData();
                    document.getElementById("mensagem").innerHTML = "Endereço removido!";
                    ativaBtnAdicao();
                })
                .catch((error) => {
                    console.error('Erro: ', error);
                });
        }
    };

    // Renderiza esse componente.
    return (
        <>
            <div className={styles.DadosUsuario}>
                <div className={styles.DadosUsuarioTitle}>Dados</div>
                <div className={styles.FundoForm}>
                    <form id="formulario">
                        <input type="hidden" id="id" value={usuario.id}></input>
                        <table cellSpacing={5}>
                            <tbody>
                                <tr>
                                    <td><div className={styles.LabelForm}>Nome</div></td>
                                    <td colSpan={2}>
                                        <input className={styles.Valor} type="text" disabled id="nome" value={usuario.nome}></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td><div className={styles.LabelForm}>CPF</div></td>
                                    <td colSpan={2}>
                                        <input className={styles.Valor} type="text" disabled id="cpf" value={usuario.cpf}></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3}><hr></hr></td>
                                </tr>
                                <tr>
                                    <td><div className={styles.LabelFormEndereco}>CEP</div></td>
                                    <td>
                                        <input className={styles.Valor} type="text" id="cep" maxLength="8" defaultValue={usuario.cep}></input>
                                    </td>
                                    <td>
                                        <div className={styles.ButtonBuscar} onClick={() => buscaCEP()}>
                                            <div className={styles.Detalhes}>Buscar</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><div className={styles.LabelFormEndereco}>Logradouro</div></td>
                                    <td colSpan={2}>
                                        <input className={styles.Valor} type="text" disabled id="logradouro" value={usuario.logradouro}></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td><div className={styles.LabelFormEndereco}>Bairro</div></td>
                                    <td colSpan={2}>
                                        <input className={styles.Valor} type="text" disabled id="bairro" value={usuario.bairro}></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td><div className={styles.LabelFormEndereco}>Cidade</div></td>
                                    <td colSpan={2}>
                                        <input className={styles.Valor} type="text" disabled id="cidade" value={usuario.cidade}></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td><div className={styles.LabelFormEndereco}>UF</div></td>
                                    <td colSpan={2}>
                                        <input className={styles.Valor} type="text" disabled id="uf" value={usuario.uf}></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td><div className={styles.LabelFormEndereco}>Complemento</div></td>
                                    <td colSpan={2}>
                                        <input className={styles.Valor} type="text" id="complemento" defaultValue={usuario.complemento}></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3}><hr></hr></td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className={classAddBtn} onClick={() => enviaForm('POST')}>
                                            <div className={styles.Detalhes}>Adicionar Endereço</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={classEdtBtn} onClick={() => enviaForm('PUT')}>
                                            <div className={styles.Detalhes}>Editar Endereço</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={classDelBtn} onClick={() => enviaFormDel()}>
                                            <div className={styles.Detalhes}>Remover Endereço</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td> </td>
                                    <td id="mensagem"></td>
                                    <td> </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </>
    );
}
/* CSS */
import styles from "./DadosUsuario.module.css";

import { useEffect, useState } from "react"

export function DadosUsuario() {
    const [usuario, setUsuario] = useState([]);
    const [classAddBtn, setClassAddBtn] = useState([]);
    const [classEdtBtn, setClassEdtBtn] = useState([]);
    const [classDelBtn, setClassDelBtn] = useState([]);

    // TODO Enviar POST, PUT, DELETE, ajustar botão add/edit e remove

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

    const ativaBtnAdicao = () => {
        setClassAddBtn(styles.Button);
        setClassEdtBtn(styles.ButtonEditInativo);
        setClassDelBtn(styles.ButtonDelInativo);
    };

    const desativaBtnAdicao = () => {
        setClassAddBtn(styles.ButtonInativo);
        setClassEdtBtn(styles.ButtonEdit);
        setClassDelBtn(styles.ButtonDel);
    };

    const isNumeric = (string) => string == Number.parseFloat(string)

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

    const loadFormData = (data) => {
        alert(document.getElementById("bairro").value);
        alert(data.bairro);
        document.getElementById("logradouro").value = data.logradouro;
        document.getElementById("bairro").value = data.bairro;
        document.getElementById("cidade").value = data.cidade;
        document.getElementById("uf").value = data.uf;
    };

    const enviaFormAdd = () => {
        let cep = document.getElementById("cep").value;

        if (classAddBtn == styles.Button) {

            if (!isNumeric(cep)) {
                alert("Informe apenas números!");
            } else if (cep.length != 8) {
                alert("CEP deve ter 8 dígitos!");
            } else {
                let formData = montaFormData();
                let url = "http://127.0.0.1:5000/endereco";
                console.log(formData);
                fetch(url, {
                    method: 'POST',
                    body: formData
                })
                    .then((response) => response.json())
                    .then((data) => {

                        if (data.cep != "") {
                            loadFormData(data);
                            document.getElementById("mensagem").innerHTML = "Endereço inserido!";
                        }

                        setClassAddBtn(styles.ButtonInativo);
                        setClassEdtBtn(styles.ButtonEdit);
                        setClassDelBtn(styles.ButtonDel);
                    })
                    .catch((error) => {
                        console.error('Erro: ', error);
                    });
            }
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
                                        <div className={classAddBtn} onClick={() => enviaFormAdd()}>
                                            <div className={styles.Detalhes}>Adicionar Endereço</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={classEdtBtn} onClick={() => enviaFormEdt()}>
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
/* eslint-disable react/prop-types */

/* React use Handlers */
import { createContext, useState } from "react";

const IdContaContext = createContext();

const IdContaProvider = ({ children }) => {
    const [idConta, setIdConta] = useState(1);

    // Seta o id da conta para o valor informado.
    const handleChangeIdConta = (id) => {
        setIdConta(id);
    };

    // Renderiza o contexto.
    return (
        <IdContaContext.Provider value={{ idConta, handleChangeIdConta }}>
            {children}
        </IdContaContext.Provider>
    );
};

export { IdContaProvider, IdContaContext };
/* React Router */
import { BrowserRouter, Route, Routes } from 'react-router-dom'

/* Context */
import { IdContaProvider } from "./contexts/IdContaContext";

/* Componentes de páginas */
import { VisaoGeral } from './pages/VisaoGeral'
import { VisaoDetalheConta } from './pages/VisaoDetalheConta'
import { VisaoExtratoConta } from './pages/VisaoExtratoConta'
import { VisaoDadosUsuario } from './pages/VisaoDadosUsuario'

function App() {

  // Define as rotas.
  return (
    <IdContaProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<VisaoGeral />}></Route>
          <Route path='/conta' element={<VisaoDetalheConta />}></Route>
          <Route path='/conta/extrato' element={<VisaoExtratoConta />}></Route>
          <Route path='/usuario' element={<VisaoDadosUsuario />}></Route>
        </Routes>
      </BrowserRouter>
    </IdContaProvider>
  )
}

export default App

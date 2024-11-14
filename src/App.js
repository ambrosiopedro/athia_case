import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmpresasList from './components/EmpresasList';
import AddEmpresa from './components/AddEmpresa';
import EditEmpresa from './components/EditEmpresa'; // Importe o componente de edição

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmpresasList />} />
        <Route path="/add" element={<AddEmpresa />} />
        <Route path="/edit/:id" element={<EditEmpresa />} /> {/* Rota para editar empresa */}
      </Routes>
    </Router>
  );
}

export default App;

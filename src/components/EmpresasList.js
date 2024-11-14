import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

function EmpresasList() {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/empresas')  
      .then(response => {
        setEmpresas(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar empresas:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/empresas/${id}`)
      .then(() => {
        setEmpresas(empresas.filter(empresa => empresa.id !== id));
        alert('Empresa excluída com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao excluir empresa:', error);
        alert('Erro ao excluir empresa.');
      });
  };

  return (
    <div className="container">
      <h2>Lista de Empresas</h2>
      <Link to="/add" className="button back-button">Voltar</Link>
      
      <ul>
        {empresas.map(empresa => (
          <li key={empresa.id}>
            <div>{empresa.nome} - {empresa.cnpj}</div>
            <div>
              <Link to={`/edit/${empresa.id}`} className="button edit-button">Editar</Link>
              <button onClick={() => handleDelete(empresa.id)} className="button delete-button">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmpresasList;

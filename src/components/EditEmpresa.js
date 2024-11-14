import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  
import '../App.css';

function EditEmpresa() {
  const { id } = useParams();  
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  

  useEffect(() => {
    
    axios.get(`http://localhost:3000/empresas/${id}`)
      .then(response => {
        setNome(response.data.nome);
        setCnpj(response.data.cnpj);
      })
      .catch(error => {
        console.error('Erro ao buscar empresa:', error);
        setMessage('Erro ao carregar dados da empresa.');
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

  
    axios.put(`http://localhost:3000/empresas/${id}`, { nome, cnpj })
      .then(response => {
        setMessage('Empresa atualizada com sucesso!');
        navigate('/'); 
      })
      .catch(error => {
        setMessage('Erro ao atualizar empresa. Tente novamente!');
      });
  };

  return (
    <div className="container">
      <h2>Editar Empresa</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input 
            type="text" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>CNPJ:</label>
          <input 
            type="text" 
            value={cnpj} 
            onChange={(e) => setCnpj(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>

      {message && <p className={message.includes('sucesso') ? 'success' : 'error'}>{message}</p>}
    </div>
  );
}

export default EditEmpresa;

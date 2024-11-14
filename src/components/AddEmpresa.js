import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Corrigindo o caminho para apontar para o arquivo na pasta src


function AddEmpresa() {
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    axios.post('http://localhost:3000/empresas', { nome, cnpj })
      .then(response => {
        setMessage('Empresa adicionada com sucesso!');
        navigate('/'); // Redireciona para a lista de empresas
      })
      .catch(error => {
        setMessage('Erro ao adicionar empresa. Tente novamente!');
      });
  };

  return (
    <div className="container">
      <h2>Adicionar Nova Empresa</h2>
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
        <button type="submit">Adicionar</button>
      </form>

      {message && <p className={message.includes('sucesso') ? 'success' : 'error'}>{message}</p>}
    </div>
  );
}

export default AddEmpresa;

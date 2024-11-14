const express = require('express');
const app = express();
const db = require('./db');  
const port = 3000; 
const cors = require('cors');

app.use(cors()); 


app.use(express.json());


app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.get('/empresas', (req, res) => {
  const query = 'SELECT * FROM empresa'; 
  db.query(query, (err, results) => {  
    if (err) {
      console.error('Erro ao consultar empresas:', err);
      res.status(500).send('Erro ao consultar empresas');
      return;
    }
    res.json(results); 
  });
});


const validateEmpresaData = (req, res, next) => {
  const { nome, cnpj } = req.body;
  
  if (!nome || !cnpj) {
    return res.status(400).send('Nome e CNPJ são obrigatórios');
  }

 
  const cnpjRegex = /^\d{14}$/;
  if (!cnpjRegex.test(cnpj)) {
    return res.status(400).send('CNPJ inválido');
  }

  next(); 
};


app.post('/empresas', validateEmpresaData, (req, res) => {
  const { nome, cnpj } = req.body;

  const query = 'INSERT INTO empresa (nome, cnpj) VALUES (?, ?)';
  db.query(query, [nome, cnpj], (err, results) => {  
    if (err) {
      console.error('Erro ao inserir empresa:', err);
      res.status(500).send('Erro ao inserir empresa');
      return;
    }
    res.status(201).send('Empresa inserida com sucesso!');
  });
});


app.put('/empresas/:id', validateEmpresaData, (req, res) => {
  const { nome, cnpj } = req.body;
  const { id } = req.params;

  const checkQuery = 'SELECT * FROM empresa WHERE id = ?';
  db.query(checkQuery, [id], (err, results) => {
    if (err) {
      console.error('Erro ao verificar empresa:', err);
      return res.status(500).send('Erro ao verificar empresa');
    }
    if (results.length === 0) {
      return res.status(404).send('Empresa não encontrada');
    }

   
    const query = 'UPDATE empresa SET nome = ?, cnpj = ? WHERE id = ?';
    db.query(query, [nome, cnpj, id], (err, results) => {
      if (err) {
        console.error('Erro ao atualizar empresa:', err);
        res.status(500).send('Erro ao atualizar empresa');
        return;
      }
      res.send('Empresa atualizada com sucesso!');
    });
  });
});


app.delete('/empresas/:id', (req, res) => {
  const { id } = req.params;


  const checkQuery = 'SELECT * FROM empresa WHERE id = ?';
  db.query(checkQuery, [id], (err, results) => {
    if (err) {
      console.error('Erro ao verificar empresa:', err);
      return res.status(500).send('Erro ao verificar empresa');
    }
    if (results.length === 0) {
      return res.status(404).send('Empresa não encontrada');
    }

    const query = 'DELETE FROM empresa WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Erro ao deletar empresa:', err);
        res.status(500).send('Erro ao deletar empresa');
        return;
      }
      res.send('Empresa deletada com sucesso!');
    });
  });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Algo deu errado no servidor' });
  });
  

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

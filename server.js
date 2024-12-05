// Importação das dependências
import http from 'http';
import { v4 } from 'uuid';  // Para gerar IDs únicos

// Setup do servidor 
const port = 3000;  // Definindo a porta do servidor
const grades = [];   // Array para armazenar as notas

// Criando o servidor
const server = http.createServer((req, res) => {

    const { method, url } = req;  // Corrigindo as variáveis

    let body = '';  // Corrigindo a variável 'body'

    // Obtendo os dados da requisição
    req.on('data', chunk => {
        body += chunk.toString();  // Concatenando os pedaços do corpo
    });

    // Quando a requisição terminar, processa os dados
    req.on('end', () => {
        const id = url.split('/')[2];  // Pegando o ID da URL

        // Tratamento para o GET
        if (method === 'GET' && url === '/grades') {
            res.writeHead(200, { "Content-Type": 'application/json' });  // Corrigindo o cabeçalho
            res.end(JSON.stringify(grades));  // Retorna as notas armazenadas
        }
        // Adicionando uma grade (POST)
        else if (method === 'POST' && url === '/grades') {
            const grade = JSON.parse(body);  // Convertendo o corpo para um objeto
            grade.id = v4();  // Gerando um ID único para a grade
            grades.push(grade);  // Adicionando a grade no array
            res.writeHead(201, { "Content-Type": 'application/json' });
            res.end(JSON.stringify(grade));  // Retorna a grade com o ID gerado
        }
        // Caso o endpoint não seja encontrado
        else {
            res.writeHead(404, { "Content-Type": 'text/plain' });
            res.end('Endpoint não encontrado');
        }
    });

});

// Inicia o servidor na porta definida
server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

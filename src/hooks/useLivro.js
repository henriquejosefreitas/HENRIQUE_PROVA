// Importa a url da api do aquivo .env
const url = import.meta.env.VITE_API_URL;

// Importando os hooks pra controar o states e useEffect
import { useState, useEffect } from "react";


// LIVROS
// Cria o hook para inserir um livro
export function useInserirLivro() {
  // Recebe os dados do livro e faz a requisição para a API
  // com o método POST
  const inserirLivro = async (data) => {
    const req = await fetch(`${url}/livros`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    console.log("livro inserido:", res);
    // Retorna o livro inserido
    return res;
  };

  return { inserirLivro };
}

// Cria o hook para listar os livros, puxando os dados da api
export function useListaLivros() {
  //Lista com livros
  const [livros, setLivros] = useState([]);

  // UseEffect para puxar os dados assim que o componente é montado
  useEffect(() => {
    // Função pra buscar os dados da API
    async function fetchData() {
      try {
        const req = await fetch(`${url}/livros`);
        const livros = await req.json();
        setLivros(livros);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchData();
  }, []);

  // Retorna a lista de livros
  return livros;
}

// Cria o hook para excluir um livro
export function useDeletaLivro() {
  // Recebe o id do livro a ser deletado e faz a requisição para a Api
  // com o método DELETE
  const deletarLivro = async (idLivro) => {
    // mudei aqui
    const req = await fetch(`${url}/livros/${idLivro}`, {
      method: "DELETE",
    });
    const res = await req.json();
    // Retorna o livro deletado
    return res;
  };
  return { deletarLivro };
}

// Cria o hook para bucar um livro por id
export function useBuscarLivroPorId() {
  // Receb o id do livro e faz a requisição para a api
  // com o método GET
  const buscarLivroPorId = async (idLivro) => {
    const req = await fetch(`${url}/livros/${idLivro}`);
    const res = await req.json();
    console.log("livro encontrado:", res);
    return res;
  };
  return { buscarLivroPorId };
}

// Cria o hook para atualizar um livro
export function useAtualizalivro() {
  // Envia os dados do livro recebido via data, para o livro específico que recebeu via id livro,
  // e faz a requisição para a ai, com o método PUT
  const atualizaLivro = async (data, idLivro) => {
    console.log(data);
    
    const req = await fetch(`${url}/livros/${idLivro}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    console.log("livro atualizado:", res);
    // Retorna o livro atualizado
    return res;
  };
  return { atualizaLivro };
}

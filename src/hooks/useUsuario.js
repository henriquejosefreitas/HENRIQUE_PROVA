// Importa a url da api do aquivo .env
const url = import.meta.env.VITE_API_URL;

// Importando os hooks pra controar o states e useEffect
import { useState, useEffect } from "react";

// USUÁRIOS
// Cria o hook para listar os usuarios, puxando os dados da api
export function useListaUsuarios() {
  //Lista com usuarios
  const [usuarios, setUsuarios] = useState([]);

  // UseEffect para puxar os dados assim que o componente é montado
  useEffect(() => {
    // Função pra buscar os dados da API
    async function fetchData() {
      try {
        const req = await fetch(`${url}/usuarios`);
        const usuarios = await req.json();
        setUsuarios(usuarios);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchData();
  }, []);

  // Retorna a lista de usuarios
  return usuarios;
}

// Cria o hook para inserir um usuario
export function useInserirUsuario() {
  // Recebe os dados do usuario e faz a requisição para a API
  // com o método POST
  const inserirUsuario = async (data) => {
    const req = await fetch(`${url}/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    console.log("usuario inserido:", res);
    // Retorna o usuario inserido
    return res;
  };

  return { inserirUsuario };
}


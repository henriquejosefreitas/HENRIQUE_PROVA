// importando components do bootstrap
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

// Importando o hook useForm do react-hook-form
import { useForm } from "react-hook-form";

//Importação do navigate pra transitar entre páginas
//Importação do useParams para pegar o id fornecido na url
import { useNavigate, useParams } from "react-router-dom";

// Importando o hook useInserirusuario
import { useBuscarLivroPorId, useAtualizalivro } from "../hooks/useLivro";

// Importando o hook useState para monitorar a mudança das variáveis
import { useState, useEffect } from "react";

// Importando o hook useInserirusuario
import { useListaUsuarios } from "../hooks/useUsuario";

const EditarLivro = () => {
  // IMPORTAÇÃO E USO DO HOOK FORM
  // O register é usado para criar o objeto de registro, com os campos ditos abaico no código
  // O handlesubmit é usado para tratar do envio do fomulario, caso de erro ou sucesso
  // O formState é usado para monitorar o estado do formulário, como erros e sucesso
  // O errors é usado para monitorar os erros do formulário, como campos obrigatórios e validações
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Criando o navigate
  const navigate = useNavigate();

  // Usando a funcao de buscar livro por id e de atualizar o livro
  const { buscarLivroPorId } = useBuscarLivroPorId();
  const { atualizaLivro } = useAtualizalivro();

  // Guardando o id do produto vindo da url
  const { id } = useParams();

  // Variavel que controla se o livro já foi carregado
  const [carregado, setCarregado] = useState(false);

  // Usando a funcao de buscar usuarios
  const usuarios = useListaUsuarios();

  // Effect pra buscar o livro assim que o componente for montado
  useEffect(() => {
    async function fetchLivro() {
      try {
        if (usuarios.length === 0) return; // Aguarda carregar os usuários
        const livro = await buscarLivroPorId(id);
        // Se houver livro, reseta o formulário com os dados do livro
        if (livro && !carregado) {
          reset({
            titulo: livro.titulo,
            autor: livro.autor,
            genero: livro.genero,
            status: livro.status,
            usuario: livro.usuario,
          });
          // Evita chamadas múltiplas de reset
          setCarregado(true);
        }
      } catch (erro) {
        console.error("Erro ao buscar livro:", erro);
        // Se o erro for de livro não encontrado, redireciona para a página inicial
        if (erro.message.includes("Unexpected")) {
          alert("Livro não encontrado!");
          navigate("/home");
        }
      }
    }
    fetchLivro();
  }, [usuarios]);

  // FUNCOES QUE LIDAM COM O SUCESSO E ERRO DO FORMULÁRIO
  // funcao pra caso de sucesso na validacao do formulario
  // data é o objeto com os campos do formulário
  const onSubmit = (data) => {
    console.log("Dados:", data);
    atualizaLivro(data, id);
    alert("Livro atualizado com sucesso!");
    navigate("/home");
  };

  //Caso tenha erro no formulario, mostra mensagens de erro nos campos
  const onError = (errors) => {
    console.log("Erros:", errors);
  };
  return (
    <div className="text-center">
      <Form className="mt-3 w-full" onSubmit={handleSubmit(onSubmit, onError)}>
        <Row>
          <Col xs={12}>
            {/* Caixinha de titulo */}
            <FloatingLabel
              controlId="floatingInputTitulo"
              label="Titulo"
              className="mb-5"
            >
              <Form.Control
                type="text"
                placeholder="Digite o titulo do titulo"
                {...register("titulo", {
                  required: "O titulo é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O titulo deve ter pelo menos 2 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "O titulo deve ter ate 20 caracteres",
                  },
                })}
              />
              {errors.titulo && (
                <p className="error">{errors.titulo.message}</p>
              )}
            </FloatingLabel>

            {/* Caixinha de autor */}
            <FloatingLabel
              controlId="floatingInputAutor"
              label="Autor"
              className="mb-5"
            >
              <Form.Control
                type="text"
                placeholder="Digite o titulo do autor"
                {...register("autor", {
                  required: "O autor é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O autor deve ter pelo menos 2 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "O autor deve ter ate 20 caracteres",
                  },
                })}
              />
              {errors.autor && <p className="error">{errors.autor.message}</p>}
            </FloatingLabel>

            {/* Select de generos */}
            <FloatingLabel
              controlId="floatingSelectGeneros"
              label="Genero"
              className="mb-5"
            >
              <Form.Select
                {...register("genero", {
                  validate: (value) =>
                    value != "Nenhum" || "Escolha um genero ",
                })}
              >
                <option value="Nenhum"> Escolha um genero </option>
                <option value="Romance"> Romance </option>
                <option value="Ficção"> Ficção </option>
                <option value="Fantasia"> Fantasia </option>
                <option value="Drama"> Drama </option>
                <option value="Conto"> Conto </option>
              </Form.Select>
              {errors.genero && (
                <p className="error">{errors.genero.message}</p>
              )}
            </FloatingLabel>

            {/* Select de status */}
            <FloatingLabel
              controlId="floatingSelectStatus"
              label="Genero"
              className="mb-5"
            >
              <Form.Select {...register("status")}>
                <option value="Quero ler"> Quero ler </option>
                <option value="Lendo"> Lendo </option>
                <option value="Lido"> Lido </option>
              </Form.Select>
              {errors.status && (
                <p className="error">{errors.status.message}</p>
              )}
            </FloatingLabel>

            {/* Select de usuarios */}
            <FloatingLabel
              controlId="floatingSelectUsuario"
              label="Usuário"
              className="mb-5"
            >
              <Form.Select
                {...register("usuario", {
                  validate: (value) =>
                    value != "Nenhum" || "Escolha uma usuario ",
                })}
              >
                <option value="Nenhum"> Escolha um usuário </option>
                {usuarios.map((user) => (
                  <option key={user.id} value={user.nome}>
                    {user.nome}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
        {/* Botão para enviar o formulário de cadastro de livro */}
        <Button variant="primary" size="lg" type="submit">
          Editar
        </Button>
      </Form>
    </div>
  );
};

export default EditarLivro;

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";


import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";


import { useInserirLivro } from "../hooks/useLivro";

import { useListaUsuarios } from "../hooks/useUsuario";

const CadastroTarefa = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { inserirLivro } = useInserirLivro();

  const usuarios = useListaUsuarios();

  const onSubmit = (data) => {
    console.log("Dados:", data);
    inserirLivro(data);
    alert("Livro cadastrado com sucesso!");
    navigate("/home");
  };

  const onError = (errors) => {
    console.log("Erros:", errors);
  };
  return (
    <div className="text-center">
      <Form className="mt-3 w-full" onSubmit={handleSubmit(onSubmit, onError)}>
        <Row>
          <Col xs={12}>
            {/* Caixinha de descricao */}
            <FloatingLabel
              controlId="floatingInputdescricao"
              label="Descrição"
              className="mb-5"
            >
              <Form.Control
                type="text"
                placeholder="Digite a descrição da tarefa"
                {...register("descricao", {
                  required: "A descricao é obrigatória",
                  minLength: {
                    value: 2,
                    message: "A descrição deve ter pelo menos 2 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "A descrição deve ter ate 20 caracteres",
                  },
                })}
              />
              {errors.descricao && (
                <p className="error">{errors.descricao.message}</p>
              )}
            </FloatingLabel>

            {/* Caixinha de autor */}
            <FloatingLabel
              controlId="floatingInputAutor"
              label="Setor"
              className="mb-5"
            >
              <Form.Control
                type="text"
                placeholder="Digite o setor dO setor"
                {...register("autor", {
                  required: "O setor é obrigatório",
                  minLength: {
                    value: 2,
                    message: "O setor deve ter pelo menos 2 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "O setor deve ter ate 20 caracteres",
                  },
                })}
              />
              {errors.autor && <p className="error">{errors.autor.message}</p>}
            </FloatingLabel>

            {/* Select de generos */}
            <FloatingLabel
              controlId="floatingSelectGeneros"
              label="Prioridade"
              className="mb-5"
            >
              <Form.Select
                {...register("genero", {
                  validate: (value) =>
                    value != "Nenhum" || "Escolha um genero ",
                })}
              >
                <option value="Baixa"> Baixa </option>
                <option value="Média"> Média </option>
                <option value="Alta"> Alta </option>
              </Form.Select>
              {errors.genero && (
                <p className="error">{errors.genero.message}</p>
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
              {errors.usuario && (
                <p className="error">{errors.usuario.message}</p>
              )}
            </FloatingLabel>
          </Col>
        </Row>
        {/* Botão para enviar o formulário de cadastro de livro */}
        <Button variant="primary" size="lg" type="submit">
          Cadastrar
        </Button>
      </Form>
    </div>
  );
};

export default CadastroTarefa;

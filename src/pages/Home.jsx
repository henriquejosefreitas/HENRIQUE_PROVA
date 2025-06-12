import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardTarefa from "../components/CardTarefa";

// Importando o hook useInserirusuario
import { useListaLivros } from "../hooks/useLivro";

const Home = () => {
  // Usando a funcao de buscar usuarios
  const livros = useListaLivros();

  return (
    <div>
      <Row>
        <Col>
          <h1>A Fazer</h1>
          {livros.map(
            (livro) =>
              livro.status === "A Fazer" && (
                <CardTarefa
                  key={livro.id}
                  id={livro.id}
                  descricao={livro.descricao}
                  setor={livro.setor}
                  prioridade={livro.prioridade}
                  status={livro.status}
                  usuario={livro.usuario}
                />
              )
          )}
        </Col>
        <Col xs={4}>
          <h1>Fazendo</h1>
          {livros.map(
            (livro) =>
              livro.status === "Fazendo" && (
                <CardTarefa
                  key={livro.id}
                  id={livro.id}
                  descricao={livro.descricao}
                  setor={livro.setor}
                  prioridade={livro.prioridade}
                  status={livro.status}
                  usuario={livro.usuario}
                />
              )
          )}
        </Col>
        <Col xs={4}>
          <h1>Pronto</h1>
          {livros.map(
            (livro) =>
              livro.status === "Pronto" && (
                <CardTarefa
                  key={livro.id}
                  id={livro.id}
                  descricao={livro.descricao}
                  setor={livro.setor}
                  prioridade={livro.prioridade}
                  status={livro.status}
                  usuario={livro.usuario}
                />
              )
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Home;

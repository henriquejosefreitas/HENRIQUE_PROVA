import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";


// Importando o hook useInserirusuario
import { useDeletaLivro } from "../hooks/useLivro";

const CardTarefa = (props) => {
  // importanto a funcao de deletar produto
  const { deletarLivro } = useDeletaLivro();

  // Funcao para requisitar a exclusao do produto
  const handleDelete = async () => {

    const deletado = await deletarLivro(props.id);
    alert(`Livro ${deletado.descricao} deletado com sucesso!`);
    window.location.reload(); // Atualiza a página após a exclusão
  };

  return (
    <Card border="primary" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Text>
          <b> Descrição:</b> <br /> {props.descricao}
        </Card.Text>
        <Card.Text>
          <b> Setor: </b> {props.setor}
        </Card.Text>
        <Card.Text>
          <b> Vinculado a: </b> {props.usuario}
        </Card.Text>
        <Card.Text>
          <b> Prioridade: </b> {props.prioridade}
        </Card.Text>
        <Button
          size="lg"
          variant="primary"
          type="button"
          href={`/editalivro/${props.id}`}
          className="me-3"
        >
          Editar
        </Button>
        <Button size="lg" variant="primary" type="button" onClick={handleDelete}>
          Excluir
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardTarefa;

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const NavBarra = () => {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/home">Gerenciador de Tarefas</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/cadastrausuario" className='active'>Cadastrar usuário</Nav.Link>
            <Nav.Link href="/cadastralivro" 
            className='active'>Cadastrar tarefas</Nav.Link>
            <Nav.Link href="/home" 
            className='active'>Gerenciar tarefas</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBarra
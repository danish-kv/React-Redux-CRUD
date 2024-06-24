import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {  Navigate, useNavigate } from 'react-router-dom';

function AdminNav({handleSearch}) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear();
    navigate('/adminlogin')
    
  };




  return (
    <Navbar className="bg-body-tertiary justify-content-between p-4">
        <Navbar.Brand>CRM</Navbar.Brand>
      
      <Form inline style={{paddingLeft : 1000}}>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
              onChange={handleSearch}
            />
          </Col>
        </Row>
      </Form>
      <Button onClick={handleLogout} variant="danger" >Logout</Button>
    </Navbar>
  );
}

export default AdminNav;
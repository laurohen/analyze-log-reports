import React, { useState } from 'react';
import axios from 'axios'; // Importando o Axios para facilitar o envio do arquivo
import { Container, Row, Col, Button, Form } from 'react-bootstrap'; // Importando componentes do react-bootstrap
import EquipmentInfo from './components/EquipmentInfo';
import MeasurementConfig from './components/MeasurementConfig';
import PreCalibrationData from './components/PreCalibrationData';
import RecordsList from './components/RecordsList';
import FooterTable from './components/FooterTable';
import PostCalibrationTable from './components/PostCalibrationTable';

function App() {
  const [data, setData] = useState({
    equipmentInfo: [],
    measurementConfig: {},
    preCalibrationData: {},
    records: [],
  });
  const [selectedFile, setSelectedFile] = useState(null);

 
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Por favor, selecione um arquivo primeiro.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('https://localhost:7090/api/Log/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Resposta da API:', response.data);
      
      setData(response.data);
    } catch (error) {
      console.error('Erro ao fazer upload do arquivo:', error);
    }
  };

  return (
    <Container className="py-4"> 
      <h1 className="mb-4 text-center">Upload e Visualização de Dados</h1>
      <Row className="mb-4 justify-content-center"> 
        <Col md={6}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Escolha um arquivo para enviar</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <Button variant="primary" onClick={handleUpload} block>
            Enviar
          </Button>
        </Col>
      </Row>

      {/* Componentes que receberão os dados atualizados após o upload */}
      <Row className="mb-4">
        <Col>
          <EquipmentInfo data={data} />
        </Col>
      </Row>

      {/* <MeasurementConfig data={data} /> */}
      <Row className="mb-4">
        <Col>
          <PreCalibrationData data={data} />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <PostCalibrationTable data={data} />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <RecordsList data={data} />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <FooterTable data={data} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;

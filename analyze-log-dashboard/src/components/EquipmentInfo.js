import React from 'react';
import { Table, Container } from 'react-bootstrap';

const EquipmentInfo = ({ data }) => {
  const equipmentData = data.equipmentData || {};

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Informações do Equipamento</h2>

      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>ID Equipamento</th>
            <th>Nome do Equipamento</th>
            <th>Número Serial</th>
            <th>Versão Firmware</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{equipmentData.equipmentID || '---'}</td>
            <td>{equipmentData.model || '---'}</td>
            <td>{equipmentData.serialNumber || '---'}</td>
            <td>{equipmentData.firmwareVersion || '---'}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default EquipmentInfo;

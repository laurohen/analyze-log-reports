// src/components/MeasurementConfig.js
import React from 'react';
import { Table } from 'react-bootstrap';

const MeasurementConfig = ({ data }) => {
  
  return (
    <div>
      <h2>Configurações da Medição</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Parâmetro</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data.measurementConfig).map(([param, value], index) => (
            <tr key={index}>
              <td>{param}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MeasurementConfig;

import React from 'react';
import { Table, Container } from 'react-bootstrap';

const PostCalibrationTable = ({ data }) => {
  const postCalibration = data.postCalibration || {};

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '---';
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Informações de Pós-Calibração</h2>
      
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Valor Pós-Calibração</th>
            <th>Data de Pós-Calibração</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{postCalibration.postCalibrationValue !== undefined ? postCalibration.postCalibrationValue : '---'}</td>
            <td>{formatTimestamp(postCalibration.postCalibrationTimestamp)}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default PostCalibrationTable;

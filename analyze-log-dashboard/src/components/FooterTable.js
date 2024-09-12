import React from 'react';
import { Table, Container } from 'react-bootstrap';

const FooterTable = ({ data }) => {
  const footer = data.footer || {};

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '---';
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Informações de Linha de Término</h2>
      
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Timestamp de Término</th>
            <th>Tempo Ativo (segundos)</th>
            <th>Tempo em Pausa (segundos)</th>
            <th>Valor Pós-Calibração</th>
            <th>Contagem de Picos Acima de 115dB</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formatTimestamp(footer.timestampEnd)}</td>
            <td>{footer.activeTime !== undefined ? footer.activeTime : '---'}</td>
            <td>{footer.pausedTime !== undefined ? footer.pausedTime : '---'}</td>
            <td>{footer.postCalibrationValue !== undefined ? footer.postCalibrationValue : '---'}</td>
            <td>{footer.peakCountAbove115dB !== undefined ? footer.peakCountAbove115dB : '---'}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default FooterTable;

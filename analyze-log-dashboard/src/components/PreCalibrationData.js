// src/components/PreCalibrationData.js
import React from 'react';
import { Table, Tooltip, OverlayTrigger } from 'react-bootstrap';
import './PreCalibrationData.css';

const PreCalibrationData = ({ data }) => {
  const preCalibration = data.preCalibrationData || {};

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '-';
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {props.children}
    </Tooltip>
  );

  return (
    <div className="pre-calibration-data">
      <h2>Informações de Pré-Calibração</h2>
      <Table striped bordered hover responsive className="custom-table">
        <thead>
          <tr>
            <th>Início da Dose</th>
            <th>Intervalo (s)</th>
            <th>Tipo de Curva de Peso</th>
            <th>Peso Temporal</th>
            <th>Tempo de Trabalho (s)</th>
            <th>Valor de Limite</th>
            <th>Valor do Critério</th>
            <th>Valor da Taxa de Dobro</th>
            <th>Curva de Pico de Frequência</th>
            <th>Data Pré-Calibração</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <OverlayTrigger
                placement="top"
                overlay={renderTooltip({ children: formatTimestamp(preCalibration.timestampStart) })}
              >
                <span>{formatTimestamp(preCalibration.timestampStart)}</span>
              </OverlayTrigger>
            </td>
            <td>{preCalibration.interval || '-'}</td>
            <td>{preCalibration.weightCurveType || '-'}</td>
            <td>{preCalibration.temporalWeight || '-'}</td>
            <td>{preCalibration.workTime || '-'}</td>
            <td>{preCalibration.thresholdValue || '-'}</td>
            <td>{preCalibration.criteriaValue || '-'}</td>
            <td>{preCalibration.doublingRateValue || '-'}</td>
            <td>{preCalibration.frequencyPeakCurve || '-'}</td>
            <td>
              <OverlayTrigger
                placement="top"
                overlay={renderTooltip({ children: formatTimestamp(preCalibration.preCalibrationTimestamp) })}
              >
                <span>{formatTimestamp(preCalibration.preCalibrationTimestamp)}</span>
              </OverlayTrigger>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default PreCalibrationData;

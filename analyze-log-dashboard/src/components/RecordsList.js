// src/components/RecordsList.js
import React from 'react';
import { Table, Tooltip, OverlayTrigger } from 'react-bootstrap';
import './RecordsList.css';

const RecordsList = ({ data }) => {
  const records = Array.isArray(data?.dataD) ? data.dataD : [];

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {props.children}
    </Tooltip>
  );

  return (
    <div className="records-list">
      <h2>Lista dos Registros com Indicação dos que Foram em Estado "Pausado"</h2>
      <Table striped bordered hover responsive className="custom-table">
        <thead>
          <tr>
            <th>Nível de SPL</th>
            <th>Dose NR15 (%)</th>
            <th>Dose NHO01 (%)</th>
            <th>Dose do Usuário (%)</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>
                <OverlayTrigger
                  placement="top"
                  overlay={renderTooltip({ children: record.spl })}
                >
                  <span>{record.spl}</span>
                </OverlayTrigger>
              </td>
              <td>
                <OverlayTrigger
                  placement="top"
                  overlay={renderTooltip({ children: (record.doseNR15).toFixed(2) + '%' })}
                >
                  <span>{(record.doseNR15).toFixed(2)}%</span>
                </OverlayTrigger>
              </td>
              <td>
                <OverlayTrigger
                  placement="top"
                  overlay={renderTooltip({ children: (record.doseNHO01).toFixed(2) + '%' })}
                >
                  <span>{(record.doseNHO01).toFixed(2)}%</span>
                </OverlayTrigger>
              </td>
              <td>
                <OverlayTrigger
                  placement="top"
                  overlay={renderTooltip({ children: (record.doseUser).toFixed(2) + '%' })}
                >
                  <span>{(record.doseUser).toFixed(2)}%</span>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RecordsList;

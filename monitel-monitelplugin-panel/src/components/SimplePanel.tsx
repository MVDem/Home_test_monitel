import React, { useEffect, useState } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const [field, setField] = useState('');
  const [viewData, setViewData] = useState<any[]>();
  const [viewLables, setViewLables] = useState<string[]>();

  useEffect(() => {
    transformData(data.series[0].fields);
  }, [data.series]);

  useEffect(() => {
    setField(options.sortField);
  }, [options.sortField]);

  useEffect(() => {
    if (viewData && viewData[0]) {
      if (typeof viewData![0]![field] === 'string') {
        const viewDataSorted = [...viewData];
        setViewData(
          viewDataSorted.sort((a, b) => {
            const nameA = a[field].toUpperCase();
            const nameB = b[field].toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          })
        );
      }
      if (typeof viewData![0][field] === 'number') {
        const viewDataSorted = [...viewData];
        setViewData(viewDataSorted.sort((a, b) => a[field] - b[field]));
      }
    }
  }, [field]); // eslint-disable-line react-hooks/exhaustive-deps

  //=====================================

  const transformData = (data: any) => {
    let newLablesArray = Array(data.length);
    let newDataArray = Array(data[0].values.length);

    for (let j = 0; j < data[0].values.length; j++) {
      newDataArray[j] = {};
    }

    for (let i = 0; i < data.length; i++) {
      let label: string = data[i].name;
      newLablesArray[i] = label;
      for (let j = 0; j < data[0].values.length; j++) {
        newDataArray[j][label] = data[i].values[j];
      }
    }
    setViewData(newDataArray);
    setViewLables(newLablesArray);
  };

  //===============================

  return (
    <div style={{ overflow: 'auto', width, height, display: 'flex' }}>
      {data.series.map((frame, i) => {
        return (
          <table key={i} style={{ width: '100%' }}>
            <thead>
              <tr>
                {viewLables?.map((field, i) => {
                  return <th key={i}>{field}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {viewData?.map((elem, i) => {
                return (
                  <tr key={i}>
                    {viewLables?.map((e, i) => {
                      return <td key={i}>{elem[e]}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      })}
    </div>
  );
};

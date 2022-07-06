import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import './index.css';
import Main from './components/Main';
import { render } from 'react-dom';

const rootElement = document.getElementById('root');

function getElements(arr, filteredIds = []) {
  const nodes = [];
  const edges = [];

  function reducer(arr) {
    arr.forEach(item => {
      nodes.push(
        {
          id: item.id,
          type: "special",
          data: {
            ...item.data,
            collapse: filteredIds.some(filtredId => item.id === filtredId),
            isDontHaveTarget:
              !item.subordinates?.length,
            isNotTarget: item.data.isNotTarget,
          }
        })

      if (item.subordinates?.length && !filteredIds.some(filtredId => item.id === filtredId)) {
        item.subordinates.forEach(subItem => {
          edges.push(
            {
              id: `${item.id}_${subItem.id}`,
              type: "step",
              source: item.id,
              target: subItem.id
            })
        })
        reducer(item.subordinates)
      }
    })
  }
  reducer(arr)
  return ({ nodes, edges })
}

render(
  <React.StrictMode>
    <Main getElements={getElements} />
  </React.StrictMode>,
  rootElement
);


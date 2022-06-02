import React, { useState, useEffect } from "react";
import styles from "./Main.module.sass";
import ReactFlow, { Controls } from "react-flow-renderer";
import CustomNode from "../CustomNode";

function Main() {

  const connectionLineStyle = { stroke: "#b1b1b7" };
  const defaultOffset = 5
  const defaultSize = { x: 240, y: 64 }
  const [nodes, setNodes] = useState([
    {
      data: {
        avatar: 'https://lawyer-bulgaria.bg/wp-content/uploads/2015/11/lawyer1-300x300.jpg',
        name: 'Игорь',
        middleName: 'Александрович',
        surname: 'Фамилин',
        position: 'Ген. директор',
        type: 'owner',
        hasSubordinates: true
      },
      id: '1',
      position: { x: defaultSize.x * 0 / 2 + defaultOffset, y: defaultSize.y * 0 },
      type: 'special'
    },
    {
      data: {
        avatar: 'https://lawyer-bulgaria.bg/wp-content/uploads/2015/11/lawyer2-300x300.jpg',
        name: 'Имя',
        middleName: 'Отчество',
        surname: 'Фамилия',
        position: 'Начальник отдела продаж',
        hasSubordinates: true,
      },
      id: '2',
      position: { x: defaultSize.x * 1 / 2 + defaultOffset * 5, y: (defaultSize.y * 1) + defaultSize.y / 2 + defaultOffset },
      type: 'special'
    },
    {
      data: {
        avatar: 'https://lawyer-bulgaria.bg/wp-content/uploads/2015/11/lawyer3-300x300.jpg',
        name: 'Имя',
        middleName: 'Отчество',
        surname: 'Фамилия',
        position: 'Менеджер',
        hasSubordinates: false,
      },
      id: '3',
      position: { x: defaultSize.x * 2 / 2 + defaultOffset * 8, y: defaultSize.y * 3 + defaultOffset },
      type: 'special'
    },
    {
      data: {
        avatar: 'https://lawyer-bulgaria.bg/wp-content/uploads/2015/11/lawyer4-300x300.jpg',
        name: 'Имя',
        middleName: 'Отчество',
        surname: 'Фамилия',
        position: 'Менеджер',
        hasSubordinates: false,
      },
      id: '4',
      position: { x: defaultSize.x * 2 / 2 + defaultOffset * 8, y: defaultSize.y * 4.5 + defaultOffset },
      type: 'special'
    },

    {
      data: {
        avatar: 'https://lawyer-bulgaria.bg/wp-content/uploads/2015/11/lawyer5-300x300.jpg',
        name: 'Имя',
        middleName: 'Отчество',
        surname: 'Фамилия',
        position: 'Начальник отдела закупок',
        hasSubordinates: true,
      },
      id: '5',
      position: { x: defaultSize.x * 1 / 2 + defaultOffset * 5, y: (defaultSize.y * 1) + defaultSize.y * 10 / 2 + defaultOffset },
      type: 'special'
    },
    {
      data: {
        avatar: 'https://lawyer-bulgaria.bg/wp-content/uploads/2015/11/lawyer6-300x300.jpg',
        name: 'Имя',
        middleName: 'Отчество',
        surname: 'Фамилия',
        position: 'Менеджер',
        hasSubordinates: false,
      },
      id: '6',
      position: { x: defaultSize.x * 2 / 2 + defaultOffset * 8, y: defaultSize.y * 7.5 + defaultOffset },
      type: 'special'
    },
    {
      data: {
        avatar: 'https://lawyer-bulgaria.bg/wp-content/uploads/2015/11/lawyer7-300x300.jpg',
        name: 'Имя',
        middleName: 'Отчество',
        surname: 'Фамилия',
        position: 'Менеджер',
        hasSubordinates: false,
      },
      id: '7',
      position: { x: defaultSize.x * 2 / 2 + defaultOffset * 8, y: defaultSize.y * 9 + defaultOffset },
      type: 'special'
    },
    {
      data: {
        avatar: 'https://lawyer-bulgaria.bg/wp-content/uploads/2015/11/lawyer8-300x300.jpg',
        name: 'Имя',
        middleName: 'Отчество',
        surname: 'Фамилия',
        position: 'Менеджер',
        hasSubordinates: true,
      },
      id: '8',
      position: { x: defaultSize.x * 2 / 2 + defaultOffset * 8, y: defaultSize.y * 10.5 + defaultOffset },
      type: 'special'
    },
    {
      data: {
        avatar: 'https://lawyer-bulgaria.bg/wp-content/uploads/2015/11/lawyer9-300x300.jpg',
        name: 'Имя',
        middleName: 'Отчество',
        surname: 'Фамилия',
        position: 'Менеджер-стажер',
        hasSubordinates: false,
      },
      id: '9',
      position: { x: defaultSize.x * 3 / 2 + defaultOffset * 11, y: defaultSize.y * 12 + defaultOffset },
      type: 'special'
    },
    {
      data: {
        avatar: 'https://lawyer-bulgaria.bg/wp-content/uploads/2015/11/lawyer2-300x300.jpg',
        name: 'Имя',
        middleName: 'Отчество',
        surname: 'Фамилия',
        position: 'Менеджер',
        hasSubordinates: false,
      },
      id: '10',
      position: { x: defaultSize.x * 2 / 2 + defaultOffset * 8, y: defaultSize.y * 13.5 + defaultOffset },
      type: 'special'
    },
    {
      data: {
        avatar: 'https://lawyer-bulgaria.bg/wp-content/uploads/2015/11/lawyer1-300x300.jpg',
        name: 'Имя',
        middleName: 'Отчество',
        surname: 'Фамилия',
        position: 'Менеджер',
        hasSubordinates: false,
      },
      id: '11',
      position: { x: defaultSize.x * 2 / 2 + defaultOffset * 8, y: defaultSize.y * 15 + defaultOffset },
      type: 'special'
    },
  ]);
  const [edges, setEdges] = useState([{ id: "line_1_2", source: "1", style: { strokeWidth: 2 }, target: "2", type: "step" }, { id: "line2_3", source: "2", style: { strokeWidth: 2 }, target: "3", type: "step" }, { id: "line2_4", source: "2", style: { strokeWidth: 2 }, target: "4", type: "step" }, { id: "line1_5", source: "1", style: { strokeWidth: 2 }, target: "5", type: "step" }, { id: "line5_6", source: "5", style: { strokeWidth: 2 }, target: "6", type: "step" }, { id: "line5_7", source: "5", style: { strokeWidth: 2 }, target: "7", type: "step" }, { id: "line5_8", source: "5", style: { strokeWidth: 2 }, target: "8", type: "step" }, { id: "line8_9", source: "8", style: { strokeWidth: 2 }, target: "9", type: "step" }, { id: "line5_10", source: "5", style: { strokeWidth: 2 }, target: "10", type: "step" }, { id: "line5_11", source: "5", style: { strokeWidth: 2 }, target: "11", type: "step" }])

  const nodeTypes = {
    special: CustomNode
  };

  useEffect(() => {

    document.querySelector('#debug').innerHTML += ' scriptLoaded; '
    document.querySelectorAll('style').forEach(tag => document.querySelector('#debug').innerHTML += `style- ${tag.getAttribute('data-id')}: loaded;`)
    document.querySelector('#debug').ondblclick = () => document.querySelector('#debug').remove()

    document.querySelector('#debug').innerHTML += ` reactLoaded; usersData= ${nodes}; users length: ${nodes.length};  rootHeight:${document.querySelector('#root').clientHeight}; rootHeight:${document.querySelector('#root').clientHeight}; rootWidth:${document.querySelector('#root').clientWidth};`
    document.querySelector('#debug').onclick = () => document.querySelector('#debug').innerHTML += ` rootHeight_afterRender:${document.querySelector('#root').clientHeight}; rootWidth_afterRender:${document.querySelector('#root').clientWidth}`
  }, [])

  return (
    <div className={styles.wrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        connectionLineStyle={connectionLineStyle}
        snapToGrid={true}
        defaultZoom={1}
        nodeTypes={nodeTypes}
        zoomOnDoubleClick={false}
        className={styles.flowArea}
        fitView
        panOnScroll={true}
        panOnScrollMode={'vertical'}
        translateExtent={[
          [-500, -500],
          [Infinity, Infinity]
        ]}
        minZoom={0.5}
      >
        <Controls showInteractive={false} />
      </ReactFlow>
    </div >
  );
}

export default Main;
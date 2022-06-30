import React, { useState, useEffect, useCallback } from "react";
import styles from "./Main.module.sass";
import ReactFlow, { Controls } from "react-flow-renderer";
import CustomNode from "../CustomNode";
import dagre from 'dagre';


function Main() {

  const [direction, setDirection] = useState('LR')

  const connectionLineStyle = { stroke: "#b1b1b7" };
  const [nodes, setNodes] = useState(document.userNodes || []);
  const [edges, setEdges] = useState(document.userEdges || [])

  const nodeTypes = {
    special: CustomNode
  };

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 300;
  const nodeHeight = 50;


  const getLayoutedElements = (nodes, edges, direction) => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = isHorizontal ? 'left' : 'top';
      node.sourcePosition = isHorizontal ? 'right' : 'bottom';

      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2 + 10,
        y: nodeWithPosition.y - nodeHeight / 2 + 10,
      };

      return node;
    });

    return { nodes, edges };
  };

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    nodes,
    edges,
    direction
  );

  const onLayout = (direction) => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges,
      direction
    );

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);

  }

  useEffect(() => {
    setNodes(getLayoutedElements(nodes, edges, direction).nodes)
    setEdges(getLayoutedElements(nodes, edges, direction).edges)
  }, [direction])



  return (
    <div className={styles.wrapper}>
      <ReactFlow
        elements={[...nodes, ...edges]}
        connectionLineStyle={connectionLineStyle}
        snapToGrid={true}
        defaultZoom={1}
        nodeTypes={nodeTypes}
        zoomOnDoubleClick={false}
        className={styles.flowArea}
        panOnScroll={true}
        panOnScrollMode={'vertical'}
        translateExtent={[
          [-500, -500],
          [Infinity, Infinity]
        ]}
        minZoom={0.5}
        maxZoom={1.5}
      >
        <Controls showInteractive={false} showFitView={false} />


      </ReactFlow>
      <div className="controls" style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 10 }}>
        <button onClick={() => setDirection('TB')}>vertical layout</button>
        <button onClick={() => setDirection('LR')}>horizontal layout</button>
      </div>
    </div >
  );
}

export default Main;
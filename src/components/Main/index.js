import React, { useState, useEffect } from "react";
import styles from "./Main.module.sass";
import ReactFlow, {
  Controls, useZoomPanHelper,
  ReactFlowProvider,
} from "react-flow-renderer";
import CustomNode from "../CustomNode";
import SortButton from '../SortButton'
import dagre from 'dagre';


function Main() {

  const [direction, setDirection] = useState('LR')

  const connectionLineStyle = { stroke: "#b1b1b7" };
  const initialNodes = document.userNodes;
  const initialEdges = document.userEdges
  const [nodes, setNodes] = useState(initialNodes || []);
  const [edges, setEdges] = useState(initialEdges || [])

  const nodeTypes = {
    special: CustomNode
  };

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 300;
  const nodeHeight = 50;


  const getLayoutedElements = (nodes, edges, direction) => {
    const isHorizontal = direction === 'LR' || direction === 'RL';
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
      node.targetPosition = isHorizontal ? direction === 'RL' ? 'right' : 'left' : direction === 'BT' ? 'bottom' : 'top';
      node.sourcePosition = isHorizontal ? direction === 'RL' ? 'left' : 'right' : direction === 'BT' ? 'top' : 'bottom';
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };

      return node;
    });

    return { nodes, edges };
  };

  getLayoutedElements(
    nodes,
    edges,
    direction
  );

  const UseZoomPanHelperFlow = () => {
    const { project, setCenter, zoomIn, zoomOut, fitView } = useZoomPanHelper();

    useEffect(() => {

      setNodes(getLayoutedElements(nodes, edges, direction).nodes)
      setEdges(getLayoutedElements(nodes, edges, direction).edges)
      fitView()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [direction])

    return (

      <ReactFlow
        elements={[...nodes, ...edges]}
        connectionLineStyle={connectionLineStyle}
        snapToGrid={true}
        defaultZoom={1}
        nodeTypes={nodeTypes}
        zoomOnDoubleClick={false}
        className={styles.flowArea}
        panOnScroll={true}
        onLoad={fitView}
        panOnScrollMode={'vertical'}
        translateExtent={[
          [-Infinity, -Infinity],
          [Infinity, Infinity]
        ]}
        minZoom={0.1}
        maxZoom={1.5}
      >
        <Controls showInteractive={false} showFitView={true}>
          <SortButton direction={direction} setDirection={setDirection} />
        </Controls>
      </ReactFlow>
    );
  };


  return (
    <div className={styles.wrapper}>
      <ReactFlowProvider>
        <UseZoomPanHelperFlow />
      </ReactFlowProvider>

    </div >
  );
}

export default Main;
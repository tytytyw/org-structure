import React, { useState, useEffect } from "react";
import styles from "./Main.module.sass";
import ReactFlow, {
  Controls, useZoomPanHelper,
  ReactFlowProvider, isNode
} from "react-flow-renderer";
import CustomNode from "../CustomNode";
import SortButton from '../SortButton'
import dagre from 'dagre';


function Main({ getElements }) {
  const initialElements = document.userNodes;
  const [collapsedElements, setCollapsedElements] = useState([])

  const [direction, setDirection] = useState('LR')
  const connectionLineStyle = { stroke: "#b1b1b7" };
  const [nodes, setNodes] = useState(getElements(initialElements, collapsedElements).nodes || []);
  const [edges, setEdges] = useState(getElements(initialElements, collapsedElements).edges || []);
  const [defaultZoom, setDefaultZoom] = useState(.5);
  const [defaultPosition, setDefaultPosition] = useState([50, 50]);
  const [showLoader, setShowLoader] = useState(true)

  const nodeTypes = {
    special: CustomNode
  };

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 300;
  const nodeHeight = 50;

  const onElementClick = (e, element) => {
    let filterIds = collapsedElements;
    if (isNode(element)) {
      if (collapsedElements.some(el => el === element.id)) {
        filterIds = collapsedElements.filter(el => el !== element.id)
      } else {
        filterIds = [...filterIds, element.id]
      }
      const { nodes, edges } = getElements(initialElements, filterIds)
      setCollapsedElements(filterIds)
      setNodes(nodes)
      setEdges(edges)
    }
  }

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
      node.setNodes = setNodes

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
    const { fitView } = useZoomPanHelper();

    const onLoad = (reactFlowInstance) => {
      fitView()
      setTimeout(() => {
        fitView()
        setTimeout(() => {

          const { position, zoom } = reactFlowInstance.toObject()
          setShowLoader(false)

          if ((position[0] === defaultPosition[0] || position[1] === defaultPosition[1]) && (zoom[0] === defaultZoom[0] || zoom[1] === defaultZoom[1])) return false

          setDefaultZoom(zoom)
          setDefaultPosition(position)
        }, 200);
      }, 100);
    }


    useEffect(() => {
      setNodes(getLayoutedElements(nodes, edges, direction).nodes)
      setEdges(getLayoutedElements(nodes, edges, direction).edges)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [direction])

    return (
      <ReactFlow
        elements={[...nodes, ...edges]}
        connectionLineStyle={connectionLineStyle}
        snapToGrid={true}
        defaultPosition={defaultPosition}
        nodeTypes={nodeTypes}
        zoomOnDoubleClick={false}
        className={styles.flowArea}
        panOnScroll={true}
        onLoad={onLoad}
        panOnScrollMode={'vertical'}
        translateExtent={[
          [-Infinity, -Infinity],
          [Infinity, Infinity]
        ]}
        minZoom={0.1}
        maxZoom={1.5}
        defaultZoom={defaultZoom}
        style={{ cursor: 'default' }}
        onElementClick={onElementClick}
        elementsSelectable={false}
        nodesDraggable={false}
        nodesConnectable={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        onlyRenderVisibleElements={true}
      >
        <Controls showInteractive={false} showFitView={true}>
          <SortButton direction={direction} setDirection={setDirection} setShowLoader={setShowLoader} />
        </Controls>
      </ReactFlow>
    );
  };

  return (
    <div className={styles.wrapper}>
      {showLoader ? <div className={styles.loader}></div> : null}
      <ReactFlowProvider>
        <UseZoomPanHelperFlow />
      </ReactFlowProvider>

    </div >
  );
}

export default Main;
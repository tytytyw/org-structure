import React, { useState, useEffect } from "react";
import styles from "./Main.module.sass";
import ReactFlow, {
  Controls, useZoomPanHelper,
  ReactFlowProvider, isNode
} from "react-flow-renderer";
import CustomNode from "../CustomNode";
import SortButton from '../SortButton'
import dagre from 'dagre';

let viewParams = { x: null, y: null, zoom: .5 };
let fitView = () => { }



function Main({ getElements }) {
  const initialElements = document.userNodes;
  const [collapsedElements, setCollapsedElements] = useState([])

  const [direction, setDirection] = useState('LR')
  const connectionLineStyle = { stroke: "#b1b1b7" };
  const elements = getElements(initialElements, collapsedElements);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const nodeTypes = {
    special: CustomNode
  };

  const onMoveEnd = (params) => viewParams = params

  const dagreGraph = new dagre.graphlib.Graph({});
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 300;
  const nodeHeight = direction === 'LR' || direction === 'RL' ? 50 : 100;

  const onElementClick = (e, element) => {
    let filterIds = collapsedElements;
    if (isNode(element) && (e.target.className.includes('handle') || e.target.parentElement?.className.includes('handle'))) {
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


  useEffect(() => {
    fitView()
    setTimeout(() => {
      fitView()
    }, 500);
  }, [direction])

  const getLayoutedElements = (nodes, edges, direction) => {
    const isHorizontal = direction === 'LR' || direction === 'RL';
    dagreGraph.setGraph({ rankdir: direction, ranker: 'network-simplex' });

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

  useEffect(() => {
    setNodes(elements.nodes)
    setEdges(elements.edges)
  }, [])

  const UseZoomPanHelperFlow = () => {
    fitView = useZoomPanHelper().fitView

    const onLoad = (reactFlowInstance) => {
      setTimeout(() => {
        const { position, zoom } = reactFlowInstance.toObject();
        if (position[0] === viewParams.x && position[1] === viewParams.y && zoom === viewParams.zoom) {
          return false
        } else {
          viewParams.x = position[0]
          viewParams.y = position[1]
          viewParams.zoom = zoom
        }
      }, 500)
    }


    return (
      <ReactFlow
        elements={[...nodes, ...edges]}
        connectionLineStyle={connectionLineStyle}
        snapToGrid={false}
        defaultPosition={[viewParams.x||0, viewParams.y||0]}
        nodeTypes={nodeTypes}
        zoomOnDoubleClick={false}
        className={styles.flowArea}
        panOnScroll={false}
        onLoad={onLoad}
        zoomOnScroll={true}
        translateExtent={[
          [-Infinity, -Infinity],
          [Infinity, Infinity]
        ]}
        minZoom={0.1}
        maxZoom={1.5}
        defaultZoom={viewParams.zoom}
        onElementClick={onElementClick}
        elementsSelectable={false}
        nodesDraggable={false}
        nodesConnectable={false}
        zoomOnPinch={false}
        onlyRenderVisibleElements={true}
        onMoveEnd={onMoveEnd}
      >
        <div>
          <Controls showInteractive={false} showFitView={true} >
            <SortButton direction={direction} setDirection={setDirection} />
          </Controls>
        </div>
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
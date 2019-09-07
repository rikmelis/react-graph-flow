import React from 'react';
import './Diagram.scss';

export default class Diagram extends React.Component {
  constructor(props) {
    super(props);

    this.nodeRefs = [];
    this.edgeLabelRefs = [];
    this.nodeLabelRefs = [];
  }

  componentDidMount() {
    const {
      nodes,
      edges,
    } = this.props.graph;

    this.nodeRefs.forEach((r, index) => {
      nodes[index].width = r.getBoundingClientRect().width;
      nodes[index].height = r.getBoundingClientRect().height;
    });
    this.edgeLabelRefs.forEach((r, index) => {
      edges[index].edgeLabelHeight = r.getBoundingClientRect().height;
    });
    this.nodeLabelRefs.forEach((r, index) => {
      nodes[index].labelWidth = r.getBoundingClientRect().width;
    });
    this.forceUpdate();
  }

  render() {
    const {
      graph,
      graphProps,
      nodeProps,
      edgeProps,
      children,
    } = this.props;

    const {
      nodes,
      edges,
      width,
      height,
    } = graph;

    return (
      <div
        className={'diagram'}
        style={{width: `${width}px`, height: `${height}px`}}
        {...graphProps}
        >
        {children}
        {nodes.map((node, index) => 
          <div
            key={`node-${index}`}
            className={'node'}
            ref={r => this.nodeRefs[index] = r}
            style={node.getStyle()}
            {...nodeProps(node)}
            >
            {node.text}
            {node.showId && <div className={'index'}>{node.id + 1}</div>}
            {node.label && 
              <div
                className={'label'} 
                ref={r => this.nodeLabelRefs[index] = r}
                style={node.getLabelStyle()}
                >
                  {node.label}
              </div>
            }
          </div>
        )}
        <svg width={width} height={height}>
          {edges.map((edge, index) => {
            const x1 = edge.getX1();
            const y1 = edge.getY1();
            const x2 = edge.getX2();
            const y2 = edge.getY2();
            const arrowOffset = edge.directionX() === 'left' ? 15 : -15;
            return [
              <path
                key={`edge-${index}`}
                className={'edge'}
                d={`M ${x1} ${y1} C ${x1} ${y2}, ${x1} ${y2}, ${x2} ${y2}`}
                style={edge.getStyle()}
                {...edgeProps(edge)}
              />,
              <path
                key={`arrow-${index}`}
                d={`M ${x2 - arrowOffset} ${y2} L ${x2} ${y2 + arrowOffset} L ${x2} ${y2 - arrowOffset} Z`}
                style={edge.getArrowStyle()}
                {...edgeProps(edge)}
              />
            ];
          })}
        </svg>
        {edges.filter(edge => edge.label).map((edge, index) =>
          <div
            key={`edge-label-${index}`}
            className={'edge-label'}
            style={edge.getLabelStyle()}
            >
            <div
              className={'label-box'}
              ref={r => this.edgeLabelRefs[index] = r}
              style={edge.getLabelBoxStyle()}
              {...edgeProps(edge)}
              >
              {edge.label}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Diagram.defaultProps = {
  graphProps: () => {},
  nodeProps: () => {},
  edgeProps: () => {},
};

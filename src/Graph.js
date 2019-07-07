import React from 'react';
import './Graph.scss';

const isMobile = 'ontouchstart' in document.documentElement;

export default class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.nodeRefs = [];
    this.edgeLabelRefs = [];
    this.nodeLabelRefs = [];

    this.state = {
      prevNode: null,
    };
  }

  componentDidMount() {
    this.nodeRefs.forEach((r, index) => {
      this.props.nodes[index].width = r.getBoundingClientRect().width;
      this.props.nodes[index].height = r.getBoundingClientRect().height;
    });
    this.edgeLabelRefs.forEach((r, index) => {
      this.props.edges[index].edgeLabelHeight = r.getBoundingClientRect().height;
    });
    this.nodeLabelRefs.forEach((r, index) => {
      this.props.nodes[index].labelWidth = r.getBoundingClientRect().width;
    });
    this.forceUpdate();
  }

  componentWillUnmount() {
    if (this.state.prevNode) {
      this.state.prevNode.unhighlight();
    }
  }

  onActivate(node) {
    if (isMobile) {
      return {
        onClick: () => {
          if (this.state.prevNode) {
            this.state.prevNode.unhighlight();
          }
          node.highlight();
          this.setState({prevNode: node});
        }
      }
    } else {
      return {
        onMouseEnter: () => {
          node.highlight();
          this.forceUpdate();
        },
        onMouseLeave: () => {
          node.unhighlight();
          this.forceUpdate();
        },
      }
    }
  }

  render() {
    const {
      width,
      height,
      nodes,
      edges,
      children,
    } = this.props;

    return (
      <div className={'graph'} style={{width: `${width}px`, height: `${height}px`}}>
        {children}
        {nodes.map((node, index) => 
          <div
            key={`node-${index}`}
            className={'node'}
            ref={r => this.nodeRefs[index] = r}
            style={node.getStyle()}
            {...this.onActivate(node)}
            >
            {node.text}
            {node.id && <div className={'index'}>{node.id}</div>}
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
            const arrowOffset = edge.isLeftEdge() ? 15 : -15;
            return [
              <path
                key={`edge-${index}`}
                className={'edge'}
                d={`M ${x1} ${y1} C ${x1} ${y2}, ${x1} ${y2}, ${x2} ${y2}`}
                style={edge.getStyle()}
                {...this.onActivate(edge.to)}
              />,
              <path
                key={`arrow-${index}`}
                d={`M ${x2 - arrowOffset} ${y2} L ${x2} ${y2 + arrowOffset} L ${x2} ${y2 - arrowOffset} Z`}
                style={edge.getArrowStyle()}
                {...this.onActivate(edge.to)}
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
              {...this.onActivate(edge.to)}
              >
              {edge.label}
            </div>
          </div>
        )}
      </div>
    );
  }
}
import Node from './Node';
import Edge from './Edge';

export default class Graph {
  constructor(nodes, edges, width=800, height=800) {
  	this.nodes = nodes;
  	this.edges = edges;
  	this.width = width;
  	this.height = height;

  	this.nodes.forEach((n, index) => n.id = index);
  }

  serialize() {
  	return {
  		width: this.width,
  		height: this.height,
  		nodes: this.nodes.map(n => n.serialize()),
  		edges: this.edges.map(e => e.serialize()),
  	};
  }

  static deserialize(object) {
    const {
      width,
      height,
    } = object;

    const nodes = object.nodes.map(node => {
      const newNode = new Node(node.text, node.x, node.y, node.width, node.height, node.color, node.label, node.style);
      newNode.showId = node.showId;
      return newNode;
    })
    const edges = object.edges.map(edge =>
      new Edge(nodes[edge.from], nodes[edge.to], edge.color, edge.label)
    )

    return new Graph(nodes, edges, width, height);
  }
}

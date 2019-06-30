export default class Edge {
	constructor(fromNode, toNode, color, label) {
		this.from = fromNode;
		this.to = toNode;
		this.color = color;
		this.label = label;
    this.edgeLabelHeight = 18;

		this.to.parent = this.from;
	}

  isLeftEdge() {
    return this.from.x > this.to.x;
  }

  getX1() {
    return this.from.x - 10 + (this.isLeftEdge() ? 0 : 20);
  }

  getY1() {
    return this.from.y + this.from.height / 2 + 5;
  }

  getX2() {
    return this.isLeftEdge() ? this.to.x + this.to.width / 2 + 20 : this.to.x - this.to.width / 2 - 20;
  }

  getY2() {
    return this.to.y;
  }

  getStyle() {
    return {stroke: this.color, opacity: this.to.highlighted ? 1.0 : 0.4};
  }

  getArrowStyle() {
    return {fill: this.color, opacity: this.to.highlighted ? 1.0 : 0.4};
  }

  getLabelStyle() {
    return {
      top: `${(this.getY1() + this.getY2()) / 2}px`,
      left: `${this.getX1()}px`,
      opacity: this.to.highlighted ? 1.0 : 0.4,
    };
  }

  getLabelBoxStyle() {
    const style = {
      top: `-${this.edgeLabelHeight / 2}px`,
    };
    if (this.isLeftEdge()) {
      return {
        ...style,
        right: '20px',
      }
    } else {
      return {
        ...style,
        left: '20px',
      }
    }
  }
}
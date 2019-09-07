export default class Edge {
	constructor(fromNode, toNode, color, label) {
		this.from = fromNode;
		this.to = toNode;
		this.color = color;
		this.label = label;
    this.edgeLabelHeight = 18;

		this.to.parent = this.from;
	}

  directionX() {
    if (this.to.x - this.to.width / 2 - this.from.x > 40) {
      return 'right';
    } else if (this.from.x - (this.to.x + this.to.width / 2) > 40) {
      return 'left';
    } else {
      return 'straight';
    }
  }

  directionY() {
    if (this.to.y - (this.from.y  + this.from.height / 2) > 20) {
      return 'down';
    } else if (this.from.y - this.from.height / 2 - this.to.y > 20) {
      return 'up';
    } else {
      return 'straight';
    }
  }

  overlapAverageX() {
    const minX = Math.max(this.from.x - this.from.width / 2, this.to.x - this.to.width / 2);
    const maxX = Math.min(this.from.x + this.from.width / 2, this.to.x + this.to.width / 2);
    return (minX + maxX) / 2;
  }

  getX1() {
    switch(this.directionX()) {
      case 'straight':
        return this.overlapAverageX();
      case 'right':
        if (this.directionY() === 'straight') {
          return this.from.x + this.from.width / 2 + 10;
        } else {
          return this.from.x + 10;
        }
      case 'left':
        if (this.directionY() === 'straight') {
          return this.from.x - this.from.width / 2 - 10;
        } else {
          return this.from.x - 10;
        }
    }
  }

  getY1() {
    switch(this.directionY()) {
      case 'down':
        return this.from.y + this.from.height / 2 + 5;
      case 'up':
        return this.from.y - this.from.height / 2 - 5;
      case 'straight':
        return this.from.y;
    }
  }

  getX2() {
    switch(this.directionX()) {
      case 'straight':
        return this.overlapAverageX();
      case 'right':
        return this.to.x - this.to.width / 2 - 20;
      case 'left':
        return this.to.x + this.to.width / 2 + 20;
    }
  }

  getY2() {
    if (this.directionX() === 'straight') {
      if (this.directionY() === 'down') {
        return this.to.y - this.to.height / 2;
      } else {
        return this.to.y + this.to.height / 2;
      }
    } else if (this.directionY() === 'straight') {
      return this.from.y;
    } else {
      return this.to.y;
    }
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
    if (this.directionX() === 'left') {
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

  serialize() {
    return {
      from: this.from.id,
      to: this.to.id,
      color: this.color,
      label: this.label,
    };
  }
}
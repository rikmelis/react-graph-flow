export default class Node {
  constructor(text, x, y, color, label, style={}) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.width = 0;
    this.height = 0;
    this.color = color;
    this.label = label;
    this.style = style;
    this.id = null;
    this.showId = false;
    this.labelWidth = 0;
    this.highlighted = false;
  }

  highlight() {
    this.highlighted = true;
    if (this.parent) {
      this.parent.highlight();
    }
  }

  unhighlight() {
    this.highlighted = false;
    if (this.parent) {
      this.parent.unhighlight();
    }
  }

  getColor() {
    return this.color || 'gray';
  }

  getStyle() {
    return {
      left: `${this.x - this.width / 2}px`,
      top: `${this.y - this.height / 2}px`,
      opacity: this.highlighted ? 1.0 : 0.4,
      backgroundColor: this.getColor(),
      ...this.style,
    };
  }

  getLabelStyle() {
    return {
      opacity: this.highlighted ? 1.0 : 0.4,
      color: this.getColor(),
      top: `${this.height + 5}px`,
      left: `${(this.width - this.labelWidth) / 2}px`,
    }
  }

  serialize() {
    return {
      text: this.text,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      color: this.color,
      label: this.label,
      style: this.style,
      id: this.id,
      showId: this.showId,
    };
  }
}

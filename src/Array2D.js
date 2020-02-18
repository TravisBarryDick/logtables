export class Array2D {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.data = new Array(height*width)
  }

  index(y, x) {
    return y + x * this.height
  }

  set(y, x, value) {
    this.data[this.index(y,x)] = value;
  }

  get(y, x) {
    return this.data[this.index(y,x)]
  }

  fill(value) {
    this.data.fill(value)
  }
}

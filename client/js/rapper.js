module.exports = Rapper

function Rapper (data) {
  data = data || {}
  this.color = data.color || randomColor()
  this.x = 0
  this.y = 0
  this.element = document.createElement('video')
  Object.assign(this.element.style, {
    width: '164px',
    height: '164px',
    position: 'absolute',
    top: '0px',
    left: '0px',
    backgroundColor: this.color
  })
  document.body.appendChild(this.element)
}

Rapper.prototype.addStream = function (stream) {
  this.element.srcObject = stream
  this.element.play()
}

Rapper.prototype.update = function (data) {
  data = data || {}
  this.x = data.x || this.x
  this.y = data.y || this.y
  Object.assign(this.element.style, {
    top: this.y + 'px',
    left: this.x + 'px'
  })
}

function randomColor () {
  return '#' + Math.random().toString(16).substr(-6)
}

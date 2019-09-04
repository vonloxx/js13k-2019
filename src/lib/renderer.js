import textRenderer from './text-renderer';

export default ({context, postContext}) => {
  context.mozImageSmoothingEnabled = false;
  context.webkitImageSmoothingEnabled = false;
  context.msImageSmoothingEnabled = false;
  context.imageSmoothingEnabled = false;

  return {
    rect(x, y, width, height, style = {}) {
      context.fillStyle = style.fill || '#e0e0e0';
      context.fillRect(x, y, width, height);
    },

    text(text, x, y, style) {
      if (style.stroke) {
        context.fillStyle = '#000';
        textRenderer.fillText(context, x - style.stroke, y - style.stroke, text, style.size || 3.0);
        textRenderer.fillText(context, x, y - style.stroke, text, style.size || 3.0);
        textRenderer.fillText(context, x + style.stroke, y - style.stroke, text, style.size || 3.0);
        textRenderer.fillText(context, x - style.stroke, y, text, style.size || 3.0);
        textRenderer.fillText(context, x, y, text, style.size || 3.0);
        textRenderer.fillText(context, x + style.stroke, y, text, style.size || 3.0);
        textRenderer.fillText(context, x - style.stroke, y + style.stroke, text, style.size || 3.0);
        textRenderer.fillText(context, x, y + style.stroke, text, style.size || 3.0);
        textRenderer.fillText(context, x + style.stroke, y + style.stroke, text, style.size || 3.0);        
      }
      context.fillStyle = style.fill || '#f0f0f0';
      textRenderer.fillText(context, x, y, text, style.size || 3.0);
    },

    drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
      context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    },

    clear() {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    },

    rotate(angle) {
      context.rotate(angle);
    },

    translate(x, y) {
      context.translate(x, y);
    },

    scale(x, y) {
      context.scale(x, y);
    },

    setTransform(a, b, c, d, e, f) {
      context.setTransform(a, b, c, d, e, f);
    },

    save() {
      context.save();
    },

    restore() {
      context.restore();
    },
  }
}
import textRenderer from './text-renderer';

export default ({context}) => {
  context.webkitImageSmoothingEnabled = false;
  context.msImageSmoothingEnabled = false;
  context.imageSmoothingEnabled = false;

  return {
    // rect
    r(x, y, width, height, style = {}) {
      context.fillStyle = style.fill || '#e0e0e0';
      context.fillRect(x, y, width, height);
    },

    // text
    t(text, x, y, style) {
      if (style.stroke) {
        context.fillStyle = '#000';
        textRenderer.t(context, x - style.stroke, y - style.stroke, text, style.size || 3.0);
        textRenderer.t(context, x, y - style.stroke, text, style.size || 3.0);
        textRenderer.t(context, x + style.stroke, y - style.stroke, text, style.size || 3.0);
        textRenderer.t(context, x - style.stroke, y, text, style.size || 3.0);
        textRenderer.t(context, x, y, text, style.size || 3.0);
        textRenderer.t(context, x + style.stroke, y, text, style.size || 3.0);
        textRenderer.t(context, x - style.stroke, y + style.stroke, text, style.size || 3.0);
        textRenderer.t(context, x, y + style.stroke, text, style.size || 3.0);
        textRenderer.t(context, x + style.stroke, y + style.stroke, text, style.size || 3.0);        
      }
      context.fillStyle = style.fill || '#f0f0f0';
      textRenderer.t(context, x, y, text, style.size || 3.0);
    },

    //drawImage
    di(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
      context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    },

    // clear
    clr() {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    },

    // rotate
    rt(angle) {
      context.rotate(angle);
    },

    // translate
    tr(x, y) {
      context.translate(x, y);
    },

    // scale
    sc(x, y) {
      context.scale(x, y);
    },

    // setTransform
    st(a, b, c, d, e, f) {
      context.setTransform(a, b, c, d, e, f);
    },

    // save
    sv() {
      context.save();
    },

    // restore
    ro() {
      context.restore();
    },
  }
}
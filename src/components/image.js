export default (data) => {
  const image = new Image();
  image.src = data;
  image.onload = (ev) => {
    console.log('loaded');
  }
  return image;
}
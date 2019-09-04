export default (data) => {
  const image = new Image();
  image.src = data;
  return image;
}
export default (original) => {
  let timer = 0;
  return {
    ...original,
    update({dt}) {
      timer += 5;
    },
  };
}
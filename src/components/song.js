export default (data) => {
  const audio = new Audio();
  audio.src = URL.createObjectURL(new Blob([data], {type: "audio/wav"}));
  return audio;
}
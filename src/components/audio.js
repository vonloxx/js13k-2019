import NT from '../lib/nanotunes';

export default (data) => {
  const { instruments, tracks } = data;
  const audio = new NT(instruments, tracks);
  return audio;
}
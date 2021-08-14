function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
const dimensions = getWindowDimensions();
const screen = {
  width: dimensions.width,
  height: dimensions.height,
};
export default screen;

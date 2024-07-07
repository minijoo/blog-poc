// Observer component for getting scroll height of overflow body scroll
// This comp would be unnecessary if using containing rectangle as scroller
let mainScrollHeight = -1;
const setMainScrollHeight = (n: number) => {
  mainScrollHeight = n;
};
const getMainScrollHeight = () => mainScrollHeight;

export { setMainScrollHeight, getMainScrollHeight };

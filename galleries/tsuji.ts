const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const photoPaths = [
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tsuji1.jpeg",
    height: 567,
    width: 1008,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tsuji2.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tsuji3.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tsuji4.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tsuji5.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tsuji6.jpeg",
    height: 1080,
    width: 800,
  },
];

const photos = photoPaths.map((photo) => ({
  src: photo.path,
  width: photo.width,
  height: photo.height,
  srcSet: breakpoints.map((breakpoint) => {
    const height = Math.round((photo.height / photo.width) * breakpoint);
    return {
      src: photo.path,
      width: breakpoint,
      height,
    };
  }),
}));

export default photos;

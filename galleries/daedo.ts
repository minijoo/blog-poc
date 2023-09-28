const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const photoPaths = [
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/daedo1.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/daedo2.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/daedo3.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/daedo4.jpeg",
    width: 1080,
    height: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/daedo5.jpeg",
    width: 1080,
    height: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/daedo6.jpeg",
    width: 1080,
    height: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/daedo7.jpeg",
    width: 1080,
    height: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/daedo8.jpeg",
    width: 1080,
    height: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/daedo9.jpeg",
    width: 1080,
    height: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/daedo10.jpeg",
    width: 1080,
    height: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/daedo11.jpeg",
    width: 1080,
    height: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/daedo12.jpeg",
    width: 1080,
    height: 800,
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

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const photoPaths = [
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tachi1.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tachi2.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tachi3.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tachi4.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tachi5.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tachi6.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tachi7.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tachi8.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tachi9.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tachi10.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tachi11.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tachi12.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tachi13.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tachi14.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tachi15.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tachi16.jpeg",
    height: 1008,
    width: 567,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tachi17.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tachi18.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tachi19.jpeg",
    height: 1080,
    width: 800,
  },
  {
    path: "https://jordysbucket.s3.amazonaws.com/public/assets/food/tachi20.jpeg",
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

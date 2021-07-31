const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
var ffprobe = require('ffprobe-static');
ffmpeg.setFfprobePath(ffprobe.path);
ffmpeg.setFfmpegPath(ffmpegPath);


var videofile = "./first_proper_input.mov"
var output_file = './output.mp3'
console.log(ffmpeg.path, ffmpeg.version);

ffmpeg({ source: videofile })
  .takeScreenshots({
    filename: 'example.jpg',
    timemarks: [2,4]
  }, '.');



//   const getVideoInfo = (inputPath) => {
//   return new Promise((resolve, reject) => {
//     return ffmpeg.ffprobe(inputPath, (error, videoInfo) => {
//       if (error) {
//         return reject(error);
//       }
//
//       const { duration, size } = videoInfo.format;
//
//       return resolve({
//         size,
//         durationInSeconds: Math.floor(duration),
//       });
//     });
//   });
// };
//
//   const getRandomIntegerInRange = (min, max) => {
//   const minInt = Math.ceil(min);
//   const maxInt = Math.floor(max);
//
//   return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
// };
//
// const getStartTimeInSeconds = (
//   videoDurationInSeconds,
//   fragmentDurationInSeconds,
// ) => {
//   const safeVideoDurationInSeconds =
//     videoDurationInSeconds - fragmentDurationInSeconds;
//   if (safeVideoDurationInSeconds <= 0) {
//     return 0;
//   }
//
//   return getRandomIntegerInRange(
//     0.25 * safeVideoDurationInSeconds,
//     0.75 * safeVideoDurationInSeconds,
//   );
// };
//
//
//   const createFragmentPreview = async (
//     inputPath,
//     outputPath,
//     fragmentDurationInSeconds = 4,
//   ) => {
//     return new Promise(async (resolve, reject) => {
//       const { durationInSeconds: videoDurationInSeconds } = getVideoInfo(
//         inputPath,
//       );
//
//       const startTimeInSeconds = getStartTimeInSeconds(
//         videoDurationInSeconds,
//         fragmentDurationInSeconds,
//       );
//
//       return ffmpeg()
//         .input(inputPath)
//         .inputOptions([`-ss ${startTimeInSeconds}`])
//         .outputOptions([`-t ${fragmentDurationInSeconds}`])
//         .videoCodec('libx264')
//         .toFormat('mp4')
//         .noAudio()
//         .output(outputPath)
//         .on('end', resolve)
//         .on('error', reject)
//         .run();
//     });
//   };
//

// createFragmentPreview(videofile,output_file)
const outputPattern = './thumb%04d.jpg'

ffmpeg.ffprobe(videofile, (err,metaData) => {
  const {duration} = metaData.format;
  console.log(duration);

  videoDurationInSeconds = Math.floor(duration)
  // const fragmentDurationInSeconds = 2
  // const startTimeInSeconds = getStartTimeInSeconds(
  //   videoDurationInSeconds,
  //   fragmentDurationInSeconds,
  // );
  // console.log(`${startTimeInSeconds} & ${fragmentDurationInSeconds}`);
  const numberOfFrames = 10
  // ffmpeg()
  //   .input(videofile)
  //   .addOption('-loop','1')
  //   .inputOptions([`-ss ${startTimeInSeconds}`])
  //   .videoCodec('libx264')
  //   .toFormat('mp4')
  //   .outputOptions([`-t ${fragmentDurationInSeconds}`])
  //   .noAudio()
  //   .output('./end_gif4.mp4')
  //   .on('end', () => console.log('Done'))
  //   .on('error', (err) => console.log(err))
  //   .run()
  const frameIntervalInSeconds = Math.floor(
      videoDurationInSeconds / numberOfFrames,
    );

      ffmpeg()
      .input(videofile)
      .outputOptions([`-vf fps=1/${frameIntervalInSeconds}`])
      .output(outputPattern)
      .on('end', () => console.log('Done'))
      .on('error', (err) => console.log(err))
      .run()
})


// ffmpeg()
// .input(`./thumb0001.jpg`)
// .input(`./thumb0002.jpg`)
// .input(`./thumb0003.jpg`)
// .input(`./thumb0004.jpg`)
// .input(`./thumb0005.jpg`)
// .on('end', () => console.log('Done'))
// .on('error', (err) => console.log(err))
// .mergeToFile('output_final6.mp4')
// .outputFps('1/0.6')
// .outputOptions([`-t 3`])


var videoshow = require('videoshow')

var images = []
for (var i =1; i<11; i++){
  if(i < 10){
    images.push(`./thumb000${i}.jpg`)
  }else{
    images.push(`./thumb00${i}.jpg`)
  }

}
// var images = [
//   './thumb0001.jpg',
//   './thumb0002.jpg',
//   './thumb0003.jpg',
//   './thumb0004.jpg',
//   './thumb0005.jpg',
//   './thumb0006.jpg',
//   './thumb0007.jpg',
//   './thumb0008.jpg',
//   './thumb0009.jpg',
//   './thumb0010.jpg'
// ]

var videoOptions = {
  fps: 25,
  loop: 0.6, // seconds
  transition: false,
  videoBitrate: 1024,
  videoCodec: 'libx264',
  size: '640x?',
  format: 'mp4',
  pixelFormat: 'yuv420p'
}

videoshow(images, videoOptions)
  .save('./trial_video25.mp4')
  .on('start', function (command) {
    console.log('ffmpeg process started:', command)
  })
  .on('error', function (err, stdout, stderr) {
    console.error('Error:', err)
    console.error('ffmpeg stderr:', stderr)
  })
  .on('end', function (output) {
    console.error('Video created in:', output)
  })

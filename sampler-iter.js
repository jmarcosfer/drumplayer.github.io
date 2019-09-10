const ctx = new AudioContext();
const filePaths = ['samples/hx-kick.mp3', 'samples/hx-cajon.mp3', 'samples/hx-hihat.mp3', 'samples/hx-snare.mp3', 'samples/hx-tom1.mp3', 'samples/hx-tom2.mp3'];
const btn = document.querySelector('button');

let playSample = null; // this will be our playback object later

let bufferNames = [];
let audioBufferColl = {};

// ADD: plural, getFiles, returns an array of audioBuffers
async function getFiles(ctx, paths) {
  for (let i = 0; i < paths.length; i++) {
    const response = await fetch(paths[i], { mode: 'no-cors' });
    console.log("Response succesful: " + response.ok + ", reponse type: " + response.type + ", response url: " + response.url);
    const arrayBuffer = await response.arrayBuffer();
    const tempAudioBuffer = await ctx.decodeAudioData(arrayBuffer);
    console.log('I have got decoded audio!!');
    bufferNames.push(paths[i].slice(paths[i].indexOf('/') + 1, paths[i].indexOf('.mp3')));
    audioBufferColl[bufferNames[i]] = tempAudioBuffer;
  }
  return audioBufferColl;
}

function bufferPlay(ctx, buffer) {
  const bufferNode = ctx.createBufferSource();
  bufferNode.buffer = buffer;
  bufferNode.connect(ctx.destination);
  bufferNode.start(0);
  console.log("sampled played");
}

/////////////////////////////////////////////////////
// now run functions defined above! assigned to event handlers...
btn.onclick = function() {
  ctx.resume();
  console.log('ready...... GO!');
  getFiles(ctx, filePaths)
  .then((bufferColl) => {             // pass each of the returned buffers in the array to a different onmousedown handler
    for (let j = 0; j < bufferNames.length; j++) {
      document["getElementById"](bufferNames[j])["onmousedown"] = () => { 
        bufferPlay(ctx, bufferColl[bufferNames[j]]); 
      };
    }
  }).catch(e => console.log("There was a problem: " + e.message));
}
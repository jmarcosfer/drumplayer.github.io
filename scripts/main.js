const ctx = new (window.AudioContext || window.webkitAudioContext);

const filePaths = ['samples/hx-kick.mp3', 'samples/hx-cajon.mp3', 'samples/hx-hihat.mp3', 'samples/hx-snare.mp3', 'samples/hx-tom1.mp3', 'samples/hx-tom2.mp3'];
const btn = document.querySelector('button');

let playSample = null; // this will be our playback object later

let bufferNames = [];
for (x=0; x < filePaths.length; x++) 
{
  bufferNames.push(filePaths[x].slice(filePaths[x].indexOf('/') + 1, filePaths[x].indexOf('.mp3')));
}

let audioBufferColl = {};

// ADD: plural, getFiles, returns an array of audioBuffers
async function getFiles(ctx, paths) {
  for (let i = 0; i < paths.length; i++) {
    const response = await fetch(paths[i], { mode: 'no-cors' });
    console.log("Response succesful: " + response.ok + ", reponse type: " + response.type + ", response url: " + response.url);
    const arrayBuffer = await response.arrayBuffer();
    const tempAudioBuffer = await ctx.decodeAudioData(arrayBuffer);
    console.log('I have got decoded audio!!');
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
btn.onpointerdown = function() {
  ctx.resume();
  console.log('ready...... GO!');
  
  byId("start-audio").style.visibility = 'hidden';
  byId("start-audio").style.opacity = 0;
  byId("start-audio").style.color = "black";
  byId("start-audio").textContent = "Tap the Hexadrum to hear it!"

  getFiles(ctx, filePaths)
  .then((bufferColl) => { // pass each of the returned buffers in the array to a different onpointerdown handler
    for (let j = 0; j < bufferNames.length; j++) {
      byId(bufferNames[j])["onpointerover"] = () => {
        myHover(byId(bufferNames[j]));
      }

      byId(bufferNames[j])["onpointerdown"] = () => {
        bufferPlay(ctx, bufferColl[bufferNames[j]]);
        myClick(byId(bufferNames[j]));
      };

      byId(bufferNames[j])["onpointerup"] = () => {
        myClickOut(byId(bufferNames[j]));
      }

      byId(bufferNames[j])["onpointerout"] = () => {
        myLeave();
      }
    }
  }).catch(e => console.log("There was a problem: " + e.message));
}

// code to calculate image map coords upon viewport resizing:

$(function(e) {
  $('img[usemap]').rwdImageMaps();
});
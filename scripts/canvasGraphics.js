function byId(id) { return document.getElementById(id); }

const canvas = byId('hx-canvas');
const canvasCtx = canvas.getContext('2d');
const hxImg = byId('hexadrum');

const lockedCanvas = byId('lockedCanvas');
const lockedCtx = lockedCanvas.getContext('2d');

function setLockedCanvas()
{
  lockedCanvas.style.left = hxImg.offsetLeft +'px';
  lockedCanvas.style.top = hxImg.offsetTop +'px';

  lockedCanvas.setAttribute('width', hxImg.width +'px');
  lockedCanvas.setAttribute('height', hxImg.height +'px');

  lockedCtx.fillStyle = 'rgba(227, 183, 129, 0.8)';
  lockedCtx.lineWidth = 0;

  lockedCtx.fillRect(0, 0, lockedCanvas.width, lockedCanvas.height);
}

function setCanvas() 
{
  canvas.style.left = hxImg.offsetLeft +'px';
  canvas.style.top = hxImg.offsetTop +'px';

  canvas.setAttribute('width', hxImg.clientWidth +'px');
  canvas.setAttribute('height', hxImg.clientHeight +'px');

  canvasCtx.fillStyle = 'rgba(249, 179, 95, 0.25)';
  canvasCtx.strokeStyle = 'rgba(247, 148, 29, 0)';
  canvasCtx.lineWidth = 0;
  canvasCtx.lineJoin = 'round';
}

function drawPoly(coordStr) 
{
  let mCoords = coordStr.split(',');
  let i, n;
  n = mCoords.length;

  canvasCtx.beginPath();
  canvasCtx.moveTo(mCoords[0], mCoords[1]);
  for (i=2; i<n; i+=2)
  {
    canvasCtx.lineTo(mCoords[i], mCoords[i+1]);
  }

  canvasCtx.lineTo(mCoords[0], mCoords[1]);
  canvasCtx.stroke();
  canvasCtx.fill();
}

function myLeave()
{
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
}

function myHover(element)
{
  let areaCoords = element.getAttribute('coords');
  drawPoly(areaCoords);
}

function myClick(element)
{
  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = 'rgba(247, 148, 29, 0.7)';
  myHover(element);
}

function myClickOut(element)
{
  canvasCtx.lineWidth = 0;
  canvasCtx.strokeStyle = 'rgba(247, 148, 29, 0)';
  myLeave();
  myHover(element);
}

$( function() 
  {
    setLockedCanvas();
    setCanvas();
  }
);

window.onresize = () => {
  setCanvas();
};

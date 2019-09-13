function byId(id) { return document.getElementById(id); }

const hxCanvas = byId('hx-canvas');
const hxc = hxCanvas.getContext('2d');
const hxImg = byId('hexadrum');

let x, y, w, h;
x = hxImg.offsetLeft;
y = hxImg.offsetTop;
w = hxImg.clientWidth;
h = hxImg.clientHeight;

hxCanvas.style.left = x+'px';
hxCanvas.style.top = y+'px';

hxCanvas.setAttribute('width', w+'px');
hxCanvas.setAttribute('height', h+'px');

hxc.fillStyle = 'red';
hxc.strokeStyle = 'red';
hxc.lineWidth = 4;

function drawPoly(coordStr) 
{
  let mCoords = coordStr.split(',');
  let i, n;
  n = mCoords.length;

  hxc.beginPath();
  hxc.moveTo(mCoords[0], mCoords[1]);
  for (i=2; i<n; i+=2)
  {
    hxc.lineTo(mCoords[i], mCoords[i+1]);
  }

  hxc.lineTo(mCoords[0], mCoords[1]);
  hxc.stroke();
  hxc.fill();
}

function myLeave()
{
  hxc.clearRect(0, 0, hxCanvas.width, hxCanvas.height);
}

function myHover(element)
{
  let areaCoords = element.getAttribute('coords');
  drawPoly(areaCoords);
}
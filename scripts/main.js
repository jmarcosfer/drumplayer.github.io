var myHeading = document.querySelector('h1');
var myImage = document.querySelector('img');
var myButton = document.querySelector('button');
var headingColor = myHeading.style.color;

myHeading.onmouseover = function() {
  myHeading.style.color = '#ADFF27';
};
myHeading.onmouseout = function() {
  myHeading.style.color = headingColor;
};

myImage.onclick = function() {
  var mySrc = myImage.getAttribute('src');
  if(mySrc === 'images/practice-station.jpg') {
    myImage.setAttribute('src', 'images/drum-god.jpg');
  } else {
    myImage.setAttribute('src', 'images/practice-station.jpg');
  }
};

function setUserName() {
  var myName = prompt('Please enter your name.');
  localStorage.setItem('name', myName);
  myHeading.textContent = myName + "'s Practice Buddy";
}

if(!localStorage.getItem('name')) {
  setUserName();
} else {
  var storedName = localStorage.getItem('name');
  myHeading.textContent = storedName + "'s Practice Buddy";
}

myButton.onclick = function() {
  setUserName();
};
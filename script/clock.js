var ClockHeight = 40;
var ClockWidth = 40;
var ClockFromMouseY = 20;
var ClockFromMouseX = 80;

//Alter nothing below! Alignments will be lost!

var Clock_size = 1.5;
var speed = 0.8;

var ns4 = (document.layers);

var ymouse = 0;
var xmouse = 0;
var scrll = 0;

var Split;
var Dsplit;

var HandHeight = ClockHeight / 4.5;
var HandWidth = ClockWidth / 4.5;
var HandY = -7;
var HandX = -2.5;
var step = 0.06;
var currStep = 0;

var y = new Array();
var x = new Array();
var Y = new Array();
var X = new Array();

var Dy = new Array();
var Dx = new Array();
var DY = new Array();
var DX = new Array();

var faceElements = new Array();
var dateElements = new Array();
var hourElements = new Array();
var minuteElements = new Array();
var secondElements = new Array();

function drawClock() {

  var dayOfWeekNames = ["SUNDAY", "MONDAY",
      "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  var monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY",
      "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

  var date = new Date();
  var year = date.getYear();
  if (year < 2000)
    year = year + 1900;

  var dateRing = " " + dayOfWeekNames[date.getDay()] + " " + date.getDate()
                 + " " + monthNames[date.getMonth()] + " " + year;
  dateRing = dateRing.split("");
  var hoursHand = "...";
  hoursHand = hoursHand.split("");
  var minutesHand = "....";
  minutesHand = minutesHand.split("");
  var secondsHand = ".....";
  secondsHand = secondsHand.split("");
  var faceRing = "1 2 3 4 5 6 7 8 9 10 11 12";
  faceRing = faceRing.split(" ");

  var a = Clock_size * 10;
  Split = 360 / faceRing.length;
  Dsplit = 360 / dateRing.length;
  
  var i;

  for (i = 0; i < faceRing.length; i++) {
    y[i] = 0;
    x[i] = 0;
    Y[i] = 0;
    X[i] = 0;
  }
  for (i = 0; i < dateRing.length; i++) {
    Dy[i] = 0;
    Dx[i] = 0;
    DY[i] = 0;
    DX[i] = 0;
  }

  if (document.layers) {

    var props1 = '" top="0" left="0" height="' + a + '" width="' + a
    					   + '"><center><font size="-' + a + '" face="Arial"><b>';
    var props2 = '" top="0" left="0" height="16" width="16"><center><font face="Arial"><b>';

    document.write('<div id="funny-clock">');
    document.write('<div class="clock-date">');
    for (i = 0; i < dateRing.length; i++) {
      document.write('<layer name="date-el' + i + props1 + dateRing[i] + '</b></font></center></layer>');
      dateElements[i] = document.layers["date-el" + i];
    }
    document.write('</div><div class="clock-face">');
    for (i = 0; i < faceRing.length; i++) {
      document.write('<layer name="face-el' + i + props1 + faceRing[i] + '</b></font></center></layer>');
      faceElements[i] = document.layers["face-el" + i];
    }
    document.write('</div><div class="clock-hours">');
    for (i = 0; i < hoursHand.length; i++) {
      document.write('<layer name="hours-el' + i + props2 + hoursHand[i] + '</b></font></center></layer>');
      hourElements[i] = document.layers["hours-el" + i];
    }
    document.write('</div><div class="clock-minutes">');
    for (i = 0; i < minutesHand.length; i++) {
      document.write('<layer name="minutes-el' + i + props2 + minutesHand[i] + '</b></font></center></layer>');
      minuteElements[i] = document.layers["minutes-el" + i];
    }
    document.write('</div><div class="clock-seconds">');
    for (i = 0; i < secondsHand.length; i++) {
      document.write('<layer name="seconds-el' + i + props2 + secondsHand[i] + '</b></font></center></layer>');
      secondElements[i] = document.layers["seconds-el" + i];
    }
    document.write("</div></div>");

  } else {

    var clock = document.createElement("div");
    // HTMLElement.id
    clock.setAttribute("id", "funny-clock");

    var fixedStyle1 = "position: absolute; top: 0; left: 0";
    var fixedStyle2 = "position: absolute; top: 0; left: 0; width: " + a + "px; height: " + a
        + "px; text-align: center; font: bold " + a + "px/1 Arial, sans-serif";
    var fixedStyle3 = "position: absolute; top: 0; left: 0; width: 16px; height: 16px;"
        + " text-align: center; font: bold 16px/1 Arial, sans-serif";

    var clockDate = clock.appendChild(document.createElement("div"));
    clockDate.className = "clock-date";
    // Opera doesn't parse ElementCSSInlineStyle.style.cssText
    // IE doesn't parse HTMLElement.setAttribute("style", ...)
    clockDate.setAttribute("style", fixedStyle1);
    clockDate.style.cssText = fixedStyle1;
    for (i = 0; i < dateRing.length; i++) {
      var piece = clockDate.appendChild(document.createElement("span"));
      piece.setAttribute("style", fixedStyle2);
      piece.style.cssText = fixedStyle2;
      // Node.textContent
      piece.appendChild(document.createTextNode(dateRing[i]));
      dateElements[i] = piece.style;
    }

    var clockFace = clock.appendChild(document.createElement("div"));
    clockFace.className = "clock-face";
    clockFace.setAttribute("style", fixedStyle1);
    clockFace.style.cssText = fixedStyle1;
    for (i = 0; i < faceRing.length; i++) {
      var piece = clockFace.appendChild(document.createElement("span"));
      piece.setAttribute("style", fixedStyle2);
      piece.style.cssText = fixedStyle2;
      piece.appendChild(document.createTextNode(faceRing[i]));
      faceElements[i] = piece.style;
    }

    var clockHours = clock.appendChild(document.createElement("div"));
    clockHours.className = "clock-hours";
    clockHours.setAttribute("style", fixedStyle1);
    clockHours.style.cssText = fixedStyle1;
    for (i = 0; i < hoursHand.length; i++) {
      var piece = clockHours.appendChild(document.createElement("span"));
      piece.setAttribute("style", fixedStyle3);
      piece.style.cssText = fixedStyle3;
      piece.appendChild(document.createTextNode(hoursHand[i]));
      hourElements[i] = piece.style;
    }

    var clockMinutes = clock.appendChild(document.createElement("div"));
    clockMinutes.className = "clock-minutes";
    clockMinutes.setAttribute("style", fixedStyle1);
    clockMinutes.style.cssText = fixedStyle1;
    for (i = 0; i < minutesHand.length; i++) {
      var piece = clockMinutes.appendChild(document.createElement("span"));
      piece.setAttribute("style", fixedStyle3);
      piece.style.cssText = fixedStyle3;
      piece.appendChild(document.createTextNode(minutesHand[i]));
      minuteElements[i] = piece.style;
    }

    var clockSeconds = clock.appendChild(document.createElement("div"));
    clockSeconds.className = "clock-seconds";
    clockSeconds.setAttribute("style", fixedStyle1);
    clockSeconds.style.cssText = fixedStyle1;
    for (i = 0; i < secondsHand.length; i++) {
      var piece = clockSeconds.appendChild(document.createElement("span"));
      piece.setAttribute("style", fixedStyle3);
      piece.style.cssText = fixedStyle3;
      piece.appendChild(document.createTextNode(secondsHand[i]));
      secondElements[i] = piece.style;
    }

    document.body.appendChild(clock);

  }

}

drawClock();

function followMouse(evt) {
  evt = evt || window.event;
  //ymouse = (ns)?evnt.pageY+ClockFromMouseY-(window.pageYOffset):event.y+ClockFromMouseY;
  //xmouse = (ns)?evnt.pageX+ClockFromMouseX:event.x+ClockFromMouseX;
  if (evt.pageY) {
    ymouse = evt.pageY;
  } else {
    ymouse = evt.clientY;
    if (window.document.documentElement.scrollTop) {
      ymouse += window.document.documentElement.scrollTop;
    } else if (window.document.body.scrollTop) {
      ymouse += window.document.bosy.scrollTop;
    }
  }
  
  if (evt.pageX) {
    xmouse = evt.pageX;
  } else {
    xmouse = evt.clientX;
    //if (window.document.documentElement.scrollLeft) {
    //  xmouse += window.document.documentElement.scrollLeft;
    //} else if (window.document.body.scrollLeft) {
    //  xmouse += window.document.body.scrollLeft;
    //}
  }
  
  ymouse += ClockFromMouseY;
  xmouse += ClockFromMouseX;
}

function ClockAndAssign() {
  var time = new Date();
  var seconds = -1.57 + Math.PI * time.getSeconds() / 30;
  var minutes = -1.57 + Math.PI * time.getMinutes() / 30;
  var hours = -1.575 + Math.PI * time.getHours() / 6
              + Math.PI * parseInt(time.getMinutes()) / 360;

  var hpos, vpos;

  for (i = 0; i < dateElements.length; i++) {
    vpos = Dy[i] + ClockHeight * 1.5 * Math.sin(currStep + i * Dsplit * Math.PI / 180) + scrll;
    hpos = Dx[i] + ClockWidth * 1.5 * Math.cos(currStep + i * Dsplit * Math.PI / 180);
    dateElements[i].top = "" + vpos + (ns4 ? "" : "px");
    dateElements[i].left = "" + hpos + (ns4 ? "" : "px");
  }
  for (i = 0; i < faceElements.length; i++) {
    vpos = y[i] + ClockHeight * Math.sin(-1.0471 + i * Split * Math.PI / 180) + scrll;
    hpos = x[i] + ClockWidth * Math.cos(-1.0471 + i * Split * Math.PI / 180);
    faceElements[i].top = "" + vpos + (ns4 ? "" : "px");
    faceElements[i].left = "" + hpos + (ns4 ? "" : "px");
  }
  for (i = 0; i < hourElements.length; i++) {
    vpos = y[i] + HandY + (i * HandHeight) * Math.sin(hours) + scrll;
    hpos = x[i] + HandX + (i * HandWidth) * Math.cos(hours);
    hourElements[i].top = "" + vpos + (ns4 ? "" : "px");
    hourElements[i].left = "" + hpos + (ns4 ? "" : "px");
  }
  for (i = 0; i < minuteElements.length; i++) {
    vpos = y[i] + HandY + (i * HandHeight) * Math.sin(minutes) + scrll;
    hpos = x[i] + HandX + (i * HandWidth) * Math.cos(minutes);
    minuteElements[i].top = "" + vpos + (ns4 ? "" : "px");
    minuteElements[i].left = "" + hpos + (ns4 ? "" : "px");
  }
  for (i = 0; i < secondElements.length; i++) {
    vpos = y[i] + HandY + (i * HandHeight) * Math.sin(seconds) + scrll;
    hpos = x[i] + HandX + (i * HandWidth) * Math.cos(seconds);
    secondElements[i].top = "" + vpos + (ns4 ? "" : "px");
    secondElements[i].left = "" + hpos + (ns4 ? "" : "px");
  }
  currStep -= step;
}

function Delay() {
  Dy[0] = Math.round(DY[0] += ((ymouse) - DY[0]) * speed);
  Dx[0] = Math.round(DX[0] += ((xmouse) - DX[0]) * speed);
  for (i = 1; i < Dx.length; i++) {
    Dy[i] = Math.round(DY[i] += (Dy[i - 1] - DY[i]) * speed);
    Dx[i] = Math.round(DX[i] += (Dx[i - 1] - DX[i]) * speed);
  }
  y[0] = Math.round(Y[0] += ((ymouse) - Y[0]) * speed);
  x[0] = Math.round(X[0] += ((xmouse) - X[0]) * speed);
  for (i = 1; i < x.length; i++) {
    y[i] = Math.round(Y[i] += (y[i - 1] - Y[i]) * speed);
    x[i] = Math.round(X[i] += (x[i - 1] - X[i]) * speed);
  }
  ClockAndAssign();
  setTimeout("Delay()", 20);
}

if (document.addEventListener) {
  document.addEventListener("mousemove", followMouse, true);
} else if (document.attachEvent) {
  document.attachEvent("onmousemove", followMouse);
} else if (ns4) {
  window.captureEvents(Event.MOUSEMOVE);
  window.onMouseMove = followMouse;
}

Delay();
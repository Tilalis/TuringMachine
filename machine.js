"use strict"
var placeholder = 'Enter your programm in following format:\nA1 > B0R\n\nWhere A, B ... Z = q1, q2 ... q0\nq11 --> q20L == A1 > B0L';
var textarea; var output; var TM;

function executeCode() {
  output.innerHTML = '';
  var code = '-' + textarea.value.replace(/ /g,'').replace(/\r?\n|\r/g, '-');
  var command = ''; var count = 0;
  TM = new TuringMachine(document.getElementById('machine').value);
  TM.print();
  while (command[0] != 'Z') {
    var block = TM.getFullState();
    if (code.indexOf(block) != -1) {
      block = '-' + block;
      command = code.substring(code.indexOf(block) + 4, code.indexOf(block) + 7)
      TM.setState(command[0]);
      TM.setValue(parseInt(command[1]));
      TM.go(command[2]);
    } else {
      command = 'Z0';
      alert('No commands left. Did you forget to add Z?');
    }
  console.log('code: ' + code);
  console.log('block: ' + block);
  console.log('command: ' + command);
  if (code != '-') TM.print();
  if (count > 100) {
    alert('Error. More than 100 operations. \nLooks like infinite loop.');
    break;
  }
  count++;
  }
}

window.onload = function () {
  textarea = document.getElementsByTagName('textarea')[0]
  output = document.getElementById('output');
  textarea.placeholder = placeholder;
}

window.onkeypress  = function(e){
  var keyCode = e.keyCode || e.which;
  if (keyCode == '13' && e.shiftKey){
    executeCode();
  }
}

/*TuringMachine Class*/
function TuringMachine(rawdata) {
  var rawdata = rawdata.split(' ');
  var data = new Array();
  for (var i = 0; i < rawdata.length; i++) 
    if (rawdata[i].length == 3) {
      for (var j = parseInt(rawdata[i][2]); j > 0; j--) {
        data.push(Number(rawdata[i][0]));
      } 
    } 
    else {
      data.push(Number(rawdata[i]));
    }

  var pointer = 0;
  var maxPointer = data.length;
  var currentState = 'A';

  for (var i = 0; i < data.length; i++) {data[i] = (data[i] <= 0) ? 0 : 1;}

  var goLeft = function () {
    pointer--;
    if (pointer < 0) {
      data.unshift(0);
      pointer = 0;
    }
  }

  var goRight = function () {
    pointer++;
    if (pointer > (maxPointer - 1)) {
      data.push(0);
    }
  }

  this.go = function (where) {
    switch (where) {
      case 'R': goRight(); break;
      case 'L': goLeft(); break;
    }
  }

  this.setState = function (state) { currentState = state }
  this.setValue = function (value) { 
    value = (value <= 0) ? 0 : 1;
    data[pointer] = value;
  }
  
  this.getFullState = function () {
    return currentState + data[pointer];
  }

  this.print = function () {
    var machineBody= '';
    var spaces = '&nbsp;&nbsp;';
    var line = '';
    for (var i = 0; i < data.length; i++) {
      machineBody += '| ' + data[i] + ' ';
      line += '----';
    }
    machineBody += '|'; line += '-';

    for (var i = 0; i < pointer; i++) {
      spaces += '&nbsp;&nbsp;&nbsp;&nbsp;';
    }
    output.innerHTML += spaces + currentState + '<br>' + spaces + '∨' + '<br>' + line + '<br>' + machineBody + '<br>' + line + '<br>';
  }
}

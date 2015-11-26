"use strict"
var placeholder = 'Enter your program in following format:\n[State][Value] > [State][Value][Go]\n\nWhere State = {\'A\'..\'Z\'}\nGo = {\'L\', \'R\', Nothing}\nValue is any Symbol you want.\n\nProgram Example:\nA1 > B1R\nB1 > B1R\nB0 > Z0\n\nAlso you can use multiline comments.\n[This is a comment]\n\n[\nThis is a comment too\n]';
var textarea; var output; var TM;

function executeCode() {
  output.innerHTML = '';
  // Don't ever do smth like that
  var code = '-' + textarea.value.replace(/ /g,'').replace(/\r?\n|\r/g, '-').replace(/\[[^\[]*?\]/g, '');
  var command = ''; var count = 0;
  TM = new TuringMachine(document.getElementById('machine').value, true);
  TM.print(output);
  while (command[0] != 'Z') {
    var block = TM.getFullState();
    if (code.indexOf(block) != -1) {
      block = '-' + block;
      command = code.substring(code.indexOf(block) + 4, code.indexOf(block) + 7)
      TM.setState(command[0]);
      TM.setValue(command[1]);
      TM.go(command[2]);
    } else {
      command = 'Z0';
      alert('No commands left. Did you forget to add Z?');
    }
  console.log('code: ' + code);
  console.log('block: ' + block);
  console.log('command: ' + command);
  if (code != '-') TM.print(output);
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
function TuringMachine(rawdata, rawcustomAlphabet) {
  var customAlphabet = rawcustomAlphabet == null? false : rawcustomAlphabet;
  var rawdata = rawdata.split(' ');
  var data;
  var pointer = 0;
  var maxPointer;
  var currentState = 'A';

  var initializeData = function () {
    data = new Array();
    for (var i = 0; i < rawdata.length; i++) 
      if (rawdata[i].length == 3) {
        for (var j = parseInt(rawdata[i][2]); j > 0; j--) {
          data.push(customAlphabet? rawdata[i][0] : Number(rawdata[i][0]));
        } 
      } 
      else {
        data.push(customAlphabet? rawdata[i] : Number(rawdata[i]));
      }
    maxPointer = data.length;
  }

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
      maxPointer++;
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
    if (!customAlphabet) value = (value <= 0) ? 0 : 1;
    data[pointer] = value;
  }
  
  this.getFullState = function () {
    return currentState + data[pointer];
    console.log(data[pointer]);
  }

  this.print = function (output) {
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

  this.toggleCustomAlphabet = function () {
    customAlphabet = !customAlphabet;
    customAlphabet? console.log('Custom Alphabet On') : console.log('Custom Alphabet Off');
    initializeData();
  }

  initializeData();
}

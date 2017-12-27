// console.log('working');
$('.here').hide();
p1= prompt("Player One: Enter Your Name, you will be Blue");
var p1col= 'rgb(24, 70, 145)';

var p2= prompt("Player Two: Enter Your Name, you will be Red");
var p2col= 'rgb(201, 24, 18)';

if(p1===null || p1==='')
p1="Player 1";

if(p2===null || p2==='')
p2="Player 2";


var game_on=true;
var table=$('table tr');

function reportWin(rowNum, colNum){
  console.log("You won starting at this col, row");
  console.log(rowNum);
  console.log(colNum);
}

function changeColor(rowIndex, colIndex, color){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function retColor(rowIndex, colIndex){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex){
  var colorReport = retColor(6,colIndex);
  for (var row = 6; row > -1; row--) {
    colorReport = retColor(row,colIndex);
    if (colorReport === 'rgb(128, 128, 128)') {
      return row;
    }
  }

}

function colorMatchCheck(one,two,three,four){
  return (one===two && two===three && three===four && one!=='rgb(128, 128, 128)' && one!==undefined);
}

function horCheck(){
  for(var row=0;row<7;row++){
    for(var col=0;col<4;col++){
      if(colorMatchCheck(retColor(row,col),retColor(row,col+1),retColor(row,col+2),retColor(row,col+3))){
        console.log('Horizontal');
        reportWin(row,col);
        return true;
      }
        else {
          continue;
        }
    }
  }
}

function verCheck(){
  for(var col=0;col<7;col++){
    for(var row=0;row<4;row++){
      if(colorMatchCheck(retColor(row,col),retColor(row+1,col),retColor(row+2,col),retColor(row+3,col))){
        console.log('Vertical');
        reportWin(row,col);
        return true;
      }        else {
                continue;
              }
    }
  }
}

function diaCheck(){
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatchCheck(retColor(row,col), retColor(row+1,col+1) ,retColor(row+2,col+2), retColor(row+3,col+3))) {
        console.log('Diagonal');
        reportWin(row,col);
        return true;
      }else if (colorMatchCheck(retColor(row,col), retColor(row-1,col+1) ,retColor(row-2,col+2), retColor(row-3,col+3))) {
        console.log('Diagonal');
        reportWin(row,col);
        return true;
      }        else {
                continue;
              }
    }
  }
}

function gameEnd(winningPlayer) {
      $('h3').fadeOut('fast');
      $('h2').fadeOut('fast');
      $('h1').text(winningPlayer+" has won! Refresh your browser to play again!").css("fontSize", "50px")
      $('.here').show();
//  event.stopPropogation();
      game_on=false;
}

var currentPlayer = 1;
var currentName = p1;
var currentColor = p1col;

$('h3').text(p1+": it is your turn, please pick a column to drop your blue chip.");

$('#table button').on('click',function() {
  if(game_on){
  var col = $(this).closest("td").index();

  var bottomAvail = checkBottom(col);
  if(bottomAvail>6 || bottomAvail === undefined)
    currentPlayer= currentPlayer*-1;

  changeColor(bottomAvail,col,currentColor);

  if (horCheck() || verCheck() || diaCheck()) {
    gameEnd(currentName);
  }

  currentPlayer = currentPlayer * -1 ;

  if (currentPlayer === 1) {
    currentName = p1;
    $('h3').text(currentName+": it is your turn, please pick a column to drop your blue chip.");
    currentColor = p1col;
  }else {
    currentName = p2
    $('h3').text(currentName+": it is your turn, please pick a column to drop your red chip.");
    currentColor = p2col;
  }
}})

const prompt = require("prompt-sync")();

const cardValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // 11, 12, 13 => J, Q, K
const cardColor = ["kt", "dj", "pr", "pb"];

const cardName = {
  1 : "เอช",
  2 : "2",
  3 : "3",
  4 : "3",
  5 : "5",
  6 : "6",
  7 : "7",
  8 : "8",
  9 : "9",
  10 : "10",
  11 : "แจ็ค",
  12 : "แหม่ม",
  13 : "คิง",
}

const cardColorName = {
  kt:"ข้าวหลามตัด", 
  dj:"ดอกจิก", 
  pr:"โพธิ์แดง", 
  pb:"โพธิ์ดำ"
}

let drewCard = [];
let playerCard = [];
let result = []
let prize = 1 // เล่นป๊อกเด้งตาละ 1 บาท

const calulatePoint = (card1, card2, card3 = "0,0") => {
  let score1 =
    parseInt(card1.split(",")[0]) > 10 ? 10 : parseInt(card1.split(",")[0]);
  let score2 =
    parseInt(card2.split(",")[0]) > 10 ? 10 : parseInt(card2.split(",")[0]);
  let score3 =
    parseInt(card3.split(",")[0]) > 10 ? 10 : parseInt(card3.split(",")[0]);
  return (score1 + score2 + score3) % 10;
};

//draw card first time
const generatePlayerCard = (numPlayer) => {
  let i = 0;
  let randomValue1;
  let radomColor1;
  let randomValue2;
  let radomColor2;
  let card1 = "";
  let card2 = "";
  while (i < numPlayer) {
    randomValue1 = Math.floor(Math.random() * 13);
    radomColor1 = Math.floor(Math.random() * 4);
    randomValue2 = Math.floor(Math.random() * 13);
    radomColor2 = Math.floor(Math.random() * 4);
    // check duplicate and  get next player
    card1 = `${cardValue[randomValue1]},${cardColor[radomColor1]}`;
    card2 = `${cardValue[randomValue2]},${cardColor[radomColor2]}`;
    if (!drewCard.includes(card1) && !drewCard.includes(card2)) {
      drewCard.push(card1);
      drewCard.push(card2);
      playerCard.push([card1, card2, calulatePoint(card1, card2)]);
      i++;
    }
  }
};

const checkWinLose = (playerArray,numberOfPlayer) => {
  let i = 1
  while (i < numberOfPlayer){
    // check point
    if(playerArray[0][2] > playerArray[i][2]){
      result[0] += prize
      result[i] -= prize
    } else if (playerArray[0][2] < playerArray[i][2] ){
      result[0] -= prize
      result[i] += prize
    }
    i++
  }
}

const showResult = (numberOfPlayer) => {
  let i = 0
  let playerName
  let cName1
  let cName2
  let score
  let showPrice
  while (i < numberOfPlayer){
  playerName = `ผู้เล่นคนที่ ${i}`
  if (i === 0){
    playerName = `เจ้ามือ`
  }
  cName1 = cardName[playerCard[i][0].split(",")[0]] + cardColorName[playerCard[i][0].split(",")[1]]
  cName2 = cardName[playerCard[i][1].split(",")[0]] + cardColorName[playerCard[i][1].split(",")[1]]
  score = playerCard[i][2]
  showPrice = result[i] >= 0 ? `ได้ ${result[i]}` : `เสีย ${result[i]}`
  console.log(`${playerName} ถือไพ่ ${cName1} และ ${cName2} ,มีแต้ม ${score} แต้ม ${showPrice} บาท`)
  i++
  }
}

let response = "";
while (true) {
  response = parseInt(
    prompt("Please Enter Number of player (2 - 17) (0 is break) :")
  );
  process.stdout.write("\033c");
  if (response === 0) {
    break;
  }
  if (response < 2 || response > 17) {
    console.log("players must not less than 2 or more than 17.");
    console.log("=".repeat(25));
    response = "";
  } else {
    generatePlayerCard(response);
    // player number 0 is เจ้ามือ
    result = Array(response).fill(0)
    checkWinLose(playerCard,response);
    showResult(response)
  }
}

console.log("See you again. EiEi.");

console.log("hello, vanilla.");

const startButton = document.querySelector("button");
const inputBox = document.querySelector(".input-box input");
const initBtn = document.querySelector(".init-btn input");
let answerNumber = -1;
let strike = 0;
let ball = 0;
let trial = 0;
let tempNumber = 0;

//문자로 바뀐 정답숫자의 빈 자리에 0을 추가하기
//예) 7 -> 007 , 46 ->046
function adjust(x){
  if(x < 10) x = "00" + x;
  if(10<= x && x < 100) x = "0" + x;
  else x = "" + x;
  return x;
};

function initializeAll(){
  document.querySelector("input").value = '';
  answerNumber = -1;
  strike = 0;
  ball = 0;
  trial = 0;

  inputBox.style.display = "none";
  initBtn.style.display = "none";
}

//start 버튼 클릭
startButton.addEventListener("click", () => {

  //3자리 숫자 생성하고 adjust함수를 적용 후 중복되는 숫자면 다시 생성
  while(true){
    answerNumber = Math.floor(Math.random() * 1000);
    answerNumber = adjust(Number(answerNumber));
    if(answerNumber[0] !== answerNumber[1] && answerNumber[1] !== answerNumber[2] && answerNumber[0] !== answerNumber[2] ){
      console.log(answerNumber);
      console.log(typeof(answerNumber));
      break;
    }
  }
  
  //숫자 입력칸과 초기화칸 보이기(visible)
  inputBox.style.display = "inline";
  initBtn.style.display = "inline";
});

//숫자를 입력하면
inputBox.addEventListener("keydown", (x) => {
  let typedNumber = document.querySelector("input").value;
  //예외처리
  if(x.key === 'Enter') {
    if(typedNumber.length !==3) {
      alert("3자리 숫자가 아닙니다");
      return;
    }
    trial++;
    if(trial === 10) {
      alert("제한기회 10번을 모두 소진하였습니다");
      initializeAll();
    }
    //숫자 판별
    else{
      adjust(typedNumber);
      for(let i = 0; i < answerNumber.length; i++) {
        for(let j =0; j <typedNumber.length; j++) {
            if(answerNumber[i] === typedNumber[j]){
              if(i===j) {
                strike++;
                console.log(`strike case between ${i} and ${j}`);
              }
              else {
                ball++;
                console.log(`ball case between ${i} and ${j}`);
              }
            }
        }
      }
    }
    if(strike === 0 && ball ===0) alert("Out");
    else if (strike === 3 ) {
      alert("victory");
    }
    else alert(`${strike} strike ${ball} ball`);
    strike = 0;
    ball = 0;
    trial = 0;
    document.querySelector("input").value = '';
  }
})

initBtn.addEventListener("click", (x)=> {
  initializeAll();
})
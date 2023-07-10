; (function () {

  //-------新增音量條---------//
  let barNum = 90;
  let barBox = document.querySelector('.barBox');

  for (let i = 1; i <= barNum; i++) {
    let bar = document.createElement('div');
    bar.classList.add('bar')
    bar.innerHTML = '<div class="barLine"></div>'
    barBox.appendChild(bar);
  }

  //-------新增狗狗img---------//

  let danceBoard = document.querySelector('.danceBoard');
  for (let i = 0; i < 10; i++) {
    let dog = document.createElement('img');
    dog.setAttribute('class', `dogImg`);
    dog.src = './images/null.png';
    danceBoard.appendChild(dog);
  }



  // let bigClock = document.querySelector('.bigClock');
  // let bigClockText = document.querySelector('.bigClockText');

  let boxes = document.querySelectorAll('.box');
  let audioImgs = document.querySelectorAll('.audioImg');
  let barLines = document.querySelectorAll('.barLine');
  let dogImgs = document.querySelectorAll('.dogImg')

  let darkAll = document.querySelector('#darkAll');
  let darkL = document.querySelector('#darkL');
  let darkR = document.querySelector('#darkR');
  let darkButton = document.querySelector('#darkButton');
  let soptlightButton = document.querySelector('#soptlightButton');
  let lightButton = document.querySelector('#lightButton');

  let text001 = document.querySelector('#text001');

  let audios = document.querySelectorAll('audio');

  let allClockTime = 0;

  let watchAllClock; //用來當 playMusic(e) 的 setinterval。

  let flags = new Array(boxes.length);
  flags.fill(false);
  let allFlags = false;

  let dogFlags = new Array(dogImgs.length);
  dogFlags.fill(false);


  let allClock = null;

  let barLineInterval = null


  function playMusic(e) {
    if (flags[e] === false) {
      watchAllClock = setInterval(function () {
        if (allClockTime == 0) {
          clearInterval(watchAllClock)
          audios[e].play()
          audios[e].loop = true
        }
      }, 250)
      // console.log('outer', allClockTime);
      boxes[e].classList.add('shake');
      flags[e] = true;
    } else {
      clearInterval(watchAllClock); //防止在大表到 0 之前就關掉，還會繼續撥音樂
      audios[e].pause();
      audios[e].currentTime = 0;
      boxes[e].classList.remove('shake');
      flags[e] = false;
      console.log(flags)
    }
  }

  function arrCheck() {
    for (let i = 0; i < flags.length; i++) {
      if (flags[i] == false) {
        allFlags = false
      } else {
        allFlags = true
        break
      }
    }

    if (allFlags && allClock == null) {
      //大表時間
      allClock = setInterval(function () {
        allClockTime = allClockTime == 5 ? 0 : allClockTime += 0.5;
        text001.innerHTML = allClockTime;
      }, 500)
    } else if (!allFlags) {
      clearInterval(allClock);
      allClock = null;
      allClockTime = 0;
      text001.innerHTML = allClockTime;
    }

  }

  function audioImgsPlay() {
    if (allFlags) {
      audioImgs[0].classList.add('playaudio');
      audioImgs[1].classList.add('playaudio');
    } else if (!allFlags) {
      audioImgs[0].classList.remove('playaudio');
      audioImgs[1].classList.remove('playaudio');
    }
  }

  function barLineHandler() {
    if (allFlags && barLineInterval == null) {
      barLineInterval = setInterval(function () {
        for (let i = 0; i < barLines.length; i++) {
          randomNum = Math.floor(Math.random() * 80);
          barLines[i].style.top = `${randomNum}%`;
        }
      }, 100)
    } else if (!allFlags) {
      clearInterval(barLineInterval);
      barLineInterval = null;
      // for(let i=0;i<barLines.length;i++){
      //   barLines[i].style.top = `50%`;
      // }
    }
  }

  function dogHandler(e) {
    if (dogFlags[e] == false) {
      dogImgs[e].src = 'images/doge-dance.gif';
      dogFlags[e] = true;
      // console.log('狗狗',dogFlags[e])
    } else if (dogFlags[e] == true) {
      dogImgs[e].src = 'images/null.png';
      dogFlags[e] = false;
    }

  }



  boxes.forEach(function (box, i) {
    box.addEventListener('click', function () {
      playMusic(i);
      arrCheck();
      audioImgsPlay();
      barLineHandler();
      dogHandler(i);
    })
  })

  darkButton.addEventListener('click', function () {
    darkAll.style.display = 'block';
  })

  let soptlightFlag = false;
  soptlightButton.addEventListener('click', function () {
    if (soptlightFlag == false) {
      darkAll.style.display = 'none';
      darkL.style.display = 'block';
      darkR.style.display = 'block';
      soptlightFlag = true;
    } else if (soptlightFlag == true) {
      darkAll.style.display = 'block';
      darkL.style.display = 'none';
      darkR.style.display = 'none';
      soptlightFlag = false;
    }

  })

  lightButton.addEventListener('click', function () {
    darkAll.style.display = 'none';
    darkL.style.display = 'none';
    darkR.style.display = 'none';
  })
























})();
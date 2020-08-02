//プレイヤーデータ
let flag = true;
let plyname = prompt("名前を入力してください。");
let plyLv = 1;
let plyHp = 6;
let plyHpmax = 6;
let plyAtt = 1;
let plyHeal = 1;
let plyExp = 0;
let plyExpNext = 5;
let plyExpNeed = [5, 15, 20, 25, 40, 120, 200, 380, 500, 700];
let plySte = new Array(6);
let plyImg = document.getElementById("plyImg");
for (i = 0; i < 6; i++) {
  plySte[i] = document.getElementById("plySte" + [i]);
}
plySte0.textContent = plyname;
//プレイヤー回復
plyImg.addEventListener("mousedown", () => {
  console.log("plyer dm");
  if (flag) {
    plyImg.src = "img/playerC.png";
  }
});
plyImg.addEventListener("mouseup", () => {
  console.log("plyer up");
  if (flag) {
    plyImg.src = "img/playerA.png";
    plyHp += plyHeal;
    if (plyHp > plyHpmax) {
      plyHp = plyHpmax;
    }
    plySte2.textContent = "HP:" + plyHp;
  }
});
//敵データ
let enestek = 0;
let eneLv = 1;
let eneHp = 10;
let eneHpmax0 = [10, 20, 30, 50, 70, 90, 100, 150, 200, 600];
let eneAtt0 = [2, 3, 4, 5, 6, 7, 20, 25, 40, 60];
let eneKill0 = 0;
let eneCnt = 5;
let eneCntmax0 = 5;
let eneExp0 = [1, 2, 3, 5, 7, 9, 30, 48, 80, 350];
let eneSte = new Array(4);
for (i = 0; i < 4; i++) {
  eneSte[i] = document.getElementById(eneSte[i]);
}
//敵を攻撃
eneImg.addEventListener("mousedown", () => {
  console.log("enemy dm");
  if (flag) {
    eneImg.src = "img/enemyB" + enestek + ".png";
  }
});

eneImg.addEventListener("mouseup", () => {
  console.log("enemy up");
  if (flag) {
    eneImg.src = "img/enemyA" + enestek + ".png";
    if (eneHp > plyAtt) {
      eneHp = eneHp - plyAtt;
    } else {
      eneHp = eneHpmax0[enestek];
      eneKill0++;
      eneSte4.textContent = "倒した回数" + eneKill0;
      //経験値処理
      plyExp += eneExp0[enestek];
      plySte5.textContent = "経験値" + plyExp;
      plyExpNext -= eneExp0[enestek];
      //レベルアップ処理
      if (plyExpNext <= 0) {
        plyExpNext = plyExpNeed[plyLv];
        plyLv++;
        plySte1.textContent = "レベル:" + plyLv;
        plyHpmax = plyLv * 2 + 6;
        plyHp = plyHpmax;
        plyAtt = plyAtt + plyLv;
        plyHeal++;
        plySte4.textContent = "回復魔法:" + plyHeal;
        plySte1.textContent = "レベル：" + plyLv;
        plySte2.textContent = "HP：" + plyHp;
        plySte3.textContent = "攻撃力：" + plyAtt;
      }
      plySte6.textContent = "次のレベルまでの経験値" + plyExpNext + "ポイント";
    }
    eneSte2.textContent = "HP:" + eneHp;
  }
});
//敵が時間ごとに攻撃
let eneSec = document.getElementById("eneSec");
let loop = setInterval(() => {
  if (enestek == 9 && eneHp <= 0) {
    clearInterval(loop);
    flag = false;
    eneSec.textContent = "ゲームクリア";
  }
  if (eneCnt > 0) {
    eneCnt--;
    eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
  } else {
    plyImg.src = "img/playerB.png";
    plyHp = plyHp - eneAtt0[enestek];
    if (plyHp > 0) {
      plySte2.textContent = "HP:" + plyHp;
      eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
    } else {
      plyHp = 0;
      clearInterval(loop);
      flag = false;
      plySte2.textContent = "HP：" + plyHp;
      eneSec.textContent = "ゲームオーバー";
    }
    setTimeout(() => {
      if (flag) {
        plyImg.src = "img/playerA.png";
        eneCnt += eneCntmax0;
        eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
      }
    }, 500);
  }
}, 1000);
//次のモンスター処理
let right = document.getElementById("right");
right.addEventListener("click", () => {
  if (flag && eneLv < 10) {
    eneLv++;
    enestek++;
    eneImg.src = "img/enemyA" + enestek + ".png";
    eneHp = eneHpmax0[enestek];
    eneSte1.textContent = "レベル：" + eneLv;
    eneSte2.textContent = "HP：" + eneHp;
    eneSte3.textContent = "攻撃力：" + eneAtt0[enestek];
  }
});
//逃げる処理
let left = document.getElementById("left");
left.addEventListener("click", () => {
  if (flag && eneLv > 1) {
    eneLv--;
    enestek--;
    eneImg.src = "img/enemyA" + enestek + ".png";
    eneHp = eneHpmax0[enestek];
    eneSte1.textContent = "レベル：" + eneLv;
    eneSte2.textContent = "HP：" + eneHp;
    eneSte3.textContent = "攻撃力：" + eneAtt0[enestek];
  }
});
//ゲームクリア処理
if (eneLv == 10 && eneHp < 0) {
  eneSec.textContent = "ゲームクリア";
  flag = false;
}

let currentColor = 'black';
let alertColorReverse = '白';

window.onload = () => {
  const rows = [1, 2, 3, 4, 5, 6, 7, 8];
  const columns = [1, 2, 3, 4, 5, 6, 7, 8];
  for (row of rows) {
    for (column of columns) {
      /* 初期石配置 */
      if (row == 4) {
        if (column == 4) {
          document.querySelector('.container').insertAdjacentHTML(
            'beforeend',
            `<div class="item"  data-row="4" data-column="4"data-color="black"></div>`)
        } else if (column == 5) {
          document.querySelector('.container').insertAdjacentHTML(
            'beforeend',
            `<div class="item"  data-row="4" data-column="5"data-color="white"></div>`)
        } else {
          document.querySelector('.container').insertAdjacentHTML(
            'beforeend',
            `<div class="item"  data-row="${row}" data-column="${column}"></div>`)
        }

      } else if (row == 5) {
        if (column == 4) {
          document.querySelector('.container').insertAdjacentHTML(
            'beforeend',
            `<div class="item"  data-row="5" data-column="4"data-color="white"></div>`)
        } else if (column == 5) {
          document.querySelector('.container').insertAdjacentHTML(
            'beforeend',
            `<div class="item"  data-row="5" data-column="5"data-color="black"></div>`)
        } else {
          document.querySelector('.container').insertAdjacentHTML(
            'beforeend',
            `<div class="item"  data-row="${row}" data-column="${column}"></div>`)
        }
      } else {
        document.querySelector('.container').insertAdjacentHTML(
          'beforeend',
          `<div class="item"  data-row="${row}" data-column="${column}"></div>`)
      }
    }
  }
  /* クリックした時に石を置く */
  Array.from(document.getElementsByClassName('item')).forEach(element => {
    element.addEventListener('click', (e) => {
      e.target.dataset.color = currentColor

      const row = Number(e.target.dataset.row)
      const column = Number(e.target.dataset.column)


      /* 挟んだ時ひっくり返す関数定義 */
      const functionList = [
        getUpLine,
        getRightLine,
        getDownLine,
        getLeftLine,
        getUpRightLine,
        getDownRightLine,
        getUpLeftLine,
        getDownLeftLine,
      ]

      for (const fn of functionList) {
        //マスを全部取る
        squares = fn(row, column)

        //ひっくり返したいマス目の配列
        squaresToBeReversed = getTarget(squares)

        //ひっくり返す
        squaresToBeReversed.forEach(el => { el.dataset.color = currentColor })

      }



      currentColor = enemyColor()
      alertColorReverse = enemyalertColorReverse()

      let turn = document.getElementById("turn");

      /* 石の数を数える */
      const whitestone = document.querySelectorAll('[data-color="white"]');
      const blackstone = document.querySelectorAll('[data-color="black"]');
      const win = document.getElementById("win");

      ws.innerHTML = "白:" + whitestone.length + "個";
      bs.innerHTML = "黒:" + blackstone.length + "個";
      let sum = 0;
      sum = (whitestone.length + blackstone.length);
      if (sum < 64) {
        turn.innerHTML = "現在" + enemyalertColorReverse() + "の番です";
      } else if(sum === 64) {
        alert('終了！');
        if (whitestone.length < blackstone.length) {
          win.innerHTML = "黒の勝利です！";
          alert('黒の勝利です！');
        } else if(whitestone.length > blackstone.length) {
          win.innerHTML = "白の勝利です！";
          alert('白の勝利です！');
        }else{
          win.innerHTML = "引き分けです";
          alert('引き分けです');
        }
      }
      if(whitestone.length == 0){
        alert('終了！');
        alert('白のコマが0になりました\n'+'黒の勝利です！');
        win.innerHTML = "黒の勝利です！";
      const result = confirm('試合をリセットしますか？');
      if( result ) {
        location.reload();
    }
      }else if(blackstone.length == 0){
        alert('終了！');
        alert('黒のコマが0になりました\n'+'黒の勝利です！');
        win.innerHTML = "白の勝利です！";
        const result = confirm('試合をリセットしますか？');
      if( result ) {
        location.reload();
       }
      }
    })
  })
}
/* currentColorの色の反対の色を設定する */
const enemyColor = () => {
  if (currentColor == 'black') {
    return 'white';
  } else {
    return 'black';
  }
}


const enemyalertColorReverse = () => {
  if (alertColorReverse == '白') {
    return '黒';
  } else {
    return '白';
  }
}


/* 下に置いたとき */
const getUpLine = (row, column) => {
  const result = []
  while (true) {
    row -= 1
    if (!checkInBoard(row, column)) { break }
    result.push(document.querySelector(`[data-row="${row}"][data-column="${column}"]`))
  }
  return result
}

/* 上に置いたとき */
const getDownLine = (row, column) => {
  result = []
  while (true) {
    row += 1
    if (!checkInBoard(row, column)) { break }
    result.push(document.querySelector(`[data-row="${row}"][data-column="${column}"]`))
  }
  return result
}


/* 左に置いたとき */
const getRightLine = (row, column) => {
  result = []
  while (true) {
    column += 1
    if (!checkInBoard(row, column)) { break }
    result.push(document.querySelector(`[data-row="${row}"][data-column="${column}"]`))
  }
  return result
}

/* 右に置いたとき */
const getLeftLine = (row, column) => {
  result = []
  while (true) {
    column -= 1
    if (!checkInBoard(row, column)) { break }
    result.push(document.querySelector(`[data-row="${row}"][data-column="${column}"]`))
  }
  return result
}

/* 左下に置いたとき */
const getUpRightLine = (row, column) => {
  result = []
  while (true) {
    row -= 1, column += 1
    if (!checkInBoard(row, column)) { break }
    result.push(document.querySelector(`[data-row="${row}"][data-column="${column}"]`))
  }
  return result
}
/* 左上に置いたとき */
const getDownRightLine = (row, column) => {
  result = []
  while (true) {
    row += 1, column -= 1
    if (!checkInBoard(row, column)) { break }
    result.push(document.querySelector(`[data-row="${row}"][data-column="${column}"]`))
  }
  return result
}
/* 右下に置いたとき */
const getUpLeftLine = (row, column) => {
  result = []
  while (true) {
    row -= 1, column -= 1
    if (!checkInBoard(row, column)) { break }
    result.push(document.querySelector(`[data-row="${row}"][data-column="${column}"]`))
  }
  return result
}
/* 右上に置いたとき */
const getDownLeftLine = (row, column) => {
  result = []
  while (true) {
    row += 1, column += 1
    if (!checkInBoard(row, column)) { break }
    result.push(document.querySelector(`[data-row="${row}"][data-column="${column}"]`))
  }
  return result
}

const checkInBoard = (row, column) => {
  return (row > 0 && column > 0 && row < 9 && column < 9)
}




const getTarget = (squares) => {
  result = []
  for (const square of squares) {
    const color = square.dataset.color
    //colorがenemyColorだとひっくり返す対象になる
    if (color == enemyColor()) {

      result.push(square)
    } else if (color == currentColor) {
      return result
    } else {
      return []
    }
  }
  return []
}

const reload = document.getElementById('reload');
reload.addEventListener('click', function () {
  window.location.reload();
});

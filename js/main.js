let currentColor = 'black'

window.onload = () => {
  const rows = [1,2,3,4,5,6,7,8];
  const columns = [1,2,3,4,5,6,7,8];
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


      /* 挟んだ時ひっくり返す変数定義 */
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
        //全方向
        squares = fn(row, column)

        //ひっくり返したいマス目
        squaresToBeReversed = getTarget(squares)

        //ひっくり返す
        squaresToBeReversed.forEach(el => { el.dataset.color = currentColor })

      }



      currentColor = enemyColor()
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


/* 下に置いたとき */
const getUpLine = (row, column) => {
  result = []
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

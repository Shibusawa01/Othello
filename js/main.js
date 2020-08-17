let currentColor = 'black'


window.onload = () => {
  const rows = Array.from({ length: 8 }, (v,k) => k + 1);
  const columns = Array.from({ length: 8 }, (v,k) => k + 1);
  for (row of rows) {
    for (column of columns) {
      document.querySelector('.container').insertAdjacentHTML(
        'beforeend',
        `<div class="item"  data-row="${row}" data-column="${column}"></div>`
      )
    }
  }

  Array.from(document.getElementsByClassName('item')).forEach(element => {
    element.addEventListener('click', (e) => {
      e.target.dataset.color = currentColor

      const row = Number(e.target.dataset.row)
      const column = Number(e.target.dataset.column)

      

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

        //ひっくり返したい
        squaresToBeReversed = getTarget(squares)

        //ひっくり返す
        squaresToBeReversed.forEach(el => { el.dataset.color = currentColor })

      }



      currentColor = enemyColor()
    })
  })
}

const enemyColor = () => {
  return (currentColor == 'black') ? 'white' : 'black'
}



const getUpLine = (row, column) => {
  result = []
  while (true) {
    row -= 1
    if (!checkInBoard(row, column)) { break }
    result.push(document.querySelector(`[data-row="${row}"][data-column="${column}"]`))
  }
  return result
}

const getDownLine = (row, column) => {
  result = []
  while (true) {
    row += 1
    if (!checkInBoard(row, column)) { break }
    result.push(document.querySelector(`[data-row="${row}"][data-column="${column}"]`))
  }
  return result
}



const getRightLine = (row, column) => {
  result = []
  while (true) {
    column += 1
    if (!checkInBoard(row, column)) { break }
    result.push(document.querySelector(`[data-row="${row}"][data-column="${column}"]`))
  }
  return result
}

const getLeftLine = (row, column) => {
  result = []
  while (true) {
    column -= 1
    if (!checkInBoard(row, column)) { break }
    result.push(document.querySelector(`[data-row="${row}"][data-column="${column}"]`))
  }
  return result
}

const getUpRightLine = (row, column) => {
  result = []
  while (true) {
    row -= 1, column += 1
    if (!checkInBoard(row, column)) { break }
    result.push(document.querySelector(`[data-row="${row}"][data-column="${column}"]`))
  }
  return result
}

const getDownRightLine = (row, column) => {
  result = []
  while (true) {
    row += 1, column -= 1
    if (!checkInBoard(row, column)) { break }
    result.push(document.querySelector(`[data-row="${row}"][data-column="${column}"]`))
  }
  return result
}

const getUpLeftLine = (row, column) => {
  result = []
  while (true) {
    row -= 1, column -= 1
    if (!checkInBoard(row, column)) { break }
    result.push(document.querySelector(`[data-row="${row}"][data-column="${column}"]`))
  }
  return result
}

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

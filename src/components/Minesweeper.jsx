import React, { useState, useEffect, useCallback } from 'react'
import './Minesweeper.css'

const BOARD_SIZE = 10
const MINES_COUNT = 15

const Minesweeper = () => {
  const [board, setBoard] = useState([])
  const [gameStatus, setGameStatus] = useState('playing') // playing, won, lost
  const [flagsCount, setFlagsCount] = useState(MINES_COUNT)
  const [firstClick, setFirstClick] = useState(true)

  // 初始化游戏板
  const initializeBoard = useCallback(() => {
    const newBoard = Array(BOARD_SIZE).fill().map(() => 
      Array(BOARD_SIZE).fill().map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        adjacentMines: 0
      }))
    )
    return newBoard
  }, [])

  // 放置地雷
  const placeMines = useCallback((board, firstRow, firstCol) => {
    let minesPlaced = 0
    const newBoard = [...board]
    
    while (minesPlaced < MINES_COUNT) {
      const row = Math.floor(Math.random() * BOARD_SIZE)
      const col = Math.floor(Math.random() * BOARD_SIZE)
      
      // 确保第一次点击的位置不是地雷
      if (!newBoard[row][col].isMine && (row !== firstRow || col !== firstCol)) {
        newBoard[row][col].isMine = true
        minesPlaced++
      }
    }
    
    return newBoard
  }, [])

  // 计算相邻地雷数量
  const calculateAdjacentMines = useCallback((board) => {
    const newBoard = [...board]
    
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (!newBoard[row][col].isMine) {
          let count = 0
          
          // 检查周围8个格子
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const newRow = row + i
              const newCol = col + j
              
              if (newRow >= 0 && newRow < BOARD_SIZE && 
                  newCol >= 0 && newCol < BOARD_SIZE && 
                  newBoard[newRow][newCol].isMine) {
                count++
              }
            }
          }
          
          newBoard[row][col].adjacentMines = count
        }
      }
    }
    
    return newBoard
  }, [])

  // 揭示格子
  const revealCell = useCallback((row, col) => {
    if (gameStatus !== 'playing') return
    
    setBoard(currentBoard => {
      const newBoard = [...currentBoard]
      const cell = newBoard[row][col]
      
      if (cell.isRevealed || cell.isFlagged) return currentBoard
      
      // 如果是第一次点击，放置地雷
      if (firstClick) {
        setFirstClick(false)
        const boardWithMines = placeMines(newBoard, row, col)
        const finalBoard = calculateAdjacentMines(boardWithMines)
        return revealCellHelper(finalBoard, row, col)
      }
      
      // 踩到地雷
      if (cell.isMine) {
        setGameStatus('lost')
        cell.isRevealed = true
        return newBoard
      }
      
      return revealCellHelper(newBoard, row, col)
    })
  }, [gameStatus, firstClick, placeMines, calculateAdjacentMines])

  // 递归揭示格子（用于空白格子的自动展开）
  const revealCellHelper = (board, row, col) => {
    const newBoard = [...board]
    const cell = newBoard[row][col]
    
    if (cell.isRevealed || cell.isFlagged) return newBoard
    
    cell.isRevealed = true
    
    // 如果是空白格子，递归揭示周围格子
    if (cell.adjacentMines === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const newRow = row + i
          const newCol = col + j
          
          if (newRow >= 0 && newRow < BOARD_SIZE && 
              newCol >= 0 && newCol < BOARD_SIZE) {
            revealCellHelper(newBoard, newRow, newCol)
          }
        }
      }
    }
    
    return newBoard
  }

  // 标记/取消标记格子
  const toggleFlag = useCallback((row, col, event) => {
    event.preventDefault()
    if (gameStatus !== 'playing') return
    
    setBoard(currentBoard => {
      const newBoard = [...currentBoard]
      const cell = newBoard[row][col]
      
      if (cell.isRevealed) return currentBoard
      
      if (cell.isFlagged) {
        cell.isFlagged = false
        setFlagsCount(count => count + 1)
      } else if (flagsCount > 0) {
        cell.isFlagged = true
        setFlagsCount(count => count - 1)
      }
      
      return newBoard
    })
  }, [gameStatus, flagsCount])

  // 检查游戏是否胜利
  const checkWin = useCallback((board) => {
    let revealedCount = 0
    
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (board[row][col].isRevealed && !board[row][col].isMine) {
          revealedCount++
        }
      }
    }
    
    return revealedCount === (BOARD_SIZE * BOARD_SIZE - MINES_COUNT)
  }, [])

  // 重新开始游戏
  const resetGame = useCallback(() => {
    setBoard(initializeBoard())
    setGameStatus('playing')
    setFlagsCount(MINES_COUNT)
    setFirstClick(true)
  }, [initializeBoard])

  // 初始化游戏
  useEffect(() => {
    resetGame()
  }, [resetGame])

  // 检查游戏状态
  useEffect(() => {
    if (gameStatus === 'playing' && !firstClick) {
      if (checkWin(board)) {
        setGameStatus('won')
      }
    }
  }, [board, gameStatus, firstClick, checkWin])

  // 渲染格子内容
  const renderCellContent = (cell) => {
    if (!cell.isRevealed) {
      return cell.isFlagged ? '🚩' : ''
    }
    
    if (cell.isMine) {
      return '💣'
    }
    
    if (cell.adjacentMines > 0) {
      const colors = ['', 'blue', 'green', 'red', 'purple', 'maroon', 'turquoise', 'black', 'gray']
      return (
        <span style={{ color: colors[cell.adjacentMines], fontWeight: 'bold' }}>
          {cell.adjacentMines}
        </span>
      )
    }
    
    return ''
  }

  // 获取格子类名
  const getCellClassName = (cell) => {
    let className = 'cell'
    
    if (cell.isRevealed) {
      className += ' revealed'
      if (cell.isMine) {
        className += ' mine'
      }
    } else {
      className += ' hidden'
    }
    
    return className
  }

  return (
    <div className="minesweeper">
      <div className="game-info">
        <div className="status">
          {gameStatus === 'won' && '🎉 恭喜你赢了！'}
          {gameStatus === 'lost' && '💥 游戏结束！'}
          {gameStatus === 'playing' && `🚩 剩余标记: ${flagsCount}`}
        </div>
        <button className="reset-button" onClick={resetGame}>
          🔄 重新开始
        </button>
      </div>
      
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={getCellClassName(cell)}
                onClick={() => revealCell(rowIndex, colIndex)}
                onContextMenu={(e) => toggleFlag(rowIndex, colIndex, e)}
              >
                {renderCellContent(cell)}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <div className="instructions">
        <p>💡 左键点击：揭示格子 | 右键点击：标记/取消标记地雷</p>
      </div>
    </div>
  )
}

export default Minesweeper
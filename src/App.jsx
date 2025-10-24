import React, { useState, useEffect, useCallback } from 'react'
import Minesweeper from './components/Minesweeper'
import './App.css'

function App() {
  return (
    <div className="app">
      <div className="game-container">
        <h1>扫雷游戏</h1>
        <p className="game-description">
          经典 10×10 扫雷游戏，使用 React Hooks 实现
        </p>
        <Minesweeper />
      </div>
    </div>
  )
}

export default App
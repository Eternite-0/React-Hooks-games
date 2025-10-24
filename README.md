# React Hooks 扫雷游戏

一个使用 React Hooks 实现的经典 10×10 扫雷游戏，展示了现代 React 开发的最佳实践。

## 🎮 游戏特性

- **经典扫雷玩法**：10×10 游戏板，15个地雷
- **现代化 UI**：响应式设计，支持桌面和移动设备
- **React Hooks**：使用 useState、useEffect、useCallback 管理状态
- **高效性能**：优化的状态更新，避免不必要的重绘
- **智能游戏机制**：第一次点击永远不会是地雷，自动展开空白区域

## 🚀 快速开始

### 环境要求

- Node.js 16.0 或更高版本
- npm 或 yarn 包管理器

### 安装和运行

1. 克隆项目
```bash
git clone https://github.com/Eternite-0/React-Hooks-games.git
cd React-Hooks-games
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 打开浏览器访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
```

## 🎯 游戏玩法

### 基本操作
- **左键点击**：揭示格子
- **右键点击**：标记/取消标记地雷
- **自动展开**：点击空白格子会自动展开相邻区域

### 游戏规则
1. 游戏目标是揭示所有非地雷格子
2. 数字表示周围8个格子中的地雷数量
3. 标记可疑的地雷位置
4. 踩到地雷游戏结束
5. 揭示所有安全格子获胜

## 🛠️ 技术栈

- **前端框架**：React 18.2.0
- **构建工具**：Vite 4.4.5
- **样式**：原生 CSS3
- **开发语言**：JavaScript (ES6+)

## 📁 项目结构

```
React-Hooks-games/
├── src/
│   ├── components/
│   │   ├── Minesweeper.jsx    # 扫雷游戏主组件
│   │   └── Minesweeper.css     # 游戏样式
│   ├── App.jsx                 # 应用根组件
│   ├── App.css                # 应用样式
│   ├── main.jsx               # 应用入口
│   └── index.css              # 全局样式
├── dist/                      # 构建输出目录
├── index.html                 # HTML 模板
├── package.json               # 项目配置
├── vite.config.js             # Vite 配置
└── README.md                  # 项目说明
```

## ⚛️ React Hooks 使用

### useState
```javascript
const [board, setBoard] = useState([])
const [gameStatus, setGameStatus] = useState('playing')
const [flagsCount, setFlagsCount] = useState(MINES_COUNT)
```

### useEffect
```javascript
useEffect(() => {
  resetGame()
}, [resetGame])

useEffect(() => {
  if (gameStatus === 'playing' && !firstClick) {
    if (checkWin(board)) {
      setGameStatus('won')
    }
  }
}, [board, gameStatus, firstClick, checkWin])
```

### useCallback
```javascript
const initializeBoard = useCallback(() => {
  // 初始化游戏板逻辑
}, [])

const revealCell = useCallback((row, col) => {
  // 揭示格子逻辑
}, [gameStatus, firstClick, placeMines, calculateAdjacentMines])
```

## 🎨 样式特性

- **响应式布局**：适配不同屏幕尺寸
- **渐变背景**：现代化的视觉设计
- **悬停效果**：交互反馈清晰
- **动画效果**：游戏状态变化动画
- **颜色编码**：数字使用不同颜色便于识别

## 🔧 自定义配置

### 修改游戏难度

在 `src/components/Minesweeper.jsx` 中修改常量：

```javascript
const BOARD_SIZE = 10    // 修改棋盘大小
const MINES_COUNT = 15   // 修改地雷数量
```

### 自定义样式

修改 `src/components/Minesweeper.css` 中的 CSS 变量：

```css
.cell {
  width: 40px;    /* 格子大小 */
  height: 40px;
}
```

## 📱 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- React 团队提供的优秀框架
- Vite 团队提供的高效构建工具
- 经典扫雷游戏的灵感来源

---

**享受游戏！** 🎮✨
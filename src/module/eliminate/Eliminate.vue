<template>
  <div>
    <section class="hero is-dark is-large">
      <div class="hero-head">
        <Top :index="2"></Top>
      </div>
    </section>
    <section class="section is-medium body-image">
      <div class="container">
        <div class="columns">
          <div class="column is-5 is-offset-1">
            <div class="board">
              <div v-for="(row,index) in showMaps" class="row">
                <div v-for="cell in row" class="cell" @click="mouseClick(cell)"
                     v-bind:class="{
                              'cell-r':cell.color==='R',
                              'cell-b':cell.color==='B',
                              'cell-g':cell.color==='G',
                              'cell-y':cell.color==='Y',
                              'cell-up':isMoveUp(cell),
                              'cell-down':isMoveDown(cell),
                              'cell-left':isMoveLeft(cell),
                              'cell-right':isMoveRight(cell),
                              'cell-click':cell.click
                           }">
                </div>
              </div>
            </div>
            <br>
            <progress class="progress is-warning" v-bind:value="timeProgress" max="100"
                      style="max-width: 480px"></progress>
          </div>
          <div class="column is-6">
            <a class="button is-warning" @click="startGame">开始游戏</a>
            <span class="tag is-warning">combo：{{combo}}</span>
            <span class="tag is-warning">当前得分：{{score}}</span>
            <span class="tag is-warning">{{time}}</span>
          </div>
        </div>
      </div>
    </section>
    <Bottom></Bottom>
  </div>
</template>

<script>
  import Top from '../../components/Top'
  import Bottom from '../../components/Bottom'
  export default {
    components: {Top, Bottom},
    data() {
      return {
        maps: [],
        showMaps: [],
        colors: [],
        xSize: 8,
        ySize: 8,
        removeList: [],
        sourceCell: null,
        targetCell: null,
        removingFlag: false,
        score: 0,
        combo: 0,
        timeProgress: 100,
        gameTime: 60,
        startFlag: false
      }
    },
    mounted() {
      this.initMaps();
      while (this.isDieMap()) {
        this.initMaps();
      }
      this.refreshMaps();
    },
    computed: {
      time() {
        let time = (this.timeProgress / 100 * this.gameTime).toString().split('.')
        if (time.length === 2) {
          return time[0] + '.' + time[1].substr(0, 3)
        } else {
          return time[0]
        }
      }
    },
    methods: {
      startGame() {
        if (this.startFlag) return
        this.startFlag = true
        this.timeProgress = 100
        this.score = 0
        let endTime = new Date()
        endTime.setSeconds(endTime.getSeconds() + this.gameTime)
        let timeIntervalId = setInterval(() => {
          if (endTime <= new Date()) {
            clearInterval(timeIntervalId)
            this.timeProgress = 0
            this.startFlag = false
            alert('时间到')
          } else {
            this.timeProgress = (endTime - new Date()) / this.gameTime / 10
          }
        }, 1)
      },
      //初始化地图
      initMaps() {
        for (let i = 0; i < this.ySize; i++) {
          this.maps[i] = [];
        }
        this.initColors();
        for (let i = 0; i < this.ySize; i++) {
          for (let j = 0; j < this.xSize; j++) {
            if (this.colors.length > 0) {
              let cell = {};
              let index = parseInt(Math.random() * (this.colors.length), 10);
              cell.color = this.colors[index];
              cell.x = i;
              cell.y = j;
              this.maps[i][j] = cell;
              if (this.isLine(i, j)) {
                j = j - 1;
                this.colors.splice(index, 1);
              } else {
                this.initColors();
              }
            } else {
              this.initMaps();
              return;
            }
          }
        }
      },
      //初始化颜色
      initColors() {
        this.colors = ['R', 'B', 'G', 'Y'];
      },
      //判断当前坐标元素是否可消除
      isLine(x, y) {
        let lx1 = x - 1 > -1;
        let lx2 = x - 2 > -1;
        let bx1 = x + 1 < this.xSize;
        let bx2 = x + 2 < this.xSize;
        let ly1 = y - 1 > -1;
        let ly2 = y - 2 > -1;
        let by1 = y + 1 < this.ySize;
        let by2 = y + 2 < this.ySize;
        if (ly1 && by1 && this.isCellColorEqual(this.maps[x][y - 1], this.maps[x][y], this.maps[x][y + 1])) {
          return true;
        }
        if (lx1 && bx1 && this.isCellColorEqual(this.maps[x - 1][y], this.maps[x][y], this.maps[x + 1][y])) {
          return true;
        }
        if (ly2 && this.isCellColorEqual(this.maps[x][y], this.maps[x][y - 1], this.maps[x][y - 2])) {
          return true;
        }
        if (by2 && this.isCellColorEqual(this.maps[x][y], this.maps[x][y + 1], this.maps[x][y + 2])) {
          return true;
        }
        if (lx2 && this.isCellColorEqual(this.maps[x][y], this.maps[x - 1][y], this.maps[x - 2][y])) {
          return true;
        }
        return bx2 && this.isCellColorEqual(this.maps[x][y], this.maps[x + 1][y], this.maps[x + 2][y]);
      },
      //判断3个元素颜色是否一致
      isCellColorEqual(c1, c2, c3) {
        if (c1 && c2 && c3) {
          if (c1.color && c2.color && c3.color) {
            return (c1.color === c2.color && c1.color === c3.color);
          }
        }
        return false;
      },
      //判断是否为死图
      isDieMap() {
        for (let i = 0; i < this.xSize; i++) {
          for (let j = 0; j < this.ySize; j++) {
            this.maps[i][j].x = i;
            this.maps[i][j].y = j;
            if (this.isDie(i, j) === false) {
              return false;
            }
          }
        }
        return true;
      },
      isDie(x, y) {
        let lx1 = x - 1 > -1;
        let lx2 = x - 2 > -1;
        let lx3 = x - 3 > -1;
        let bx1 = x + 1 < this.xSize;
        let bx2 = x + 2 < this.xSize;
        let bx3 = x + 3 < this.xSize;
        let ly1 = y - 1 > -1;
        let ly2 = y - 2 > -1;
        let ly3 = y - 3 > -1;
        let by1 = y + 1 < this.ySize;
        let by2 = y + 2 < this.ySize;
        let by3 = y + 3 < this.ySize;
        let color = this.maps[x][y].color;
        if (bx1) {
          if (this.maps[x + 1][y].color === color) {
            if (bx3) {
              if (this.maps[x + 3][y].color === color) {
                return false;
              }
            }
            if (bx2 && by1) {
              if (this.maps[x + 2][y + 1].color === color) {
                return false;
              }
            }
            if (bx2 && ly1) {
              if (this.maps[x + 2][y - 1].color === color) {
                return false;
              }
            }
            if (lx2) {
              if (this.maps[x - 2][y].color === color) {
                return false;
              }
            }
            if (lx1 && ly1) {
              if (this.maps[x - 1][y - 1].color === color) {
                return false;
              }
            }
            if (lx1 && by1) {
              if (this.maps[x - 1][y + 1].color === color) {
                return false;
              }
            }
          }
          if (ly1 && by1) {
            if (this.maps[x + 1][y - 1].color === color && this.maps[x + 1][y + 1].color === color) {
              return false;
            }
          }
        }
        if (lx1) {
          if (this.maps[x - 1][y].color === color) {
            if (lx3) {
              if (this.maps[x - 3][y].color === color) {
                return false;
              }
            }
            if (lx2 && by1) {
              if (this.maps[x - 2][y + 1].color === color) {
                return false;
              }
            }
            if (lx2 && ly1) {
              if (this.maps[x - 2][y - 1].color === color) {
                return false;
              }
            }
            if (bx2) {
              if (this.maps[x + 2][y].color === color) {
                return false;
              }
            }
            if (bx1 && ly1) {
              if (this.maps[x + 1][y - 1].color === color) {
                return false;
              }
            }
            if (bx1 && by1) {
              if (this.maps[x + 1][y + 1].color === color) {
                return false;
              }
            }
          }
          if (ly1 && by1) {
            if (this.maps[x - 1][y - 1].color === color && this.maps[x - 1][y + 1].color === color) {
              return false;
            }
          }
        }
        if (by1) {
          if (this.maps[x][y + 1].color === color) {
            if (by3) {
              if (this.maps[x][y + 3].color === color) {
                return false;
              }
            }
            if (lx1 && by2) {
              if (this.maps[x - 1][y + 2].color === color) {
                return false;
              }
            }
            if (bx1 && by2) {
              if (this.maps[x + 1][y + 2].color === color) {
                return false;
              }
            }
            if (ly2) {
              if (this.maps[x][y - 2].color === color) {
                return false;
              }
            }
            if (bx1 && ly1) {
              if (this.maps[x + 1][y - 1].color === color) {
                return false;
              }
            }
            if (lx1 && ly1) {
              if (this.maps[x - 1][y - 1].color === color) {
                return false;
              }
            }
          }
          if (lx1 && bx1) {
            if (this.maps[x - 1][y + 1].color === color && this.maps[x + 1][y + 1].color === color) {
              return false;
            }
          }
        }
        if (ly1) {
          if (this.maps[x][y - 1].color === color) {
            if (ly3) {
              if (this.maps[x][y - 3].color === color) {
                return false;
              }
            }
            if (lx1 && ly2) {
              if (this.maps[x - 1][y - 2].color === color) {
                return false;
              }
            }
            if (bx1 && ly2) {
              if (this.maps[x + 1][y - 2].color === color) {
                return false;
              }
            }
            if (by2) {
              if (this.maps[x][y + 2].color === color) {
                return false;
              }
            }
            if (bx1 && by1) {
              if (this.maps[x + 1][y + 1].color === color) {
                return false;
              }
            }
            if (lx1 && by1) {
              if (this.maps[x - 1][y + 1].color === color) {
                return false;
              }
            }
          }
          if (lx1 && bx1) {
            if (this.maps[x - 1][y - 1].color === color && this.maps[x + 1][y - 1].color === color) {
              return false;
            }
          }
        }
        return true;
      },
      move(source, target) {
        let sourceColor = this.maps[source.x][source.y].color;
        let targetColor = this.maps[target.x][target.y].color;
        this.maps[target.x][target.y].color = sourceColor;
        this.maps[source.x][source.y].color = targetColor;
        if (!this.isLine(source.x, source.y) && !this.isLine(target.x, target.y)) {
          this.maps[source.x][source.y].color = sourceColor;
          this.maps[target.x][target.y].color = targetColor;
          this.sourceCell = null;
          this.removingFlag = false;
          return;
        }
        //消除
        this.fadeCircle();
      },
      near(source, target) {
        let nearCell = (source.x === target.x && (source.y === target.y + 1 || source.y === target.y - 1)) ||
          (source.y === target.y && (source.x === target.x + 1 || source.x === target.x - 1));
        return source.x > -1 && source.x < this.xSize && source.y > -1 && source.y < this.ySize &&
          target.x > -1 && target.x < this.xSize && target.y > -1 && target.y < this.ySize &&
          nearCell;
      },
      fadeCircle() {
        //判断选出要消除的格子
        this.calcToRemoveList();
        //删除并下沉
        this.removeAndDownCell();
      },
      calcToRemoveList() {
        this.removeList = [];
        for (let i = 0; i < this.xSize; i++) {
          for (let j = 0; j < this.ySize; j++) {
            let key = i + '_' + j;
            if (this.maps[i][j] && this.removeList.indexOf(key) === -1) {
              let rowList = [];
              let colList = [];
              this.sameCellColorLeft(i, j, this.maps[i][j].color, rowList);
              this.sameCellColorRight(i, j, this.maps[i][j].color, rowList);
              this.sameCellColorUp(i, j, this.maps[i][j].color, colList);
              this.sameCellColorDown(i, j, this.maps[i][j].color, colList);
              if (rowList.length > 2) {
                this.score += rowList.length * (this.combo + 1)
                rowList.forEach((cellKey) => {
                  this.removeList.push(cellKey);
                });
              }
              if (colList.length > 2) {
                this.score += colList.length * (this.combo + 1)
                colList.forEach((cellKey) => {
                  this.removeList.push(cellKey);
                });
              }
            }
          }
        }
      },
      removeAndDownCell() {
        if (this.removeList.length === 0) {
          this.removingFlag = false
          this.sourceCell = null
          this.combo = 0
          return;
        }
        this.combo++
        this.removeList.forEach((cellKey) => {
          this.maps[cellKey.split('_')[0]][cellKey.split('_')[1]].color = ' ';
        });
        this.refreshMaps();
        window.setTimeout(() => {
          this.downCell()
        }, 400);
      },
      downCell() {
        this.initColors();
        this.removeList.sort();
        this.removeList.forEach((cellKey) => {
          let x = cellKey.split('_')[0];
          for (let i = cellKey.split('_')[1]; i > 0; i--) {
            this.maps[x][i].color = this.maps[x][i - 1].color;
          }
          let index = parseInt(Math.random() * (this.colors.length), 10);
          this.maps[x][0].color = this.colors[index];
        });
        this.refreshMaps();
        window.setTimeout(() => {
          this.fadeCircle();
        }, 400);
      },
      sameCellColorLeft(x, y, color, sameList) {
        if (sameList.indexOf(x + '_' + y) === -1) {
          sameList.push(x + '_' + y);
        }
        let nextX = x - 1;
        if (nextX >= 0 && this.maps[nextX][y] && this.maps[nextX][y].color === color) {
          this.sameCellColorLeft(nextX, y, color, sameList);
        }
      },
      sameCellColorRight(x, y, color, sameList) {
        if (sameList.indexOf(x + '_' + y) === -1) {
          sameList.push(x + '_' + y);
        }
        let nextX = x + 1;
        if (nextX < this.xSize && this.maps[nextX][y] && this.maps[nextX][y].color === color) {
          this.sameCellColorRight(nextX, y, color, sameList);
        }
      },
      sameCellColorUp(x, y, color, sameList) {
        if (sameList.indexOf(x + '_' + y) === -1) {
          sameList.push(x + '_' + y);
        }
        let nextY = y - 1;
        if (nextY >= 0 && this.maps[x][nextY] && this.maps[x][nextY].color === color) {
          this.sameCellColorUp(x, nextY, color, sameList);
        }
      },
      sameCellColorDown(x, y, color, sameList) {
        if (sameList.indexOf(x + '_' + y) === -1) {
          sameList.push(x + '_' + y);
        }
        let nextY = y + 1;
        if (nextY < this.ySize && this.maps[x][nextY] && this.maps[x][nextY].color === color) {
          this.sameCellColorDown(x, nextY, color, sameList);
        }
      },
      mouseClick(cell) {
        if (!this.startFlag || this.timeProgress === 0) return;
        if (this.removingFlag) return;
        if (this.sourceCell !== null) {
          this.maps[this.sourceCell.x][this.sourceCell.y].click = false;
          if (!this.near(this.sourceCell, cell)) {
            cell.click = true;
            this.sourceCell = cell;
            this.refreshMaps();
            return;
          }
          this.removingFlag = true;
          this.targetCell = cell;
          window.setTimeout(() => {
            this.move(this.sourceCell, cell);
          }, 500)
        } else {
          this.sourceCell = cell;
          this.sourceCell.click = true;
          this.refreshMaps();
        }
      },
      isMoveUp(cell) {
        if (!this.removingFlag) return false
        if (this.sourceCell.x !== this.targetCell.x) return false;
        if (cell.x === this.sourceCell.x && cell.y === this.sourceCell.y) {
          return cell.y === this.targetCell.y + 1
        }
        if (cell.x === this.targetCell.x && cell.y === this.targetCell.y) {
          return cell.y === this.sourceCell.y + 1
        }
      },
      isMoveDown(cell) {
        if (!this.removingFlag) return false
        if (this.sourceCell.x !== this.targetCell.x) return false;
        if (cell.x === this.sourceCell.x && cell.y === this.sourceCell.y) {
          return cell.y === this.targetCell.y - 1
        }
        if (cell.x === this.targetCell.x && cell.y === this.targetCell.y) {
          return cell.y === this.sourceCell.y - 1
        }
      },
      isMoveLeft(cell) {
        if (!this.removingFlag) return false
        if (this.sourceCell.y !== this.targetCell.y) return false;
        if (cell.x === this.sourceCell.x && cell.y === this.sourceCell.y) {
          return cell.x === this.targetCell.x + 1
        }
        if (cell.x === this.targetCell.x && cell.y === this.targetCell.y) {
          return cell.x === this.sourceCell.x + 1
        }
      },
      isMoveRight(cell) {
        if (!this.removingFlag) return false
        if (this.sourceCell.y !== this.targetCell.y) return false;
        if (cell.x === this.sourceCell.x && cell.y === this.sourceCell.y) {
          return cell.x === this.targetCell.x - 1
        }
        if (cell.x === this.targetCell.x && cell.y === this.targetCell.y) {
          return cell.x === this.sourceCell.x - 1
        }
      },
      refreshMaps() {
        this.showMaps = [];
        this.showMaps = this.maps;
        //this.printMaps();
      }
    }
  }
</script>

<style scoped>

  .body-image {
    background: url('../../assets/img/eliminate/background.jpg') left no-repeat;
  }

  .board {
    display: flex;
    outline: solid 2px gold;
    margin: 4px;
    max-width: 480px;
  }

  .cell {
    width: 60px;
    height: 60px;
    text-align: center;
    border: solid 2px gold;
    user-select: none;
    position: relative;
    border-radius: 50%;
  }

  .cell-click {
    border: dashed 2px blue;
  }

  .cell-r {
    background-image: url("../../assets/img/eliminate/R.jpg");
  }

  .cell-g {
    background-image: url("../../assets/img/eliminate/G.png");
  }

  .cell-b {
    background-image: url("../../assets/img/eliminate/B.jpg");
  }

  .cell-y {
    background-image: url("../../assets/img/eliminate/Y.jpg");
  }

  .cell-down {
    animation: moveDown 0.5s;
  }

  .cell-up {
    animation: moveUp 0.5s;
  }

  .cell-left {
    animation: moveLeft 0.5s;
  }

  .cell-right {
    animation: moveRight 0.5s;
  }

  @keyframes moveDown {
    from {
      top: 0
    }
    to {
      top: 50px
    }
  }

  @keyframes moveUp {
    from {
      top: 0
    }
    to {
      top: -50px
    }
  }

  @keyframes moveLeft {
    from {
      left: 0
    }
    to {
      left: -50px
    }
  }

  @keyframes moveRight {
    from {
      left: 0
    }
    to {
      left: 50px
    }
  }
</style>

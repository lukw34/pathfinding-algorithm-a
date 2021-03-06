import {
  DEFAULT, OBSTACLE, START_POINT, TARGET, PATH, DIRECT_MOVE, CROSS_MOVE
} from '../constants';

export const generateDefaultArray = size => Array.from(new Array(size), () => ({
  type: DEFAULT,
  distance: 0,
  ancestor: {},
  weight: 0
}));

export const getRandomPosition = (row, column) => {
  const randomColumn = Math.floor(Math.random() * column);
  const randomRow = Math.floor(Math.random() * row);
  return {
    row: randomRow,
    column: randomColumn
  };
};

export const getRandomPositionDiffrentThan = (row, column, { c, r }) => {
  let candidateR = r;
  let candidateC = c;
  while (candidateC === c && candidateR === r) {
    const result = getRandomPosition(row, column);
    candidateR = result.row;
    candidateC = result.column;
  }

  return {
    row: candidateR,
    column: candidateC
  };
};

export const findCellDistance = (arr, { row, column }) => arr.map((rowData, rowIndex) => rowData
  .map((columnData, columnIndex) => {
    if (columnData.distance === null) {
      return columnData;
    }

    return {
      ...columnData,
      distance: Math.abs(row - rowIndex) + Math.abs(column - columnIndex)
    };
  }));


export const initPlayground = (row, column = row, obstaclesCount = 5) => {
  const rowArr = generateDefaultArray(row);
  const collArr = generateDefaultArray(column);
  const playground = rowArr.map(() => [...collArr]);

  for (let i = 0; i < obstaclesCount; i += 1) {
    const { row: obstaclesRow, column: obstaclesColumn } = getRandomPosition(row, column);
    playground[obstaclesRow][obstaclesColumn] = {
      type: OBSTACLE,
      weight: null,
      distance: null,
      ancestor: {}
    };
  }

  const { row: startRow, column: startColumn } = getRandomPosition(row, column);
  playground[startRow][startColumn] = {
    type: START_POINT,
    weight: null,
    distance: null,
    ancestor: {}
  };

  const { row: endRow, column: endColumn } = getRandomPositionDiffrentThan(row, column, {
    c: startColumn,
    r: startRow
  });

  playground[endRow][endColumn] = {
    type: TARGET,
    weight: null,
    distance: null,
    ancestor: {}
  };

  return {
    playground: findCellDistance(playground, { row: endRow, column: endColumn }),
    startPoint: {
      x: startRow,
      y: startColumn
    },
    endPoint: {
      x: endRow,
      y: endColumn
    }
  };
};

export const getPlaygroundWithPathFrom = (playground, start) => {
  const playgroundWithPath = [...playground];
  const getAncestor = ({ x, y, ancestor }) => {
    if (x !== undefined && y !== undefined) {
      const el = playground[x][y];
      playgroundWithPath[x][y] = {
        ...el,
        type: PATH
      };

      if (ancestor.x !== undefined) {
        getAncestor(playground[ancestor.x][ancestor.y]);
      }
    }
  };

  getAncestor(start);
  return playgroundWithPath;
};

export const getSurroundings = (x, y, maxRow, maxColumn) => {
  const directSurroundingPoints = [{
    x: x + 1,
    y,
  }, {
    x,
    y: y + 1
  }, {
    x: x - 1,
    y
  }, {
    x,
    y: y - 1
  }].map(el => ({
    ...el,
    cost: DIRECT_MOVE
  }));

  const crossSurroundingPoints = [{
    x: x + 1,
    y: y + 1,
  }, {
    x: x - 1,
    y: y + 1
  }, {
    x: x + 1,
    y: y - 1
  }, {
    x: x - 1,
    y: y - 1
  }].map(el => ({
    ...el,
    cost: CROSS_MOVE
  }));

  return [...directSurroundingPoints, ...crossSurroundingPoints]
    .filter(({ x: xToCheck, y: yToCheck }) => xToCheck > -1 && yToCheck > -1 && xToCheck < maxRow && yToCheck < maxColumn);
};


export const findMinWeightElement = openList => Object.keys(openList)
  .map(key => openList[key])
  .reduce((prev, curr) => {
    if (prev.weight > curr.weight) {
      return curr;
    }

    return prev;
  }, { weight: Infinity });

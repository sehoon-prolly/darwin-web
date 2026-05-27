import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { MiniGameProps } from "../types/game";

type Cell = {
  col: number;
  row: number;
};

type EndpointKind = "beak" | "food";

type Endpoint = Cell & {
  id: string;
  label: string;
  note: string;
  kind: EndpointKind;
  color: string;
  correctBeakId?: string;
};

type DrawnPath = {
  cells: Cell[];
  foodId?: string;
};

const GRID_COLS = 7;
const GRID_ROWS = 6;

const beakEndpoints: Endpoint[] = [
  {
    id: "strong",
    label: "굵은 부리",
    note: "강한 힘",
    kind: "beak",
    col: 1,
    row: 0,
    color: "#ffde4d",
  },
  {
    id: "thin",
    label: "가는 부리",
    note: "작은 먹이",
    kind: "beak",
    col: 0,
    row: 2,
    color: "#37e2ff",
  },
  {
    id: "long",
    label: "긴 부리",
    note: "깊은 꽃",
    kind: "beak",
    col: 1,
    row: 5,
    color: "#70f05a",
  },
];

const foodEndpoints: Endpoint[] = [
  {
    id: "seed",
    label: "딱딱한 씨앗",
    note: "건조한 섬",
    kind: "food",
    col: 5,
    row: 3,
    color: "#ffde4d",
    correctBeakId: "strong",
  },
  {
    id: "insect",
    label: "곤충",
    note: "숲이 많은 섬",
    kind: "food",
    col: 6,
    row: 1,
    color: "#37e2ff",
    correctBeakId: "thin",
  },
  {
    id: "cactus",
    label: "선인장 열매",
    note: "선인장 지대",
    kind: "food",
    col: 6,
    row: 5,
    color: "#70f05a",
    correctBeakId: "long",
  },
];

const endpoints = [...beakEndpoints, ...foodEndpoints];

function cellKey(cell: Cell) {
  return `${cell.col}-${cell.row}`;
}

function sameCell(a: Cell, b: Cell) {
  return a.col === b.col && a.row === b.row;
}

function isAdjacent(a: Cell, b: Cell) {
  return Math.abs(a.col - b.col) + Math.abs(a.row - b.row) === 1;
}

function getEndpointAt(cell: Cell) {
  return endpoints.find((endpoint) => sameCell(endpoint, cell));
}

function getBeak(beakId: string) {
  return beakEndpoints.find((endpoint) => endpoint.id === beakId);
}

function getFood(foodId?: string) {
  return foodEndpoints.find((endpoint) => endpoint.id === foodId);
}

function getPathColor(beakId: string) {
  return getBeak(beakId)?.color ?? "#fff8e6";
}

function getEndpointStyle(endpoint: Endpoint): CSSProperties {
  return {
    "--node-color": endpoint.color,
  } as CSSProperties;
}

function getCellStyle(endpoint?: Endpoint): CSSProperties | undefined {
  if (!endpoint) {
    return undefined;
  }

  return getEndpointStyle(endpoint);
}

function getLinePoint(cell: Cell) {
  return {
    x: cell.col + 0.5,
    y: cell.row + 0.5,
  };
}

function createGridCells() {
  return Array.from({ length: GRID_ROWS * GRID_COLS }, (_, index) => ({
    col: index % GRID_COLS,
    row: Math.floor(index / GRID_COLS),
  }));
}

function isCompleted(path?: DrawnPath) {
  return Boolean(path?.foodId);
}

export default function BeakFoodMatchingGame({ onComplete }: MiniGameProps) {
  const [activeBeakId, setActiveBeakId] = useState<string | null>(null);
  const [paths, setPaths] = useState<Record<string, DrawnPath>>({});
  const [submitted, setSubmitted] = useState(false);

  const cells = useMemo(() => createGridCells(), []);
  const completedCount = beakEndpoints.filter((beak) =>
    isCompleted(paths[beak.id]),
  ).length;
  const activeBeak = activeBeakId ? getBeak(activeBeakId) : null;

  const occupiedCells = useMemo(() => {
    const occupied = new Map<string, string>();

    Object.entries(paths).forEach(([beakId, path]) => {
      path.cells.forEach((cell) => {
        occupied.set(cellKey(cell), beakId);
      });
    });

    return occupied;
  }, [paths]);

  const allMatched = beakEndpoints.every((beak) => isCompleted(paths[beak.id]));

  const canUseCell = (cell: Cell, beakId: string) => {
    const endpoint = getEndpointAt(cell);
    const occupiedBy = occupiedCells.get(cellKey(cell));

    if (occupiedBy && occupiedBy !== beakId) {
      return false;
    }

    if (!endpoint) {
      return true;
    }

    if (endpoint.kind === "food") {
      return !Object.entries(paths).some(
        ([currentBeakId, path]) =>
          currentBeakId !== beakId && path.foodId === endpoint.id,
      );
    }

    return endpoint.id === beakId;
  };

  const startPath = (beakId: string) => {
    const beak = getBeak(beakId);

    if (!beak) {
      return;
    }

    setPaths((currentPaths) => ({
      ...currentPaths,
      [beakId]: {
        cells: [{ col: beak.col, row: beak.row }],
      },
    }));
    setActiveBeakId(beakId);
  };

  const handleCellClick = (cell: Cell) => {
    if (submitted) {
      return;
    }

    const endpoint = getEndpointAt(cell);

    if (!activeBeakId) {
      if (endpoint?.kind === "beak") {
        startPath(endpoint.id);
      }
      return;
    }

    const currentPath = paths[activeBeakId];

    if (!currentPath || isCompleted(currentPath)) {
      if (endpoint?.kind === "beak") {
        startPath(endpoint.id);
      }
      return;
    }

    const lastCell = currentPath.cells[currentPath.cells.length - 1];
    const previousCell = currentPath.cells[currentPath.cells.length - 2];

    if (sameCell(cell, lastCell)) {
      return;
    }

    if (endpoint?.kind === "beak") {
      startPath(endpoint.id);
      return;
    }

    if (previousCell && sameCell(cell, previousCell)) {
      setPaths((currentPaths) => ({
        ...currentPaths,
        [activeBeakId]: {
          cells: currentPath.cells.slice(0, -1),
        },
      }));
      return;
    }

    if (!isAdjacent(lastCell, cell) || !canUseCell(cell, activeBeakId)) {
      return;
    }

    if (
      currentPath.cells
        .slice(0, -1)
        .some((pathCell) => sameCell(pathCell, cell))
    ) {
      return;
    }

    setPaths((currentPaths) => ({
      ...currentPaths,
      [activeBeakId]: {
        cells: [...currentPath.cells, cell],
        foodId: endpoint?.kind === "food" ? endpoint.id : undefined,
      },
    }));

    if (endpoint?.kind === "food") {
      setActiveBeakId(null);
    }
  };

  const handleSubmit = () => {
    const success = beakEndpoints.every((beak) => {
      const targetFood = foodEndpoints.find(
        (food) => food.correctBeakId === beak.id,
      );

      return paths[beak.id]?.foodId === targetFood?.id;
    });

    setSubmitted(true);
    onComplete({
      success,
      gainedElements: success
        ? ["natural_selection_clue"]
        : ["incomplete_adaptation"],
    });
  };

  const handleReset = () => {
    setPaths({});
    setActiveBeakId(null);
    setSubmitted(false);
  };

  return (
    <section className="mini-game-card beak-game flow-game">
      <div className="flow-game-header">
        <button
          className="flow-control-button"
          type="button"
          onClick={handleReset}
          aria-label="연결 다시 시작"
        >
          RESET
        </button>
        <div className="flow-game-title">
          <p>LEVEL 1</p>
          <h2>분류 연결</h2>
        </div>
        <div className="flow-line-counter">
          <span>LINES</span>
          <strong>
            {completedCount}/{beakEndpoints.length}
          </strong>
        </div>
      </div>

      <div className="connection-status">
        <span>
          {activeBeak
            ? `${activeBeak.label} 경로 그리는 중`
            : "같은 색 점을 겹치지 않게 연결하세요"}
        </span>
      </div>

      <div
        className="connection-board"
        style={
          {
            "--grid-cols": GRID_COLS,
            "--grid-rows": GRID_ROWS,
          } as CSSProperties
        }
        aria-label="부리와 먹이 격자 연결 퍼즐"
      >
        <svg
          className="connection-lines"
          viewBox={`0 0 ${GRID_COLS} ${GRID_ROWS}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <filter id="connection-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="0.08" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {Object.entries(paths).flatMap(([beakId, path]) =>
            path.cells.slice(1).map((cell, index) => {
              const previousCell = path.cells[index];
              const start = getLinePoint(previousCell);
              const end = getLinePoint(cell);

              return (
                <line
                  className="connection-line"
                  key={`${beakId}-${index}`}
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke={getPathColor(beakId)}
                  filter="url(#connection-glow)"
                />
              );
            }),
          )}
          {Object.entries(paths).map(([beakId, path]) => {
            const lastCell = path.cells[path.cells.length - 1];
            const end = getLinePoint(lastCell);
            const isActiveEnd = activeBeakId === beakId;

            return (
              <g className="connection-line-end-group" key={`${beakId}-end`}>
                <circle
                  className={`connection-line-end ${
                    isActiveEnd ? "is-active" : ""
                  }`}
                  cx={end.x}
                  cy={end.y}
                  r="0.24"
                  fill={getPathColor(beakId)}
                />
                <circle
                  className="connection-line-end-core"
                  cx={end.x}
                  cy={end.y}
                  r="0.1"
                  fill="#fff8e6"
                />
              </g>
            );
          })}
        </svg>

        <div className="connection-grid">
          {cells.map((cell) => {
            const endpoint = getEndpointAt(cell);
            const ownerBeakId = occupiedCells.get(cellKey(cell));
            const isActivePathCell = ownerBeakId === activeBeakId;
            const ownerFood = getFood(paths[ownerBeakId ?? ""]?.foodId);
            const isConnectedFood =
              endpoint?.kind === "food" && ownerFood?.id === endpoint.id;
            const pathColor =
              endpoint?.color ??
              (ownerBeakId ? getPathColor(ownerBeakId) : undefined);

            return (
              <button
                className={`connection-cell ${
                  endpoint ? `has-endpoint ${endpoint.kind}` : ""
                } ${ownerBeakId ? "has-path" : ""} ${
                  isActivePathCell ? "is-active-path" : ""
                } ${isConnectedFood ? "is-connected-endpoint" : ""} ${
                  activeBeakId === endpoint?.id ? "is-active-endpoint" : ""
                }`}
                key={cellKey(cell)}
                type="button"
                style={
                  pathColor
                    ? ({
                        "--node-color": pathColor,
                      } as CSSProperties)
                    : undefined
                }
                aria-label={
                  endpoint
                    ? `${endpoint.label} ${endpoint.kind === "beak" ? "시작점" : "도착점"}`
                    : `${cell.col + 1}열 ${cell.row + 1}행`
                }
                onClick={() => handleCellClick(cell)}
              >
                {endpoint ? (
                  <span className="connection-endpoint" style={getCellStyle(endpoint)}>
                    <span className="connection-dot" />
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mini-game-footer">
        <p>
          {activeBeak
            ? "인접한 격자 칸을 눌러 길을 잇고, 먹이 점까지 연결하세요."
            : "같은 관계의 부리와 먹이를 격자 선이 겹치지 않게 연결하세요."}
        </p>
        <button
          className="submit-match-button"
          type="button"
          disabled={!allMatched || submitted}
          onClick={handleSubmit}
        >
          제출하기
        </button>
      </div>
    </section>
  );
}

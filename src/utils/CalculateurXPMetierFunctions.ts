// src/utils/levelUtils.ts
export type LevelRow = {
  level: number;
  nextXp: number | null;   // null au dernier niveau
  totalXp: number;         // XP cumulée à l'entrée du niveau
};

export function totXp(level: number): number {
  return 0.5 * level * (level - 1) * 150 + level * 75;
}

export function nextXp(level: number): number {
  return level * 150 + 75;
}

export function generateLevelRows(maxLevel: number = 155): LevelRow[] {
  return Array.from({ length: maxLevel + 1 }, (_, level) => ({
    level,
    nextXp: level < maxLevel ? nextXp(level) : null,
    totalXp: totXp(level),
  }));
}

export type PalierXp = {
  palier: number;
  xpRequired: number;
};


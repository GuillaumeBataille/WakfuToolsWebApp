/******************************
 * simulate.ts — Logique de calcul XP
 ******************************/

export type CraftMode = "normal" | "booster" | "boosterGuild";

export interface SimulationResult {
  resourceTotals: Map<number, number>;
  recipeCrafts: Map<number, number>;
  recipeXp: Map<number, number>;
  logs: LogEntry[];
  totals: { totalResources: number; totalCrafts: number; totalXp: number; finalLevel: number };
  error?: string;
}

export interface LogEntry {
  from: number;
  to: number;
  crafts: number;
  recipeLevel: number;
  xpPerCraft: number;
  aimed: number;
}

/******************************
 * CONSTANTES
 ******************************/
const XP_PER_CRAFT_MODE: Record<CraftMode, number> = {
  normal: 300,
  booster: 300 * 1.5,
  boosterGuild: 300 * 1.5 * 1.05,
};

// XP pour passer de n -> n+1
function xpNext(n: number): number {
  return 75 + 150 * n;
}

// XP cumulée 0 -> L
function xpCumulative(L: number): number {
  return 75 * L * L;
}

// Recettes disponibles: 5, 15, 25, ... <= targetLevel
function recipeLevelsUpTo(target: number): number[] {
  const arr = [];
  for (let p = 5; p <= target; p += 10) arr.push(p);
  return arr;
}

// XP effective d'un craft en tenant compte de la dégressivité
function effectiveCraftXp(baseXp: number, playerLevel: number, recipeLevel: number): number {
  const diff = playerLevel - recipeLevel;
  if (diff <= 10) return baseXp;
  if (diff >= 20) return 0;
  const factor = 1 - (diff - 10) / 10;
  return baseXp * factor;
}

// Choisit la meilleure recette disponible (max XP effective)
function chooseBestRecipe(playerLevel: number, recipes: number[], baseXp: number) {
  const available = recipes.filter((r) => r <= playerLevel);
  if (available.length === 0) return null;
  let best: number | null = null;
  let bestXp = -1;
  for (const r of available) {
    const eff = effectiveCraftXp(baseXp, playerLevel, r);
    if (eff > bestXp) {
      bestXp = eff;
      best = r;
    }
  }
  return best ? { level: best, xpPerCraft: bestXp } : null;
}

/******************************
 * SIMULATION
 ******************************/
export function simulate({
  startLevel,
  targetLevel,
  mode,
}: {
  startLevel: number;
  targetLevel: number;
  mode: CraftMode;
}): SimulationResult {
  const baseXpPerCraft = XP_PER_CRAFT_MODE[mode];
  const recipes = recipeLevelsUpTo(targetLevel);

  const resourceTotals = new Map<number, number>();
  const recipeCrafts = new Map<number, number>();
  const recipeXp = new Map<number, number>();
  const logs: LogEntry[] = [];

  let level = startLevel;
  let currentCumulativeXp = xpCumulative(level);

  if (level < 5) {
    return { error: "Aucune recette craftable avant le niveau 5. Commence au moins à 5." } as SimulationResult;
  }

  while (level < targetLevel) {
    const nextLevel = level + 1;
    const xpTarget = xpCumulative(nextLevel);
    const xpToGain = xpTarget - currentCumulativeXp;

    const choice = chooseBestRecipe(level, recipes, baseXpPerCraft);
    if (!choice || choice.xpPerCraft <= 0) break;

    const crafts = Math.ceil(xpToGain / choice.xpPerCraft);

    const palierA = choice.level;
    const palierB = choice.level - 5;
    const addRes = (p: number, qty: number) =>
      resourceTotals.set(p, (resourceTotals.get(p) || 0) + qty);
    addRes(palierA, 5 * crafts);
    addRes(palierB, 5 * crafts);

    recipeCrafts.set(palierA, (recipeCrafts.get(palierA) || 0) + crafts);
    recipeXp.set(palierA, (recipeXp.get(palierA) || 0) + crafts * choice.xpPerCraft);

    currentCumulativeXp += crafts * choice.xpPerCraft;

    while (level < targetLevel && currentCumulativeXp + 1e-9 >= xpCumulative(level + 1)) {
      level++;
    }

    logs.push({
      from: nextLevel - 1,
      to: level,
      crafts,
      recipeLevel: choice.level,
      xpPerCraft: choice.xpPerCraft,
      aimed: xpToGain,
    });
  }

  for (let p = 0; p <= targetLevel; p += 5) {
    if (!resourceTotals.has(p)) resourceTotals.set(p, 0);
  }

  const totalResources = Array.from(resourceTotals.values()).reduce((a, b) => a + b, 0);
  const totalCrafts = Array.from(recipeCrafts.values() || []).reduce((a, b) => a + b, 0);
  const totalXp = Array.from(recipeXp.values() || []).reduce((a, b) => a + b, 0);

  return {
    resourceTotals: new Map([...resourceTotals.entries()].sort((a, b) => a[0] - b[0])),
    recipeCrafts: new Map([...recipeCrafts.entries()].sort((a, b) => a[0] - b[0])),
    recipeXp,
    logs,
    totals: { totalResources, totalCrafts, totalXp, finalLevel: level },
  };
}

export type Difficulty = "easy" | "medium" | "hard";

export const DifficultyTolerance: Record<Difficulty, number> = {
    easy: 0.55,
    medium: 0.35,
    hard: 0.18,
};

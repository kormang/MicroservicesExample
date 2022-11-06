const penaltySchedule = [
    [60, 1],
    [80, 2],
    [100, 5],
] as const;

let summedScore = 0;
const summedScores = [0];
for (let i = 1; i < penaltySchedule.length; ++i) {
    summedScore +=
        (penaltySchedule[i][0] - penaltySchedule[i - 1][0]) *
        penaltySchedule[i - 1][1];
    summedScores.push(summedScore);
}

export function calculatePenaltyScore(speed: number): number {
    let score = 0;
    for (let i = penaltySchedule.length - 1; i >= 0; --i) {
        if (speed > penaltySchedule[i][0]) {
            score = (speed - penaltySchedule[i][0]) * penaltySchedule[i][1];
            score += summedScores[i];
            break;
        }
    }

    return score;
}

import { calculatePenaltyScore } from '../../../src/policies/penaltyCalc';

describe('calculatePenaltyScore', () => {
    it('returns 0 when speed is below min penalty', () => {
        const score = calculatePenaltyScore(59);
        expect(score).toBe(0);
    });

    it('returns 0 when speed is at min penalty', () => {
        const score = calculatePenaltyScore(60);
        expect(score).toBe(0);
    });

    it('returns (1) when speed is just above min penalty', () => {
        const score = calculatePenaltyScore(61);
        expect(score).toBe(1);
    });

    it('returns correct result when speed is above min penalty', () => {
        const score = calculatePenaltyScore(66);
        expect(score).toBe(6);
    });

    it('returns correct result when speed is at mid penalty', () => {
        const score = calculatePenaltyScore(80);
        expect(score).toBe(20);
    });

    it('returns correct result when speed is just above mid penalty', () => {
        const score = calculatePenaltyScore(81);
        expect(score).toBe(22);
    });

    it('returns correct result when speed is above mid penalty', () => {
        const score = calculatePenaltyScore(99);
        expect(score).toBe(58);
    });

    it('returns correct result when speed is at high penalty', () => {
        const score = calculatePenaltyScore(100);
        expect(score).toBe(60);
    });

    it('returns correct result when speed is above high penalty', () => {
        const score = calculatePenaltyScore(120);
        expect(score).toBe(160);
    });
});

import { describe, expect, it } from "vitest";
import { calcNGain, calcScore } from "./scoring";
import { buildResearchCSV } from "./csv";

describe("calcScore", () => {
  it("menghitung skor 0–100", () => {
    expect(calcScore(4, 5)).toBe(80);
    expect(calcScore(0, 5)).toBe(0);
  });
});

describe("calcNGain", () => {
  it("menghitung N-Gain", () => {
    expect(calcNGain(40, 70)).toBeCloseTo(0.5);
  });
  it("mengembalikan null jika pre-test sudah 100", () => {
    expect(calcNGain(100, 100)).toBeNull();
  });
});

describe("buildResearchCSV", () => {
  it("mengembalikan null jika belum ada data", () => {
    expect(buildResearchCSV({}, [])).toBeNull();
  });
});

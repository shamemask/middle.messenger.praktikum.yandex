import { expect } from "chai";
import { RunTest } from "./testing";

describe("Typescript test", () => {
  it("should be able to execute a test", () => {
    expect(true);
  });

  it("should return string correctly", () => {
    expect(RunTest("accept"), "Accept mocha");
  });
});

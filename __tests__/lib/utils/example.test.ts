/**
 * Example Test File
 *
 * This file demonstrates how to write tests using Jest and TypeScript.
 * It shows different testing techniques and best practices.
 */

import { describe, expect, jest, test } from "@jest/globals";

// Define only the functions we actually use in tests
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function classifyNumber(num: number): string {
  if (num > 0) return "positive";
  if (num < 0) return "negative";
  return "zero";
}

describe("Number utilities", () => {
  test("formatNumber formats numbers with commas", () => {
    expect(formatNumber(1000)).toBe("1,000");
    expect(formatNumber(1000000)).toBe("1,000,000");
    expect(formatNumber(0)).toBe("0");
    expect(formatNumber(-1000)).toBe("-1,000");
  });

  test("classifyNumber correctly classifies numbers", () => {
    expect(classifyNumber(5)).toBe("positive");
    expect(classifyNumber(-5)).toBe("negative");
    expect(classifyNumber(0)).toBe("zero");
  });

  test("formatNumber with specific values", () => {
    expect(formatNumber(1000)).toBe("1,000");
    expect(formatNumber(1000000)).toBe("1,000,000");
    expect(formatNumber(0)).toBe("0");
    expect(formatNumber(-1000)).toBe("-1,000");
  });
});

// Testing asynchronous functionality
describe("Asynchronous tests", () => {
  test("local fetchData returns data", async () => {
    // Define a local fetchData function for this test
    async function fetchData(): Promise<string> {
      // Simulate an API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("data");
        }, 100);
      });
    }

    const data = await fetchData();
    expect(data).toBe("data");
  });

  test("mock fetchData resolves to data", async () => {
    // Define and use fetchData only in this test with proper typing
    type DataFunction = () => Promise<string>;
    const mockFetchData = jest.fn<DataFunction>().mockResolvedValue("data");

    await expect(mockFetchData()).resolves.toBe("data");
  });
});

// Testing with mocks
describe("Function mocking", () => {
  test("calculateTotal calls calculateTax and adds the result", () => {
    // Local tax calculation function with proper typing
    type TaxFunction = (amount: number) => number;
    const mockCalculateTax = jest.fn<TaxFunction>().mockReturnValue(10);

    // Local function that uses the mock
    function localCalculateTotal(amount: number, taxFn: TaxFunction): number {
      return amount + taxFn(amount);
    }

    const total = localCalculateTotal(100, mockCalculateTax);

    expect(mockCalculateTax).toHaveBeenCalledWith(100);
    expect(total).toBe(110);
  });
});

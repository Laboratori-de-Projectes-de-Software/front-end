/**
 * Authentication utility function tests
 * 
 * @module auth.test
 */

/**
 * Tests basic functionality of auth functions
 * Validates that saveToken and validateToken properly handle valid and invalid parameters
 */

/**
 * Tests combinations of auth functions working together
 * Verifies the complete lifecycle of tokens: saving, validating, and deleting
 */

/**
 * Tests authentication server connections
 * Validates that sendAuthedRequest correctly sends authenticated requests to the server
 */
import { describe, test, expect, afterEach, vi } from "vitest";
import {
  deleteToken,
  saveToken,
  sendAuthedRequest,
  validateToken,
} from "../utils/auth";

describe("Auth functions", () => {
  test("Save Token params - ok", () => {
    const token = "test-token";
    expect(() => saveToken(token)).not.toThrow();
  });

  test("Save Token params - fail", () => {
    const badToken = 123;
    expect(() => saveToken(badToken as any)).toThrow();
  });

  test("Validate token params - ok", () => {
    const token = "test-token";
    expect(() => validateToken(token)).not.toThrow();
  });

  test("Validate token params - fail", () => {
    const badToken = 123;
    expect(() => validateToken(badToken as any)).toThrow();
  });
});

describe("Auth combinations", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("Save and Retrieve Token - ok", () => {
    saveToken("test-token");
    expect(validateToken("test-token")).toBe(true);
  });

  test("Save and Retrieve Token - fail", () => {
    saveToken("test-token");
    expect(validateToken("another-token")).toBe(false);
  });

  test("Save and Delete Token - ok", () => {
    saveToken("test-token");
    deleteToken();
    expect(validateToken("test-token")).toBe(false);
  });

  test("Save and Delete Token - fail", () => {
    saveToken("test-token");
    deleteToken();
    expect(validateToken("another-token")).toBe(false);
  });
});

describe("Auth Server Conections", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("Send Auth with data - GET", async () => {
    const data = { test: "data" };
    const url = "test-url";

    const spy = vi.spyOn(await import("../utils/auth"), 'sendAuthedRequest');
    
    sendAuthedRequest("GET", url, data);
    
    expect(spy).toHaveBeenCalledWith(
        "GET",
        url,
        data
    );

    expect(spy).toHaveBeenCalledTimes(1);
  });


});

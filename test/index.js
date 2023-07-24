const assert = require("node:assert");
const { it } = require("node:test");

const isFirefoxOrder = require("../index");

it("should return true with node:http library headers", () => {
  const expected = true;
  const headers = {
    host: "",
    "user-agent": "",
    accept: "",
    "accept-language": "",
    "accept-encoding": "",
  };

  const actual = isFirefoxOrder(headers);

  assert.strictEqual(expected, actual);
});

it("should ignore casing", () => {
  const expected = true;
  const headers = {
    HOST: "",
    "User-Agent": "",
    aCcEpT: "",
    "accept-language": "",
    "accept-encoding": "",
  };

  const actual = isFirefoxOrder(headers);

  assert.strictEqual(expected, actual);
});

it("should return false with non-firefox order", () => {
  const expected = false;
  const headers = {
    "accept-language": "",
    "user-agent": "",
    "accept-encoding": "",
    host: "",
    accept: "",
  };

  const actual = isFirefoxOrder(headers);

  assert.strictEqual(expected, actual);
});

it("should work with arrays", () => {
  const expected = true;
  const headers = [
    "host",
    "user-agent",
    "accept",
    "accept-language",
    "accept-encoding",
  ];

  const actual = isFirefoxOrder(headers);

  assert.strictEqual(expected, actual);
});

it("should work with entries", () => {
  const expected = true;
  const headers = [
    ["host", ""],
    ["user-agent", ""],
    ["accept", ""],
    ["accept-language", ""],
    ["accept-encoding", ""],
  ];

  const actual = isFirefoxOrder(headers);

  assert.strictEqual(expected, actual);
});

it("should throw on unknown entries", () => {
  const expected = {
    message: "Input protocol is unknown",
  };
  const headers = [
    ["host", ""],
    ["accept-language", Object.apply],
    ["user-agent", ""],
    ["accept", ""],
    ["accept-encoding", ""],
  ];

  const actual = () => isFirefoxOrder(headers);

  assert.throws(actual, expected);
});

it("should throw on unknown protocol", () => {
  const expected = {
    message: "Input protocol is unknown",
  };
  const headers = [
    "host",
    "accept-language",
    Object.apply,
    "accept",
    "accept-encoding",
  ];

  const actual = () => isFirefoxOrder(headers);

  assert.throws(actual, expected);
});

it("should work with rawHeaders entries", () => {
  const expected = true;
  const headers = [
    "user-agent",
    "this is invalid because there can be only one",
    "Host",
    "127.0.0.1:8000",
    "accept-language",
    "",
    "User-Agent",
    "curl/7.22.0",
    "ACCEPT",
    "*",
    "ACCEPT-lAnGuAgE",
    "en",
    "ACCEPT-encoding",
    "gzip",
  ];

  const actual = isFirefoxOrder(headers, { areRawHeaders: true });

  assert.strictEqual(expected, actual);
});

it("should throw on unknown rawHeaders entries", () => {
  const expected = {
    message: "Input protocol is unknown",
  };
  const headers = [
    "user-agent",
    "this is invalid because there can be only one",
    "Host",
    "127.0.0.1:8000",
    "accept-language",
    "",
    Object.apply,
    "curl/7.22.0",
    "ACCEPT",
    "*",
    "ACCEPT-encoding",
    "gzip",
  ];

  const actual = () => isFirefoxOrder(headers, { areRawHeaders: true });

  assert.throws(actual, expected);
});

it("should throw on odd rawHeaders entries", () => {
  const expected = {
    message: "Input protocol is unknown",
  };
  const headers = [
    "user-agent",
    "this is invalid because there can be only one",
    "Host",
    "127.0.0.1:8000",
    "accept-language",
    "",
    "ACCEPT",
    "*",
    "ACCEPT-encoding",
    "gzip",
    "node",
  ];

  const actual = () => isFirefoxOrder(headers, { areRawHeaders: true });

  assert.throws(actual, expected);
});

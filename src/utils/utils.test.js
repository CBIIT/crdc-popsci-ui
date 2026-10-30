
/**
 * Mock graphqlClient to prevent Apollo Client initialization errors.
 * This allows tests that import modules dependent on graphqlClient to run successfully.
 */
jest.mock("../utils/graphqlClient", () => ({
  client: {
    query: jest.fn(),
    mutate: jest.fn(),
  },
}));

jest.mock('../pages/dashTemplate/sideBar/BentoFilterUtils', () => ({
  onClearAllAndSelectFacetValue: jest.fn(),
}));

import {
  removeSquareBracketsFromString,
  convertCRDCLinksToValue,
  customSorting,
  navigatedToDashboard,
} from './utils';
import { onClearAllAndSelectFacetValue } from '../pages/dashTemplate/sideBar/BentoFilterUtils';

describe('navigatedToDashboard', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('calls the dashboard facet selector with study and provided code', () => {
    navigatedToDashboard('STUDY-001');

    expect(onClearAllAndSelectFacetValue).toHaveBeenCalledWith('study', 'STUDY-001');
  });
});

describe('convertCRDCLinksToValue', () => {
  it('converts CRDCLinks length using the first object key when key is not provided', () => {
    const input = {
      node: [
        { id: 1, CRDCLinks: ['a', 'b'] },
        { id: 2, CRDCLinks: [] },
      ],
    };

    const result = convertCRDCLinksToValue(input);

    expect(result.node[0]).toEqual({
      id: 1,
      CRDCLinks: 2,
      links: ['a', 'b'],
    });
    expect(result.node[1]).toEqual({
      id: 2,
      CRDCLinks: 0,
      links: [],
    });
  });

  it('converts CRDCLinks length only for the provided key', () => {
    const input = {
      listA: [{ id: 1, CRDCLinks: ['x'] }],
      listB: [{ id: 2, CRDCLinks: ['y', 'z'] }],
    };

    const result = convertCRDCLinksToValue(input, 'listB');

    expect(result.listA[0]).toEqual({ id: 1, CRDCLinks: ['x'] });
    expect(result.listB[0]).toEqual({
      id: 2,
      CRDCLinks: 2,
      links: ['y', 'z'],
    });
  });
});

describe('customSorting', () => {
  it('returns -1 when first value is lower', () => {
    expect(customSorting(1, 2)).toBe(-1);
  });

  it('returns 1 when first value is higher', () => {
    expect(customSorting(3, 2)).toBe(1);
  });

  it('returns 0 when values are equal', () => {
    expect(customSorting(4, 4)).toBe(0);
  });
});

describe("removeSquareBracketsFromString", () => {
  it("should remove square brackets from a string with brackets", () => {
    const input = "[Gemtuzumab ozogamicin, Bicalutamide]";
    const expected = "Gemtuzumab ozogamicin, Bicalutamide";
    expect(removeSquareBracketsFromString(input)).toBe(expected);
  });

  it("should remove only opening bracket", () => {
    const input = "[Hello World";
    const expected = "Hello World";
    expect(removeSquareBracketsFromString(input)).toBe(expected);
  });

  it("should remove only closing bracket", () => {
    const input = "Hello World]";
    const expected = "Hello World";
    expect(removeSquareBracketsFromString(input)).toBe(expected);
  });

  it("should remove multiple pairs of brackets", () => {
    const input = "[First] and [Second]";
    const expected = "First and Second";
    expect(removeSquareBracketsFromString(input)).toBe(expected);
  });

  it("should return the same string if no brackets present", () => {
    const input = "No brackets here";
    const expected = "No brackets here";
    expect(removeSquareBracketsFromString(input)).toBe(expected);
  });

  it("should handle empty string", () => {
    const input = "";
    const expected = "";
    expect(removeSquareBracketsFromString(input)).toBe(expected);
  });

  it("should handle string with only brackets", () => {
    const input = "[]";
    const expected = "";
    expect(removeSquareBracketsFromString(input)).toBe(expected);
  });

  it("should handle nested brackets", () => {
    const input = "[[nested]]";
    const expected = "nested";
    expect(removeSquareBracketsFromString(input)).toBe(expected);
  });
});
jest.mock("../utils/graphqlClient", () => ({
  __esModule: true,
  default: { query: jest.fn() },
}));

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import client from "../utils/graphqlClient";
import { queryCountAPI, queryResultAPI } from "./search";
import ValueCard from "../pages/search/Cards/ValueCard";

describe("search API helpers", () => {
  it("renders the property name on a Data Model result card", () => {
    const markup = renderToStaticMarkup(
      <ValueCard
        data={{
          type: "property",
          node_name: "study",
          property_name: "participant_age",
          property_description: "Participant age in years",
        }}
      />,
    );

    expect(markup).toContain("Property Name:");
    expect(markup).toContain("participant_age");
  });

  it("returns counts supplied by the API", async () => {
    client.query.mockClear();
    const counts = {
      study_count: 2,
      model_count: 1001,
      about_count: 1,
    };
    client.query.mockResolvedValue({
      data: {
        globalSearch: counts,
      },
    });

    const result = await queryCountAPI("age");

    expect(result).toEqual(counts);
    expect(client.query).toHaveBeenCalledTimes(1);
    expect(client.query.mock.calls[0][0].variables).toEqual({ input: "age" });
  });

  it("passes the requested first and offset to the API and returns its model rows", async () => {
    client.query.mockClear();
    const apiResults = [
      { type: "value", node_name: "study", property_name: "age" },
      { type: "property", node_name: "study", property_name: "age" },
      { type: "property", node_name: "study", property_name: "age" },
    ];
    client.query.mockResolvedValue({
      data: {
        globalSearch: {
          model: apiResults,
        },
      },
    });

    const input = {
      input: "age",
      first: 2,
      offset: 2,
    };
    const results = await queryResultAPI("model", input);

    expect(results).toEqual(apiResults);
    expect(client.query).toHaveBeenCalledTimes(1);
    expect(client.query.mock.calls[0][0].variables).toEqual(input);
  });
});

import gql from "graphql-tag";
import client from "../utils/graphqlClient";

/** certain search data items */
/** used by the Global Search header autocomplete */
const AUTOCOMPLETE_SEARCH_KEYS = ["gs_list"];
const AUTOCOMPLETE_SEARCH_DATAFIELDS = ["autocomplete_list"];

const RESULT_TYPE_BY_FIELD = {
  study: "study",
  about_page: "about",
};

export const SEARCH_KEYS = {
  public: AUTOCOMPLETE_SEARCH_KEYS,
  private: AUTOCOMPLETE_SEARCH_KEYS,
};

export const SEARCH_DATAFIELDS = {
  public: AUTOCOMPLETE_SEARCH_DATAFIELDS,
  private: AUTOCOMPLETE_SEARCH_DATAFIELDS,
};

/** used by the Global Search page results */
export const SEARCH_PAGE_KEYS = {
  private: [...SEARCH_KEYS.private, "model_search"],
  public: [...SEARCH_KEYS.public, "model_search"],
};

export const SEARCH_PAGE_DATAFIELDS = {
  public: [...SEARCH_DATAFIELDS.public, "node"],
  private: [...SEARCH_DATAFIELDS.private, "node"],
};

// AutoComplete main Query
export const SEARCH = gql`
  query globalSearch($input: String) {
    globalSearch(input: $input) {
      study {
        study_short_name
      }
      gs_list {
        autocomplete_list
      }
      model_search {
        node
      }
    }
  }
`;

export const SEARCH_PAGE_RESULT_STUDY = gql`
  query globalSearch($input: String, $first: Int, $offset: Int) {
    globalSearch(input: $input, first: $first, offset: $offset) {
      study {
        study_name
        study_short_name
        study_participant_minimum_age
        study_participant_maximum_age
        study_design
        number_of_participants
        cancer_type_count
      }
    }
  }
`;

export const SEARCH_PAGE_RESULT_MODEL = gql`
  query globalSearch($input: String, $first: Int, $offset: Int) {
    globalSearch(input: $input, first: $first, offset: $offset) {
      model {
        type
        node_name
        property_name
        property_description
        property_required
        property_type
        highlight
      }
    }
  }
`;

export const SEARCH_PAGE_RESULT_ABOUT = gql`
  query globalSearch($input: String, $first: Int, $offset: Int) {
    globalSearch(input: $input, first: $first, offset: $offset) {
      about_page {
        type
        text
        page
        title
      }
    }
  }
`;

export const SEARCH_PAGE_RESULTS = gql`
  query globalSearch($input: String, $first: Int, $offset: Int) {
    globalSearch(input: $input, first: $first, offset: $offset) {
      study_count
      model_count
      about_count
    }
  }
`;

/**
 * Maps a datafield to the correct search query
 *
 * @param {string} field datatable field name
 */
export function getResultQueryByField(field) {
  switch (field) {
    case "all":
    case "study":
      return SEARCH_PAGE_RESULT_STUDY;
    case "model":
      return SEARCH_PAGE_RESULT_MODEL;
    case "about_page":
      return SEARCH_PAGE_RESULT_ABOUT;
    default:
      return SEARCH_PAGE_RESULT_STUDY;
  }
}

/**
 * Query the backend API for autocomplete results
 *
 * @param {object} inputValue search text
 */
export async function queryAutocompleteAPI(inputValue) {
  const data = await client
    .query({
      query: SEARCH,
      variables: {
        input: inputValue,
      },
    })
    .then((result) => result.data.globalSearch)
    .catch(() => ({}));

  return data;
}

/**
 * Query the backend API for the search result counts by search string
 *
 * @param {string} inputValue search text
 */
export async function queryCountAPI(inputValue) {
  const data = await client
    .query({
      query: SEARCH_PAGE_RESULTS,
      variables: { input: inputValue },
    })
    .then((result) => result.data.globalSearch)
    .catch(() => ({}));

  return data;
}

/**
 * Query the backend API for the search results by datafield
 *
 * @param {string} datafield
 * @param {object} input search query variable input
 */
export async function queryResultAPI(datafield, input) {
  const data = await client
    .query({
      query: getResultQueryByField(datafield),
      variables: input,
    })
    .then((result) => result.data.globalSearch)
    .catch(() => ({}));

  const results = data[datafield] || [];
  const type = RESULT_TYPE_BY_FIELD[datafield];

  return type ? results.map((item) => ({ ...item, type })) : results;
}

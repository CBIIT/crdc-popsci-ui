import { useQuery } from '@apollo/client';

/**
 * A generic hook for fetching mock data via any GraphQL query.
 * It uses a specified Apollo client (default: "mockService") and
 * allows plucking a slice of the response via a selector.
 *
 * @param {Object} options
 * @param {DocumentNode} options.query                – The GraphQL query document
 * @param {Object}       [options.variables={}]       – Variables for the query
 * @param {Function}     [options.selector=data=>data] – Function to extract a piece of the response
 * @param {string}       [options.clientName='mockService'] – Apollo client name for mocks
 *
 * @returns {{ loading: boolean, error: any, mockData: any }}
 */
export function useMockQuery({
  query,
  variables = {},
  selector = data => data,
  clientName = 'mockService',
}) {
  const { loading, error, data } = useQuery(query, {
    variables,
    context: { clientName },
  });

   // Only run selector when data is available
  const mockData = data == null ? undefined : selector(data);

  return { loading, error, mockData };
}
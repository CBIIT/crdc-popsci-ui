import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import env from "./env";

const defaultOptions = {
  query: {
    fetchPolicy: "no-cache",
  },
};

const BACKEND = env.REACT_APP_BACKEND_API;
const LOCAL_SERVICE = "http://localhost:8080/v1/graphql/";


const backendService = new HttpLink({
  uri: BACKEND,
});

const localService = new HttpLink({
  uri: LOCAL_SERVICE,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions,
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === "localService",
    localService,
    backendService,
  ),
});

export default client;

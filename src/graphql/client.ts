import {
  ApolloClient,
  createHttpLink,
  defaultDataIdFromObject,
  InMemoryCache
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import supabase from "./supabase";

const cache = new InMemoryCache({
  dataIdFromObject(responseObject) {
    if ("nodeId" in responseObject) {
      return `${responseObject.nodeId}`;
    }

    return defaultDataIdFromObject(responseObject);
  },
  typePolicies: {
    Query: {
      fields: {
        node: {
          read(_, { args, toReference }) {
            const ref = toReference({
              nodeId: args?.nodeId,
            });

            return ref;
          },
        },
      },
    },
  },
});

const httpLink = createHttpLink({
  uri: "http://127.0.0.1:54321/graphql/v1",
});

const authLink = setContext(async (_, { headers }) => {
  const token = (await supabase.auth.getSession()).data.session?.access_token;

  console.info("token", token);

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default apolloClient;

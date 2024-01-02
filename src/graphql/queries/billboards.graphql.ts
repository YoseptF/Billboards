// @ts-nocheck
import { graphql } from "../generated/gql";

const getFirstNBillboards = graphql`
query getFirstNBillboards ($n: Int!){
  billboardCollection(first: $n){
    edges{
      node{
        name
        address
        postCode
      }
    }
  }
}
`;

export default getBillboards;
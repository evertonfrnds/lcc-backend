import ProductResolver from "@modules/products/infra/http/graphql/product.resolver";
import { NonEmptyArray } from "type-graphql";

interface SchemaApollo {
  resolvers: NonEmptyArray<Function> | NonEmptyArray<string>
}

const schemaApollo: SchemaApollo = {
  resolvers: [ProductResolver],
};
export default schemaApollo;

import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import ProductController from "../controllers/ProductController";
import ProductType from "./product.type";

const productController = new ProductController();

@InputType()
class ProductInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  value: number;
}

@InputType()
class ProductInputUpdate {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  value: number;

  @Field({ nullable: true })
  is_active: boolean;
}

@Resolver(ProductType)
export default class ProductResolver {
  @Query(() => [ProductType])
  async products() {
    const products = await productController.index();

    return products.data;
  }

  @Query(() => ProductType)
  async product(@Arg("id") id: string) {
    const product = await productController.show(id);

    return product;
  }

  @Mutation(() => ProductType)
  async createProduct(
    @Arg("productInput") { name, description, value }: ProductInput
  ) {
    const product = await productController.create({
      name,
      description,
      value,
    });

    return product.data;
  }

  @Mutation(() => ProductType)
  async updateProduct(
    @Arg("id") id: string,
    @Arg("productInput")
    { name, description, value, is_active }: ProductInputUpdate
  ) {
    const product = await productController.update({
      id,
      name,
      description,
      value,
      is_active,
    });

    return product.data;
  }

  @Mutation(() => ProductType)
  async deleteProduct(@Arg("id") id: string) {
    const product = await productController.delete(id);

    return product.data;
  }
}

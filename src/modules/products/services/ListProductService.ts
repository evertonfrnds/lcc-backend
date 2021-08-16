import { inject, injectable } from "tsyringe";

import Product from "../infra/typeorm/entities/Product";
import { IProductRepository } from "../repositories/IProductRepository";

@injectable()
export default class ListProductService {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  public async execute(): Promise<Product[]> {
    const products = await this.productRepository.findAll();

    return products;
  }
}

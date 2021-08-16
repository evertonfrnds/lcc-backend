import { inject, injectable } from "tsyringe";

import Product from "../infra/typeorm/entities/Product";
import { IProductRepository } from "../repositories/IProductRepository";

@injectable()
export default class ShowProductService {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  public async execute(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new Error("Produto não encontrado");
    }

    return product;
  }
}

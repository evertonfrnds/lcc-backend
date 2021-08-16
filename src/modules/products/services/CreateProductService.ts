import { inject, injectable } from "tsyringe";

import Product from "../infra/typeorm/entities/Product";
import { IProductRepository } from "../repositories/IProductRepository";

interface IRequest {
  name: string;
  description: string;
  value: number;
}

@injectable()
export default class CreateProductService {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  public async execute({ name, description, value }: IRequest): Promise<Product> {
    const product = await this.productRepository.create({
      name,
      description,
      value,
      is_active: true,
    });

    return product;
  }
}

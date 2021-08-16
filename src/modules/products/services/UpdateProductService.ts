import { inject, injectable } from "tsyringe";

import Product from "../infra/typeorm/entities/Product";
import { IProductRepository } from "../repositories/IProductRepository";

interface IRequest {
  id: string;
  name?: string;
  description?: string;
  value?: number;
  is_active?: boolean;
}

@injectable()
export default class UpdateProductService {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  public async execute({
    name,
    description,
    value,
    is_active,
    id,
  }: IRequest): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new Error("Produto não encontrado");
    }

    product.name = name ? name : product.name;
    product.description = description ? description : product.description;
    product.value = value ? value : product.value;
    product.is_active = is_active ? is_active : product.is_active;

    return await this.productRepository.save(product);
  }
}

import ICreateProductDTO from "@modules/products/dtos/ICreateProductDTO";
import { IProductRepository } from "@modules/products/repositories/IProductRepository";
import { getRepository, Repository } from "typeorm";
import Product from "../entities/Product";

export default class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }
  public async findAll(): Promise<Product[]> {
    const products = await this.ormRepository.find({
      where: {
        is_active: true,
      },
    });

    return products;
  }
  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id);

    return product;
  }
  public async create(data: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(data);

    return await this.save(product);
  }
  public async save(entity: Product): Promise<Product> {
    return await this.ormRepository.save(entity);
  }
}

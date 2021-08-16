import ICreateProductDTO from "../dtos/ICreateProductDTO";
import Product from "../infra/typeorm/entities/Product";

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  create(data: ICreateProductDTO): Promise<Product>;
  save(entity: Product): Promise<Product>;
}

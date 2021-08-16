import CreateProductService from "@modules/products/services/CreateProductService";
import DeleteProductService from "@modules/products/services/DeleteProductService";
import ListProductService from "@modules/products/services/ListProductService";
import ShowProductService from "@modules/products/services/ShowProductService";
import UpdateProductService from "@modules/products/services/UpdateProductService";
import { HttpResponse, ok, serverError } from "@shared/contracts/http";
import { container } from "tsyringe";
import Product from "../../typeorm/entities/Product";

export default class ProductController {
  public async create({
    name,
    value,
    description,
  }: {
    name: string;
    value: number;
    description: string;
  }): Promise<HttpResponse<Product>> {
    const createProductService = container.resolve(CreateProductService);
    try {
      const product = await createProductService.execute({
        name,
        description,
        value,
      });
      return ok(product);
    } catch (err) {
      return serverError(err);
    }
  }

  public async index(): Promise<HttpResponse<Product[]>> {
    const listProductService = container.resolve(ListProductService);
    try {
      const product = await listProductService.execute();
      return ok(product);
    } catch (err) {
      return serverError(err);
    }
  }

  public async show(id: string): Promise<HttpResponse<Product>> {
    const showProductService = container.resolve(ShowProductService);
    try {
      const product = await showProductService.execute(id);
      return ok(product);
    } catch (err) {
      return serverError(err);
    }
  }

  public async update({
    id,
    name,
    value,
    description,
    is_active,
  }: {
    id: string;
    name?: string;
    value?: number;
    description?: string;
    is_active?: boolean;
  }): Promise<HttpResponse<Product>> {
    const updateProductService = container.resolve(UpdateProductService);
    try {
      const product = await updateProductService.execute({
        id,
        name,
        value,
        description,
        is_active,
      });
      return ok(product);
    } catch (err) {
      return serverError(err);
    }
  }

  public async delete(id: string): Promise<HttpResponse<Product>> {
    const deleteProductService = container.resolve(DeleteProductService);
    try {
      const product = await deleteProductService.execute(id);
      return ok(product);
    } catch (err) {
      return serverError(err);
    }
  }
}

import { PrismaClient, Product } from '@prisma/client';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/ProductDTO';

const prisma = new PrismaClient();

export class ProductService {
  // GET /api/produtos
  async findAll(): Promise<Product[]> {
    return prisma.product.findMany();
  }

  // GET /api/produtos/{id}
  async findById(id: number): Promise<Product | null> {
    return prisma.product.findUnique({ where: { id } });
  }

  // POST /api/produtos
  async create(data: CreateProductDTO): Promise<Product> {
    return prisma.product.create({ data });
  }

  // PUT /api/produtos/{id}
  async update(id: number, data: UpdateProductDTO): Promise<Product> {
    return prisma.product.update({ where: { id }, data });
  }

  // DELETE /api/produtos/{id}
  async delete(id: number): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }
}


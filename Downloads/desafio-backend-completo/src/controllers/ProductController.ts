import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';
import { CreateProductDTO, UpdateProductDTO, ProductResponseDTO } from '../dtos/ProductDTO';

const productService = new ProductService();

export class ProductController {
  // Converte o Model do Prisma para o DTO de Resposta
  private toResponseDTO(product: any): ProductResponseDTO {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const products = await productService.findAll();
      const responseDTOs = products.map(this.toResponseDTO);
      return res.status(200).json(responseDTOs);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar produtos.' });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido.' });
      }

      const product = await productService.findById(id);

      if (!product) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
      }

      return res.status(200).json(this.toResponseDTO(product));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar produto.' });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data: CreateProductDTO = req.body;
      
      // Validação básica do DTO (Em um projeto real, você usaria uma biblioteca como Zod ou Yup)
      if (!data.name || !data.price || !data.category) {
          return res.status(400).json({ message: 'Campos obrigatórios faltando (name, price, category).' });
      }

      const newProduct = await productService.create(data);
      return res.status(201).json(this.toResponseDTO(newProduct));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao criar produto.' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido.' });
      }

      const data: UpdateProductDTO = req.body;
      
      // Verifica se o produto existe antes de tentar atualizar
      const existingProduct = await productService.findById(id);
      if (!existingProduct) {
          return res.status(404).json({ message: 'Produto não encontrado para atualização.' });
      }

      const updatedProduct = await productService.update(id, data);
      return res.status(200).json(this.toResponseDTO(updatedProduct));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao atualizar produto.' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido.' });
      }
      
      // Verifica se o produto existe antes de tentar deletar
      const existingProduct = await productService.findById(id);
      if (!existingProduct) {
          return res.status(404).json({ message: 'Produto não encontrado para exclusão.' });
      }

      await productService.delete(id);
      return res.status(204).send(); // 204 No Content para sucesso sem corpo de resposta
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao deletar produto.' });
    }
  }
}


// DTO de Criação (o que o usuário envia no POST)
export interface CreateProductDTO {
  name: string;
  price: number;
  category: string;
}

// DTO de Atualização (o que o usuário envia no PUT)
export interface UpdateProductDTO {
  name?: string;
  price?: number;
  category?: string;
}

// DTO de Resposta (o que a API retorna)
export interface ProductResponseDTO {
  id: number;
  name: string;
  price: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}


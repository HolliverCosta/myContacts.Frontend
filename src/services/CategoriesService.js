import HttpClient from './utils/HttpClient';
import CategoryMapper from './mappers/CategoryMapper';
class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listCategories() {
    const categries = await this.httpClient.get(`/categories`);
    return categries.map(CategoryMapper.toDomain)
  }
}

export default new CategoriesService();

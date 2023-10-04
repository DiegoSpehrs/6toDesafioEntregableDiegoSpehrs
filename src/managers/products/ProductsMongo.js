import {productsModel} from '../../db/models/porducts.model.js';


class ProductsMongo{
    async getProducts(obj){
      const {limit=10 ,page=1 ,...query} = obj
      try {
          
           const result = await productsModel.paginate(
           query,
           {limit , page}
         )
          
          const info = {
          
           payload: result.docs,
           totalPages: result.totalPages,
           prevPage: result.prevPage,
           nextPage: result.nextPage,
           page: result.page,
           hasPrevPage: result.hasPrevPage,
           hasNextPage: result.hasNextPage,
           prevLink: `http://localhost:8080/api/products?page=${result.prevPage}`,
           nextLink: `http://localhost:8080/api/products?page=${result.nextPage}`
         }
         console.log(info);
         return {info}
        } catch (error) {
          return error
        }
    }

    async addproduct(obj){
        try {
          const newProduct = await productsModel.create(obj)
          return newProduct  
        } catch (error) {
          return error  
        }
    }

    async getProductById(pid){
        try {
          const product = await productsModel.findById(pid)
          return product      
        } catch (error) {
          return error   
        }
    }

    async updateProduct(pid,obj){
        try {
          const response = await productsModel.updateOne({_id:pid},{...obj})
          return response  
        } catch (error) {
          return error   
        }
    }

    async deleteProduct(pid){
        try {
          const response = await productsModel.findByIdAndDelete(pid)
          return response  
        } catch (error) {
          return error  
        }
    }
}

export const productMongo = new ProductsMongo()
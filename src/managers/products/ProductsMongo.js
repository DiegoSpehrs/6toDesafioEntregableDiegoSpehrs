import {productsModel} from '../../db/models/porducts.model.js';

class ProductsMongo{
    async getProducts(limit,page,sort){
        try {
          if(!limit,!page,!sort){
            limit = 10;
            page = 1;
            sort = ASC;
          }
         const result = await productsModel.paginate(
          {limit,page,sort}
         )
         console.log(result)
         const info = {
           //status: ,//no se si hacerlo con un custom return o si hay un return de default que lo devuelve
           payload: result.docs,
           totalPages: result.totalPages,
           prevPage: result.prevPage,
           nextPage: result.nextPage,
           page: result.page,
           hasPrevPage: result.hasPrevPage,
           hasNextPage: result.hasNextPage,
           prevLink: `http://localhost:8080/api/products?page=${result.prevPageage}`,
           nextLink: `http://localhost:8080/api/products?page=${result.nextPageage}`
         }
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
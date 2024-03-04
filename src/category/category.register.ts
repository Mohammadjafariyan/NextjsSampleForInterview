import  { FastifyInstance } from 'fastify';
import createCategory from './category.create';
import getAllCategory from './category.getall';
import getSingleByPropertyCategory from './category.getSingleByProperty';
import updateCounterCategory from './category.update.counter';
import deleteCategory from './category.delete';



export function registerCategoryRoutes(app:FastifyInstance){

    app.register(createCategory)
    app.register(getAllCategory)
    app.register(getSingleByPropertyCategory)
    app.register(updateCounterCategory)
    app.register(deleteCategory)
}
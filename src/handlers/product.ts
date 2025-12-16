import { Request, Response } from 'express';
import Product from '../models/Product.model';

// GET
export const getProducts = async (req, res) => {
    const products = await Product.findAll({
            order: [
                ['price', 'DESC']
            ], 
            // attributes: {exclude: ['createdAt', 'updatedAt', 'availability']} excluye estos campos
        })
        res.json({data:products})
}

// GET BY ID
export const getProductById = async (req, res) => {
    const {id} = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            return res.status(404).json({
                error: 'Producto No Encontrado'
            })
        }

        res.json({data: product})
}

// POST
export const createProduct = async (req: Request, res: Response) => {
    const product = await Product.create(req.body) // crea el objeto y lo guarda en la bd
    res.status(201).json({data: product}) // retornamos el product de la bd
}

// PUT : actualiza / remplaza todo el elemento
export const updateProduct = async (req : Request, res : Response) => {
        // Obtener
        const {id} = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            return res.status(404).json({
                error: 'Producto No Encontrado'
            })
        }

        // Actualizar
        await product.update(req.body) // actualiza el producto
        await product.save() // lo guarda en la bd

        res.json({data : product})
} 


// PATCH : modifica solo el elemento seleccionado
export const updateAvailability = async (req : Request, res : Response) => {
        // Obtener
        const {id} = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            return res.status(404).json({
                error: 'Producto No Encontrado'
            })
        }

        // Actualizar
        product.availability = !product.dataValues.availability
        await product.save()
        res.json({data : product})
} 


// DELETE
export const deleteProduct = async (req : Request, res : Response) => {
        // Obtener
        const {id} = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            return res.status(404).json({
                error: 'Producto No Encontrado'
            })
        }

        // Eliminar
        await product.destroy()
        res.json({data: 'Producto Eliminado'})
} 
const express = require("express");
const ProductosService = require('./../services/productos.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {createProductSchema, updateProductSchema, getProductSchema} = require('./../schemas/productos.schemas');

const router = express.Router();
const service = new ProductosService();

router.get("/",async (req, res) => {
    const productos =await service.find();

    res.json(productos);
});


router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
); 


router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);


router.delete('/:id',async (req, res) => {
    const { id } = req.params;
    const resp = await service.delete(id);
    res.json(resp);
})
module.exports = router;
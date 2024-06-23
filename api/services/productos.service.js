const { faker } = require('@faker-js/faker');
const boom= require('@hapi/boom');


class ProductosService {
    constructor(){
        this.productos=[];
        this.generate();
    }

    generate(){
        const limit = 100;
    for (let index = 0; index < limit; index++) {
        this.productos.push({
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            price: parseInt(faker.commerce.price({ min: 1000, max: 3000, dec: 0 })),
            image: faker.image.url(),
            isBlock: faker.datatype.boolean(),
          })
    }
    }
   async create(data){    
        const newProducto = {
             id: faker.string.uuid(),
             ...data

        }
        this.productos.push(newProducto);
        return newProducto;

    }

    async find (){
        return new Promise((resolve, reject)=> {
            setTimeout(() =>{
                resolve(this.productos);
            },5000);
        })

    }

    async findOne(id){

            const producto= this.productos.find(item => item.id === id);
            if(!producto){
               throw boom.notFound('product not found');
            }
            if (producto.isBlock) {
                throw boom.conflict('product is block');
              }
            return producto;
    }

    async update(id,changes){
        const index = this.productos.findIndex(item => item.id === id);
        if(index === -1){
            throw boom.notFound('product not found');
        }
        const producto = this.productos[index];
        this.productos[index]= {
            ...producto,
            ...changes
        };
        return this.productos[index];
    }

    async delete(id){
        const index = this.productos.findIndex(item => item.id === id);
        if(index === -1){
            throw boom.notFound('product not found');}
        this.productos.splice(index, 1);
        return { id }
    }

}

module.exports = ProductosService;
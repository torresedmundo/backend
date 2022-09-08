const fs = require("fs");

class Container {
         constructor(rutaArchivo) {
            this.rutaArchivo = rutaArchivo;
         }

         async #leerArchivo() {
            try {
                const contenido = await fs.promises.readFile(this.rutaArchivo, "utf-8");
                const contenidoParse = JSON.parse(contenido)
                return contenidoParse
                
            } catch (error) {
                console.error('Error al cargar el archivo: ' + error)
            }    
         }

         async save(obj) {
            try {
                const contenidoArchivo = await this.#leerArchivo()
                if ( contenidoArchivo.length !== 0 ) {
                    await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([...contenidoArchivo, {...obj, id: contenidoArchivo[contenidoArchivo.length - 1].id + 1}], null, 2) )
                    console.log('Producto guardado con exito')
                } else {
                    await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([ {...obj, id: 1}]), 'utf-8')
                    console.log('Base de Datos Creada - Producto guardado con exito')
                }
            } catch (error) {
                console.error('Error al Guardar Productos: ' + error)
            }    
         }
         
         async getAll() {
            try {
                const contenidoArchivo = await this.#leerArchivo()
                console.log(contenidoArchivo)
            } catch (error) {
                console.error('Error al Obtener Todos Los Productos: ' + error)
            }    

         }

         async getById(id) {
            try {
                const contenidoArchivo = await this.#leerArchivo()
                const producto = contenidoArchivo.filter(item => item.id === id)
                    if (producto.length > 0) {
                        console.log('Producto Encontrado: ' + JSON.stringify(producto, true, 2));
                    } else {
                        console.log('Producto no Existe - ID No encontrado')
                    }
            } catch (error) {
                console.error('Error al Obtener Productos por ID: ' + error)
            }    

         }

         async deleteAll() {
            try {
                const contenidoArchivo = await this.#leerArchivo()
                if( contenidoArchivo.length > 0 ) {
                    await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([], null, 2), 'utf-8')
                    console.log('Base de Datos Eliminada con Exito')
                } else {
                    console.log('Base de Datos Vacia')
                }
            } catch (error) {
                console.error('Error al ELiminar Todos los Productos: ' + error)
            }    
         }


         async deleteById(id) {
            try {
                const contenidoArchivo = await this.#leerArchivo()
                const productosSinBorrar = contenidoArchivo.filter(item => item.id !== id)
                const productoABorrar = contenidoArchivo.filter(item => item.id === id)
            
                if ( productoABorrar.length > 0) {
                    await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(productosSinBorrar, null, 2));
                    console.log(`Producto Eliminado: ${JSON.stringify(productoABorrar, null, 2)}`)
                } else {
                    console.log('Producto No Existe - ID No Encontrado')
                }
            } catch (error) {
                console.error('Error al ELiminar los Productos por ID: ' + error)
            }    

        }

         
}         

const contenedor = new Container('./productos.txt')

contenedor.save({title: "Mouse", price: 5000, thumbnail: "https://http2.mlstatic.com/D_NQ_NP_2X_711895-MLC49450121133_032022-F.webp"})

//contenedor.getAll()

//contenedor.getById(5)

//contenedor.deleteById(3)

//contenedor.deleteAll()

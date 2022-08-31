class Usuario {
    constructor (nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        const saludo = `Nombre Completo del Usuario ${this.nombre} ${this.apellido}  `
        console.log (saludo);
    }

    addMascota (nuevaMascota){
        usuario.mascotas.push(nuevaMascota);
        console.log (usuario.mascotas);
    }

    countMascotas(){
        const cantMascotas = usuario.mascotas;
        console.log(cantMascotas.length)
    }

    addBook(autor, titulo){
        usuario.libros.push({autor, titulo});
        console.log (usuario.libros);

    }

    getBookNames(){
        let listadoTitulos = [];
        usuario.libros.forEach(titulo => {
            listadoTitulos.push(titulo.titulo);
        });
        console.log(listadoTitulos);

    }

}
const usuario = new Usuario ('Ignacia', 'Torres', [{autor:'Marcelo', titulo:'Cachureos'},{autor:'Marcela Paz', titulo:'Papelucho'}], ['Perro', 'Gato', 'Elefante'] );
usuario.getFullName();
usuario.addMascota('Panda');
usuario.countMascotas();
usuario.addBook('Mundy', 'Cuentos');
usuario.getBookNames();






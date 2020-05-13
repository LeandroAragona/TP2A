const mongoclient = require('mongodb').MongoClient;
const chalk = require('chalk');

const uri = "mongodb+srv://Lean:12345@cluster0-6y61y.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new mongoclient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


//insertar inventor
async function agregarInventor(nuevo) {
    try {
        let cli = await client.connect();
        let colection = cli.db("sample_betp2").collection("inventors");

        await colection.insertOne(nuevo);
        console.log(nuevo.last + " fue agregado a la base");

        await cli.close()
    }
    catch (error) {
        console.log(error)
    }
}

//buscar inventor
async function buscarInventor(nuevo) {
    try {
        let cli = await client.connect();
        let colection = cli.db("sample_betp2").collection("inventors");

        let buscado = await colection.find({ last: nuevo.last }).toArray();
        if (!buscado) {
            console.log("Inventor/es encontrado/s: " + buscado.toString);
        } else {
            console.log("no se ha encontrado al inventor");
        }
        //console.log("Inventor/es encontrado/s: " + buscado);

        await cli.close()
    }
    catch (error) {
        console.log(error)
    }
}

//modificar inventor
async function modificarInventor(viejo, nuevo) {
    try {
        let cli = await client.connect();
        let colection = cli.db("sample_betp2").collection("inventors");

        await colection.updateOne({ last: viejo.last }, { $set: { last: nuevo.last } });
        console.log("inventor " + nuevo.last + " actualizado correctamente");

        await cli.close()
    }
    catch (error) {
        console.log(error)
    }
}

//eliminar inventor
async function eliminarInventor(inventor) {
    try {
        let cli = await client.connect();
        let colection = cli.db("sample_betp2").collection("inventors");

        await colection.deleteOne({ last: inventor.last })
        console.log(inventor.last + " eliminado correctamente")

        await cli.close()
    }
    catch (error) {
        console.log(error)
    }
}

const Inventor1 = {
    first: "Pedro",
    last: "Perez",
    year: 1987
}

const Inventor1Nuevo = {
    first: "Pedro",
    last: "Perez",
    year: 1989
}

//no se como hacer para que se ejecuten en el orden que las escribo, tengo entendido que la idea del asyncronismo es justamente que una no bloquee al resto
//pero para este ejemplo hay veces en las que elimina al inventor antes de agregarlo.
agregarInventor(Inventor1);
buscarInventor(Inventor1);
modificarInventor(Inventor1, Inventor1Nuevo);
eliminarInventor(Inventor1Nuevo);



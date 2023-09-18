import mongoose from "mongoose";

const URI = 'mongodb+srv://diegospehrs:Villero1908@cluster0.uvqkqut.mongodb.net/2daPreEntregaDS?retryWrites=true&w=majority'

mongoose.connect(URI)
.then(()=>console.log('Conectado a la base de datos'))
.catch(error=>console.log(error))
let {mongoose} = require('./mongodb-connect')

// si se desea guardar en una colección de configuración
// el id autoincremental del usuario
let configSchema = mongoose.Schema({
    last_id:{
        type:Number,
        required: true
    }
})

configSchema.statics.obtenerConfig = function(){
    return Config.findOne({});
}

configSchema.statics.crearConfigOrUpdate= async function(){
    let datos = await Config.findOne({});
    console.log(datos);
    if(datos==undefined){
        let conf = {last_id:1000}
        let newConfig = new Config(conf);
        let stored = await newConfig.save()
        return 1000
    }

    await Config.findOneAndUpdate(
        {_id:datos._id},
        {$set:{last_id:datos.last_id+1}},
        {new: true}
        );

    return datos.last_id+1
}

let Config = mongoose.model('configQuizz',configSchema);

module.exports = Config;
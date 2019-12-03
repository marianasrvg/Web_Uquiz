const {mongoose} = require('./mongodb-connect')
const Config = require ('./Config')
const conf = require('./config.json')
//const bcrypt = require('bcryptjs')


let userSchema = mongoose.Schema({
    id:{
        type: Number,
        required: true,
        unique: true
    },
    firstName: {
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    admin:{
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    /*rol:{
        type:String,
        enum: ["ADMIN", "USER"]
    }*/
});

userSchema.statics.obtenerUsuario = function( correo){
    return User.findOne({correo}); 
}


//CREACION DE USUARIO
userSchema.statics.crearUsuario = async function(usr){
    let uid = await Config.crearConfigOrUpdate(usr)
    usr.id = uid;
    //usr.password = bcrypt.hashSync(usr.password, 8)
    //usr.rol = (uid == 0)? "ADMIN": "USER"
    console.log(usr)

    let newUser = User(usr);
    return await newUser.save()
}

//ELIMINAR USUARIO

//EDITAR USUARIO
userSchema.methods.editarUsuario = function(datos){
    return User.findOneAndUpdate(
                {_id:this._id},
                {$set:datos},
                {new: true}
                );
    
}

//OBTENER USUARIOS
userSchema.statics.obtenerUsuarios = function(){
    return User.findOne({}); 
}



let User = mongoose.model('Users', userSchema);

module.exports = User;






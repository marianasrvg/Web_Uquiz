const {mongoose} = require('./mongodb-connect')
const Config = require ('./Config')
const conf = require('./config.json')
//const bcrypt = require('bcryptjs')

/*let questionsSchema = new Schema({ 
    question: String,
    time : Number,
    answers: {
        type: [answersSchema],
        default: undefined
    },
});

let answersSchema = new Schema({ 
    answer: String,
    correct : Boolean,
});*/


let quizzSchema = mongoose.Schema({
    id:{
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    url:{
        type:String
    },
    creator: {
        type: String,
    },
    bestScore:{
        type: Number,
    },
    worstScore:{
        type: Number,
    },
    played:{
        type: Number,
    },
    questions: {
        type: [{
            question: String,
            time : Number,
            answers: {
                type: [{
                    answer: String,
                    correct : Boolean
                }],
                default: undefined
            }
        }],
        default: undefined,
    },
    correct:{
        type:[{
            arr : {
                type:[{answer: String}]
            }
        }]
    }
    /*rol:{
        type:String,
        enum: ["ADMIN", "USER"]
    }*/
});

//CREACION DE QUIZZ
quizzSchema.statics.crearQuizz = async function(quizz){
    //usr.password = bcrypt.hashSync(usr.password, 8)
    //usr.rol = (uid == 0)? "ADMIN": "USER"
    console.log(quizz)
    let newQuizz = Quizz(quizz);
    return await newQuizz.save()
}

let Quizz = mongoose.model('Quizzes', quizzSchema);

module.exports = Quizz;






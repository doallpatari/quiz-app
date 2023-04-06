const mongoose = require("mongoose")

const quizes = new mongoose.Schema({
    totalAttempted:{
        type: Number,
        default: 0
    },
    totalCorrect:{
        type:Number,
        default:0
    },
    category:[{
        name:{
            type:String
        },
        score:{
                totalAttempted:{
                    type:Number,
                    default:0
                },
                totalCorrect:{
                    type:Number,
                    default:0
                }
            }
        }]
    },
    {
        timestamps:true
    }
)

const scoreSchema =  new mongoose.Schema(
    {
        email:{
            type:String,
            lowercase:true,
            trim:true,
            required:true
        },
        name:{
            type:String,
            trim:true,
        },
        totalAttempted:{
            type:Number,
            default:0
        },
        totalCorrect:{
            type:Number,
            default:0
        },
        category:[{
            name:{
                type:String
            },
            score:{
                    totalAttempted:{
                        type:Number,
                        default:0
                    },
                    totalCorrect:{
                        type:Number,
                        default:0
                    }
                }
            }],
        totalQuizes:[quizes]
    },
    {
        timestamps:true
    }

)


module.exports = score = mongoose.model('score', scoreSchema)
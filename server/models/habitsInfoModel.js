const mongoose = require("mongoose");

const habitsSchema = mongoose.Schema({
    habit:{
        type: String,
        required :[true, "Name is mandatory to add"],
    },
    habitStatus:[
        {
        date: { type: Date,
        },
        status:{type:String, enum:["done","notDone","none"], default:"none" },
        
        
    }]
},{
    timestamps:true
})

module.exports = mongoose.model("Habits",habitsSchema);
import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false,
    },
    Owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true}
);


todoSchema.statics.getTodosByUser = async function(userId){
    return await this.find({owner: userId }).sort({createdAt:-1})
}

todoSchema.statics.createTodoForUser=async function(userId,title){
    const todo = await this.create({title,owner: userId});
    return todo;
}

todoSchema.statics.deleteTodoByUser = async function (userId,todoId){
    const todo = await this.findOneAndDelete({_id:todoId,owner:userId});
    return todo;

};

todoSchema.statics.updateTodoByUser = async function (userId,todoId,updates){
    const todo = await this.findOneAndUpdate({
        _id: todoId, owner: userId
    },
updates,
{new:true,runValidators: true});
return todo;
}




export const todo = mongoose.model("todo",todoSchema)


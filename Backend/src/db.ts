import mongoose ,{ Document,Schema } from "mongoose";

export interface IUSER extends Document {
name : string,
email : string,
password : string,
};
export interface ICONTENT extends Document{
    title : string,
    link : string,
    createdAt : Date,
    type ? : "youtube" | "twitter" | "linkedin" | "other";

}
const userSchema = new Schema<IUSER>({
    name : {
    type:String,
    required : true
    },
    email : {
        type : String,
        required : true,
        unique: true
    },
    password : {
        type : String,
        required : true
    }
});

const contentSchema= new Schema<ICONTENT>({
    title : {
        required : true,
        type : String,
    },
    link : {
        type : String,
        required : true,
    },
    type : {
        type:String, 
        enum : ["youtube", "twitter", "document", "other"],
        default : "other"
    },
    createdAt : {
        type:Date,
        default :Date.now
    }
})
 export const Content = mongoose.model<ICONTENT>("Content",contentSchema);
 export const User =  mongoose.model<IUSER>("User",userSchema);


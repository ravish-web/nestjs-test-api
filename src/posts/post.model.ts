import * as mongoose from 'mongoose'

export const PostSchema = new mongoose.Schema({
    title: { type: String, required: true},
    body:  { type: String, required: true }
})
export interface Post{
    _id : string,
    title : string,
    body : string,
}

import mongoose from 'mongoose'


const image = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String
    }
})

const chapters = new mongoose.Schema({
    name: {type: String, required: true},
    text: {type: String, required: true},
    image: {type: image}
})


export const log = new mongoose.Schema({
    date: {type: Date, default: Date.now()}
})

export const booksSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    chapters: [chapters],
    favorite: {type: Boolean, default: false},
    hasImage: {type:Boolean,default:false},
    date: [log],
});




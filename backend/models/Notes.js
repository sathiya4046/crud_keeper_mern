const mongoose = require('mongoose')

const NotesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    notes: { type: String, required: true },
    userId:{ type:mongoose.Schema.Types.ObjectId, ref:'users'}
});

module.exports = mongoose.model('Notes', NotesSchema);
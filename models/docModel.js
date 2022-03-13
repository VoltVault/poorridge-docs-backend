const mongoose = require('mongoose')

const docSchema = new mongoose.Schema(
    {
        title: {
            type: 'string',
            required: [true, 'Please add a title'],
        },
        body: {
            type: 'string',
            required: [true, 'You can\'t have a document without the document...'],
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Document', docSchema)

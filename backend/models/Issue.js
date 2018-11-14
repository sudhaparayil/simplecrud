var mongoose = require('mongoose');

const IssueitemSchema = mongoose.Schema({

    title: {
        type: String
    },
    responsible: {
        type: String
    },
    description: {
        type: String
    },
    severity: {
        type: String
    },
    status: {
        type: String,
        default: 'Open'
    }
});

const Issue = module.exports = mongoose.model('Issue', IssueitemSchema);
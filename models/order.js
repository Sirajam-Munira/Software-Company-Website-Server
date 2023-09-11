const mongoose = require('../utils/mongoose');
const constants = require('../utils/constants');

const MongooseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    types: {
        type: String,
        required: true,
    },
    total: {
        type: String,
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    trnxid: {
        type: String,
        required: true,
    },
}, { timestamps: true }).plugin(require('mongoose-autopopulate'));

const SchemaModel = module.exports = mongoose.model('order', MongooseSchema);

// C
module.exports.createData = (data, callback) => {
    if (SchemaModel(data).validateSync(data)) {
        callback(new SchemaModel(data).validateSync(data), null)
    } else {
        SchemaModel.create(data, callback);
    }
}

// Ra
module.exports.getAllData = (query, pageNumber, callback) => {
    SchemaModel
        .find(query)
        .limit(constants.paginate)
        .sort({ createdAt: 'desc' })
        .skip(constants.paginate * (pageNumber))
        .exec().then(data =>
            callback(null, data)).catch(error =>
                callback(error, null));
}

// R1
module.exports.getOneData = (query, callback) => {
    SchemaModel.findOne(query)
        .exec()
        .then(data => callback(null, data))
        .catch(error => callback(error, null));
}

// U1
module.exports.updateOneData = (query, data, callback) => {
    SchemaModel.findOneAndUpdate(query, data, { new: true }).exec((err, data) => {
        callback(err, data)
    })
}

// D1
module.exports.removeOneData = (query, callback) => {
    SchemaModel.remove(query, callback);
}

// Da
module.exports.removeAllData = (callback) => {
    SchemaModel.remove({
        status: {
            $ne: 'admin'
        }
    }, callback);
}
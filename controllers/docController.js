const asyncHandler = require('express-async-handler');

const Document = require('./../models/docModel')

// @desc    Get docs
// @route   GET /api/docs
// @access  Private
const getDocs = asyncHandler(async (req, res) => {
    const docs = await Document.find()

    res.status(200).json(docs);
});


// @desc    Get docs by id
// @route   GET /api/docs
// @access  Private
const getDocsById = asyncHandler(async (req, res) => {
    const docs = await Document.findOne({
        title: req.params.title
    })

    res.status(200).json(docs);
});

// @desc    Set docs
// @route   POST /api/docs
// @access  Private
const setDocs = asyncHandler(async (req, res) => {
    if (
        req.body.username === process.env.ADMIN_USERNAME &&
        req.body.password === process.env.ADMIN_PASSWORD
    ) {
        if (req.body.body  === "undefined"|| req.body.title === "undefined") {
            res.status(400);
            throw new Error(
                'Please make sure you have both a body or a title field'
            );
        }

        const doc = await Document.create({
            title: req.body.title,
            body: req.body.body
        });

        res.status(201).json(doc);
    } else {
        res.status(403).json({});
    }
});

// @desc    Get docs
// @route   GET /api/docs
// @access  Private
const updateDocs = asyncHandler(async (req, res) => {
    if (
        req.body.username === process.env.ADMIN_USERNAME &&
        req.body.password === process.env.ADMIN_PASSWORD
    ) {
        const doc = await Document.findById(req.params.id)

        if (!doc) {
            res.status(400)
            throw new Error('Please make sure you specify an id that actually exists')
        }

        let updatedDoc

        if (req.body.title === "undefined") {
            updatedDoc = await Document.findByIdAndUpdate(
                req.params.id, {
                    body: req.body.body
                }, {
                    new: true
                }
            );

            res.status(200).json(updatedDoc);
        } else if (req.body.body === "undefined") {
            updatedDoc = await Document.findByIdAndUpdate(
                req.params.id, {
                    title: req.body.title
                }, {
                    new: true
                }
            );

            res.status(200).json(updatedDoc);
        } else {
            updatedDoc = await Document.findByIdAndUpdate(
                req.params.id, {
                    body: req.body.body,
                    title: req.body.title
                }, {
                    new: true
                }
            );

            res.status(200).json(await Document.findById(req.params.id));
        }
    } else {
        res.status(403).json({});
    }
});

// @desc    Get docs
// @route   GET /api/docs
// @access  Private
const deleteDocs = asyncHandler(async (req, res) => {
    if (
        req.body.username === process.env.ADMIN_USERNAME &&
        req.body.password === process.env.ADMIN_PASSWORD
    ) {
        const doc = await Document.findById(req.params.id)

        if (!doc) {
            res.status(400)
            throw new Error('Please make sure you specify an id that actually exists')
        }

        await doc.remove()

        res.status(200).json({
            _id: req.params.id,
        });
    } else {
        res.status(403).json({});
    }
});

module.exports = {
    getDocs,
    getDocsById,
    setDocs,
    updateDocs,
    deleteDocs
};
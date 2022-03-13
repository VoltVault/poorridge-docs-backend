const express = require(`express`)
const router = express.Router()
const {
    getDocs, 
    getDocsById, 
    setDocs,
    updateDocs,
    deleteDocs
} = require('./../controllers/docController')

router
    .route('/')
    .get(getDocs)
    .post(setDocs)
    
router
    .route('/:id')
    .put(updateDocs)
    .delete(deleteDocs)
    
router
    .route('/:title')
    .get(getDocsById)

module.exports = router
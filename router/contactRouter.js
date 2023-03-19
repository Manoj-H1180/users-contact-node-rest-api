const express = require('express')
const router = express.Router()
const {getContact, GetContactById, PostContact, PutContact, DeleteContact} = require('../controllers/contactContraller')

router.route('/').get(getContact).post(PostContact);
router.route('/:id').get(GetContactById).put(PutContact).delete(DeleteContact);


module.exports = router
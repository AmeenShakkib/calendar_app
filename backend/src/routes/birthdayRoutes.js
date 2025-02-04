const express = require('express');
const { addBirthday,getBirthdays,deleteBirthday,updateDob } = require('../controllers/birthdayController');
const router = express.Router();

router.post('/add', addBirthday);
router.get('/get_birthdays', getBirthdays);
router.delete('/delete/:id', deleteBirthday);
router.put('/update/:id', updateDob);

module.exports = router;
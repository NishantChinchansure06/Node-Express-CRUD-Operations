const express = require("express");
const router = express.Router();
const {getConatct, getConatctByID, createContact, updateContact, deleteConatct} = require('../controllers/contactController');
const vailidateJWTToken = require("../middleware/vailidateToken");

router.use(vailidateJWTToken)
router.route("/").get(getConatct).post(createContact);

router.route("/:id").get(getConatctByID).put(updateContact).delete(deleteConatct);

// router.route("/").post(createContact);

// router.route("/:id").put(updateContact);

// router.route("/:id").delete(deleteConatct);

module.exports = router;

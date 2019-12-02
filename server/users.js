const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Web Uquizz users");
});

module.exports = router;
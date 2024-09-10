const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // to serve static files

app.post('/calculate-age', (req, res) => {
    const { name, dob } = req.body;

    // console.log(dob)
    if (!name || !dob) {
        return res.status(400).json({ error: 'Name and date of birth are required.' });
    }

    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    res.json({ name, age });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

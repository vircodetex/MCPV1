const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

const data = {
    'Seattle': 750000,
    'New York': 8400000,
    'San Francisco': 883305,
    'London': 8900000
};

app.get('/population', (req, res) => {
    const city = (req.query.city || '').toString();
    const pop = data[city] ?? Math.floor(Math.random() * 1_000_000);
    res.json({ city, population: pop });
});

app.listen(port, () => console.log(`Mock population API running on ${port}`));

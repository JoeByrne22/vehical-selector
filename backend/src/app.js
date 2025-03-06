const express = require('express');
const vehicleRoutes = require('./routes/index.js');

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use('/api/vehicles', vehicleRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
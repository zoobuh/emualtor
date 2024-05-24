const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your Appetize.io API token
const APPETIZE_API_TOKEN = 'YOUR_APPETIZE_API_TOKEN';

app.use(express.json());
app.use(express.static('public'));

// Endpoint to create a new Appetize.io session
app.post('/create-session', async (req, res) => {
    try {
        const { url } = req.body;  // APK URL or App URL
        const response = await axios.post(
            'https://api.appetize.io/v1/applications',
            {
                url: url,
                platform: 'android'
            },
            {
                auth: {
                    username: APPETIZE_API_TOKEN,
                    password: ''
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error creating session:', error.response ? error.response.data : error.message);
        res.status(500).send('Error creating Appetize.io session');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

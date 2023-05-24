const fs = require('fs');

module.exports = function(req, res, next) {
    const email = req.body?.email || '';

    if (!email) {
        return res.status(400).send('Email is required');
    }

    try {
        const data = fs.readFileSync('emails.txt', 'utf-8');
        console.log('File content:', data);

        if (data.includes(email)) {
            return res.status(409).send(`The ${email} already exists in subscriptions`);
        }

        const updatedData = data ? `${data}, ${email}` : email;

        fs.writeFileSync('emails.txt', updatedData, 'utf-8');

        return res.send('E-mail added');
    } catch (err) {
        console.error(`Error: ${err}`);
        return res.status(500).send(`Error handling email: ${err}`);
    }
}

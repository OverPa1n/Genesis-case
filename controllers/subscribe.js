const fs = require('fs');
const filePath = 'emails.txt';

module.exports = function(req, res, next) {
    const email = req.body?.email || '';

    if (!email) {
        return res.status(400).send('Email is required');
    }

    try {
        const data = fs.readFileSync(filePath, 'utf-8');

        if (data.includes(email)) {
            return res.status(409).send(`The ${email} already exists in subscriptions`);
        }

        const updatedData = data ? `${data}, ${email}` : email;

        fs.writeFileSync(filePath, updatedData, 'utf-8');

        return res.send('E-mail added');
    } catch (err) {
        if (err.code === 'ENOENT') {
            fs.writeFileSync(filePath, email, 'utf-8');

            return res.send('E-mail added');
        }

        return res.status(500).send(`Error handling email: ${err}`);
    }
}

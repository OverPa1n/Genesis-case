const CoinpaprikaAPI = require('@coinpaprika/api-nodejs-client');
const client = new CoinpaprikaAPI();
const COIN_ID = 'btc-bitcoin';
const axios = require('axios');
const rateOnCurrentDate = 36.5686;

async function getDollarExchangeRateInHryvnia() {
    const response = await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
    const data = response.data;
    const usdExchangeRate = data.find(currency => currency.cc === 'USD');

    return usdExchangeRate ? usdExchangeRate.rate : rateOnCurrentDate;
}

module.exports = async function(req, res, next) {
    try {
        const coinInfo = await client.getTicker({coinId: COIN_ID});
        const {price_usd} = coinInfo;
        const hryvniaInDollarRate = await getDollarExchangeRateInHryvnia();
        const rate = (hryvniaInDollarRate * Number(price_usd)).toFixed(2);
        const result = `${rate} UAH`;

        return res.json(result);
    } catch (e) {
        return res.status(400).send(e);
    }
}

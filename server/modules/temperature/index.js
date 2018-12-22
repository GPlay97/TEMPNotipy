/**
 * @file /server/modules/temperature/index.js
 * @author GPlay97
 * @description Module to set and retrieve temperature
 */
const db = require('../db');

/**
 * Updates current temperature and adds statistic record for it
 * @param {Number} temperature the temperature to set
 * @param {Function} callback callback function
 */
const postTemperature = (temperature, callback) => {
    const now = parseInt(new Date() / 1000);

    // update the temperature
    db.query('UPDATE temperature SET temperature=?, timestamp=?', [
        temperature, now 
    ], err => {
        if (!err) {
            // add statistics record
            db.query('INSERT INTO statistic (temperature, timestamp) VALUES (?, ?)', [
                temperature, now
            ], err => callback(err));
        } else callback(err);
    });
};

module.exports = {
    /**
     * Retrieves the last submitted temperature and timestamp
     * @param {Object} _ unused
     * @param {Object} res the server response
     */
    getTemperature: (_, res) => {
        db.query('SELECT temperature, timestamp FROM temperature', [], (err, queryRes) => {
            if (!err && queryRes) {
                res.json(queryRes[0]);
            } else {
                res.status(422).json({
                    error: err
                });
            }
        });
    },
    /**
     * Saves the given temperature in database
     * @param {Object} req the server request
     * @param {Object} res the server response
     */
    postTemperature: (req, res) => {
        // validate params
        if (isNaN(parseFloat(req.body.temperature))) {
            return res.status(400).json({
                error: 'Invalid parameters'
            });
        }
        // update the temperature
        postTemperature(req.body.temperature, err => {
            if (!err) {
                res.json({
                    synced: true
                });
            } else {
                res.status(422).json({
                    error: err
                });
            }
        });
    }
};
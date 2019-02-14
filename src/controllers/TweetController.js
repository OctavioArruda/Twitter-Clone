const Tweet = require('../models/Tweet');

module.exports = {
    async index(req, res){
        const tweets = await Tweet.find({}).sort('-createdAt');

        return res.json(tweets);
    },

    async store(req, res){
        const tweet = await Tweet.create(req.body);

        req.io.emit('tweet', tweet); // Everyone who's connected on application will be notified 
        // when someone posts a new tweet.

        return res.json(tweet);
    },
};
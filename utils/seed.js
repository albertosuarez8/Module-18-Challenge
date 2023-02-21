const mongoose = require('mongoose');
const { User, Thought } = require('../models');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


mongoose.set('debug', true);

const userData = [
    {
        username: 'alberto',
        email: 'alberto@mail.com',
        thoughts: [],
        friends: []
    },
    {
        username: 'bob',
        email: 'bob@mail.com',
        thoughts: [],
        friends: []
    },
    {
        username: 'bryan',
        email: 'bryan@mail.com',
        thoughts: [],
        friends: []
    },
    {
        username: 'oriana',
        email: 'oriana@mail.com',
        thoughts: [],
        friends: []
    }
];

const thoughtData = [
    {
        thoughtText: 'This is alberto\'s thought',
        username: 'alberto',
        reactions: []
    },
    {
        thoughtText: 'This is bob\'s thought',
        username: 'bob',
        reactions: []
    },
    {
        thoughtText: 'This is bryan\'s thought',
        username: 'bryan',
        reactions: []
    },
    {
        thoughtText: 'This is oriana\'s thought',
        username: 'oriana',
        reactions: []
    }
];

const seedDatabase = async () => {
    try {
        // remove all existing data
        await User.deleteMany({});
        await Thought.deleteMany({});

        // create users
        const users = await User.insertMany(userData);
        console.log('Users seeded!');

        // add thoughts to users
        for (let i = 0; i < thoughtData.length; i++) {
            const { _id } = await Thought.create(thoughtData[i]);
            const user = users.find(user => user.username === thoughtData[i].username);
            user.thoughts.push(_id);
            await user.save();
        }
        console.log('Thoughts seeded!');

        // exit the process
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedDatabase();

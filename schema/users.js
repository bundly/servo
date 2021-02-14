import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    // Github username
    username: {
        type: String,
        unique: true,
        required: true
    },
    githubProfile: {
        // Id, username, displayName, profileUrl, emails (emails[0].value, etc), photos (photos[0].value, etc)
        type: Object,
        required: true
    },
    discordProfile: {
        // All discord thingys idk
        type: Object,
        default: {}
    },
    accounts: [
        {
            kind: String, // Type = 'github' | 'discord' | 'google'
            uid: { type: String, required: false }, // Github profile id
            token: Object // Token = {"access_token": "6qrZcUqja7812RVdnEKjpzOL4CvHBFG", "refresh_token": "D43f5y0ahjqew82jZ4NViEr2YafMKhue" }
        }
    ],
    commits: {
        type: Number,
        default: 0
    },
    todo: {
        markdown: { type: String, default: '' }, // Markdown String for to do
        lastUpdated: { type: Date, default: new Date() }
    }
});

export default userSchema;

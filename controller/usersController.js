import User from '../models/usersModel';

const usersController = {
    getOneAndVerify: async (req, res, _) => {
        const response = {
            success: false,
            authenticated: {
                github: false,
                discord: false,
                google: false
            }
        };

        try {
            const { username, githubToken, discordToken, googleToken } = req.body;
            const userGithub = await User.findOne({
                username,
                accounts: { $elemMatch: { kind: 'github', 'token.accessToken': githubToken } }
            });

            const userDiscord = await User.findOne({
                username,
                accounts: { $elemMatch: { kind: 'discord', 'token.accessToken': discordToken } }
            });

            const userGoogle = await User.findOne({
                username,
                accounts: { $elemMatch: { kind: 'google', 'token.accessToken': googleToken } }
            });

            if (userGithub || userDiscord || userGoogle) {
                response.success = true;
            }

            response.authenticated = {
                github: Boolean(userGithub),
                discord: Boolean(userDiscord),
                google: Boolean(userGoogle)
            };
            return res.json(response);
        } catch {
            return res.json(response);
        }
    }
};

export default usersController;

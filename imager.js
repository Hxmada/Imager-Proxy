const express = require('express');
const axios = require('axios');
const urlrewrite = require('express-urlrewrite');
const chalk = require('chalk');

const config = require('./_inc/config');
const secure = require('./_inc/secure');
const userIDRouter = require('./routes/userIDRouter');
const userRouter = require('./routes/userRouter');
const figureRouter = require('./routes/figureRouter');

const app = express();
const PORT = config.port;

const Maprouter = {
  user: userRouter,
  figure: figureRouter,
  id: userIDRouter,
};

app.use(urlrewrite(config.userIDURL, '/?url=id&userID=:userID'));
app.use(urlrewrite(config.usernameURL, '/?url=user&username=:username'));
app.use(urlrewrite(config.figureURL, '/?url=figure&look=:look'));

app.use(async (req, res, next) => {

  const { url } = req.query;
  const securedURL = secure(url);

  const selectedRouter = Maprouter[securedURL];

  if (selectedRouter) {
    selectedRouter(req, res, next);
  } else {
    try {
      const { data } = await axios.get(config.imagerURL, {
        responseType: 'arraybuffer',
      });
      res.setHeader('Content-Type', 'image/gif');
      res.setHeader('Content-Disposition', 'inline');
      res.send(data);
    } catch (error) {
      console.log(chalk.bgRed.white('[ERROR]') + ` -> ` + chalk.red(`Error fetching image: ${error.message}`));
      res.status(500).send(`Internal Error: ${error.message}`);
    }
  }
});

app.listen(PORT, () => {
  console.log(chalk.bgGreen.white('[READY]') + ` -> ` + chalk.cyan(`Imager proxy started running at: - http://127.0.0.1:${PORT}`));
});

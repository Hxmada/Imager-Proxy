const express = require('express');
const axios = require('axios');
const sharp = require('sharp');
const chalk = require('chalk');

const secure = require('../_inc/secure');
const config = require('../_inc/config');
const dbConnection = require('../_inc/db');

const userRouter = express.Router();

userRouter.use(express.urlencoded({ extended: true }));

/* ------------------------ Start Username ------------------------ */

userRouter.get('/', async (req, res) => {
    try {

        const { username, direction, head_direction, action, headonly, gesture, size, dance, effect, frame_num } = req.query;

        const secureUsername = secure(username);

        const [fig] = await dbConnection.promise().query('SELECT `look` FROM `users` WHERE `username` = ? LIMIT 1', [secureUsername]);

        if (!fig || fig.length === 0) {
            return res.send('This user does not exist!');
        }

        const secureLook = secure(fig[0].look);

        let userUrl = `${config.imagerURL}${secureLook}&direction=${direction || '3'}&head_direction=${head_direction || '3'}`;

        userUrl += (action ? `&action=${encodeURIComponent(action)}` : '');
        userUrl += (gesture ? `&gesture=${encodeURIComponent(gesture)}` : '');
        userUrl += (headonly ? `&headonly=${encodeURIComponent(headonly)}` : '');
        userUrl += (dance ? `&dance=${encodeURIComponent(dance)}` : '');
        userUrl += (effect ? `&effect=${encodeURIComponent(effect)}` : '');
        userUrl += (size ? `&size=${encodeURIComponent(size)}` : '');
        userUrl += (frame_num ? `&frame_num=${encodeURIComponent(frame_num)}` : '');

        const imgFormatMatch = req.url.match(/(?:\.|img_format=)?(\w+)$/);
        const imgFormat = imgFormatMatch ? imgFormatMatch[1] : '';

        if (imgFormat) {
            userUrl += `&img_format=${encodeURIComponent(imgFormat)}`;
        }

        const {
            data
        } = await axios.get(userUrl, {
            responseType: 'arraybuffer'
        });

        if (headonly === '1' && size !== 's' && size !== 'l') {
            try {
                const imgBuffer = Buffer.from(data, 'binary');
                const {
                    width,
                    height
                } = await sharp(imgBuffer).metadata();

                const x = Math.max(0, (width - 70) / 2);
                const yOffset = -17;
                const y = Math.max(0, (height - 70) / 2) + yOffset;

                const croppedBuffer = await sharp(imgBuffer)
                    .extract({
                        left: x,
                        top: y,
                        width: Math.min(70, width),
                        height: Math.min(70, height)
                    })
                    .toBuffer();

                res.setHeader('Content-Type', 'image/gif');
                res.setHeader('Content-Disposition', 'inline');
                res.send(croppedBuffer);

            } catch (extractError) {
                res.status(500).send(`Internal Error during image extraction: ${extractError.message}`);
            }
        } else {
            console.log(chalk.bgGreen.white('[LOADED]') + ` -> ` + chalk.cyan(`Loaded Image successfully - Username: ` + ` -> ` + `${secureUsername}`));
            res.setHeader('Content-Type', 'image/gif');
            res.setHeader('Content-Disposition', 'inline');
            res.send(data);
        }
    } catch (error) {
        console.log(chalk.bgRed.white('[ERROR]') + ` -> ` + chalk.red(error.message));
        res.status(500).send(`Internal Error: ${error.message}`);
    }
});

module.exports = userRouter;

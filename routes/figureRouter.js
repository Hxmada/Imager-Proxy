const express = require('express');
const axios = require('axios');
const sharp = require('sharp');
const chalk = require('chalk');

const config = require('../_inc/config');
const secure = require('../_inc/secure');

const figureRouter = express.Router();

figureRouter.use(express.urlencoded({ extended: true }));

/* ------------------------ Start Figure ------------------------ */

figureRouter.get('/', async (req, res) => {
    try {
        const { look, direction, head_direction, action, headonly, gesture, size, dance, effect, frame_num } = req.query;

        const secureLook = secure(look);

        let figureUrl = `${config.imagerURL}${secureLook}&direction=${direction || '3'}&head_direction=${head_direction || '3'}`;

        figureUrl += (action ? `&action=${encodeURIComponent(action)}` : '');
        figureUrl += (gesture ? `&gesture=${encodeURIComponent(gesture)}` : '');
        figureUrl += (headonly ? `&headonly=${encodeURIComponent(headonly)}` : '');
        figureUrl += (dance ? `&dance=${encodeURIComponent(dance)}` : '');
        figureUrl += (effect ? `&effect=${encodeURIComponent(effect)}` : '');
        figureUrl += (size ? `&size=${encodeURIComponent(size)}` : '');
        figureUrl += (frame_num ? `&frame_num=${encodeURIComponent(frame_num)}` : '');

        const imgFormatMatch = req.url.match(/(?:\.|img_format=)?(\w+)$/);
        const imgFormat = imgFormatMatch ? imgFormatMatch[1] : '';

        if (imgFormat) {
            figureUrl += `&img_format=${encodeURIComponent(imgFormat)}`;
        }

        const {
            data
        } = await axios.get(figureUrl, {
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
                res.status(500).send(`Internal Server Error during image extraction: ${extractError.message}`);
            }
        } else {
            console.log(chalk.bgGreen.white('[LOADED]') + ` -> ` + chalk.cyan(`Loaded Image successfully - Look: ` + ` -> ` + `${look}`));
            res.setHeader('Content-Type', 'image/gif');
            res.setHeader('Content-Disposition', 'inline');
            res.send(data);
        }

    } catch (error) {
        console.log(chalk.bgRed.white('[ERROR]') + ` -> ` + chalk.red(error.message));
        res.status(500).send(`Internal Error: ${error.message}`);
    }
});

module.exports = figureRouter;
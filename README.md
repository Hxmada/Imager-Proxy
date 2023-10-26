# Imager Proxy

## Requirements:
- ``NodeJS``
- ``Billson Nitro Imager`` - https://github.com/billsonnn/nitro-imager [Optional]

---
## Installation:
1. `npm i yarn -g`
2. `yarn install`
3. Click on `start.bat` to start or use `yarn start`
4. run usiung `yarn dev` for development mode

---
Edit config in `/_inc/config.js`

```js
module.exports = {
  /* ---------------------- Main Config ---------------------- */
  imagerURL: 'https://imager.zipto.net/?figure=', // Actual Imager URL
  usernameURL: '/username/:username', // Username URL
  figureURL: '/figure/:look', // Figure URL
  port: 3930, // Port to run your Imager proxy

  /* ---------------------- Database Config ---------------------- */
  dbConfig: {
    host: "127.0.0.1",
    user: "USER",
    password: "PASSWORD",
    database: "DB NAME",
  },
};
```

---
#### URL paramaters

Their are a few different options you may pass as URL parameters to generate figures with different actions. All parameters are optional.

| key            | default | description                                                         |
| -------------- | ------- | ------------------------------------------------------------------- |
| figure         | null    | The figure string to be rendered                                    |
| action         | null    | The actions to render, see actions below                            |
| gesture        | std     | The gesture to render, see gestures below                           |
| direction      | 2       | The direction to render, from 0-7                                   |
| head_direction | 2       | The head direction to render, from 0-7                              |
| headonly       | 0       | A value of `0` or `1`                                               |
| dance          | 0       | A dance id of 0-4 to render                                         |
| effect         | 0       | An effect id to render                                              |
| size           | n       | The size to render, see sizes below                                 |
| frame_num      | 0       | The frame number to render                                          |
| img_format     | png     | A value of `png` or `gif`. Gif will render all frames of the figure |

**Note**: You can use `&.gif` or `&.png` or `&img_format=.gif` in the end of the file if you are using discord and want to see the animation

---
### Actions

You may render multiple actions with a comma separater

Example: `&action=wlk,wav,drk=1`

---
### Posture

| key    | description                  |
| ------ | ---------------------------- |
| std    | Renders the standing posture |
| wlk,mv | Renders the walking posture  |
| sit    | Renders the sitting posture  |
| lay    | Renders the laying posture   |

---
### Expression

| key      | description                     |
| -------- | ------------------------------- |
| wav,wave | Renders the waving expression   |
| blow     | Renders the kissing expression  |
| laugh    | Renders the laughing expression |
| respect  | Renders the respect expression  |

---
### Carry / Drink

To hold a certain drink, use an equal separator with the hand item id. You can only render one of these options at a time

| key      | description              |
| -------- | ------------------------ |
| crr,cri  | Renders the carry action |
| drk,usei | Renders the drink action |

---
### Gestures

| key | description                    |
| --- | ------------------------------ |
| std | Renders the standard gesture   |
| agr | Renders the aggravated gesture |
| sad | Renders the sad gesture        |
| sml | Renders the smile gesture      |
| srp | Renders the surprised gesture  |
---

### Sizes
| key | description                  |
| --- | ---------------------------- |
| s   | Renders the small size (0.5) |
| n   | Renders the normal size (1)  |
| l   | Renders the large size (2)   |

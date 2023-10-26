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
  imagerURL: 'https://127.0.0.1:3030/?figure=', // Actual Imager URL
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

---
# Setting up with IIS

### Application Request Routing

To allow the imager to be rendered through our domain.

- The first thing we will have to do, to achieve this is downloading the "**Application Request Routing**" extension for IIS - You can download the extension, by visiting: https://www.iis.net/downloads/microsoft/application-request-routing

- Once the extension has been downloaded, go through the setup process and re-open your "**Internet Information Services**" application - you should then be able to see the "**Application Request Routing Cache**" module if you double click on the "**VMIxxxx**"

- Once you're able to see your "**Application Request Routing Cache**" module, double click it and at the right side, you should see "**Server Proxy Settings...**" Click on that and then tick the "**Enable proxy**"

- Once ticked, click "**Apply**" on the right side.

--- 
### Creating the URL Rewrite url, which will create the reverse proxy!

- The first thing you have to do is to expand the "**sites**" folder inside the "**Internet Information Services**" application, then double click on your the site we just created "**imager.your-domain**".
- Once you've doubled clicked your site, you should be able to see the "**URL Rewrite**" module - Double click it and then click "**Add Rule(s)...**" on the right and then select "**Blank rule**".
- Once the "**Blank rule**" has been selected you'll have to fill out a few fields.
- The first field to fill is the "**Name:**" the name will be totally up to you, but I will be writing "**imager**" inside of the field
- The second field to fill is the "**Pattern:**" field and inside of that write "**(.*)**"
- The last thing you'll have to do for the reverse proxy to be done is, scroll down until you see the "**Rewrite URL:**" field, inside of this field write the following: "**http://127.0.0.1:3930/{R:1}**" 
- Once everything is set click "**Apply**" in the top right corner

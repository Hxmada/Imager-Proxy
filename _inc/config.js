module.exports = {
  /* ---------------------- Main Config ---------------------- */
  imagerURL: 'https://imager.zipto.net/?figure=', // Actual Imager URL
  userIDURL: '/userid/:userID', // UserID URL
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

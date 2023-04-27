const whitelist = ["https://www.google.com", "http://localhost:3500"];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed to access"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;

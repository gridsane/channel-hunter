Combined playlist of your favorite music sources.

Channel Hunter was created as personal reactjs playground and lack many features for now.

# Installation

1. Clone this repository
1. `npm install`
1. Create `.env` file with the following content:

    ```
    MONGO_URI=mongodb://production_database
    MONGO_URI_TEST=mongodb://testing_database
    YOUTUBE_KEY=youtube_api_key
    ```

1. Development: `npm run nodemon`, production: `npm run build && npm start`

# Run tests

`npm test` or `npm run test_wo_db`

# Roadmap

- multiuser support
- add/search channels
- more sources
- favorite tracks


# License

MIT

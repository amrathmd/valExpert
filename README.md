## Getting Started
Before you start, make sure you have a fresh version of [Node.js](https://nodejs.org/en/) and NPM installed. The current Long Term Support (LTS) release is an ideal starting point.

1. Fork this repository and clone your own fork to your computer: 
    ```sh
    git clone https://github.com/YOUR_USERNAME/react-redux-boilerplate.git
    ```


2. From the project's root directory, install the required packages (dependencies):

    ```sh
    npm install
    ```

3. To run and test the app on your local machine (http://localhost:8080):

    ```sh
    npm run start
    ```

    This will start a server instance and begin listening for connections from localhost on port `8080`.

4. To build/deploye the app, you can run:

    ```sh
    npm run build
    ```

    This will place all files needed for deployment into the `/dist` directory.

## Project Structure

```sh
├── public  
    ├── favicon.ico
    ├── index.html              # html template for the app
    ├── thumbnail.jpg           # an image will be used in og:image meta tag
├── src                         # Source code.
    ├── components              # React components
    ├── constants               # app-wide constants (text, URLs, themes and etc)
    ├── contexts                # React contexts
    ├── hooks                   # reusable custom hooks
    ├── pages                   # Page components
    ├── services                # API calls
    ├── static                  # static assets
    ├── store                   # Redux store
        ├── Map                 # contains reducer, selectors and thunks for Map "slice" of the redux store
        ├── configureStore.ts   # configure the app's redux store
        ├── getPreloadedState.ts 
        ├── rootReducers.ts     # combine reducers from all slices
    ├── styles                  # app-wide styles
    ├── types                   # type definitions
    ├── utils                   # utility functions
    └── index.tsx               # entry point for the app
├── .babelrc                    # Babel configuration
├── .eslintrc.js                # ESLint configuration
├── .prettierrc.js              # Prettier configuration
├── tsconfig.json               # TypeScript configuration
├── webpack.config.js           # Webpack configurations
├── tailwind.config.js          # Tailwind CSS configurations
├── postcss.config.js           # PostCSS configurations
```

## Issues
Find a bug or want to request a new feature? Please let me know by submitting an issue.

## Licensing
Copyright 2022 Jinnan Zhang

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

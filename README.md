# How-to Magento with Next.js
## vol.1 Getting Started

Next.js is a minimalistic JAMstack framework; most of it is invisible to you (the developer). However, it is extensible when you need to customize and bring other third-party libraries.

### What you get out of the box with Next.js
- Pre-rendering. Static generated and server-side rendered.
- Zero Configuration. Auto code splitting, file-system based routing, and universal rendering.
- Static Exporting. It just happens. One command to build.
- Fully Extensible. Complete control over Babel and Webpack. Next-plugins.
- CSS-in-JS. Next comes with styled-jsx included, but it also works with other styling solutions.
- Ready for Production. Optimized for a smaller build size.

**⚠️ This is proof-of-concept for a Next.js project using data from Magento.**

### Getting Started 

☝️ Create a new `.env` file based on `.env.sample`, and change the value of `MAGENTO_URL` to point to your Magento instance.

👌 Install dependencies by running `npm install` or `yarn install`


### Development Mode

👌 Run `npm run dev` or `yarn dev` to start the application on development mode, and visit https://localhost:3000


### Production Mode

☝️ Run `npm run build` or `yarn build`

👌 Run `npm run start` or `yarn start`, and visit https://localhost:3000

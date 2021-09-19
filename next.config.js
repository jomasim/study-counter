const withOptimizedImages = require('next-optimized-images')
const withFonts = require('next-fonts')
require('dotenv').config()
const Dotenv = require('dotenv-webpack')

const path = require('path')

module.exports = withFonts(
  withOptimizedImages({
    /* config for next-optimized-images */
    // your config for other plugins or the general next.js here...
  }),
  [
    new Dotenv({
      path: path.join(__dirname, '.env'),
      systemvars: true
    })
  ],
  {
    env: {
      NEXT_API_URL: process.env.NEXT_API_URL,
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET:
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      NEXT_PUBLIC_CLOUDINARY_API_KEY:
        process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY
    }
  }
)

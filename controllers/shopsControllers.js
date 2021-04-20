import asyncHandler from '../middleware/async.js';
import asynHandler from '../middleware/async.js';
import Products from '../models/productsModel.js';
import Shops from '../models/shopsModels.js';
import ErrorResponse from '../utils/errorResponse.js';
import Admin from '../models/adminModel.js';
import haversine from 'haversine';
import distFrom from 'distance-from';
import AWS from 'aws-sdk';
import fs from 'fs';
// @TODO - Fetch Shop Owner ID from Token
// @desc Create A New Shop
// @route POST /api/registerShop
// @access Private
const registerShop = asynHandler(async (req, res) => {
  let finalImageURL;
  const adminId = req.admin.id;
  const image = req.file;
  console.log(image);
  console.log(req.body.shopLocation);
  AWS.config.update({
    accessKeyId: 'AKIAZPZEKRNJC6BBJLBS',
    secretAccessKey: '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',
    region: 'ap-south-1',
  });

  const s3 = new AWS.S3();
  const bucketName = '';
  const myKey = 'jpeg';
  let params = {
    Bucket: 'shop-images-at-your-door',
    Body: image.buffer,
    Key: `${adminId}.jpeg`,
    ContentEncoding: 'base64',
    ContentDisposition: 'inline',
    ACL: 'public-read',
    ContentType: image.mimetype,
  };
  // const fileStream = fs.createReadStream(image);
  // fileStream.on('error', function (err) {
  //   console.log('File Error', err);
  // });
  // params.Body = fileStream;
  s3.upload(params, async (err, data) => {
    if (err) {
      console.log('Error', err);
    }
    if (data) {
      console.log('Upload Success', data.Location);
      finalImageURL = data.Location;

      const {
        shopName,
        // shopImageURL,
        shopAddress,
        shopNumber,
        shopLocation,
      } = req.body;
      // console.log(typeof shopLocation);
      const newShop = new Shops({
        shopOwnerID: adminId,
        shopName,
        shopImageURL: finalImageURL,
        shopAddress,
        shopNumber,
        shopLocation: shopLocation.split(','),
      });

      console.log(newShop);

      await newShop.save();

      const updateShop = await Admin.findById(adminId);
      // console.log(typeof updateShop.shopId);
      // console.log(updateShop.shopId);
      updateShop.shopId = newShop._id;
      await updateShop.save();
    }
  });
  res.status(200).json({ msg: 'Shop SuccessFully Created' });
});

// @TODO - Fetch Shops According To User Location
// @desc GET ALL SHOPS
// @route GET /api/getShops
// @access Public
const getShops = asynHandler(async (req, res, next) => {
  const shops = await Shops.find({});

  res.status(200).json(shops);
});

// @TODO - Handle Error Of Shop Not Found Efficently
// @desc GET A SINGLE SHOP BY ID
// @route GET /api/getShops/:shopId
// @access Public
const getShopById = asynHandler(async (req, res) => {
  const shop = await Shops.findById(req.params.shopId);

  if (!shop) {
    res.status(404).json({ msg: `No Shops Found With ${req.params.shopId}` });
  }
  res.status(200).json(shop);
});

// @desc GET ALL SHOPS ACCORDING TO USER LOCATION
// @route GET /api/getShops/:latitude/:longitude
// @access Public
const getShopAccordingToLocation = asynHandler(async (req, res) => {
  const latitude = req.params.latitude;
  const longitude = req.params.longitude;
  console.log(latitude);
  console.log(longitude);
  const getShops = await Shops.find({
    shopLocation: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        $maxDistance: 10000,
        $minDistance: 0,
      },
    },
  });

  // let i = 0;

  // // const start = [latitude, longitude];
  // for (i; i < getShops.length; i++) {
  //   console.log(getShops[i]);
  //   const lat = getShops[i].shopLocation[0];
  //   const long = getShops[i].shopLocation[1];

  //   // const num = distFrom(start).to(getShops[i].shopLocation).in('kilometers');
  // }

  // function distance(lat1, lon1, lat2, lon2, unit) {
  //   if (lat1 == lat2 && lon1 == lon2) {
  //     return 0;
  //   } else {
  //     var radlat1 = (Math.PI * lat1) / 180;
  //     var radlat2 = (Math.PI * lat2) / 180;
  //     var theta = lon1 - lon2;
  //     var radtheta = (Math.PI * theta) / 180;
  //     var dist =
  //       Math.sin(radlat1) * Math.sin(radlat2) +
  //       Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  //     if (dist > 1) {
  //       dist = 1;
  //     }
  //     dist = Math.acos(dist);
  //     dist = (dist * 180) / Math.PI;
  //     dist = dist * 60 * 1.1515;
  //     if (unit == 'K') {
  //       dist = dist * 1.609344;
  //     }
  //     if (unit == 'N') {
  //       dist = dist * 0.8684;
  //     }
  //     return dist;
  //   }
  // }
  console.log(getShops);
  res.status(200).json(getShops);
});
export { registerShop, getShops, getShopById, getShopAccordingToLocation };

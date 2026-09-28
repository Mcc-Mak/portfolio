const express = require("express");

const recordRoutes = express.Router();

const ObjectId = require("mongodb").ObjectId;

require("dotenv").config({ path: "./conf/config.env" });
const PORT = process.env.PORT || 5000;
const URI = process.env.URI;

const { MongoClient } = require("mongodb");
const client = new MongoClient(URI);

const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('/myapp-app/.localstorage');

recordRoutes.route("/getLocalStorage").get(async (req, res) => {
  const response = localStorage.getItem(req.query.name);
  res.send(response);
});

recordRoutes.route("/setLocalStorage").get(async (req, res) => {
  localStorage.setItem(
    req.query.name,
    Buffer.from(req.query.value, "base64").toString("ascii")
  );
  const response = localStorage.getItem(req.query.name);
  res.send(response);
});

recordRoutes.route("/:dbname/all").get(async (req, res) => {
  const myClient = await client.connect();
  const myDb = myClient.db(req.params.dbname);
  const myCollection = myDb.collection(req.params.dbname);
  const findResult = myCollection.find({});

  let data_r = [];
  for await (const doc of findResult) {
    data_r.push(doc);
  }

  const response = {
    message: `INFO: API:'/${req.params.dbname}/all'`,
    data: data_r,
  };
  res.send(response);
});

recordRoutes.route("/:dbname/record/:question_id").get(async (req, res) => {
  const myClient = await client.connect();
  const myDb = myClient.db(req.params.dbname);
  const myCollection = myDb.collection(req.params.dbname);
  const findResult = myCollection.find({
    question_id: `${req.params.question_id}`,
  });

  let data_r = [];
  for await (const doc of findResult) {
    data_r.push(doc);
  }

  const response = {
    message: `INFO: API:'/${req.params.dbname}/record/${req.params.question_id}'`,
    data: data_r[0] ?? {},
  };
  res.send(response);
});

module.exports = recordRoutes;

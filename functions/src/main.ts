import * as express from "express"
import * as functions from "firebase-functions"
import * as fs from "fs"

const use_twitter = false

let client: any
if (use_twitter) {
  const Twitter = require("twitter")
  client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_API_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  })
}

function home_timeline(): Promise<any> {
  if (use_twitter) {
    return client.get("statuses/home_timeline.json", { count: 10 })
  } else {
    return new Promise(resolve =>
      resolve(JSON.parse(fs.readFileSync("mock/statuses/home_timeline.json", "utf8")))
    )
  }
}

const app = express()

app.get("/", (req, res) => {
  res.send(JSON.stringify({ a: 0, b: 0 }))
})
app.get("/a", (req, res) => {
  res.send(JSON.stringify({ a: 1, b: 0 }))
})
app.get("/b", (req, res) => {
  res.send(JSON.stringify({ a: 0, b: 1 }))
})
app.get("/c", (req, res) => {
  res.send(JSON.stringify({ a: 1, b: 1 }))
})
app.get("/timeline", (req, res) => {
  home_timeline().then((o: any) => {
    res.send(JSON.stringify(o))
  })
})

export const api = functions.https.onRequest(app)

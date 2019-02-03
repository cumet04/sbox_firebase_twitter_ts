const use_twitter = false
const fs = require("fs")

let client
if (use_twitter) {
  const Twitter = require("twitter")
  client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_API_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  })
}

function home_timeline() {
  if (use_twitter) {
    return client.get("statuses/home_timeline.json", { count: 10 })
  } else {
    return JSON.parse(fs.readFileSync("mock/statuses/home_timeline.json", "utf8"))
  }
}
async function main() {
  console.log(JSON.stringify(await home_timeline()))
}

main()

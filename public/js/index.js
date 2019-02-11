document.addEventListener("DOMContentLoaded", function() {
  try {
    let app = firebase.app()
    let features = ["auth", "database", "messaging", "storage"].filter(
      feature => typeof app[feature] === "function"
    )
    document.getElementById("load").innerHTML = `Firebase SDK loaded with ${features.join(", ")}`
  } catch (e) {
    console.error(e)
    document.getElementById("load").innerHTML = "Error loading the Firebase SDK, check the console."
    return
  }

  var provider = new firebase.auth.TwitterAuthProvider()
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(`login: ${user.displayName}`)
      return
    }
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        var token = result.credential.accessToken
        var secret = result.credential.secret
        // The signed-in user info.
        var user = result.user
        // ...
        console.log(user)
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // The email of the user's account used.
        var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential
        // ...
      })
  })
  fetch("/api/a")
    .then(res => {
      return res.json()
    })
    .then(data => {
      console.log(data)
    })
})

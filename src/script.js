console.log("hiero");
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'http://localhost:4567/User/GetTest', false)
request.onload = function () {

    var data = JSON.parse(this.response)

    console.log(data);

}
console.log("hiero");
request.send()


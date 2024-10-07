let reaction = document.querySelector("div.reaction span");
let memorySpan = document.querySelector("div.memory span");
let verbalSpan = document.querySelector("div.verbal span");
let visualSpan = document.querySelector("div.visual span");
let resultSpan = document.querySelector(".circle span");
let result = 0;

/* ### The basic way using AJAX:

getData("GET", "./data.json");

function getData(method, url) {
  let request = new XMLHttpRequest();
  request.open(method, url);
  request.send();
  request.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      let data = JSON.parse(this.responseText);
      let categories = data.length;
      data.forEach((input) => {
        result += input.score;
        switch (input.category) {
          case "Reaction":
            reaction.innerHTML = input.score;
            break;
          case "Memory":
            memorySpan.innerHTML = input.score;
            break;
          case "Verbal":
            verbalSpan.innerHTML = input.score;
            break;
          case "Visual":
            visualSpan.innerHTML = input.score;
            break;
        }
      });
      resultSpan.innerHTML = Math.round(
        result / categories
      );
    }
  };
} */

/* ### The second way using Promise + XML Request:

getData("GET", "./data.json");

function getData(method, url) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open(method, url);
    request.send();
    request.onload = function () {
      if (this.status == 200 && this.readyState == 4) {
        resolve(this.responseText);
      } else {
        reject(Error("No Data!"));
      }
    };
  })
    .then((resolve) => {
      let data = JSON.parse(resolve);
      let categories = data.length;
      data.forEach((input) => {
        result += input.score;
        switch (input.category) {
          case "Reaction":
            reaction.innerHTML = input.score;
            break;
          case "Memory":
            memorySpan.innerHTML = input.score;
            break;
          case "Verbal":
            verbalSpan.innerHTML = input.score;
            break;
          case "Visual":
            visualSpan.innerHTML = input.score;
            break;
        }
      });
      resultSpan.innerHTML = Math.round(
        result / categories
      );
    })
    .catch((reject) => console.log(reject));
} */

/* ### The Third way using Fetch: 

- Fetch returns a Promise and this promise returns
  a Response Object from the resolved function
  So to get the actual Data you have to use
  a method called json() which also return a Promise

fetch("./data.json")
  .then((data) => {
    return data.json(); //
  }) //
  .then((data) => handleFetch(data)); //
let handleFetch = (data) => {
  let categories = data.length;
  data.forEach((input) => {
    result += input.score;
    switch (input.category) {
      case "Reaction":
        reaction.innerHTML = input.score;
        break;
      case "Memory":
        memorySpan.innerHTML = input.score;
        break;
      case "Verbal":
        verbalSpan.innerHTML = input.score;
        break;
      case "Visual":
        visualSpan.innerHTML = input.score;
        break;
    }
  });
  resultSpan.innerHTML = Math.round(result / categories);
}; */

/* ### The Fourth way using Async function: 

- Async functions return a promise but inside them it is not a promise,
so if you try to get your data only using AJAX it won't work, why?
because fetching data takes time right? and your Async function will
immediately return a promise without even waiting for your onload function
so you won't get a valid response, then awaits comes to solve the problem
with Async functions but as you know you always need a promise in order to
make await waits for your resolve function.

- You might ask but how we could use AJAX before in the global scope
and we got our data while we can't do the same inside Async functions?
The answer is simple, earlier we used onload or onreadystatechange to listen 
to our request and interact with its cases, but here with Async functions
it's different because the function immediately executing all the code line
and then returns the promise without waiting if there is unfinished or 
Async codes inside it! not like when using a promise where the JS engine has to
wait until it gets a resolve or a reject, or with the global scope where the
window object keeps listening to any changes in the request status. 

*/

getData("GET", "./data.json");

async function getData(method, url) {
  let myData = new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open(method, url);
    request.send();
    request.onload = function () {
      if (
        request.status == 200 &&
        request.readyState == 4
      ) {
        resolve(request.responseText);
      } else {
        reject(Error("No Data!"));
      }
    };
  });
  await myData.then((resolve) => {
    let data = JSON.parse(resolve);
    let categories = data.length;
    data.forEach((input) => {
      result += input.score;
      switch (input.category) {
        case "Reaction":
          reaction.innerHTML = input.score;
          break;
        case "Memory":
          memorySpan.innerHTML = input.score;
          break;
        case "Verbal":
          verbalSpan.innerHTML = input.score;
          break;
        case "Visual":
          visualSpan.innerHTML = input.score;
          break;
      }
    });
    resultSpan.innerHTML = Math.round(result / categories);
  });
}

/* 

I wanna show you something:

async function test() {
  await new Promise((res) => {
    // if you removed await from here then the function will return 2 immediately then 1
    setTimeout(() => res("1"), 2000);
  }).then((res) => console.log(res));
  return "2";
}

test().then((res) => console.log(res)); // 1 2 

*/

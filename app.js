const $ = (element) => document.querySelector(element);
const $All = (element) => document.querySelectorAll(element);
const addBtn = $All(".plus");
const total = $(".total-marks");
const subtractBtn = $All(".minus");
const userNames = $All(".username");
const userVotes = $All(".votes");
const userImages = $All(".user-img img");
const progressBar = $(".progress");
const LeaderboardImgs = $All(".leaderboard img");
const LeaderboardNames = $All(".leaderboard .username");
const eviction = $(".userEviction p");
const counts = $All(".leaderboard span");

const contestants = {
  totalMarks: 100,
  users: [
    {
      name: "Erica",
      votes: 0,
      id: 0,
      imgSrc: "./img/Erica.jpg",
    },
    {
      name: "Lilo",
      votes: 0,
      id: 1,
      imgSrc: "./img/Lilo.jpg",
    },
    {
      name: "Ozo",
      votes: 0,
      id: 2,
      imgSrc: "./img/Ozo.jpg",
    },
    {
      name: "Prince",
      votes: 0,
      id: 3,
      imgSrc: "./img/Prince.jpg",
    },
    {
      name: "TrikyTee",
      votes: 0,
      id: 4,
      imgSrc: "./img/TrikyTee.jpg",
    },
    {
      name: "Vee",
      votes: 0,
      id: 5,
      imgSrc: "./img/Vee.jpg",
    },
  ],
};

total.textContent = contestants.totalMarks;

//Input Validation
const selectName = $(".name");
const inputVote = $(".number-of-votes");
const addVote = $(".add-vote");
const inputError = $(".input-error");




//Insert users in the option tag in the select tag

contestants.users.map((user)=>{
  let option = document.createElement("option");
  option.value = user.name;
  option.innerHTML = user.name;
  selectName.appendChild(option)
})

selectName.onchange = function(){
  
}

inputVote.onkeyup = function () {
  this.value > contestants.totalMarks
    ? (inputError.innerHTML = "vote should'nt be greater than the total marks")
    : (inputError.innerHTML = "");
};

addVote.addEventListener("click", () => {
 if(inputVote.value == "" || selectName.value == ""){
 (inputError.textContent = "Please input a name and a number of votes")
 return;
 }else{
  (inputError.value = "");
 }
  contestants.users.map((user) => {
      if (user.name == selectName.value) {
        user.votes += +inputVote.value;
        contestants.totalMarks -= +inputVote.value;
        progressBar.style.width = contestants.totalMarks + "%";
        total.textContent = contestants.totalMarks;
        userVotes.forEach((uservote, voteIndex) => {
          user.id == voteIndex ? (uservote.textContent = user.votes) : "";
       });
        selectName.value = "";
       inputVote.value = "";  
      }
        
  });
});

//Display username
const displayUserInfo = () => {
  contestants.users.map((user) => {
    userNames.forEach((username, ElementIndex) => {
      user.id == ElementIndex ? (username.textContent = user.name) : "";
    });

    userVotes.forEach((uservote, voteIndex) => {
      user.id == voteIndex ? (uservote.textContent = user.votes) : "";
    });
    userImages.forEach((userImg, imgIndex) => {
      user.id == imgIndex ? (userImg.src = user.imgSrc) : "";
    });
  });
};
displayUserInfo();

//Add vote to the user's score
addBtn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    contestants.users.map((user, mapIndex, users) => {
      if (contestants.totalMarks == 0 || user.votes == 100) return;
      if (index === user.id) {
        users[index].votes++;
        contestants.totalMarks--;
        total.textContent = contestants.totalMarks;
        progressBar.style.width = contestants.totalMarks + "%";
      }
      userVotes.forEach((uservote, voteIndex) => {
        voteIndex == user.id ? (uservote.textContent = user.votes) : "";
      });
    });
  });
});

//Subtract vote to the user's score
subtractBtn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    contestants.users.map((user, mapIndex, users) => {
      if (contestants.totalMarks == 100 || user.votes == 0) return;
      if (index === user.id) {
        contestants.totalMarks++;
        users[index].votes--;
        total.textContent = contestants.totalMarks;
        progressBar.style.width = contestants.totalMarks + "%";
      }
      userVotes.forEach((uservote, voteIndex) => {
        voteIndex == user.id ? (uservote.textContent = user.votes) : "";
      });
    });
  });
});

counts.forEach((count, index) => {
  count.innerHTML = index + 1;
});

//Animate
const viewBoard = $(".view");
const backToVote = $(".back");
const leaderboard = $(".leaderboard");

//Sorting out according to position and votes

let newUsers = [];
const redirectToBoard = () => {
  let errors = $(".error");
  if (contestants.totalMarks !== 0) {
    errors.innerHTML = "*Finish the vote";
    return;
  }
  errors.innerHTML = "";
  leaderboard.style.opacity = 1;
  leaderboard.style.pointerEvents = "auto";
  // LeaderboardImgs.forEach((img) => {});
  let users2 = contestants.users.map((u) => Object.assign({}, u));
  let userVotes = [];
  users2.map((user, index) => {
    //4
    userVotes.push(user.votes);
    userVotes.sort((a, b) => b - a);
    userVotes.includes(user.votes)
      ? newUsers.splice(userVotes.indexOf(user.votes), 0, user)
      : "";
  });
  //  console.log(newUsers)
  newUsers.map((user, index, users) => {
    LeaderboardNames.forEach((username, ElementIndex) => {
      index == ElementIndex ? (username.textContent = user.name) : "";
    });
    LeaderboardImgs.forEach((userImg, ElementIndex) => {
      index == ElementIndex ? (userImg.src = user.imgSrc) : "";
    });
    lastUser = users[users.length - 1].name;
    eviction.innerHTML = `${lastUser} was evicted`;
  });
};
const redirectToVote = () => {
  leaderboard.style.opacity = 0;
  leaderboard.style.pointerEvents = "none";
  newUsers = [];
};

viewBoard.onclick = redirectToBoard;
backToVote.onclick = redirectToVote;

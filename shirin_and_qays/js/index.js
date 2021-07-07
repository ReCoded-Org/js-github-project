let users;
let repos;


document.addEventListener('DOMContentLoaded', function () {


  const form = document.getElementById('github-form');
  const searchText = document.getElementById('search');
  const usersList = document.getElementById('user-list');
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    fetch(`https://api.github.com/search/users?q=${searchText.value}`, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github.v3+json'
      },
    }).then(response => response.json())
      .then(data => {

        users = [...data.items];
        usersList.innerHTML = '';
        console.log('Success:', data.items);

        for (let index = 0; index < users.length; index++) {

          const user = users[index];
          const userName = user.login;
          const avatar = user.avatar_url;
          const profileUrl = user.url;

          usersList.innerHTML += `<div class="card" onclick="showRepo(${index})">
        <div class="firstinfo"><img src="${avatar}">
        <div class="profileinfo">
        <h1>${userName}</h1>
        <p class="bio"><a href="${profileUrl}">GitHub</a></p>
        </div>
        </div>
        </div>`;


        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });









});



function showRepo(index) {
  const reposList = document.getElementById('repos-list');

  const profileUrl = users[index].url;
  fetch(`${profileUrl}/repos`, {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github.v3+json'
    },
  })
    .then(response => response.json())
    .then(data => {

      repos = [...data];
      reposList.innerHTML = '';
      console.log('Success:', data);

      for (const repo of repos) {
        const full_name = repo.full_name;
        const html_url = repo.html_url;

        reposList.innerHTML += `<div class="card">
           <div class="firstinfo">
           <div class="profileinfo">
           <h1>${full_name}</h1>
           <h3>Python Ninja</h3>
           <p class="bio"><a href="${html_url}">GitHub</a></p>
           </div>
           </div>
           </div>`;


      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });


}







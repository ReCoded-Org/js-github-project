document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementsByTagName("form")[0];
  const userList = document.getElementById("user-list");
  const repoList = document.getElementById("repos-list");
  const inputVal = document.getElementById("search");
  form.addEventListener("submit", searchUser);
  function searchUser(e) {
    e.preventDefault();
    userList.innerHTML = "";
    repoList.innerHTML = "";
    return fetch(`https://api.github.com/search/users?q=${inputVal.value}`)
      .then((response) => response.json())
      .then((profile) => {
        profile.items.forEach((user) => {
          let listItem = document.createElement("li");
          listItem.innerHTML = `<b>${user.login}</b>
           <div style="margin:20px"> <img src="${user.avatar_url}" alt="avatar" height="150px">
</div>
            <div style="margin:20px">
            <a href="${user.html_url}">Profile Link</a>
            </div>
            <div style="margin:20px">
            <button type="button" class="repo-btn">Click Me to show Repos!</button>
            </div>
            `;
          let btn = listItem.querySelector(".repo-btn");
          btn.addEventListener("click", function () {
            searchRepo(user);
          });
          userList.appendChild(listItem);
        });
        inputVal.value = "";
      });
  }

  function searchRepo(user) {
    return fetch(`https://api.github.com/users/${user.login}/repos`)
      .then((response) => response.json())
      .then((json) =>
        json.forEach((repo) => {
          let repoListItem = document.createElement("li");
          repoListItem.innerHTML = `
        <a href="${repo.html_url}">${repo.name}</a>
        `;
          repoList.appendChild(repoListItem);
        })
      );
  }
});

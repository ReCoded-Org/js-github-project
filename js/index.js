window.addEventListener("load", () => {
  const userContainer = document.querySelector("#user-list");
  const repoContainer = document.querySelector("#repos-list");
  const searchInput = document.querySelector("#search");
  let form = document.getElementById("github-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // console.log(searchInput.value);

    let githubApi = `https://api.github.com/search/users?q=${searchInput.value}`;

    fetch(githubApi)
      .then(function (response) {
        return response.json();
        // console.log(response.json());
      })
      .then(function (data) {
        const arrayData = data.items;
        arrayData.forEach((user) => {
          const li = document.createElement("li");
          li.innerHTML = `<p>${user.login}</p>
          <img src=${user.avatar_url} style="width:300px" alt="" />
          <div>
          <a href=${user.html_url}>Profile Link</a>
          <button class="get-repo"><a href=""></a>Get Repo</button>
          </div>`;
          const repoBtn = li.querySelector(".get-repo");
          const userName = li.querySelector("p").innerText;
          repoBtn.addEventListener("click", function () {
            fetch(`https://api.github.com/users/${userName}/repos`)
              .then((response) => response.json())
              .then((json) => {
                json.forEach((repo) => {
                  const li = document.createElement("li");
                  li.innerHTML = `${repo.name}`;
                  repoContainer.appendChild(li);
                });
              });
          });
          userContainer.appendChild(li);
        });
      });
  });
});

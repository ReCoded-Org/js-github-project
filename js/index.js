window.addEventListener("load", () => {
  const userContainer = document.querySelector("#user-list");
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
          repoBtn.addEventListener("click", function () {
            console.log("work");
          });
          userContainer.appendChild(li);

          //   userContainer.insertAdjacentHTML(
          //     "beforeend",
          //     `<li>
          //   <p>${user.login}</p>
          //   <img src=${user.avatar_url} style="width:300px" alt="" />
          //   <div>
          //   <a href=${user.html_url}>Profile Link</a>
          //   <button id="get-repo"><a href=""></a>Get Repo</button>
          //   </div>
          // </li>`
          //   );
          // console.log(user);
        });
      });
  });
});

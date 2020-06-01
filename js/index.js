window.addEventListener('load', () => {

    let submitBtn = document.querySelector('#submit-btn')
    let inputText = document.querySelector('#search')
    let userList = document.querySelector('#user-list')
    let repoList = document.querySelector('#repos-list')

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fetchUsers(inputText.value)
    })

    function fetchUsers(userName) {
        fetch(`https://api.github.com/search/users?q=${userName}`)
            .then((response) => response.json())
            .then((object) => {
                userList.innerHTML = ''
                repoList.innerHTML = ''
                iterateOver(object.items)
            })
    }

    function fetchUserRepos(login) {
        fetch(`https://api.github.com/users/${login}/repos`)
            .then((response) => response.json())
            .then((object) => {
                iterateOverRepos(object);
            })
    }

    function iterateOver(users) {
        for (element of users) {

            let userLi = document.createElement('li')
            let img = document.createElement('img')
            let p = document.createElement('p')
            let link = document.createElement('a')
            let userDiv = document.createElement('div')
            let showRepoBtn = document.createElement('button')

            link.setAttribute('href', element.html_url)
            p.innerText = element.login
            img.src = element.avatar_url
            link.innerText = element.login
            img.classList.add('images')
            userDiv.classList.add('user-div')
            showRepoBtn.innerText = "show user's repos"

            userDiv.appendChild(p)
            userDiv.appendChild(img)
            userDiv.appendChild(link)
            userDiv.appendChild(showRepoBtn)
            userLi.appendChild(userDiv)
            userList.appendChild(userLi)

            btnClick(showRepoBtn, element.login)
        }
    }

    function iterateOverRepos(repo) {
        for (element of repo) {

            let repoLi = document.createElement('li')
            let repoLink = document.createElement('a')

            repoLink.setAttribute('href', element.html_url)
            repoLink.setAttribute('target', '_blank')
            repoLink.innerText = element.html_url

            repoLi.appendChild(repoLink)
            repoList.appendChild(repoLi)
        }
    }

    function btnClick(btn, login) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            repoList.innerHTML = ''
            fetchUserRepos(login);
        })
    }

})








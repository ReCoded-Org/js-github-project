


const form = document.getElementById('github-form');
let inputSearch = document.getElementById('search');
let submitBtn = document.getElementById('submit');
let repoUl = document.getElementById('repos-list');
console.log(form)
form.addEventListener('submit', (event)=>{
    event.preventDefault();
    let userList= document.getElementById('user-list');
    fetch(`https://api.github.com/search/users?q=${inputSearch.value}`)
    .then( resp => resp.json())
    .then (data =>{
        console.log(data);
       for (const user of data.items){

        let userLi = document.createElement('li');
        let avatar = document.createElement('img');
        let userLink = document.createElement('a');
        const usersRepo = document.createElement('button');
        avatar.src = user.avatar_url;
        avatar .width = 50;
        userLink.innerText = 'profile';
        userLink.href=user.url; 
        userLi.innerText= user.login;
        usersRepo.innerText = 'show repos';
        userLi.appendChild(avatar);
        userLi.appendChild(userLink);
        userLi.appendChild(usersRepo);
        userList.appendChild(userLi);

        usersRepo.addEventListener('click',()=>{

            fetch(`https://api.github.com/users/${user.login}/repos`)
            .then(response => response.json())
            .then(repoLinks =>{
                console.log(repoLinks);
                
              for (const repo of repoLinks){

               repoUl.insertAdjacentHTML('beforeend',`<Li> <a href="${repo.archive_url}"> ${repo.full_name} </a></Li>`)   
              }
                

          

            })

        })
        
       }
       inputSearch.value= '';

    })

})
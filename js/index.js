
window.onload = function(){
    //first fetch
    function fetchUserData(queryStrig = undefined){
        let url = "https://api.github.com/search/users?q=octocat";
        if(queryStrig) url = "https://api.github.com/search/users?q="+queryStrig;
        return fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            userEndPoint(json);
        })
    }
    //appending first fetch data to the DOM
    function userEndPoint(data){
        let ul = document.querySelector('#user-list');
        ul.innerHTML="";
        for(const user of data.items){
            let lis = document.createElement('li');
            let div = document.createElement('div');

            let p = document.createElement('p');
            p.innerHTML = ` ${user.login}`;
            div.appendChild(p);

            let img = document.createElement('img');
            img.src = user.avatar_url;
            div.appendChild(img);

            let p2 = document.createElement('p');
            let btn= document.createElement('button');
            btn.innerHTML = "User Repo";
            p2.appendChild(btn);
            div.appendChild(p2);
            btn.addEventListener('click',fetchUserRepo);
            btn.user = user.login;
          
            lis.appendChild(div);
            ul.appendChild(lis);
        }
    }

    
    //addng event listener to submit btn
    let input = document.querySelector('#submit');
    input.addEventListener('click',function(e){
        e.preventDefault();
        let nameInput = document.getElementById('search');
        fetchUserData(nameInput.value);
    });

    
    //second fetch
    function fetchUserRepo(e){
        return fetch('https://api.github.com/users/'+e.target.user+'/repos')
        .then(function(response)
        {
            return response.json();
        })

        .then(function(json){
            repoEndPoint(json);
        })
    }
    //appending second fetch data to the DOM
    function repoEndPoint(data){
    let ul = document.querySelector('#repos-list');
    ul.innerHTML="";
        for(const repo of data){
            let lis = document.createElement('li');
            lis.innerHTML = repo.name;
            ul.appendChild(lis);
        }
    }
}


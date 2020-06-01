let ul = document.querySelector('#user-list')
let ul2 = document.querySelector('#repos-list')
let input = document.getElementById('search');
let form = document.querySelector('#github-form')
function showInfo(data){
    for (let i = 0; i < data.items.length; i++) {
        
        let avata = data.items[i].avatar_url;
    let name = data.items[i].login;
    let li = document.createElement('li')
    let libutton = document.createElement('li')
    libutton.classList.add('flex')
    li.innerHTML = `<div>
    <img src="${avata}" alt="avatar"><br>
    <h1>${name}</h1>
    </div>`;
    libutton.innerHTML=`<div>
    <a href="${data.items[i].html_url}">see profile</a>
    <button class="btn">show repo</button>
  </div>
  <div id="repo-info">
    
  </div>`
    ul.appendChild(li)
    ul.appendChild(libutton)
    let btn = document.querySelectorAll('.btn')
    for (let index = 0; index < btn.length; index++) {
         btn[index].addEventListener('click', ()=>{
            fetch(`${data.items[index].repos_url}`)
            .then(response => response.json())
            .then(data => {console.log(data.items[0].avatar_url)
            //  ul2.innerHTML = `<li>
            //     ${}
            //  </li>`
            }).catch((err)=>{
                console.log(err)
            });
        
    })
        
    }
       
    
    
    }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    fetch(`https://api.github.com/search/users?q=${input.value}`)
    .then(response => response.json())
    .then(data => {console.log(data.items[0].avatar_url)
    showInfo(data); 
    }).catch((err)=>{
        console.log(err)
    });
})

getposts(page = 1, fgdg = true)



regesterr = document.getElementById('regester')

curantPage = 1
lastpage = NaN
console.log(typeof lastpage)

window.onscroll = function () {
  if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) {
    if (curantPage < lastpage) {
      curantPage += 1;
      getposts(curantPage, fgdg = false)
      console.log('done')
      console.log(lastpage)
      console.log(curantPage)
    }

  }
}
function getposts(page = 1, fgdg) {
  contentCard = document.getElementById('content-card')

  if (fgdg) {
    contentCard.innerHTML = ''
  }


  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  fetch(`https://tarmeezacademy.com/api/v1/posts?limit=20&page=${page}`, requestOptions,)
    .then(response =>
      response.json()
    ).then(response => {
      posts = response.data
      lastpage = response.meta.last_page

      title1 = ''

      let contnt1 = ''
      tagscontnt = ''
      if (localStorage.getItem('user') != null) {
        user = JSON.parse(localStorage.user)
      } else {
        user = {
          id: ''
        }
        btns = ``
      }


      for (post of posts) {
        if (post.title != null) {
          title1 = post.title
        }
        btns = ''

        if (localStorage.getItem('user') != null) {
          user = JSON.parse(localStorage.user)
          if (post.author.id === user.id) {
            btns = `
            <button type="button" class="btn btn-success" onclick="editPost(${encodeURIComponent(JSON.stringify(post))})">Edit</button>
            <button type="button" class="btn btn-danger" onclick="deletePost(${post.id})" id="delete">Delete</button>
                   `
          }
        } else {
          user = {
            id: ''
          }
          btns = ``


        }


        let contnt1 = ''
        contnt1 = `
    <div  class="card center">
      <div class="d-flex card-body" style="display: flex; justify-content: space-between; align-items: center;">
        <div onclick="getpostsuser(${post.author.id})" style="display: flex; align-items: center;">
          <img src="${post.author.profile_image}" style="width: 50px; height: 50px; border-radius: 50%;" alt="">
          <h5 class="card-header" style="margin-left: 10px;">@${post.author.name}</h5>
        </div>
        <div>
        ${btns}
        </div>
      </div>
      <div onclick="clikedPost(${post.id})" style="cursor: pointer;" class="card-body">
      <img src="${post.image}" alt="" style="width: 100%;">
        <span><small class="text-body-secondary">${post.created_at}</small> </span>
        <h5 class="card-title">${title1}</h5>
        <p class="card-text">${post.body}</p>
        <hr>
        <p> (${post.comments_count}) coumnts </p>
        
           <div id="tags${post.id}">

      </div>
    </div>         
        `

        contentCard.innerHTML += contnt1
        for (tag of post.tags) {

          let contenttags = `
          <button class="btn btn-ms rounded-5" style="background-color: gray; color: white;">${tag.name}</button>            

          `

          document.getElementById(`tags${post.id}`).innerHTML += contenttags
        }

      }
    })

}

function getpostsuser(id){
  window.location = `profile.html?id=${id}`
}

url = new URLSearchParams(window.location.search);
id = url.get('id')
getinfoprofile(id)
chkehead()
function chkehead() {
  if (id == null && localStorage.user != null) {
    console.log('done')
    user = JSON.parse(localStorage.user)
    console.log(user)
    id = user.id
    getinfoprofile(id);
  } else if (id == null && localStorage.user == null) {
    document.getElementById('head').innerHTML = `
  
  <div class="row mt-5">
          <div class="col-2" style="background-color: aliceblue;">
              <img id="infoContantImage" src="./images/anumous.jpg" style="width: 100px; height: 100px; border-radius: 50%;">
          </div>
          <div class="col-4">
              <p id="infoContantEmail" style="font-size: 20px; font-weight: 500; font-family: sans-serif;"><span style="font-weight: 800;">email > anonymous</span></p>
              <p id="infoContantName" style="font-size: 20px; font-weight: 500; font-family: sans-serif;"><span style="font-weight: 800;">name > anonymous</span></p>
              <p id="infoContantUserName" style="font-size: 20px; font-weight: 500; font-family: sans-serif;"><span style="font-weight: 800;">username > anonymous</span></p>
          </div>
          <div class="col-4">
              <p style="font-size: 20px; font-weight: 500; font-family: sans-serif; font-weight: 800;">Post's <span id="infoContantPost" style="font-weight: 500; font-size: 22px;">NaN</span></p>
              <p style="font-size: 20px; font-weight: 500; font-family: sans-serif; font-weight: 800;">comments <span id="infoContantCommnt" style="font-weight: 500; font-size: 22px;">NaN</span></p>
          </div>
  </div> 
  `
  }
}



contentCard = document.getElementById('content-card')
function getinfoprofile(id, chke) {
  if (chke) {
    contentCard.innerHTML = ''
  }

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };


  fetch(`https://tarmeezacademy.com/api/v1/users/${id}`, requestOptions)
    .then(response => response.json())
    .then(response => {
      var posts = response.data;
      console.log(posts.comments_count)

      document.getElementById("infoContantUserName").innerHTML = posts.username;
      document.getElementById("infoContantEmail").innerHTML = posts.email;
      document.getElementById("infoContantName").innerHTML = posts.name;
      document.getElementById("infoContantPost").innerHTML = posts.posts_count;
      document.getElementById("infoContantImage").src = posts.profile_image;
      document.getElementById("infoContantcommnt").innerHTML = posts.comments_count;


    })
    .catch(error => {
      console.log(error);
    });


  fetch(`https://tarmeezacademy.com/api/v1/users/${id}/posts`, requestOptions)
    .then(response => response.json())
    .then(response => {
      posts = response.data

      console.log(posts)
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
              <button type="button" class="btn btn-success" onclick="editPost('${encodeURIComponent(JSON.stringify(post))}')">Edit</button>
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
          <div style="display: flex; align-items: center;">
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
    .catch(error => {
      console.log(error);
    });


}

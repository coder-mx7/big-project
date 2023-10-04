postCreated = document.getElementById('post-created')
stupeUi()

console.log(window.location.pathname)

function regesterrr() {
    const emailReg = document.getElementById('email-reg').value;
    const passwordReg = document.getElementById('password-reg').value;
    const name = document.getElementById('name-reg').value;
    const username = document.getElementById('username-reg').value;
    const imagreg = document.getElementById('image-reg').files[0]

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", passwordReg);
    formdata.append("name", name);
    formdata.append("email", emailReg);
    formdata.append("image", imagreg);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch("https://tarmeezacademy.com/api/v1/register", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.token) {
                localStorage.setItem('token', result.token)
                localStorage.setItem('user', JSON.stringify(result.user))
                login.style.display = 'none';
                regester.style.display = 'none';
                logaut.style.display = '';
                console.log('succeeded');
                showalrt('regester is succeeded')
                stupeUi()
                chekeBtn()
                getposts(page = 1, fgdg = true)
                setTimeout(() => {
                    const alert = bootstrap.Alert.getOrCreateInstance('#liveAlertPlaceholder')
                    document.getElementById('liveAlertPlaceholder').style.height = '0px';

                }, 2000)
            } else {
                login.style.display = 'block';
                regester.style.display = 'block';
                logaut.style.display = 'none';
                stupeUi()

            }

        })
        .catch(error => {
            stupeUi()
        });
}

function stupeUi() {
    if (localStorage.token != null && localStorage.user != null) {
        login.style.display = 'none';
        regester.style.display = 'none';
        logaut.style.display = 'block';
        userObject = JSON.parse(localStorage.getItem('user'));
        document.getElementById('imageLogo').src = userObject.profile_image
        document.getElementById('userLogo').innerHTML = userObject.name


        if (postCreated != null) {
            document.getElementById('post-created').style.display = 'flex'
        }


        // فحص التعليقات اذا اظهرها او لا 




    } else {
        login.style.display = 'block';
        regester.style.display = 'block';
        logaut.style.display = 'none';
        if (postCreated != null) {
            postCreated.style.display = 'none';
        }
        document.getElementById('imageLogo').src = ''
        document.getElementById('userLogo').innerHTML = ''



    }
}

function logautt() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    stupeUi()
    showalrt('you Logaut now');
    if (location.pathname == '/home.html') {
        getposts(1, true)
    }

    setTimeout(() => {
        alertPlaceholder.style.height = '0px';

    }, 2000);
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


    getinfoprofile('', true)



}






function getInputValues() {
    login = document.getElementById('login')

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    url = "https://tarmeezacademy.com/api/v1/login"
    parms = {
        "username": email,
        "password": password,
    }
    axios.post(url, parms)
        .then(response => response.data)
        .then(result => {
            console.log(result);
            if (result.token) {
                localStorage.setItem('token', result.token)
                localStorage.setItem('user', JSON.stringify(result.user))
                login.style.display = 'none';
                regester.style.display = 'none';
                logaut.style.display = '';
                console.log('succeeded');
                showalrt('logind is succeeded')
                setTimeout(() => {
                    const alert = bootstrap.Alert.getOrCreateInstance('#liveAlertPlaceholder')
                    document.getElementById('liveAlertPlaceholder').style.height = '0px';

                }, 2000)
                stupeUi()
                if (location.pathname == '/home.html') {
                    getposts(1, true)
                } else if (location.pathname == '/post.html') {
                    getpost()
                } 
                getinfoprofile(result.user.id, true)

            } else {
                login.style.display = 'block';
                regester.style.display = 'block';
                logaut.style.display = 'none';
                stupeUi()
                showalrt('your informtion is incorct', 'error')
                setTimeout(() => {
                    const alert = bootstrap.Alert.getOrCreateInstance('#liveAlertPlaceholder')

                    document.getElementById('liveAlertPlaceholder').style.height = '0px';

                }, 2000)
                stupeUi()
                if (location.pathname == '/post.html') {
                    getpost()
                } else {
                    getposts()
                }

            }
        })
        .catch(error => {
            console.log('error', error)



        });
}



const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
function showalrt(costumemseg) {

    alertPlaceholder.innerHTML = '';
    alertPlaceholder.style.height = 'auto'
    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
    }

    appendAlert(costumemseg, 'success')

}
stupeUi()

id = ''
function clikedPost(idd) {
    window.location = `post.html?postId=${idd}`
    id = idd

}


function editPost(post) {
    // parse the post object
    post = JSON.parse(decodeURIComponent(post));
    // update the modal fields with the post data
    document.getElementById('titlePost').value = post.title;
    document.getElementById('bodyPOST').value = post.body;
    document.getElementById('headTitel').innerHTML = 'Edit The Post'; // تم تعديل 'Edite' إلى 'Edit'
    // show the modal
    var myModal = new bootstrap.Modal(document.getElementById('post-created-model'), {});
    myModal.toggle();
    document.getElementById('fals').value = post.id;

}


function cratedPosted() {
    document.getElementById('headTitel').innerHTML = 'Crated Post'; // تم تعديل 'Edite' إلى 'Edit'

    var titlePost = document.getElementById('titlePost').value;
    var bodyPOST = document.getElementById('bodyPOST').value;
    var imagPOST = document.getElementById('image').files[0];
    var token = localStorage.getItem('token');
    var valueId = document.getElementById('fals').value;
    var iscrate = valueId === "" || valueId === null;


    var myHeaders = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
    };

    var formdata = new FormData();
    formdata.append("image", imagPOST);
    formdata.append("body", bodyPOST);
    formdata.append("title", titlePost);

    var url = iscrate
        ? "https://tarmeezacademy.com/api/v1/posts"
        : `https://tarmeezacademy.com/api/v1/posts/${valueId}`;

    if (!iscrate) {
        formdata.append("_method", 'put');
    }

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        data: formdata,
        url: url,
    };

    axios(requestOptions)
        .then(response => {
            console.log(response.data);
            // Assuming getposts is defined and works correctly
            if (window.location.pathname == '/profile.html') {
                getinfoprofile(id);

            } else {
                getposts(1, true)
            }
        })
        .catch(error => {
            console.log('error', error);
        });
}

function deletePost(id) {
    var token = localStorage.getItem('token');

    var data = {
        "body": "hello"
    };

    var config = {
        method: 'delete',
        url: `https://tarmeezacademy.com/api/v1/posts/${id}`,
        headers: {
            'Accept': 'application/json',
            "Authorization": `Bearer ${token}`,

        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            console.log(window.location)
            if (window.location.pathname === '/home.html') {
                getposts(1, true)
            } else {
                getinfoprofile("", true);
            }

        })
        .catch(function (error) {
            console.log(error);
        });

}
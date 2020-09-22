//create the signupform
async function MakeSignupFormInStage() {

    removenodes(thestage)

    // create the signup form
    var newpromise = new Promise(
        // then new promise is to define a resolved value
        (resolve) => {
            MakeDomEle(signupformdata).then(r => {
                resolve(r)
            });
        }//resolve
    ) // new promise;

    signupform = await newpromise.then(d => {
        // console.log(d)
        return d
    })

    /**the event on click cannot be set in data.js, as when loading data.js, the signup method has not been
        created, i.e., the signup method is nothing at that time. 
        the method has to be added here (after creating the signup method)  */
    $('#signupsubmit').click(signup) //click the signup method

} //opensignupform

async function ShowSignupModal(){
    modaltemplatedata.parent = document.body
    MakeModalTemplate(modaltemplatedata)
        // .then(
        //     () => {
                // Make signup modal based on modaltemplate
                $('#modal-title').text('Sign up');
                signupformdata.parent = $('#modal-body')[0];
                // console.log(signupformdata1.parent);
                MakeDomEle(signupformdata)
                $('#signupsubmit').click(signup)
        //     }
        // )
}

async function ShowLoginModal(){
    modaltemplatedata.parent = document.body
    MakeModalTemplate(modaltemplatedata)
        // .then(
        //     () => {
                // Make signup modal based on modaltemplate
                $('#modal-title').text('Log in');
                loginformdata.parent = $('#modal-body')[0];
                // console.log(signupformdata1.parent);
                MakeDomEle(loginformdata)
                $('#loginsubmit').click(await login)
        //     }
        // )
}

// about signup signin and signout
// https://firebase.google.com/docs/auth/web/password-auth
// https://firebase.google.com/docs/auth/web/manage-users (vereifcation email, etc)
// https://hackmd.io/@jmk2142/B1-9aonwM?type=view

// define the actions after the sign up div is clicked
function signup() {
    // console.log(signupform)
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value
    console.log(email, password)
    // sign up to firebase logintest project
    auth.createUserWithEmailAndPassword(email, password).then(response => {
        // console.log(response)
        closemodal()
    })
  
}

async function login() {
    // console.log(signupform)
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value
    // console.log(email, password)
    var newpromise = new Promise(
        // then new promise is to define a resolved value
        (resolve) => {
                auth.signInWithEmailAndPassword(email, password).then(response => {
                    resolve(response) 
                });
         }//resolve
    ) // new promise;

    // console.log(response)       
    closemodal()

    // get the current user (a better way is to use auth.onAuthStateChanged())
    var loginresponse = await newpromise.then(d => {
        // console.log(d)
        return d
    })

    // console.log(loginresponse.user) 
    // audit user status

   
}




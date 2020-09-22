//make the nav bar and buttons
(async () => {

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    // instantiate the authentication method
    auth = firebase.auth();


    // audit user status
    auth.onAuthStateChanged(user => {
        // console.log(user)
        if(user){
            console.log('user logged in:' , user)
            thestage.innerHTML=`
                <h2> User ${user.email} logged in !</h2>
                `
        } else {
            console.log( ' logged out')
            thestage.innerHTML='<h2> Log in to view the contents</h2>'
        }
    })

    // make the navigation bar
    await MakeDomEle(navdomsdata);

    // make thestage
    var newpromise = new Promise(
        // then new promise is to define a resolved value
        (resolve) => {
            MakeDomEle(stagedata).then(r => {
                resolve(r)
            });
        }//resolve
    ) // new promise;

    // create thestage
    thestage = await newpromise.then(d => {
        // console.log(d)
        return d
    })

    // need to update the data that involves thestage (e.g., the signupformdata)
    /** loading data.js is prior to the creation of thestage div. Therefore in the loaded data like
     * signupformdata, the .parent (which has been given the value of thestage, is an old value before
     * thestage is created. Therefore, here need to update the value of thestage for signupformdat.parent)
     */
    signupformdata.parent = thestage
    // on click of sign up button, make the signup form and show it
    // $(document.getElementById('signup')).click(MakeSignupFormInStage)

    $(document.getElementById('signup')).click(ShowSignupModal)
    $(document.getElementById('login')).click(ShowLoginModal)

    // about signup signin and signout
    // https://firebase.google.com/docs/auth/web/password-auth
    // https://firebase.google.com/docs/auth/web/manage-users (vereifcation email, etc)
    // https://hackmd.io/@jmk2142/B1-9aonwM?type=view
    // console.log(currentuser)
    
    //signout 
    $(document.getElementById('logout')).click(() => {
        // console.log(currentuser)
        auth.signOut().then(() => {
            // console.log('Logged out')
        })
    })

})()
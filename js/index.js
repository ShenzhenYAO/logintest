//make the nav bar and buttons
(async () => {

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    // instantiate the authentication method
    auth = firebase.auth();

    // set the data source
    db = firebase.firestore();

    // db.collection('adherence_research').get().then(
    //     d=>{ console.log(d.docs)}
    // )

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

    // create a div to show all docs data from firestore
    docsdivdata = {
        parent: thestage,
        nodetype: 'div',
        attrs: { 'id': 'docsdiv', 'class': 'docsdiv' }
    };

    // make docsdiv
    var newpromise = new Promise(
        // then new promise is to define a resolved value
        (resolve) => {
            MakeDomEle(docsdivdata).then(r => {
                resolve(r)
            });
        }//resolve
    ) // new promise;

    // create thestage
    docsdiv = await newpromise.then(d => {
        // console.log(d)
        return d
    })

    // console.log(docsdiv)

    // audit user status
    auth.onAuthStateChanged(user => {
        // console.log(user)
        if (user) {
            // console.log('user logged in:', user)
            $('#userstatus').text(`Current user: [ ${user.email} ]`)

            //clean contents in docsdiv
            removenodes(docsdiv)

            // get data from firestore
            // db.collection('adherence_research').get().then(
            db.collection("adherence_research")
                // .where([{"creator", "==", user.uid }])
                .where("creator", "in", [user.uid, 'admin'])
                .get().then (
                d => {
                    // console.log(d.docs)
                    d.docs.forEach(thedoc => {
                        // get fields/values in each document
                        var docdata = thedoc.data()
                        // console.log(docdata)
                        var keys = Object.keys(docdata)
                        var titletext = keys[1] + ": " + docdata[keys[1]]
                        var bodytext = keys[0] + ": " + docdata[keys[0]]
                        // console.log(titletext)
                        var titledivdata = {
                            parent: docsdiv,
                            nodetype: 'div',
                            properties: { 'textContent': titletext },
                            attrs: { 'class': 'titletext' },
                            styles: { 'color': 'black', 'font-size': '30px', 'font-weight': 'bold' }
                        }
                        MakeDomEle(titledivdata)
                        // console.log(bodytext)
                        var descdivdata = {
                            parent: docsdiv,
                            nodetype: 'div',
                            properties: { 'textContent': bodytext },
                            attrs: { 'class': 'bodytext' },
                            styles: { 'color': 'green', 'font-size': '25px' },
                        }
                        MakeDomEle(descdivdata)
                        MakeDomEle({ parent: docsdiv, nodetype: 'br' })
                        // console.log(titledivdata)
                    }) // d.docs.forEach
                } // d
            ) // db.get().then()
        } else {
            // console.log('user logged out')
            $('#userstatus').text(`No user logged in`)
            //clean contents in docsdiv
            removenodes(docsdiv)
        }
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

    // add doc using a modal
    $(document.getElementById('adddoc')).click(ShowAddDocModal)

    var docinputformdata =
    //input label
    {
        parent: undefined,
        nodetype: 'div',
        attrs: { 'class': 'signform' },
        styles: {
            'width': '80%', 'background-color': 'lightgreay',
            'position': 'absolute', 'left': '10%', 'top': '35%',
            'display': 'inline-block',
            'align-items': 'center', //vergically, at the center
            'font-family': 'arial',
            'font-size': '30px'
        },
        children: [
            {
                nodetype: 'label', attrs: { 'class': 'inputlabel', 'id': 'doctitlelabel' },
                styles: { 'border': '0px', 'font-weight': 'bold', 'color': 'black', 'margin': '10px' },
                properties: { 'textContent': 'Title' }
            },
            {
                nodetype: 'br'
            },
            {
                nodetype: 'input',
                attrs: { 'class': 'input', 'contenteditable': true, 'id': 'doctitle', 'value': 'doctitle' },
                styles: { 'border': 'solid black 1px', 'font-size': '30px', 'margin': '10px', 'width': '95%' }
            },
            {
                nodetype: 'br'
            },
            {
                nodetype: 'label', attrs: { 'class': 'inputlabel', 'id': 'doccommentlabel' },
                styles: { 'border': '0px', 'font-weight': 'bold', 'color': 'black', 'margin': '10px' },
                properties: { 'textContent': 'Comment' }
            },
            {
                nodetype: 'input', attrs: { 'class': 'input', 'contenteditable': true, 'id': 'doccomment', 'value': 'blah blah' },
                styles: { 'border': 'solid black 1px', 'font-size': '30px', 'margin': '10px', 'width': '95%' }
            },
            {
                nodetype: 'br'
            },
            {
                nodetype: 'br'
            },
            {
                nodetype: 'button',
                attrs: { 'class': 'submit', 'id': 'adddocsubmit' },
                styles: { 'font-size': '30px', 'margin': '10px' },
                properties: { 'textContent': 'Add it' }
            }
        ]
    };

    async function ShowAddDocModal() {
        // get user id
        // audit user status
        currentuser = auth.currentUser;
        // console.log(currentuser)
        if (currentuser === null) {
            alert('Please log in')
            ShowLoginModal()
        } else {
            modaltemplatedata.parent = document.body
            MakeModalTemplate(modaltemplatedata)
            // .then(
            //     () => {
            // Make signup modal based on modaltemplate
            $('#modal-title').text('Add new document');
            docinputformdata.parent = $('#modal-body')[0];
            // console.log(signupformdata1.parent);
            MakeDomEle(docinputformdata)
            $('#adddocsubmit').click(await adddoc)
            //     }
            // )
        }// else currentuser is not null
    }

    async function adddoc() {

        // console.log('add new doc=====')
        // get data
        var doctitle = document.getElementById('doctitle').value;
        var doccomment = document.getElementById('doccomment').value
        var newdoc = {
            title: doctitle,
            comment: doccomment,
            creator:currentuser.uid
        }

        // db.collection('userspecific').add(newdoc).then(d => { // create a new collection
        db.collection('adherence_research').add(newdoc).then(d => {            
            // console.log(d)
            closemodal()

            //update the contents???
            // console.log(docdata)
            var keys = Object.keys(newdoc)
            var titletext = keys[1] + ": " + newdoc[keys[1]]
            var bodytext = keys[0] + ": " + newdoc[keys[0]]
            // console.log(titletext)
            var titledivdata = {
                parent: docsdiv,
                nodetype: 'div',
                properties: { 'textContent': titletext },
                attrs: { 'class': 'titletext' },
                styles: { 'color': 'black', 'font-size': '30px', 'font-weight': 'bold' }
            }
            MakeDomEle(titledivdata)
            // console.log(bodytext)
            var descdivdata = {
                parent: docsdiv,
                nodetype: 'div',
                properties: { 'textContent': bodytext },
                attrs: { 'class': 'bodytext' },
                styles: { 'color': 'green', 'font-size': '25px' },
            }
            MakeDomEle(descdivdata)
            MakeDomEle({ parent: docsdiv, nodetype: 'br' })
        })


    }
    // end of the block to add doc from a modal

})()
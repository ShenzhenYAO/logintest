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

            var collections = ['public', 'private'];

            for (var index1 in collections) {
                // console.log(collections[index1])

                // get data from firestore
                // note: the get() won't work for conditional rules unless specifying the where clauses
                // db.collection('adherence_research').get().then(

                var dbquery;
                if (user.uid === adminuid) {
                    dbquery = db.collection(collections[index1])
                } else {
                    dbquery = db.collection(collections[index1])
                        .where("creator", "in", [user.uid, adminuid]);
                }

                // .where('request.auth.uid', '==', adminuid) // not work
                dbquery.get().then(
                    d => {
                        // console.log(d.docs)
                        d.docs.forEach(thedoc => {
                            // get fields/values in each document
                            var docdata = thedoc.data()
                            // console.log(docdata)
                            var keys = Object.keys(docdata)
                            var titletext = 'title' + ": " + docdata['title']
                            var bodytext = 'text' + ": " + docdata['text']
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

            } // for
        } else {
            // console.log('user logged out')
            $('#userstatus').text(`No user logged in`)
            //clean contents in docsdiv
            removenodes(docsdiv)
        } // if else
    }) //then

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
            'position': 'absolute', 'left': '10%', 'top': '20%',
            'display': 'inline-block',
            'align-items': 'center', //vergically, at the center
            'font-family': 'arial',
            'font-size': '25px'
        },
        children: [
            {
                nodetype: 'label', attrs: { 'class': 'inputlabel', 'id': 'doccollectionlabel' },
                styles: { 'border': '0px', 'font-weight': 'bold', 'color': 'black', 'margin': '10px' },
                properties: { 'textContent': 'Collection' }
            },
            {
                nodetype: 'br'
            },
            {
                nodetype: 'input',
                attrs: { 'class': 'input', 'contenteditable': true, 'id': 'doccollection', 'value': 'public' },
                styles: { 'border': 'solid black 1px', 'font-size': '30px', 'margin': '10px', 'width': '95%' }
            },
            {
                nodetype: 'br'
            },


            {
                nodetype: 'label', attrs: { 'class': 'inputlabel', 'id': 'docnamelabel' },
                styles: { 'border': '0px', 'font-weight': 'bold', 'color': 'black', 'margin': '10px' },
                properties: { 'textContent': 'Document name' }
            },
            {
                nodetype: 'br'
            },
            {
                nodetype: 'input',
                attrs: { 'class': 'input', 'contenteditable': true, 'id': 'docname', 'value': 'pubdoc' },
                styles: { 'border': 'solid black 1px', 'font-size': '30px', 'margin': '10px', 'width': '95%' }
            },
            {
                nodetype: 'br'
            },


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
                attrs: { 'class': 'input', 'contenteditable': true, 'id': 'doctitle', 'value': 'pubdoctitle' },
                styles: { 'border': 'solid black 1px', 'font-size': '30px', 'margin': '10px', 'width': '95%' }
            },
            {
                nodetype: 'br'
            },
            {
                nodetype: 'label', attrs: { 'class': 'inputlabel', 'id': 'doctextlabel' },
                styles: { 'border': '0px', 'font-weight': 'bold', 'color': 'black', 'margin': '10px' },
                properties: { 'textContent': 'Text' }
            },
            {
                nodetype: 'input', attrs: { 'class': 'input', 'contenteditable': true, 'id': 'doctext', 'value': 'pubdoc text' },
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
        var doccollection = document.getElementById('doccollection').value;
        var docname = document.getElementById('docname').value;
        var doctitle = document.getElementById('doctitle').value;
        var doctext = document.getElementById('doctext').value
        var newdoc = {
            collection: doccollection,
            doc: docname,
            contents: {
                title: doctitle,
                text: doctext,
                creator: currentuser.uid
            }
        }

        // db.collection('userspecific').add(newdoc).then(d => { // create a new collection
        // db.collection('public').add(newdoc).then(d => {  
        db.collection(newdoc.collection).doc(newdoc.doc).set(newdoc.contents).then(d => {
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






    // testing firestore data add update delete

    // create a test button
    $('#testbutton').text('delete a doc ')
    $('#testbutton').click(deletedoc)

    //https://medium.com/@aaron_lu1/firebase-cloud-firestore-add-set-update-delete-get-data-6da566513b1b

    // create a new collection 
    function addnewcollection() {
        currentuseruid = auth.currentUser.uid
        var newdoc1 = {
            title: 'A new doc',
            desc: 'A new doc blah blah',
            creator: currentuseruid
        }
        // console.log(newdoc1)
        // get the current user
        db.collection('new1').add(newdoc1).then(d => {
            console.log('new collection added')
        });
    }

    // add a new doc, and customize the name
    function addnewdoc() {
        currentuseruid = auth.currentUser.uid
        var newdoc1 = {
            title: 'A new doc by abca',
            desc: 'A new doc blah blah by abca',
            creator: currentuseruid
        }
        // console.log(newdoc1)
        // get the current user
        db.collection('new1').doc('newdoc2').set(newdoc1).then(d => {
            console.log('new doc added')
        });
        db.collection('new1').doc('newdoc2').set({ newfield: 'yes' }, { merge: true }).then(d => {
            console.log('new data merged into an existing doc')
        });
    }


    // modify an existing document
    function updatedoc() {
        currentuseruid = auth.currentUser.uid
        var updatedata = {
            collection: 'new1',
            doc: 'newdoc2',
            contents: {
                newfield: 'updated',
                newfield2: 'newly added by abcd'
            }
        }
        // console.log(newdoc1)
        // get the current user
        db.collection(updatedata.collection).doc(updatedata.doc).update(updatedata.contents).then(d => {
            console.log('document updated')
        });
    }

    // delete a field

    function deletefield() {
        var deletedata = {
            collection: "new1",
            doc: 'newdoc1',
            fieldname: 'newfield2'
        }

        db.collection(deletedata.collection).doc(deletedata.doc).update(
            { [deletedata.fieldname]: firebase.firestore.FieldValue.delete() }
        )
            .then(d => {
                console.log('field deleted')
            })
            ;
    }


    // delete a doc
    function deletedoc() {
        var deletedata = {
            collection: "new1",
            doc: 'newdoc2'
        }
        db.collection(deletedata.collection).doc(deletedata.doc).delete().then(d => {
            console.log('document deleted')
        })
    }

    // delete a collection
    function deletecollection() {
        var deletedata = {
            collection: "new1"
        }
        // this trick does not work. There is no way to del a collection on a go. must build a recursive function
        db.collection(deletedata.collection).delete().then(d => {
            console.log('collection deleted')
        })
    }

    // rules to allow create update and delete
    // https://firebase.google.com/docs/firestore/security/rules-structure




    // testing firestore data add update delete








})()
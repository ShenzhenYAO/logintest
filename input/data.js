var signupform, thestage, signup;
var auth = undefined, db, docsdivdata;
var currentuser;

var adminuid = 'i0aXqNmedKcpY7Eu4Fp1n9G6Dzx2';

// data for creating the nav bar and its offstring nodes
var navdomsdata = {
    parent: document.body, // parent is an html dom element like <body></body>
    nodetype: 'div',
    attrs: {
        'class': 'navbar',
        'id': 'navbar',
        'name': 'navbar'
    },
    styles: {
        'background-color': 'rgba(0, 0, 0, 0)',
        // 'border':'solid red 3px',
        'position':'fixed',
        'width': '100%',
        'height': '70px',
        'top':'0px'
    },
    children: [
        {
            nodetype: 'nav',
            attrs: {
                'class': 'navdiv',
                'id': 'navdiv',
                'name': 'navdiv'
            },
            styles: {
                'position': 'relative',
                'top': '0px',
                'background-color': 'black',
                'height': '100%',
                'width': '100%'
                // 'border':'solid blue 1px'
            },
            children: [
                {
                    nodetype: 'div',
                    attrs: {
                        'class': 'userstatus',
                        'id': 'userstatus',
                        'name': 'userstatus'
                    },
                    styles: {
                        'height': '30px',
                        'width': '200px',
                        // 'border': 'solid white 1px',
                        'display': 'flex',
                        'justify-content': 'flex-end', //horizontal
                        'align-items': 'center', // vertical
                        'position': 'absolute',
                        'top': '15px',
                        'right': '15px',
                    },
                    properties: {
                        'textContent': '| No user logged in'
                    }
                },
                {
                    nodetype: 'div',
                    attrs: {
                        'class': 'navbutton',
                        'id': 'signup',
                        'name': 'signup'
                    },
                    styles: {
                        'height': '30px',
                        'font-family': 'open sans',
                        // 'border': 'solid white 1px',
                        'display': 'flex',
                        'justify-content': 'center',
                        'align-items': 'center',
                        'position': 'absolute',
                        'top': '15px',
                        'right': '220px'
                    },
                    properties: {
                        'textContent': 'Sign up'
                    }
                },
                {
                    nodetype: 'div',
                    attrs: {
                        'class': 'navbutton',
                        'id': 'login',
                        'name': 'login'
                    },
                    styles: {
                        'height': '30px',
                        // 'width': '100px',
                        // 'border': 'solid white 1px',
                        'display': 'flex',
                        'justify-content': 'center',
                        'align-items': 'center',
                        'position': 'absolute',
                        'top': '15px',
                        'right': '420px'
                    },
                    properties: {
                        'textContent': 'Log in'
                    }
                },
                {
                    nodetype: 'div',
                    attrs: {
                        'class': 'navbutton',
                        'id': 'logout',
                        'name': 'logout'
                    },
                    styles: {
                        'height': '30px',
                        // 'width': '100px',
                        // 'border': 'solid white 1px',
                        'display': 'flex',
                        'justify-content': 'center',
                        'align-items': 'center',
                        'position': 'absolute',
                        'top': '15px',
                        'right': '320px'
                    },
                    properties: {
                        'textContent': 'Log out'
                    }
                },
                {
                    nodetype: 'div',
                    attrs: {
                        'class': 'navbutton',
                        'id': 'adddoc',
                        'name': 'adddoc'
                    },
                    styles: {
                        'height': '30px',
                        // 'width': '100px',
                        // 'color': 'white',
                        'font-weight': 'bold',
                        // 'font-size': '20',
                        'font-family': 'arial',
                        // 'border': 'solid white 1px',
                        'display': 'flex',
                        'justify-content': 'center',
                        'align-items': 'center',
                        'position': 'absolute',
                        'top': '15px',
                        'left': '650px'

                    },
                    properties: {
                        'textContent': 'add a doc'
                    }
                },
                {
                    nodetype: 'div',
                    attrs: {
                        'class': 'navbutton',
                        'id': 'testbutton',
                        'name': 'testbutton'
                    },
                    styles: {
                        'height': '30px',
                        // 'color': 'white',
                        'font-weight': 'bold',
                        'font-size': '20',
                        'font-family': 'arial',
                        // 'border': 'solid white 1px',
                        'display': 'flex',
                        'justify-content': 'center',
                        'align-items': 'center',
                        'position': 'absolute',
                        'top': '15px',
                        'left': '450px'
                    },
                    properties: {
                        'textContent': 'Test'
                    }
                }, // node
            ]
        },
    ]
}
// nav bar and offsprings

// the stage div (the big box to hold everything...)
var stagedata = {
    parent: document.body,
    nodetype: 'div',
    attrs: {
        'class': 'stage',
        'id': 'stage',
        'name': 'stage'
    },
    styles: {
        'background-color': 'white',
        'margin-top':'90px',
        'width': '100%',
        // 'height': '100%'
    }
}


// add user email, password input box, and a submit buttion
// add user email, password input box, and a submit buttion
var signupformdata =
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
            nodetype: 'label', attrs: { 'class': 'inputlabel', 'id': 'emaillabel' },
            styles: { 'border': '0px', 'font-weight': 'bold', 'color': 'black', 'margin': '10px' },
            properties: { 'textContent': 'User email' }
        },
        {
            nodetype: 'br'
        },
        {
            nodetype: 'input',
            attrs: { 'class': 'input', 'contenteditable': true, 'id': 'email', 'value': 'a@a.com' },
            styles: { 'border': 'solid black 1px', 'font-size': '30px', 'margin': '10px', 'width': '95%' }
        },
        {
            nodetype: 'br'
        },
        {
            nodetype: 'label', attrs: { 'class': 'inputlabel', 'id': 'passwordlabel' },
            styles: { 'border': '0px', 'font-weight': 'bold', 'color': 'black', 'margin': '10px' },
            properties: { 'textContent': 'Password' }
        },
        {
            nodetype: 'input', attrs: { 'class': 'input', 'contenteditable': true, 'id': 'password', 'value': '123456' },
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
            attrs: { 'class': 'submit', 'id': 'signupsubmit' },
            styles: { 'font-size': '30px', 'margin': '10px' },
            properties: { 'textContent': 'submit' }
        }
    ]
};

var loginformdata =
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
            nodetype: 'label', attrs: { 'class': 'inputlabel', 'id': 'emaillabel' },
            styles: { 'border': '0px', 'font-weight': 'bold', 'color': 'black', 'margin': '10px' },
            properties: { 'textContent': 'User email' }
        },
        {
            nodetype: 'br'
        },
        {
            nodetype: 'input',
            attrs: { 'class': 'input', 'contenteditable': true, 'id': 'email', 'value': 'a@a.com' },
            styles: { 'border': 'solid black 1px', 'font-size': '30px', 'margin': '10px', 'width': '95%' }
        },
        {
            nodetype: 'br'
        },
        {
            nodetype: 'label', attrs: { 'class': 'inputlabel', 'id': 'passwordlabel' },
            styles: { 'border': '0px', 'font-weight': 'bold', 'color': 'black', 'margin': '10px' },
            properties: { 'textContent': 'Password' }
        },
        {
            nodetype: 'input', attrs: { 'class': 'input', 'contenteditable': true, 'id': 'password', 'value': '123456' },
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
            attrs: { 'class': 'submit', 'id': 'loginsubmit' },
            styles: { 'font-size': '30px', 'margin': '10px' },
            properties: { 'textContent': 'submit' }
        }
    ]
};

// modal template
var modaltemplatedata = {
    parent: undefined,
    nodetype: 'div',
    attrs: { 'id': 'modal-background', 'class': 'modal-background' },
    styles: {
        'font-family': 'Arial, Helvetica, sans-serif',
        // 'display': 'none', /* Hidden by default */
        'position': 'fixed', /*Stay in place*/
        'z-index': '1', /* Sit on top, i.e., bring it to front*/
        'left': '0',
        'top': '0',
        'width': '100%', /* Full width */
        'height': '100%', /* Full height */
        'overflow': 'auto', /* Enable scroll if needed */
        'background-color': 'rgb(0,0,0)', /* Fallback color */
        'background-color': 'rgba(0,0,0,0.4)', /* Black w/ opacity */
    },
    // the dialog box
    children: [
        {
            nodetype: 'div',
            attrs: { 'id': 'modal-dialogbox', 'class': 'modal-dialogbox' },
            styles: {
                'margin': 'auto',
                /*position: fixed, if not disabled, the margin:auto won't work, the div won't be put at the center*/
                /* position: static, default setting. the content goes with the page when scrolling */
                'background-color': '#fefefe',
                'width': '60%',
                'height': '60%',
                'position': 'absolute',
                'top': '20%',
                'left': '20%',
                'font-size': '28px',
                // 'cursor':'move'
            },
            children: [
                // head
                {
                    nodetype: 'div',
                    attrs: { 'id': 'modal-head', 'class': 'modal-head' },
                    styles: {
                        'height': '15%',
                        'padding': '2px 16px',
                        'background-color': 'navy',//'#5cb85c',
                        'color': 'white',
                        'postion': 'relative'
                    },
                    children: [
                        {
                            nodetype: 'div',
                            attrs: { 'id': 'modal-title', 'class': 'modal-title' },
                            styles: {
                                'font-family': 'arial',
                                'font-weight': 'bold',
                                'font-size': '36px',
                                'color': 'white',
                                'position': 'relative',
                                'top': '20%',
                                // 'border':'black solid',
                                'width': '80%'
                            },
                            properties: {
                                'textContent': 'Title'
                            }
                        },
                        {
                            nodetype: 'span',
                            attrs: { 'id': 'modal-close-button', 'class': 'modal-close-button' },
                            styles: {
                                'float': 'right',
                                'font-size': '28px',
                                'font-weight': 'bold',
                                'color': 'yellow',
                                'position': 'absolute',
                                'top': '0px',
                                'right': '10px'
                            },
                            properties: {
                                'textContent': 'X'
                            }
                        }
                    ]
                },
                //body
                {
                    nodetype: 'div',
                    attrs: { 'id': 'modal-body', 'class': 'modal-body' },
                    styles: {
                        'padding': '2px 16px',
                        'background-color': 'white',//'#5cb85c',
                        'color': 'white',
                    },

                }
            ]

        },
    ]
}


var collections = [
    {
        "ID": "adherence_research",
        "documents": [
            {
                "id": '<auto uid1>',
                "fields": [
                    { "name": "title", "value": "Impact of COC on adherence" },
                    { "name": "description", "value": "This is the most important discovery ever!" },
                ]
            },
            {
                "id": '<auto uid2>',
                "fields": [
                    { "name": "link", "value": "link to the above great paper" },
                    { "name": "url", "value": "https://blah.com" },
                ]
            },
        ]
    }
]

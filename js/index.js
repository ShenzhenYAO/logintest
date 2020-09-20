
var 
    signupdivobj,
    logindivobj
;

//make the nav bar and buttons
makenav2(document.body)

function doit (){
    console.log('clicked')
}function dothat (){
    console.log('mousedown')
}


var body = document.body
var data = {
    parent: body,
    nodetype: 'div',
    attrs: {
        'class':'stage',
        'id': 'stage',
        'name': 'stage'
    },
    styles:{
        'background-color': 'lightyellow',
        'width':'100%',
        'height': '100%'
    },
    events:{
        'click': doit,
        'mousedown': dothat
    },
    children:[
        {   nodetype: 'p',
            properties: {'textContent': 'What the'},
            styles:{
                'font-size':'30px',
            }
        }
    ]
}
var thestage =MakeDomEle(data)




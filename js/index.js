// creating the nav bar
var bodyobj = $('body')
bodyobj.append('<nav/>')
var navobj=bodyobj.find('nav')
navobj.addClass('navbar')
navobj.css('height', '100px')
navobj.css('background-color', 'black')

// in the nav, create a div
navobj.append('<div/>')
var navdivobj = navobj.find('div')
// console.log(navdivobj)
navdivobj.addClass('navdiv')
navdivobj.css({
    'position':'relative',
})

// create a div as sign up button
navdivobj.append('<div/>')
var signupdivobj = navdivobj.find('div')
signupdivobj
    .attr('class','signup')
    .css({
        'height': '30px',
        'width': '100px',
        'color': 'white', 
        'font-weight':'bold',
        'font-size':'25',
        'font-family':'arial',
        'border': 'solid white 1px',
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'position': 'absolute',
        'top':'30px',
        'right': '10px'
        })
    .text('Sign up')

        
    navdivobj.append('<div/>')
    var logindivobj = $(navdivobj.find('div')[1])
    // console.log(logindivobj)
    logindivobj
        .attr('class','signup')
        .css({
            'height': '30px',
            'width': '100px',
            'color': 'white', 
            'font-weight':'bold',
            'font-size':'25',
            'font-family':'arial',
            'border': 'solid white 1px',
            'display': 'flex',
            'justify-content': 'center',
            'align-items': 'center',
            'position': 'absolute',
            'top':'30px',
            'right': '250px'
            })
        .text('Log in')
    


// add anchors




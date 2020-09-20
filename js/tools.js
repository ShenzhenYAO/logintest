// create an element
function MakeDomEle(data) {
    var theNewEle = document.createElement(data.nodetype)
    data.parent.append(theNewEle)
    // add attributes (id, class, whatever)
    if (data.attrs) {
        $(theNewEle).attr(data.attrs)
    }
    if (data.styles) {
        $(theNewEle).css(data.styles)
    }
    if (data.events) {
        // get the number of keys
        for (var i = 0; i < Object.keys(data.events).length; i++) {
            var thekey = Object.keys(data.events)[i]
            var theaction = data.events[thekey]
            $(theNewEle).on(thekey, theaction)
        }
    }
    if (data.children) {
        data.children.forEach(d => {
            // console.log(theNewEle)
            d.parent = theNewEle
            MakeDomEle(d)
        })
    }
    if (data.properties) {
        $(theNewEle).prop(data.properties)
    }
    return theNewEle
}



//
function makenav2() {

    var navdomsdata = {
        parent: document.body,
        nodetype: 'nav',
        attrs: {
            'class': 'navbar',
            'id': 'navbar',
            'name': 'navbar'
        },
        styles: {
            'background-color': 'black',
            'width': '100%',
            'height': '100px'
        },
        children: [
            {
                nodetype: 'div',
                attrs: {
                    'class': 'navdiv',
                    'id': 'navdiv',
                    'name': 'navdiv'
                },
                styles: {
                    'position': 'relative',
                },
                children: [
                    {
                        nodetype: 'div',
                        attrs: {
                            'class': 'navbutton',
                            'id': 'signup',
                            'name': 'signup'
                        },
                        styles: {
                            'height': '30px',
                            'width': '100px',
                            'color': 'white',
                            'font-weight': 'bold',
                            'font-size': '25',
                            'font-family': 'arial',
                            'border': 'solid white 1px',
                            'display': 'flex',
                            'justify-content': 'center',
                            'align-items': 'center',
                            'position': 'absolute',
                            'top': '30px',
                            'right': '10px'
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
                            'width': '100px',
                            'color': 'white',
                            'font-weight': 'bold',
                            'font-size': '25',
                            'font-family': 'arial',
                            'border': 'solid white 1px',
                            'display': 'flex',
                            'justify-content': 'center',
                            'align-items': 'center',
                            'position': 'absolute',
                            'top': '30px',
                            'right': '250px'
                        }, 
                        properties: {
                            'textContent': 'Log in'
                        }
                    }
                ]
            },
        ]
    }

    MakeDomEle(navdomsdata)
}



/**
 * A model has 
 * 1. a big div as background to cover and dim the original page
 * 2. a div as the pop up window
 *  2a. a div for title
 *  2b. divs for input fields
 *  2c. a div as submit button
 *  
 */
//make a modal for adding a new node, rename a node, and description editing. The modal will be created and removed each time
function makemodal(id, title, label, action) {
    /**1.make a background
        this is to add a halfly transparent div on top of the current page. 
        It is to make a 'dim' effect of the whole page
    */
    var modalbackground = d3body
        .append('div')
        .attrs({ 'id': id, 'class': 'myModal' }) // id (e.g., theModal)

    /**2. within the background, create a dialog box 
     *  this is a box of the whole dialog area
    */
    var modaldialogbox = modalbackground.append('div').attrs({ 'class': 'modal-content' }) // this is a box of the whole dialog area
        .on('mousedown', d => { // the following is to prevent thetreeG moving when the mouse is down and moving within the modal area 
            event.stopPropagation();
        })

    /**3a. within the dialog box, create a header div */
    var modalheader = modaldialogbox.append('div').attrs({ 'class': 'modal-header' })

    /**3a.1 within the header, create a span as the modal close button*/
    var modalclosebutton = modalheader.append('span').attrs({ 'class': 'close', 'id': 'ModalClose' }).html('x')
    /**3a.2 within the header, create a h2 as the modal title*/
    var modalboxtitle = modalheader.append('h2').attr('id', 'modal-title').html(title) // modal header title ('e.g, Append a new node)

    /**3b. within the dialog box, create the body div */
    var modalbody = modaldialogbox.append('div').attrs({ 'class': 'modal-body' })

    // if 'title' is 'Description' make the description type modal, else make a type for rename, del, new node, etc.
    if (title === 'Description') {
        //change the modal boxtitle by adding the title
        modalboxtitle.html(title + ": " + currentDataEle.data.name)
        modalbody.attrs({ 'id': 'DescInputBody' }).styles({ "overflow": "auto;" })

    } else { //make a type of modal for rename, del, new node, etc

        /**3b1. within the body box, create the body title h2 */
        // var modalbodytitle = modalbody.append('h2').attrs({'id': 'modalTitle'}).html('Create Node')  // modal body title

        /**3b2. within the body box, create a div to hold rows that appears in the body */
        var modalbodyrow = modalbody.append('div').attrs({ 'class': 'row' })

        /**3b2a. within the body row div, create a div to hold body row contents */
        var modalbodyrowcontents = modalbodyrow.append('div').attrs({ 'class': 'large-12 columns' })

        /**3b2a1. within the body row contents div, create a label to indicate 'Node name' */
        var modalbodyrowcontentslabel = modalbodyrowcontents.append('label').text(label)  // prompt str, e.g 'Node name'
        /**3b2a1a. within the body row contents label, create an input DOM element to indicate 'Node name' */
        var modalbodyrowcontentslabelinput = modalbodyrowcontentslabel.append('input')
            .attrs({ 'type': 'text', 'class': 'inputName', 'id': 'ModalInput' }) //CreateNodeName
            .styles({ 'placehoder': 'node name', 'width': '80%' })

        // add a listener, when the enter key is pressed and is keyup, click the ok button
        modalbodyrowcontentslabelinput.node().addEventListener("keyup", function (event) {
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
                // Cancel the default action, if needed
                event.preventDefault();
                // Trigger the button element with a click
                document.getElementById("modalokbutoon").click();
            }
        });

        /**3b2a1b. within the body row contents label, create a button to submit input */
        var modalbodyrowcontentslabelbutton = modalbodyrowcontentslabel.append('button')
            .attrs({ 'onclick': action, 'id': 'modalokbutoon' }) // e.g.,'createNode()' 
            .text('OK')
    }
} // function makemodel

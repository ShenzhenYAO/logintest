// create an element
async function MakeDomEle(data) {
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

//make a modal tempalte
// more details can be found at: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_signup_form_modal
async function MakeModalTemplate(modaltemplatedata) {
    MakeDomEle(modaltemplatedata)
    $('#modal-dialogbox').draggable() //need jqueryui (not jquery)

    // add a listener, when the enter key is pressed and is keyup, click the ok button
    $(document).keyup(function (event) {
        // Number 13 is the "Enter" key on the keyboard
        // console.log(event.keyCode)
        // Cancel the default action, if needed
        event.preventDefault();
        if (event.keyCode === 13) {     //enter        
            // Trigger the button element with a click
            document.getElementsByClassName("submit")[0].click();
        } else if (event.keyCode === 27) { //esc
            document.getElementById("modal-close-button").click();
        }
    });

    $('#modal-close-button').click(closemodal)

}

function closemodal() {
    $('#modal-background').remove()
}

function removenodes(parent) {
    // cleanup children of thestage
    removeAllChildNodes(parent)
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
}



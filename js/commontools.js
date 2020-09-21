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
    $('#modal-close-button').click(closemodal) 
}

function closemodal() {
    $('#modal-background').remove()
}

function removenodes(parent){
        // cleanup children of thestage
        removeAllChildNodes(parent)
        function removeAllChildNodes(parent) {
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
}



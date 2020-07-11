
var cart = document.createElement('input');
cart.setAttribute('type', 'button');
cart.setAttribute('class', 'cart_Button');
cart.setAttribute('id','btn');
document.body.appendChild(cart);
var saveToCart = document.createElement('input');
saveToCart.setAttribute('type', 'button');
saveToCart.setAttribute('class', 'download_button');
saveToCart.setAttribute('id','btn');
document.body.appendChild(saveToCart);

document.addEventListener('mousedown', function(e) {
    if (cart.id != e.target.id && cart.style.visibility == 'visible') {
        cart.removeAttribute("value");
        saveToCart.removeAttribute("value");
        cart.style.visibility = 'hidden';
        saveToCart.style.visibility = 'hidden';
    }
}, false);

document.addEventListener('mouseup', function(e) {
   
    var selection = window.getSelection();
    var selectedLink=window.getSelection().anchorNode.baseURI;
    chrome.storage.sync.get("toggle", function(result) {
    if (selection.toString().length > 0 && result.toggle==true) {
        var data=selection+" "+ selectedLink;
        
        showit(e.pageX, e.pageY, data);
    }
});
}, false);

function showit(mouseX, mouseY, selection) {
       
    if (cart.hasAttribute('value') == false) {
        cart.setAttribute('value', "Send To Cart");
        saveToCart.setAttribute('value', "Download Cart");


        cart.style.top = mouseY + 'px';
        cart.style.left = mouseX + 'px';
        cart.style.visibility = 'visible';
       saveToCart.style.top = mouseY + 'px';
       saveToCart.style.left = (mouseX + 102) + 'px';
        saveToCart.style.visibility = 'visible';
        cart.onclick = function() {
            
            getProducts(selection.toString());
        };
        saveToCart.onclick = function() {
            saveToCartProducts(selection.toString());
        };
    }
}

var getProducts= (selection) => {
    cart.style.visibility = 'hidden';
    saveToCart.style.visibility = 'hidden';
    chrome.runtime.sendMessage({
        task:'AddToCart',
        selected:selection.toString()
    },function(){
        cart.removeAttribute("value");
        saveToCart.removeAttribute("value");
    });
    selection="";
}

var saveToCartProducts=(selection) => {
    cart.style.visibility = 'hidden';
    saveToCart.style.visibility = 'hidden';
    chrome.runtime.sendMessage({
        task:'SaveMyCart',
        selected:selection.toString()
    },function(){
        cart.removeAttribute("value");
        saveToCart.removeAttribute("value");
    });
    selection="";
}
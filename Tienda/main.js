let cart = []
let divItems = document.createElement('div')
let span = document.createElement('span')
span.innerText = 'Your Cart is Empty'
span.classList.add('empty-cart')
let vacio = true


function showGame(gameName, gamePrice, gamePlatform, gameImage) {
    let article = document.createElement('article')
    let img = document.createElement('img')
    let h2 = document.createElement('h2')
    let p = document.createElement('p')
    let button = document.createElement('button')

    img.src = gameImage
    img.classList.add("img-game")
    h2.innerText = gameName
    h2.classList.add("game-title")
    p.innerText = gamePrice
    p.classList.add("game-price")
    button.innerText = 'Add to cart'
    button.classList.add("btn-add")

    button.addEventListener('click', () => {
        let buyGame = {
            buyGameName: gameName,
            buyGamePrice: gamePrice,
            buyGamePlatform: gamePlatform,
        }
        addToCart(buyGame)
        if(cart.length===1){
            let btnBuy = document.getElementById('btnBuy')
            btnBuy.style.display = 'block'
            let sectionShow = document.getElementsByClassName('show-cart')[0]
            sectionShow.removeChild(span)
        }
    })

    article.appendChild(img)
    article.appendChild(h2)
    article.appendChild(p)
    article.appendChild(button)
    article.classList.add('game')

    return article
}

function addToCart(game) {
    let PCart = document.getElementById('productsCart')
    cart.push(game)
    divItems.innerText = cart.length
    divItems.classList.add('items-cart')

    PCart.appendChild(divItems)
    showGamesToBuy(game)
}

let ul = document.createElement('ul')
ul.classList.add('cart-list')

function showGamesToBuy(game){
    let sectionShow = document.getElementsByClassName('show-cart')[0]
    let li = document.createElement('li')
    li.classList.add('cart-item')
    let button = document.createElement('button')
    button.innerText = 'Delete'
    button.classList.add('btn-delete')
    li.innerText = `${game.buyGameName} - ${game.buyGamePrice}`

    button.addEventListener('click', () => {
        deleteItem(li, game.buyGameName)
        if(cart.length === 0){
            let btnBuy = document.getElementById('btnBuy')
            btnBuy.style.display = 'none'
            sectionShow.appendChild(span)
            vacio = true
        }
    })

    li.appendChild(button)
    ul.appendChild(li)
    sectionShow.appendChild(ul)
}

function deleteItem(item, nameIndex){
    let index = cart.findIndex(x => x.buyGameName == nameIndex)
    cart.splice(index, 1)
    divItems.innerText = cart.length
    document.getElementsByClassName('cart-list')[0].removeChild(item)

    if(cart.length === 0){
        divItems.remove()
    }
}

async function getGames(){
    let divPc = document.querySelector('[platform="pc"]')
    let divPs = document.querySelector('[platform="ps"]')
    let divXbox = document.querySelector('[platform="xbox"]')
    
    for (let i = 0; i < products.length; i++) {
        switch (products[i].gamePlatform) {
            case 'pc':
                divPc.appendChild(showGame(products[i].gameName, products[i].gamePrice, products[i].gamePlatform, products[i].gameImage))
                break
            case 'ps':
                divPs.appendChild(showGame(products[i].gameName, products[i].gamePrice, products[i].gamePlatform, products[i].gameImage))
                break
            case 'xbox':
                divXbox.appendChild(showGame(products[i].gameName, products[i].gamePrice, products[i].gamePlatform, products[i].gameImage))
                break
            default:
                console.log('error')
        }
    }
}

function prScroll(sliderId, slideId, btnNumber){
    let slider = document.getElementById(sliderId)
    let next = document.getElementsByClassName("forward")[btnNumber]
    let prev = document.getElementsByClassName("back")[btnNumber]
    let item = document.getElementById(slideId)
    let slide = document.getElementById(slideId)
    let width = 253
    let pos = 0

    prev.addEventListener('click', () => {
        if(pos > 0){
            pos -= 1
            translateX(pos, width, slide)
        }
    })

    next.addEventListener('click', () => {
        if(pos >= 0 && pos < hiddenItems()){
            console.log("b")
            pos += 1
            translateX(pos,width, slide)
        }
    })

    function hiddenItems(){
        let items = getCount(item, false)
        console.log(items)
        let visibleItems = slider.offsetWidth / width
        return items - Math.ceil(visibleItems)
    }
}

function translateX(position, width, slide){
    if(position == 0){
        slide.style.left = 20 + 'px'
    }else{
        slide.style.left = position * -width + "px"
    }
}

function getCount(parent, getChildrensChildren){
    let relevantChildren = 0;
    let children = parent.childNodes.length;
    for(let i = 0; i < children; i++){
        if(parent.childNodes[i].nodeType != 3){
            if(getChildrensChildren)
                relevantChildren += getCount(parent.childNodes[i], true)
                relevantChildren++
            
        }
    }
    return relevantChildren
}

document.addEventListener('DOMContentLoaded', function() {
    getGames()
    prScroll("pcList", "pcSlide", 0)
    prScroll("psList", "psSlide", 1)
    prScroll("xboxList", "xboxSlide", 2)
    let firstTime = true

    let Shopcart = document.getElementById('productsCart')

    Shopcart.addEventListener('click', () => {
        let sectionShow = document.getElementsByClassName('show-cart')[0]
        let btnBuy = document.getElementById('btnBuy')    

        if(sectionShow.style.display == 'none' || firstTime === true){
            sectionShow.style.display = 'flex'
            sectionShow.style.animation = 'fadeInUp 0.3s'
            firstTime = false
        }else{
            sectionShow.style.animation = 'fadeOutDown 0.3s'
            setTimeout(() => {
            sectionShow.style.display = 'none'
            }, 300)
        }

        btnBuy.addEventListener('click', () => {
        let precioTotal = 0
        let link = `https://api.whatsapp.com/send?phone=+351915211401&text=Hi%20I'd%20like%20to%20buy%20`

        cart.forEach(game => {
            link += game.buyGameName+'%20for%20'+game.buyGamePlatform+',%20'
            precioTotal += parseFloat(game.buyGamePrice)
        })

        link += 'with%20a%20total%20price%20of%20'+precioTotal+'$'
        window.open(link)
        })

        if(cart.length === 0){
            btnBuy.style.display = 'none'
            sectionShow.appendChild(span)
            vacio==false
        }else if(vacio==false){
            btnBuy.style.display = 'block'
            sectionShow.removeChild(span)
        }

    })
})
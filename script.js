let product;
let cartarray=[];
const productList = document.getElementById("product-list");
//update cartiem work
fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        product = data;
        product.map((product, ind) => {
            const productcard = document.createElement('div');

            productcard.classList.add('product-card');

            //creating a picture element for prouct iamge 
            // productimg div for putting picture and add to cart together 
            const productimg = document.createElement('div');

            productimg.classList.add('product-img');
 

            const picture = document.createElement('picture');

            const mobilesrc = document.createElement('source');
            mobilesrc.media = '(max-width: 600px)';
            mobilesrc.srcset = product.image.mobile;

            const tabletsrc = document.createElement('source');
            tabletsrc.media = '(max-width: 1000px)';
            tabletsrc.srcset = product.image.tablet;

            const desktopimg = document.createElement('img');
        
            desktopimg.src = product.image.desktop;
            desktopimg.alt = product.name;

            picture.appendChild(mobilesrc);
            picture.appendChild(tabletsrc);
            picture.appendChild(desktopimg);
            desktopimg.src = product.image.desktop;
            /********************************************** */

            // add to cart buttom////////
            const addToCart = document.createElement('div');

            addToCart.classList.add('add-to-cart');

            const cartIcon = document.createElement('img');
            cartIcon.src = './assets/images/icon-add-to-cart.svg';
            cartIcon.alt = 'cart icon';
            const addToCartText = document.createElement('div');
            addToCartText.classList.add('add-to-cart-text');
            addToCartText.textContent = 'Add to Cart';

            addToCart.append(cartIcon);
            addToCart.append(addToCartText);
            //creating quantityControl button 
            const quantityControl = document.createElement('div');
            quantityControl.classList.add('quantity-control');
            const currentQuality = document.createElement('p');
            currentQuality.textContent = '1';
            currentQuality.classList.add('current-quality');
            /**       increment  button    */
            const incrementButton = document.createElement('button');
            incrementButton.classList.add('increment-button');
            const incrementimg = document.createElement('img');
            incrementimg.src = './assets/images/icon-increment-quantity.svg';
            incrementimg.alt = 'increment sign';
            incrementButton.appendChild(incrementimg);

            /** decrement button */
            const decrementButton = document.createElement('button');
            decrementButton.classList.add('decrement-button');
            const decrementimg = document.createElement('img');

            decrementimg.src = './assets/images/icon-decrement-quantity.svg';
            decrementimg.alt = 'decrement sign';
            decrementButton.appendChild(decrementimg);

            quantityControl.appendChild(decrementButton);
            quantityControl.appendChild(currentQuality);
            quantityControl.appendChild(incrementButton);

            productimg.appendChild(picture);
            productimg.appendChild(quantityControl);
            productimg.appendChild(addToCart);
 /// cart function

 addToCart.setAttribute('data-product-name', product.name);
 addToCart.setAttribute('data-product-price', product.price);




            //adding functnality to quantityControl

            addToCart.addEventListener("click", (e) => {
                addToCart.style.display = 'none';
                quantityControl.style.display = 'flex';
                createCartItem(product);
 // Add product to cart
             

            })

            ///incresing the quantity

  incrementButton.addEventListener("click", (e) => {
                let a = parseInt(currentQuality.textContent);
                      a= a+1;
                currentQuality.textContent = a ;
                const productName = addToCart.getAttribute('data-product-name');
              
                updateCartItem(productName, a,true); 
               
               
            });
            // product-card add-to-cart
          //  quantity-control
            //decreasing the quantity
            // addToCart.style.display = 'flex';
            // quantityControl.style.display = 'none';
            decrementButton.addEventListener("click", (e) => {
                let a = parseInt(currentQuality.textContent);
                a -= 1;
                if (a >= 1) {
                    currentQuality.textContent = a ;
                  
                   
                   
                    const productName = addToCart.getAttribute('data-product-name');
                    updateCartItem(productName, a,false); 
                }
              else {
                    addToCart.style.display = 'flex';
                    quantityControl.style.display = 'none';
                    currentQuality.textContent=1;
                  
                    const productName = addToCart.getAttribute('data-product-name');
                    removeCartItem(productName);
                
                }


            })
            function updateCartItemCount() {
                // Set the item count based on the total quantity of all items in the cart array
                const totalItems = cartarray.reduce((count, item) => count + item.quantity, 0);
                const itemCountSpan = document.querySelector(".no-of-items");
                itemCountSpan.textContent = totalItems;
            }
           
            function createCartItem(product) {
        
               const emptyImg = document.querySelector(".empty-image");
               emptyImg.style.display="none";
                const cartContainer= document.querySelector(".cart");
                  const cartItem =document.querySelector(".cart-items");
                // Check if the product is already in the cart
                const existingCartItem = cartarray.find(item => item.name === product.name);
                if (existingCartItem) {
                  
                    return;
                }
            
                // If it's a new item, add it to the cart
                cartarray.push({
                    name: product.name,
                    price: product.price,
                    quantity: 1
                });
    
                const item = document.createElement('div');
             item.classList.add('product-info');
                const nameAndPrice = document.createElement('div');
             nameAndPrice.classList.add('name-price');

                const cartItemName = document.createElement('span');
                cartItemName.classList.add('cart-item-name');
                cartItemName.textContent = product.name;

                const totalPrice =document.createElement('div');
                totalPrice.classList.add('total-price');

                const itemQuantity =document.createElement('span');
                itemQuantity.classList.add('total-quantity');
                 itemQuantity.textContent='1x'

                 const onePiecePrice =document.createElement('span');
                  onePiecePrice.classList.add('one-piece-price');
                 onePiecePrice.textContent=`@$${(product.price).toFixed(2)}`;
                 const totalQuantityPrice =document.createElement('span');
                    

               totalQuantityPrice.classList.add('total-quantity-price');
              
             
             let numberOfProducts =parseInt(itemQuantity.textContent.replace('x',''));
           
             numberOfProducts*=product.price;
          
                 totalQuantityPrice.textContent=`$${( numberOfProducts).toFixed(2)}`;



                 totalPrice.append(itemQuantity);
                 totalPrice.append(onePiecePrice);
                 totalPrice.append(totalQuantityPrice);


             nameAndPrice.appendChild(cartItemName);
            nameAndPrice.appendChild(totalPrice);

                const removeit =document.createElement('div');
                removeit.classList.add('remove-it');
                const removeImg = document.createElement('img');
                removeImg.src ='./assets/images/icon-remove-item.svg'
                 removeit.append(removeImg);
              
// Add an event listener to the remove button (removeit) inside the createCartItem function
removeit.addEventListener('click', () => {
    // Access the parent element with the product info
    const productInfo = removeit.closest('.product-info');

    // Retrieve the product name
    const productName = productInfo.querySelector('.cart-item-name').textContent;

    // Find the product in the cart array and remove it
    cartarray = cartarray.filter(item => item.name !== productName);

    // Update the order total before removing the product info
    const priceReducestr = productInfo.querySelector('.total-quantity-price');
    const minusPrice = parseFloat(priceReducestr.textContent.replace('$', ''));
    updateOrderTotal(minusPrice, false);

    // Remove the product info from the DOM
    productInfo.remove();

    // Reset the Add to Cart button and hide quantity control
    addToCart.style.display = 'flex';  // Show Add to Cart button
    quantityControl.style.display = 'none'; // Hide quantity control
    currentQuality.textContent = '1';  // Reset quantity to default

    // If the cart is empty, remove the order total element
    const cartItemContainer = document.querySelector('.cart-items');
    if (cartItemContainer && cartItemContainer.childElementCount === 0) {
        const orderTotal = document.querySelector('.order-total');
        document.querySelector('.confirm-button').remove();
        document.querySelector('.carbon-neutral').remove();
     const emptyImage=   document.querySelector('.empty-image');
     emptyImage.style.display='flex';
   
        if (orderTotal) {
            orderTotal.remove();
        }
        updateCartItemCount();
    }
});

                item.appendChild(nameAndPrice);
                item.appendChild(removeit);

                 cartItem.append(item);
            const flag = document.querySelector('.order-total');
            if(flag) {
     
                 updateOrderTotal(product.price,true);
            }
            else{
           const orderTotal = document.createElement("div");
           orderTotal.classList.add('order-total');
           const orderTotalText =document.createElement("p");
           orderTotalText.classList.add('order-total-text');
           orderTotalText.textContent="Order Total";

           const orderTotalprice =document.createElement("span");
          orderTotalprice.classList.add('order-total-price');
       

           orderTotal.appendChild(orderTotalText);
           orderTotal.appendChild(orderTotalprice);
           cartContainer.appendChild(orderTotal);
         
           updateOrderTotal(product.price,true);

        }
        updateCartItemCount();
        // cartContainer
 const found =cartContainer.querySelector('.carbon-neutral')

 if(!found){
 const carbonNeutral = document.createElement('div');
 carbonNeutral.classList.add('carbon-neutral');
 const carbonNeutralImg = document.createElement('img');
 carbonNeutralImg.src ='./assets/images/icon-carbon-neutral.svg'; 
 const carbonNeutralText = document.createElement('p');
 carbonNeutralText.innerHTML="This is a <span>carbon-neutral</span> delivery";
 carbonNeutralText.classList.add('carbon-neutral-text');
 carbonNeutral.appendChild(carbonNeutralImg);
 carbonNeutral.appendChild(carbonNeutralText);
 cartContainer.appendChild(carbonNeutral);
 }
let confirm = cartContainer.querySelector('.confirm-button');
if(!confirm){
    const confirmButton =document.createElement('button');
    confirmButton.textContent='confirm order';
    confirmButton.classList.add('confirm-button');

    cartContainer.appendChild(confirmButton);
 
}

 confirm = cartContainer.querySelector('.confirm-button');


confirm.addEventListener("click",(e)=>{
    const productImages = {
        "Classic Tiramisu": "./assets/images/image-tiramisu-thumbnail.jpg",
        "Vanilla Bean Crème Brûlée": "./assets/images/image-creme-brulee-thumbnail.jpg",
        "Vanilla Panna Cotta": "./assets/images/image-panna-cotta-thumbnail.jpg",
        "Waffle with Berries": "./assets/images/image-waffle-thumbnail.jpg",
        "Red Velvet Cake": "./assets/images/image-cake-thumbnail.jpg",
        "Salted Caramel Brownie": "./assets/images/image-brownie-thumbnail.jpg",
        "Pistachio Baklava": "./assets/images/image-baklava-thumbnail.jpg",
        "Lemon Meringue Pie": "./assets/images/image-meringue-thumbnail.jpg",
        "Macaron Mix of Five": "./assets/images/image-macaron-thumbnail.jpg",
    
    };

    const orderContainer = document.querySelector('.confirmed-order-list-container');
    orderContainer.style.display='block';
    const itemsToBeAdded = cartarray;
  



const orderNames = document.querySelectorAll('.confirmed-order-list .confirm-order-name');

// Convert NodeList to an array and check if any element matches the product name
const isProductConfirmed = Array.from(orderNames).some(orderName => orderName.textContent === product.name);


if(!isProductConfirmed){
    const item = cartarray.find(item => item.name === product.name);
    if(item){

   
  
      const orderConfirmedList = document.querySelector('.confirmed-order-list');
    orderContainer.style.display='block';
  

     const confirmOrder = document.createElement('div');
     confirmOrder.classList.add('confirm-order');
  const name = item.name;
  const quantity = item.quantity
  const price = item.price;
  const totalPrice= (quantity*price).toFixed(2);


  const confirmedOrderImgAndInfo = document.createElement('div');
  confirmedOrderImgAndInfo.classList.add('confirmed-order-name-img');

  const confirmOrderImgDiv =document.createElement('div');
 confirmOrderImgDiv.classList.add('confirm-order-img-div');

  const confirmOrderImg = document.createElement('img');

  confirmOrderImg.src = productImages[name];
  
confirmOrderImgDiv.append(confirmOrderImg);
confirmedOrderImgAndInfo.append(confirmOrderImgDiv);
  
  const confrimOrderNameAndPrice = document.createElement('div');
  confrimOrderNameAndPrice.classList.add('confirm-order-name-price');

  const confirmOrderName = document.createElement('p');
  confirmOrderName.classList.add('confirm-order-name');
  confirmOrderName.textContent=name;
  const quantityAndprice =document.createElement('div');

 const  confirmOrderQuantity = document.createElement('span');
  confirmOrderQuantity.textContent= `${quantity}x`;
  confirmOrderQuantity.classList.add('confirm-order-quantity');

  const confirmOrderPrice = document.createElement('span');
    confirmOrderPrice.textContent= `@$${price}`;
    confirmOrderPrice.classList.add('confirm-one-piece-price');
 confrimOrderNameAndPrice.append(confirmOrderName);
 quantityAndprice.append(  confirmOrderQuantity);
 quantityAndprice.append( confirmOrderPrice );

 confrimOrderNameAndPrice.append( quantityAndprice);

 
 confirmedOrderImgAndInfo.append(confrimOrderNameAndPrice);
 confirmOrder.append(confirmedOrderImgAndInfo);

 const confirmOrderTotalPriceDiv =document.createElement('div');
 confirmOrderTotalPriceDiv.classList.add('confirm-order-total-price-container');
const confirmOrderTotalPrice = document.createElement('span');
confirmOrderTotalPrice.classList.add('confirm-total-quantity-price');
confirmOrderTotalPrice.textContent= `$${totalPrice}`;
confirmOrderTotalPriceDiv.append(confirmOrderTotalPrice);

confirmOrder.append(confirmedOrderImgAndInfo);
confirmOrder.append(confirmOrderTotalPriceDiv);
orderConfirmedList.append(confirmOrder);

   const newOrder= document.querySelector('.new-order');


  newOrder.addEventListener("click",(e)=>{
    // orderConfirmedList.textContent='';
    document.querySelector('.confirmed-order-list-container').style.display='none';
    const orderConfirmedList = document.querySelector('.confirmed-order-list');
    while (orderConfirmedList.firstChild) {
        orderConfirmedList.removeChild(orderConfirmedList.firstChild);
    }
    document.querySelector('.confirmed-bill').textContent='';
     const cartbuttons = document.querySelectorAll('.add-to-cart');
     
   
    cartarray.forEach(item=>{
        const matchingButton = Array.from(cartbuttons).find((button) => button.getAttribute('data-product-name') === item.name);
      const parent = matchingButton.closest('.product-img');
 
      const quantitycontrol =parent.querySelector('.quantity-control');
       const currentquantity =quantitycontrol.querySelector('.current-quality');
       
       currentquantity.textContent='1';
      quantitycontrol.style.display = 'none';
      matchingButton.style.display='flex';
       
        updateCartItem(item.name, item.quantity,false);
        removeCartItem(item.name);
    
    })
  })



    
}
}
     
const totalBill = document.querySelectorAll('.confirmed-order-list .confirm-total-quantity-price');

let totalBillSum=0;
Array.from(totalBill).forEach(bill=>totalBillSum+=parseFloat(bill.textContent.replace('$','')));
document.querySelector('.confirmed-bill-container  .confirmed-bill').textContent=`$${totalBillSum.toFixed(2)}`;
    
});

            }
            
            
            // Update the cart item when quantity changes
            function updateCartItem(productName, q,flag) {
                const cartItem = cartarray.find(item => item.name === productName);
               
                if (cartItem) {
                    cartItem.quantity = q; // Update the quantity in the cart array
                    
                    // Update the displayed quantity in the DOM
                    const cartItemNames = document.querySelectorAll('.cart-item-name');
    
                    cartItemNames.forEach(cartItemName => {
                        // Check if the text content matches the productName
                        if (cartItemName.textContent === productName) {
                         
                            // Find the parent of this cart item to update the quantity
                            const productInfo = cartItemName.closest('.product-info'); // Use the correct parent class
                            const cartQuantity = productInfo.querySelector('.total-quantity');
                            
                            const oneItemprice = productInfo.querySelector('.one-piece-price');
                         let number = parseFloat(oneItemprice.textContent.replace(/[$@]/g, ''));
                        
       
                            const cartQuantityprice = productInfo.querySelector('.total-quantity-price');
                            const cartitemprice = parseFloat(productInfo.querySelector('.total-quantity-price').textContent.replace('$',''));
                       
                            // Update the quantity
               if (cartQuantity) {
                                cartQuantity.textContent = `${q}x`;
                                cartQuantityprice.textContent= `$${number*q.toFixed(2)}`;

                                updateOrderTotal(number,flag);
                             

                            }
                        }
                    });
                }
                updateCartItemCount();
            }
            
            

            
            // Remove the cart item when quantity is zero
            function removeCartItem(productName) {
           
             cartarray= cartarray.filter((item)=>item.name!=productName);
              const cartItem = [...document.querySelectorAll('.cart-item-name')].find(item=>item.textContent===productName);
       
              if(cartItem){
                
                const productInfo =cartItem.closest('.product-info');
            
                const priceReducestr = productInfo.querySelector('.total-quantity-price');
                const productInfoParent = productInfo.closest('.cart');


              
                const minusprice = parseFloat(priceReducestr.textContent.replace('$',''));
           
               updateOrderTotal(minusprice,false);
                productInfo.remove();
                
                if(document.querySelector('.cart-items').childElementCount===0){
                    document.querySelector('.confirm-button').remove();
                    document.querySelector('.carbon-neutral').remove();
                 const emptyImg = document.querySelector('.empty-image');
                 emptyImg.style.display='flex';
                    document.querySelector('.order-total').remove();
                }
              }
              updateCartItemCount();
            }

            function updateOrderTotal(q,flag){
             
                 const cartItem =document.querySelector('.cart-items');
                 const totalBill = document.querySelector('.order-total-price');
                 let curr = parseFloat (totalBill.textContent.replace('$',''))||0;
               
                 if(flag){
                    curr+=q;
                 }
                 else{
                    curr-=q;
                 }
                     totalBill.textContent= `$${curr}`


  
        }
            /////////////////////////////////////////////
            const category = document.createElement('span');
            category.textContent = product.category;
            category.classList.add('category');
            const productname = document.createElement('h2');
            productname.textContent = product.name;
            productname.classList.add('product-name');

            const productprice = document.createElement('span');
            productprice.classList.add('product-price');
            productprice.textContent = ` $${product.price}`;

            productcard.appendChild(productimg);
            productcard.appendChild(category);
            productcard.appendChild(productname);
            productcard.appendChild(productprice);
            productList.appendChild(productcard);


        })
    })
    .catch(error => {
        console.log('There is a error ', error);
    })

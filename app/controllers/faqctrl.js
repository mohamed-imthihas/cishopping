app.controller("faqController",['$scope',function($scope){
	$scope.questions=[{"question":"Is ordering online secure?",
						"answer":"Yes. We take the utmost care with the information that you provide us when placing an order on our website (or through any other means).  The server that hosts our bookstore encrypts the transmission of all credit card and personal customer information using the Internet-standard SSL (Secure Sockets Layer) protocol. During the encryption process, information is scrambled into small bits of code that cannot be read as they travel to us over the Internet. Once we receive the encrypted information, we use a private, one-of-a-kind key to decode it.All of the information you provide during the ordering process is restricted to our staff,and we make sure that all of our employees up-to-date on our security and privacy policies."
						},
						{"question":"What are your shipping and handling rates?",
						"answer":"Shipping and handling rates vary depending on the destination of the order and are based on the total cost of the order.  All shipping costs are calculated using a U.S. Postal Service shipping module. "
						},
						{"question":"How do I view what's in my shopping cart?",
						"answer":"To view the contents of your cart, click on the “View cart” icon in the upper-right corner of your computer screen. Once you click on this icon, you can easily change the number of copies you want to purchase of a particular item in your cart by updating the quantity listed and then clicking the Update cart link. You can also delete any item in your cart by clicking the Remove check box to the left of that item and then updating your cart with the Update cart link."
						},
						{"question":"How do I add items to my cart?",
						"answer":"To add a publication or other item to your cart, navigate to the page of the item you are interested in and then choose your desired version of that item (for publications, select Hardcopy, PDF, or Kindle). When you click the Add to Cart link, you will be brought to your Shopping cart page where you can then enter the quantity of the item that you would like to order using the Qty field on the right side of the screen. After you have entered a quantity, you can continue shopping or choose to complete your order. "
						},
						{"question":"How do I remove items from my cart?",
						"answer":"First, click on the “View cart” link in the upper-right corner of your computer screen. This will allow you toview all items currently in your cart. Once you have identified the item that you would like to delete, click on the Remove check box to the left of the item description and click Update cart in the lower-right corner to have your changes reflected."
						}];
	$scope.toggleShow=function(index,vdo){
			for(i=0;i<$scope.questions.length;i++){
				if(i==index)continue;
				vdo.show[i]=false;
			}
			vdo.show[index]=!vdo.show[index];
		}
	

}]);
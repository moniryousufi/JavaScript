`use strict`


//Start the Game 
let NAME = prompt("What is your name?");  
let age = parseInt(prompt("What is your age?"));  // parseInt use for number to focuse only number
let element= prompt("What is your favorite element (fire, water, earth, air)");
 
alert ( 
    ` Hello ${NAME} ,at ${age}
    you're ready to master the powers of ${element} `
)




 //Stock Setup  
let potions = ['Healing Potion', 'Mana Elixir',  'Invisibility Draft', 'Fire Resistance'];  // array of potions 
let potionStock = {      // object of Potions
    'Healing Potion': { quantity: 5, price: 10 }, 
    'Mana Elixir': { quantity: 3, price: 15 }, 
    'Invisibility Draft': { quantity: 2, price: 25 }, 
    'Fire Resistance': { quantity: 4, price: 20 }
 }; 

 
 let gold = 0;  // amount of gold
 let brewedCount = 0;   //Potion counter
 let servedCustomers = 0;   // Customer counter
 
 
 
 let potionMenu = potions.map((potion, index) => {    // we use from map to each element print apart from other 
  let { quantity, price } = potionStock[potion];  // object destructuring 
  return `${index + 1}. ${potion} - ${price} gold (Stock: ${quantity})`;  
}).join('\n'); // combines all array items into a single string, separated by new lines 


alert( "Potion Menu: \n" +potionMenu);


//  Customer Orders 
for (let i = 0; i < 3; i++) {  // 3 customer
  const get = prompt(`A customer is here! Take their order? (yes/no)`);

  if (get !== "yes") {   // if the customer don't want to buy
    alert("You skipped this customer.");
    continue;
  }

  let choice = prompt("Enter the potion name or number you want to buy.\n" + potionMenu); // choice a potion from mune

  if (!choice) { // if the user don't enter anything
    alert("No choice made.");
    continue;
  }


   // change number to name
  let potionName = null;
  if (!isNaN(choice)) {  // if the user enter a number change to type of potion
    let asNumber = parseInt(choice, 10);
    if (!isNaN(asNumber) && asNumber >= 1 && asNumber <= potions.length) { // check if the number is valid
      potionName = potions[asNumber - 1]; // get the potion name from the array
    }  
    else {
      potionName = potions.find(p => p.toLowerCase() === choice.toLowerCase()); //It shows the purchase amount
    }
  }


  // if  don't exist 
  if (!potionName) {  // condition
    alert("Invalid choice. Please try again.");
    continue;   
  }

  alert("You bought: " + potionName); //It shows the purchase amount
 



//  check the Inventory 
 let stock = potionStock[potionName].quantity;  // get the stock of the potion
  let price = potionStock[potionName].price;    // get the price of the potion

  if (stock> 0) {  // check amount of potion
    potionStock[potionName].quantity--; //  Inventory reduction
    gold += price;                      //   increase gold
    servedCustomers ++                 // increase customer counter
    alert(`Sold 1 ${potionName} for ${price} gold.\nGold pouch: ${gold}`);  // It shows the amount of sales  
  } 
  else {
    alert(`${potionName} is out of stock!`);     
  }
}
  

// Brewing Potions 
function brewPotion(potionName, amount) {  // check the name if potion in list
     if (!potionName || typeof amount !== "number" || amount <= 0) {
    alert("Invalid brew request."); return false;
    } 

    const key = potions.find(p => p.toLowerCase() === potionName.toLowerCase()); // find potion in the list
  if (!key) {  // check the list
    alert("Potion not found!");
    return;
  }

  potionStock[key].quantity += amount; // increase the stock of the potion
  brewedCount += amount;
  alert(`Brewed ${amount} × ${key}. New stock: ${potionStock[key].quantity}`);  // report of made potion
}

const  brewTimes=  3;
for (let i = 0; i < brewTimes; i++) { // brew 3 times
  const doBrew = (prompt('Do you want to brew a potion? (yes/no):') || "").toLowerCase(); 
  if (doBrew !== "yes") continue;

  const nameIn = (prompt("Which potion to brew? (exact name)\n\nCurrent Menu\n" + potionMenu) || "").toLowerCase();  
  const amountIn = Number((prompt("How many to brew?") || ""));
  brewPotion(nameIn, amountIn); // check the name and amount of potion
  }


// End of Day Report 

let leftLines = Object.entries(potionStock).map(([n, {quantity, price}]) => `${n}: ${quantity} left (price: ${price} gold)`); 
const totalLeft = Object.values(potionStock).reduce((s, x) => s + x.quantity, 0); 

alert(     // text of report
  "End of Day Report\n\n" +
  leftLines + "\n\n" +
  `Total left: ${totalLeft}\n` +
  `Total gold earned: ${gold}\n` +
  `Great job, ${NAME}! You brewed ${brewedCount} potions and helped ${servedCustomers} customers today!`
);

type FoodIcon = {
  keywords: string[];
  icon: string;
};

const foodIcons: FoodIcon[] = [
  { keywords: ["cheese", "cheddar", "mozzarella", "parmesan"], icon: "/icons/food/001-cheese.png" },
  { keywords: ["cherry", "cherries"], icon: "/icons/food/002-cherries.png" },
  { keywords: ["orange", "oranges"], icon: "/icons/food/003-orange.png" },
  { keywords: ["salad"], icon: "/icons/food/004-salad.png" },
  { keywords: ["grape", "grapes"], icon: "/icons/food/005-grapes.png" },
  { keywords: ["apple", "apples"], icon: "/icons/food/006-apple.png" },
  { keywords: ["garlic"], icon: "/icons/food/007-garlic.png" },
  { keywords: ["pizza"], icon: "/icons/food/008-pizza.png" },
  { keywords: ["cupcake", "cupcakes"], icon: "/icons/food/009-cupcake.png" },
  { keywords: ["raspberry", "raspberries"], icon: "/icons/food/010-raspberry.png" },
  { keywords: ["potato", "potatoes"], icon: "/icons/food/011-potatoes.png" },
  { keywords: ["pasta", "spaghetti", "noodles"], icon: "/icons/food/012-pasta.png" },
  { keywords: ["chips", "crisps"], icon: "/icons/food/013-chips.png" },
  { keywords: ["grain", "grains", "rice", "wheat"], icon: "/icons/food/014-grain.png" },
  { keywords: ["strawberry", "strawberries"], icon: "/icons/food/015-strawberry.png" },
  { keywords: ["carrot", "carrots"], icon: "/icons/food/016-carrot.png" },
  { keywords: ["mustard"], icon: "/icons/food/017-mustard.png" },
  { keywords: ["pineapple"], icon: "/icons/food/018-pineapple.png" },
  { keywords: ["asparagus"], icon: "/icons/food/019-asparagus.png" },
  { keywords: ["chive", "chives", "green onion", "scallion"], icon: "/icons/food/020-chives.png" },
  { keywords: ["bean", "beans"], icon: "/icons/food/021-beans.png" },
  { keywords: ["onion", "onions"], icon: "/icons/food/022-onion.png" },
  { keywords: ["cabbage"], icon: "/icons/food/023-cabbage.png" },
  { keywords: ["chili", "chilli", "pepper"], icon: "/icons/food/024-chili.png" },
  { keywords: ["blueberry", "blueberries"], icon: "/icons/food/025-blueberries.png" },
  { keywords: ["pear", "pears"], icon: "/icons/food/026-pear.png" },
  { keywords: ["bread", "loaf", "toast"], icon: "/icons/food/027-bread.png" },
  { keywords: ["aubergine", "eggplant"], icon: "/icons/food/028-aubergine.png" },
  { keywords: ["can", "canned"], icon: "/icons/food/029-can.png" },
  { keywords: ["cauliflower"], icon: "/icons/food/030-cauliflower.png" },
  { keywords: ["shrimp", "prawn", "prawns"], icon: "/icons/food/031-shrimp.png" },
  { keywords: ["jam", "jelly", "preserve"], icon: "/icons/food/032-jam.png" },
  { keywords: ["pickle", "pickles"], icon: "/icons/food/033-pickles.png" },
  { keywords: ["corn", "sweet corn"], icon: "/icons/food/034-corn.png" },
  { keywords: ["paprika"], icon: "/icons/food/035-paprika.png" },
  { keywords: ["macaroni", "mac and cheese"], icon: "/icons/food/036-macaroni.png" },
  { keywords: ["gin"], icon: "/icons/food/037-gin.png" },
  { keywords: ["steak", "beef", "meat"], icon: "/icons/food/039-steak.png" },
  { keywords: ["coffee", "coffee beans"], icon: "/icons/food/040-coffee-beans.png" },
  { keywords: ["hot sauce", "hot salsa"], icon: "/icons/food/041-hot-sauce.png" },
  { keywords: ["salt"], icon: "/icons/food/042-salt.png" },
  { keywords: ["egg", "eggs"], icon: "/icons/food/043-egg.png" },
  { keywords: ["juice", "fruit juice"], icon: "/icons/food/044-juice.png" },
  { keywords: ["water"], icon: "/icons/food/045-water.png" },
  { keywords: ["canned food", "canned soup"], icon: "/icons/food/046-canned-food.png" },
  { keywords: ["chocolate bar", "candy bar"], icon: "/icons/food/047-chocolate-bar.png" },
  { keywords: ["olive oil"], icon: "/icons/food/048-olive-oil.png" },
  { keywords: ["snack", "snacks"], icon: "/icons/food/049-snack.png" },

  // Generic fallback
  { keywords: ["grocery", "groceries"], icon: "/icons/food/050-groceries.png" },

  { keywords: ["tea", "tea bag"], icon: "/icons/food/052-tea-bag.png" },
  { keywords: ["avocado", "avocados"], icon: "/icons/food/053-avocado.png" },
  { keywords: ["banana", "bananas"], icon: "/icons/food/054-banana.png" },
  { keywords: ["watermelon"], icon: "/icons/food/056-watermelon.png" },
  { keywords: ["mango", "mangoes"], icon: "/icons/food/057-mango.png" },
  { keywords: ["lemon", "lemons"], icon: "/icons/food/059-lemon.png" },
  { keywords: ["melon", "cantaloupe", "honeydew"], icon: "/icons/food/060-melon.png" },
  { keywords: ["kiwi"], icon: "/icons/food/061-kiwi.png" },
  { keywords: ["dragon fruit", "pitaya"], icon: "/icons/food/062-dragon-fruit.png" },
  { keywords: ["papaya"], icon: "/icons/food/063-papaya.png" },
  { keywords: ["corn cob"], icon: "/icons/food/064-corn-1.png" },
  { keywords: ["peach", "peaches"], icon: "/icons/food/065-peach.png" },
  { keywords: ["pumpkin"], icon: "/icons/food/066-pumpkin.png" },
  { keywords: ["potato"], icon: "/icons/food/067-potato.png" },
  { keywords: ["broccoli"], icon: "/icons/food/068-broccoli.png" },
  { keywords: ["tofu"], icon: "/icons/food/069-tofu.png" },
  { keywords: ["pea", "peas", "green peas"], icon: "/icons/food/070-green-pea.png" },
  { keywords: ["cauliflower"], icon: "/icons/food/071-cauliflower-1.png" },
  { keywords: ["oil", "cooking oil"], icon: "/icons/food/072-cooking.png" },
  { keywords: ["almond milk"], icon: "/icons/food/073-almond-milk.png" },
  { keywords: ["milk", "whole milk", "skim milk", "2% milk"], icon: "/icons/food/074-milk.png" },
  { keywords: ["water bottle", "bottled water"], icon: "/icons/food/075-water-bottle.png" },
  { keywords: ["soda", "soft drink", "cold drink", "cola"], icon: "/icons/food/076-cold-drink.png" },
  { keywords: ["frozen", "frozen food", "frozen goods"], icon: "/icons/food/078-frozen-goods.png" },
  { keywords: ["tissue", "tissue paper", "paper towel", "toilet paper"], icon: "/icons/food/081-tissue-paper.png" },
  { keywords: ["cleaning spray", "disinfectant spray"], icon: "/icons/food/082-cleaning-spray.png" },
  { keywords: ["cleaning", "cleaner"], icon: "/icons/food/083-cleaning.png" },
  { keywords: ["shampoo"], icon: "/icons/food/084-shampoo.png" },
  { keywords: ["soap", "body wash"], icon: "/icons/food/085-soap.png" },
  { keywords: ["chocolate", "cocoa"], icon: "/icons/food/087-chocolate.png" },
  { keywords: ["cream", "whipped cream", "heavy cream"], icon: "/icons/food/088-cream.png" },
];

function normalizeName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getFoodIcon(itemName: string) {
  const name = normalizeName(itemName);

  let bestMatch = "";
  let longestKeyword = 0;

  for (const food of foodIcons) {
    for (const keyword of food.keywords) {
      if (name.includes(keyword) && keyword.length > longestKeyword) {
        bestMatch = food.icon;
        longestKeyword = keyword.length;
      }
    }
  }

  return bestMatch || "/icons/food/050-groceries.png";
}
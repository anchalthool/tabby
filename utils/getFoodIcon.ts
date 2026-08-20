type FoodIcon = {
  keywords: string[];
  icon: string;
};

const foodIcons: FoodIcon[] = [
  // ---------------------------------------------------------------------------
  // BREAD, ROTI, TORTILLA & BAKERY
  // ---------------------------------------------------------------------------
  {
    keywords: [
      "roti", "rotis", "chapati", "chapatis", "phulka", "phulkas",
      "tortilla", "tortillas", "wrap", "wraps", "flatbread", "flat bread"
    ],
    icon: "/icons/food/002-tortillas.png",
  },
  { keywords: ["bread", "loaf", "toast", "sandwich bread", "bun", "buns"], icon: "/icons/food/027-bread.png" },
  { keywords: ["bagel", "bagels"], icon: "/icons/food/039-bagels.png" },
  { keywords: ["cake", "cake slice"], icon: "/icons/food/008-cake-slice.png" },
  { keywords: ["cupcake", "cupcakes", "muffin", "muffins"], icon: "/icons/food/009-cupcake.png" },
  { keywords: ["cookie", "cookies", "biscuit", "biscuits"], icon: "/icons/food/009-cookie.png" },
  { keywords: ["donut", "donuts", "doughnut", "doughnuts"], icon: "/icons/food/040-donut.png" },

  // ---------------------------------------------------------------------------
  // SNACKS, CHIPS & SWEETS
  // ---------------------------------------------------------------------------
  {
    keywords: [
      "potato chips", "chips", "chip", "crisps", "crispy chips",
      "lays", "doritos", "cheetos", "pringles"
    ],
    icon: "/icons/food/013-chips.png",
  },
  { keywords: ["nachos", "nacho", "tortilla chips"], icon: "/icons/food/021-nachos.png" },
  {
    keywords: [
      "snack", "snacks", "snack mix", "trail mix", "namkeen", "mixture",
      "sev", "bhujia", "chakli", "murukku"
    ],
    icon: "/icons/food/015-snacks.png",
  },
  { keywords: ["chocolate bar", "candy bar", "protein bar", "granola bar"], icon: "/icons/food/047-chocolate-bar.png" },
  { keywords: ["chocolate", "cocoa", "cacao"], icon: "/icons/food/087-chocolate.png" },
  { keywords: ["ice cream", "icecream", "gelato"], icon: "/icons/food/006-ice-cream.png" },
  { keywords: ["popsicle", "ice pop", "ice lolly"], icon: "/icons/food/007-popsicle.png" },

  // ---------------------------------------------------------------------------
  // GRAINS, FLOUR, OATS, RICE & PASTA
  // ---------------------------------------------------------------------------
  {
    keywords: [
      "rice", "basmati", "jasmine rice", "brown rice", "white rice",
      "grain", "grains", "wheat", "quinoa", "barley", "millet"
    ],
    icon: "/icons/food/014-grain.png",
  },
  { keywords: ["oats", "oatmeal", "rolled oats", "instant oats"], icon: "/icons/food/018-oats.png" },
  {
    keywords: [
      "flour", "atta", "wheat flour", "maida", "all purpose flour",
      "besan", "gram flour", "corn flour"
    ],
    icon: "/icons/food/011-flour.png",
  },
  { keywords: ["pasta", "spaghetti", "noodles", "penne", "fusilli", "linguine"], icon: "/icons/food/012-pasta.png" },
  { keywords: ["macaroni", "mac and cheese", "mac n cheese"], icon: "/icons/food/036-macaroni.png" },

  // ---------------------------------------------------------------------------
  // DAIRY & ALTERNATIVES
  // ---------------------------------------------------------------------------
  { keywords: ["cheese", "cheddar", "mozzarella", "parmesan", "paneer"], icon: "/icons/food/001-cheese.png" },
  { keywords: ["almond milk"], icon: "/icons/food/073-almond-milk.png" },
  { keywords: ["oat milk"], icon: "/icons/food/017-milk.png" },
  { keywords: ["butter"], icon: "/icons/food/029-butter.png" },
  {
    keywords: [
      "milk", "whole milk", "skim milk", "2 percent milk", "2 milk",
      "low fat milk", "fat free milk", "dairy milk"
    ],
    icon: "/icons/food/074-milk.png",
  },
  { keywords: ["yogurt", "yoghurt", "curd", "greek yogurt", "dahi"], icon: "/icons/food/036-yogurt.png" },
  { keywords: ["cream", "whipped cream", "whip cream", "heavy cream", "half and half"], icon: "/icons/food/088-cream.png" },

  // ---------------------------------------------------------------------------
  // EGGS, MEAT, POULTRY, SEAFOOD & PROTEIN
  // ---------------------------------------------------------------------------
  { keywords: ["egg", "eggs"], icon: "/icons/food/043-egg.png" },
  { keywords: ["chicken breast", "chicken breasts"], icon: "/icons/food/023-chicken-breast.png" },
  { keywords: ["chicken", "poultry"], icon: "/icons/food/026-meat.png" },
  { keywords: ["ground beef", "ground meat", "minced meat", "mince", "keema"], icon: "/icons/food/027-minced-meat.png" },
  { keywords: ["steak", "beef", "meat", "lamb", "mutton"], icon: "/icons/food/039-steak.png" },
  { keywords: ["pork", "bacon", "ham"], icon: "/icons/food/028-pork.png" },
  { keywords: ["fish", "salmon", "tuna", "tilapia", "cod"], icon: "/icons/food/025-fish.png" },
  { keywords: ["fried shrimp", "fried prawns"], icon: "/icons/food/024-fried-shrimp.png" },
  { keywords: ["shrimp", "prawn", "prawns"], icon: "/icons/food/031-shrimp.png" },
  { keywords: ["tofu","paneer"], icon: "/icons/food/069-tofu.png" },

  // ---------------------------------------------------------------------------
  // VEGETABLES & HERBS
  // ---------------------------------------------------------------------------
  { keywords: ["tomato", "tomatoes"], icon: "/icons/food/001-tomato.png" },
  { keywords: ["potato", "potatoes"], icon: "/icons/food/011-potatoes.png" },
  { keywords: ["sweet potato", "sweet potatoes", "yam", "yams"], icon: "/icons/food/067-potato.png" },
  { keywords: ["carrot", "carrots"], icon: "/icons/food/016-carrot.png" },
  { keywords: ["garlic", "garlic cloves"], icon: "/icons/food/007-garlic.png" },
  { keywords: ["ginger"], icon: "/icons/food/012-ginger.png" },
  { keywords: ["onion", "onions", "red onion", "yellow onion"], icon: "/icons/food/022-onion.png" },
  { keywords: ["green onion", "spring onion", "scallion", "scallions", "chive", "chives"], icon: "/icons/food/020-chives.png" },
  { keywords: ["spinach", "palak"], icon: "/icons/food/035-spinach.png" },
  { keywords: ["parsley", "cilantro", "coriander leaves", "coriander"], icon: "/icons/food/034-parsley.png" },
  { keywords: ["mushroom", "mushrooms"], icon: "/icons/food/033-mushrooms.png" },
  { keywords: ["bell pepper", "bell peppers", "capsicum", "sweet pepper"], icon: "/icons/food/013-bell-pepper.png" },
  { keywords: ["chili pepper", "chilli pepper", "chili", "chilli", "hot pepper","jalapeno"], icon: "/icons/food/024-chili.png" },
  { keywords: ["paprika"], icon: "/icons/food/035-paprika.png" },
  { keywords: ["broccoli"], icon: "/icons/food/068-broccoli.png" },
  { keywords: ["cauliflower"], icon: "/icons/food/030-cauliflower.png" },
  { keywords: ["cabbage"], icon: "/icons/food/023-cabbage.png" },
  { keywords: ["eggplant", "aubergine", "brinjal"], icon: "/icons/food/028-aubergine.png" },
  { keywords: ["asparagus"], icon: "/icons/food/019-asparagus.png" },
  { keywords: ["green peas", "peas", "pea"], icon: "/icons/food/070-green-pea.png" },
  { keywords: ["beans", "bean", "kidney beans", "black beans", "rajma"], icon: "/icons/food/021-beans.png" },
  { keywords: ["corn cob", "corn on the cob"], icon: "/icons/food/064-corn-1.png" },
  { keywords: ["corn", "sweet corn", "maize"], icon: "/icons/food/034-corn.png" },
  { keywords: ["pumpkin", "squash"], icon: "/icons/food/066-pumpkin.png" },
  { keywords: ["cucumber", "zucchini"], icon: "/icons/food/032-cucumber.png" },

  // ---------------------------------------------------------------------------
  // FRUIT
  // ---------------------------------------------------------------------------
  { keywords: ["cherry", "cherries"], icon: "/icons/food/002-cherries.png" },
  { keywords: ["orange", "oranges", "mandarin", "tangerine"], icon: "/icons/food/003-orange.png" },
  { keywords: ["grape", "grapes"], icon: "/icons/food/005-grapes.png" },
  { keywords: ["apple", "apples"], icon: "/icons/food/006-apple.png" },
  { keywords: ["raspberry", "raspberries"], icon: "/icons/food/010-raspberry.png" },
  { keywords: ["strawberry", "strawberries"], icon: "/icons/food/015-strawberry.png" },
  { keywords: ["blueberry", "blueberries"], icon: "/icons/food/025-blueberries.png" },
  { keywords: ["pear", "pears"], icon: "/icons/food/026-pear.png" },
  { keywords: ["pineapple"], icon: "/icons/food/018-pineapple.png" },
  { keywords: ["avocado", "avocados"], icon: "/icons/food/053-avocado.png" },
  { keywords: ["banana", "bananas"], icon: "/icons/food/054-banana.png" },
  { keywords: ["watermelon"], icon: "/icons/food/056-watermelon.png" },
  { keywords: ["mango", "mangoes"], icon: "/icons/food/057-mango.png" },
  { keywords: ["lemon", "lemons", "lime", "limes"], icon: "/icons/food/059-lemon.png" },
  { keywords: ["melon", "cantaloupe", "honeydew"], icon: "/icons/food/060-melon.png" },
  { keywords: ["kiwi"], icon: "/icons/food/061-kiwi.png" },
  { keywords: ["dragon fruit", "pitaya"], icon: "/icons/food/062-dragon-fruit.png" },
  { keywords: ["papaya"], icon: "/icons/food/063-papaya.png" },
  { keywords: ["peach", "peaches", "nectarine"], icon: "/icons/food/065-peach.png" },
  { keywords: ["fruit", "fresh fruit", "mixed fruit", "fruit tray"], icon: "/icons/food/014-fruit.png" },

  // ---------------------------------------------------------------------------
  // NUTS, SPREADS, SAUCES & CONDIMENTS
  // ---------------------------------------------------------------------------
  { keywords: ["peanut butter", "pb"], icon: "/icons/food/044-peanut-butter.png" },
  { keywords: ["nuts", "mixed nuts", "almonds", "cashews", "walnuts", "pistachios", "peanuts", "trail mix"], icon: "/icons/food/019-nuts.png" },
  { keywords: ["jam", "jelly", "preserve", "marmalade"], icon: "/icons/food/032-jam.png" },
  { keywords: ["mustard"], icon: "/icons/food/017-mustard.png" },
  { keywords: ["hot sauce", "hot salsa", "sriracha", "chili sauce"], icon: "/icons/food/041-hot-sauce.png" },
  {
    keywords: [
      "sauce", "sauces", "ketchup", "mayonnaise", "mayo", "soy sauce",
      "teriyaki", "pasta sauce", "tomato sauce", "salsa", "chutney"
    ],
    icon: "/icons/food/022-sauces.png",
  },
  { keywords: ["pickle", "pickles", "achar", "achaar"], icon: "/icons/food/033-pickles.png" },
  { keywords: ["salt"], icon: "/icons/food/042-salt.png" },
  { keywords: ["pepper", "black pepper", "peppercorn"], icon: "/icons/food/031-pepper.png" },
  { keywords: ["sugar", "brown sugar", "powdered sugar"], icon: "/icons/food/020-sugar.png" },

  // ---------------------------------------------------------------------------
  // OILS & COOKING
  // ---------------------------------------------------------------------------
  { keywords: ["olive oil", "extra virgin olive oil", "evoo"], icon: "/icons/food/048-olive-oil.png" },
  {
    keywords: [
      "cooking oil", "vegetable oil", "canola oil", "sunflower oil",
      "avocado oil", "coconut oil", "oil"
    ],
    icon: "/icons/food/072-cooking.png",
  },

  // ---------------------------------------------------------------------------
  // DRINKS
  // ---------------------------------------------------------------------------
  { keywords: ["coffee beans", "ground coffee", "coffee"], icon: "/icons/food/040-coffee-beans.png" },
  { keywords: ["tea bag", "tea bags", "tea", "chai"], icon: "/icons/food/052-tea-bag.png" },
  { keywords: ["juice", "fruit juice", "orange juice", "apple juice"], icon: "/icons/food/044-juice.png" },
  { keywords: ["water bottle", "bottled water", "mineral water"], icon: "/icons/food/075-water-bottle.png" },
  { keywords: ["water"], icon: "/icons/food/045-water.png" },
  { keywords: ["soda", "soft drink", "cold drink", "cola", "coke", "pepsi", "sprite"], icon: "/icons/food/076-cold-drink.png" },
  { keywords: ["gin","alcohol"], icon: "/icons/food/037-gin.png" },

  // ---------------------------------------------------------------------------
  // PREPARED / FROZEN / CANNED FOOD
  // ---------------------------------------------------------------------------
  { keywords: ["pizza"], icon: "/icons/food/008-pizza.png" },
  { keywords: ["salad"], icon: "/icons/food/004-salad.png" },
  { keywords: ["frozen food", "frozen foods", "frozen goods", "frozen"], icon: "/icons/food/078-frozen-goods.png" },
  { keywords: ["canned soup", "canned food", "tin food"], icon: "/icons/food/046-canned-food.png" },
  { keywords: ["can", "canned", "tin"], icon: "/icons/food/029-can.png" },
  { keywords: ["prepared food", "ready meal", "ready meals", "meal", "food"], icon: "/icons/food/029-food.png" },

  // ---------------------------------------------------------------------------
  // HOUSEHOLD & PERSONAL CARE
  // ---------------------------------------------------------------------------
  { keywords: ["toilet paper", "paper towel", "paper towels", "tissue", "tissue paper"], icon: "/icons/food/081-tissue-paper.png" },
  { keywords: ["detergent", "laundry detergent", "dish detergent", "dishwasher detergent"], icon: "/icons/food/037-detergent.png" },
  { keywords: ["cleaning spray", "disinfectant spray", "surface spray"], icon: "/icons/food/082-cleaning-spray.png" },
  { keywords: ["cleaning", "cleaner", "disinfectant", "bleach"], icon: "/icons/food/083-cleaning.png" },
  { keywords: ["aluminium foil", "aluminum foil", "foil", "tin foil"], icon: "/icons/food/041-aluminium-foil.png" },
  { keywords: ["garbage bag", "garbage bags", "trash bag", "trash bags", "bin bag", "bin bags"], icon: "/icons/food/042-garbage-bag.png" },
  { keywords: ["shampoo", "conditioner"], icon: "/icons/food/084-shampoo.png" },
  { keywords: ["soap", "body wash", "hand soap", "shower gel"], icon: "/icons/food/085-soap.png" },
  { keywords: ["sanitary napkin", "sanitary pad", "sanitary pads", "pads", "feminine pads"], icon: "/icons/food/003-sanitary-napkin.png" },
  { keywords: ["razor", "razors", "shaving razor"], icon: "/icons/food/005-razor.png" },

  // ---------------------------------------------------------------------------
  // GENERIC FALLBACK CATEGORIES
  // ---------------------------------------------------------------------------
  { keywords: ["grocery", "groceries"], icon: "/icons/food/050-groceries.png" },
];

function normalizeName(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/%/g, " percent ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Checks complete words/phrases rather than raw substrings.
 * Example: "pea" will match "green pea" but NOT "peanut butter".
 */
function containsKeyword(name: string, keyword: string) {
  const normalizedKeyword = normalizeName(keyword);
  return (` ${name} `).includes(` ${normalizedKeyword} `);
}

export function getFoodIcon(itemName: string) {
  const name = normalizeName(itemName);

  let bestMatch = "";
  let longestKeyword = 0;

  for (const food of foodIcons) {
    for (const keyword of food.keywords) {
      const normalizedKeyword = normalizeName(keyword);

      if (
        containsKeyword(name, normalizedKeyword) &&
        normalizedKeyword.length > longestKeyword
      ) {
        bestMatch = food.icon;
        longestKeyword = normalizedKeyword.length;
      }
    }
  }

  return bestMatch || "/icons/food/050-groceries.png";
}
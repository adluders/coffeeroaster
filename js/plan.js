const questions = document.querySelectorAll(".ordering__process-header"),
  choices = document.querySelectorAll(".ordering__process-card"),
  coffeePreference = document.querySelectorAll(".coffee-preference"),
  beanPreference = document.querySelectorAll(".bean-preference"),
  amountPreference = document.querySelectorAll(".amount-preference"),
  groundPreference = document.querySelectorAll(".ground-preference"),
  frequencyPreference = document.querySelectorAll(".frequency-preference"),
  weeklyPrice = document.getElementById("weekly-price"),
  biweeklyPrice = document.getElementById("biweekly-price"),
  monthlyPrice = document.getElementById("monthly-price"),
  summaryBtn = document.querySelector(".summary__cta button"),
  summaryModal = document.querySelector(".modal"),
  totalPrice = document.getElementById("total"),
  checkoutBtn = document.querySelector(".modal__checkout button"),
  modalOpen = document.querySelector(".modal-open");

// Open questions/user choices
const openQuestionOptions = (questionHeader) =>
  questionHeader.classList.toggle("active");

let coffeeType, beanType, amount, grindOption, frequency;

let pricingDetails = [];
let pricingIndex = 0;

const buildSummary = (card) => {
  // Resets value for ALL cards within the same category
  card.parentNode
    .querySelectorAll("div")
    .forEach((cardItem) => cardItem.setAttribute("aria-selected", "false"));

  // Changes aria selected for ONLY the card that was clicked
  card.setAttribute("aria-selected", "true");

  // set coffee type
  card.dataset.coffee && (coffeeType = card.dataset.coffee);

  // set bean type
  card.dataset.bean && (beanType = card.dataset.bean);

  // set amount
  card.dataset.amount && (amount = card.dataset.amount);

  // set grind option
  card.dataset.grind && (grindOption = card.dataset.grind);

  // set frequency
  card.dataset.frequency && (frequency = card.dataset.frequency);

  // Disable grind option
  if (coffeeType === "capsule") {
    questions[3].parentElement.classList.add("disabled");
  } else {
    questions[3].parentElement.classList.remove("disabled");
  }

  // Update summary inner text
  if (coffeeType === undefined) {
    coffeePreference.forEach((coffeePref) => (coffeePref.innerText = "_____"));
  } else if (coffeeType === "capsule") {
    coffeePreference.forEach(
      (coffeePref) => (coffeePref.innerText = `using ${coffeeType}s`)
    );
  } else {
    coffeePreference.forEach(
      (coffeePref) => (coffeePref.innerText = `as ${coffeeType}`)
    );
  }

  if (grindOption === undefined && coffeeType === "capsule") {
    groundPreference.forEach((groundPref) => (groundPref.innerText = ""));
  } else if (grindOption === undefined) {
    groundPreference.forEach(
      (groundPref) => (groundPref.innerText = "ground ala _____")
    );
  } else {
    groundPreference.forEach(
      (groundPref) => (groundPref.innerText = `ground ala ${grindOption}`)
    );
  }

  beanType
    ? beanPreference.forEach((beanPref) => (beanPref.innerText = `${beanType}`))
    : null;

  amount
    ? amountPreference.forEach(
        (amountPref) => (amountPref.innerText = `${amount}`)
      )
    : null;

  if (frequency === "4") {
    frequencyPreference.forEach((freq) => (freq.innerText = "every week"));
    pricingIndex = pricingDetails.length > 1 && pricingDetails[0];
  } else if (frequency === "2") {
    frequencyPreference.forEach((freq) => (freq.innerText = "every 2 weeks"));
    pricingIndex = pricingDetails[1];
  } else if (frequency === "1") {
    frequencyPreference.forEach((freq) => (freq.innerText = "every month"));
    pricingIndex = pricingDetails[2];
  } else {
    frequencyPreference.innerText = "_____";
  }

  // Update price based on amount selected
  if (amount === undefined) {
    weeklyPrice.innerText = "";
    biweeklyPrice.innerText = "";
    monthlyPrice.innerText = "";
  } else if (amount === "250g") {
    weeklyPrice.innerText = "7.20";
    biweeklyPrice.innerText = "9.60";
    monthlyPrice.innerText = "12.00";
    pricingDetails = [7.2, 9.6, 12.0];
  } else if (amount === "500g") {
    weeklyPrice.innerText = "13.00";
    biweeklyPrice.innerText = "17.50";
    monthlyPrice.innerText = "22.00";
    pricingDetails = [13, 17.5, 22];
  } else {
    weeklyPrice.innerText = "22.00";
    biweeklyPrice.innerText = "32.00";
    monthlyPrice.innerText = "42.00";
    pricingDetails = [22, 32, 42];
  }

  // Make plan creation button active
  if (
    coffeeType !== undefined &&
    beanType !== undefined &&
    amount !== undefined &&
    grindOption !== undefined &&
    frequency !== undefined
  ) {
    summaryBtn.setAttribute("aria-disabled", "false");
  } else if (
    grindOption === undefined &&
    coffeeType === "capsule" &&
    beanType !== undefined &&
    amount !== undefined &&
    frequency !== undefined
  ) {
    summaryBtn.setAttribute("aria-disabled", "false");
  } else {
    summaryBtn.setAttribute("aria-disabled", "true");
  }
};

const openModal = () => {
  // open modal
  summaryModal.style.display = "block";
  modalOpen.style.display = "block";
  window.scrollTo({
    top: 620,
    behavior: "smooth",
  });
  // Calculation
  let priceTotal = pricingIndex * frequency;

  totalPrice.innerText = `${priceTotal.toFixed(2)}`;
};

const closeModal = () => {
  // close modal
  summaryModal.style.display = "none";
  modalOpen.style.display = "none";
};

// Event Listeners
questions.forEach((question) =>
  question.addEventListener("click", () => openQuestionOptions(question))
);

choices.forEach((choice) =>
  choice.addEventListener("click", () => buildSummary(choice))
);

summaryBtn.addEventListener("click", openModal);

checkoutBtn.addEventListener("click", closeModal);

modalOpen.addEventListener("click", closeModal);

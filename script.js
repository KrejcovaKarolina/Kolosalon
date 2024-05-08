'use strict';
let checkboxes = document.querySelectorAll('input[name="chb-group"]');
let btnTotalPrice = document.querySelector('.btnTotalPrice');
let btnSendOrder = document.querySelector('.btnSendOrder');
let customerEmail = document.querySelector('#customerEmail');

let numberOfDays = 0,
  checked = 0,
  customersPrice = 0;

// Odblokování tlačítka "Zobrazit celkovou cenu", po zadání potřebných údajů
function btnPriceEnable() {
  if (checked === 0 || numberOfDays == 0 || customersPrice === 0) {
    btnTotalPrice.setAttribute('disabled', '');
    setInfoForCustomer('Vyplňte potřebné údaje', 'black');
    document.querySelector('.totalPrice').textContent = '';
  } else {
    btnTotalPrice.removeAttribute('disabled');
    setInfoForCustomer('Stiskněte tlačítko', 'black');
    document.querySelector('.totalPrice').textContent = '';
  }
  btnSendOrderEnable();
}
// Zobrazení celkové ceny
function showPrice() {
  let bikeCarrier = document.querySelector('input[name="rb-group"]:checked').value;
  let totalPrice = 0;
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      totalPrice += checkbox.value * document.querySelector(`#${checkbox.id}Amount`).value;
    }
  });
  totalPrice *= numberOfDays * bikeCarrier;
  document.querySelector('.totalPrice').textContent = `${Math.round(totalPrice)} Kč`;
  if (totalPrice > customersPrice) {
    setInfoForCustomer('Zápujčka je mimo Váš rozpočet', 'red');
  } else {
    setInfoForCustomer('Zápujčka se vejde do Vašeho rozpočtu', 'green');
  }
}
// nastaví informace pro zákazníka
function setInfoForCustomer(message, color) {
  document.querySelector('.infoForCustomer').textContent = message;
  document.querySelector('.infoForCustomer').style.color = color;
}
// Odblokování tlačítka "Odeslat objednávku"
function btnSendOrderEnable() {
  if (/[@]/g.test(customerEmail.value) && !btnTotalPrice.disabled) {
    btnSendOrder.removeAttribute('disabled');
  } else {
    btnSendOrder.setAttribute('disabled', '');
  }
}
// Odešle objednávku
function sendOrder() {
  location.reload();
  window.alert('Objednávka byla odeslána');
}
// Naslouchači změn ve formuláři
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener('change', function () {
    let amount = document.querySelector(`#${checkbox.id}Amount`);
    if (!checkbox.checked) {
      amount.setAttribute('disabled', '');
      checked--;
    } else {
      amount.removeAttribute('disabled');
      checked++;
    }
    btnPriceEnable();
  });
});

document.querySelectorAll('input[name="amount-group"]').forEach(function (amount) {
  amount.addEventListener('change', function () {
    btnPriceEnable();
  });
});

document.querySelector('#numberOfDays').addEventListener('change', function () {
  numberOfDays = this.value;
  btnPriceEnable();
});

document.querySelectorAll('input[name="rb-group"]').forEach(function (bikeCarrier) {
  bikeCarrier.addEventListener('change', function () {
    btnPriceEnable();
  });
});

document.querySelector('#customersPrice').addEventListener('change', function () {
  customersPrice = this.value;
  btnPriceEnable();
});

customerEmail.addEventListener('change', function () {
  btnSendOrderEnable();
});

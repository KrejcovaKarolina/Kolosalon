let bikeTypes = document.querySelectorAll('.bike-type')
let priceBtn = document.querySelector('#price-btn')
let email = document.querySelector('#email')
let sendBtn = document.querySelector('#send-order')
let bikesSelect = new Array(4).fill(false)
let loanPeriod = 0,
  budget = 0

function setMessage(message, color) {
  let output = document.querySelector('.message')
  output.innerHTML = message
  output.style.color = color
}

setMessage('Vyplňte údaje označené *', 'var(--text)')

//handler pro tlačítko "Zobrazit cenu"
function enablePriceBtn() {
  let bike = 0

  bikesSelect.forEach((type) => {
    if (type) {
      bike++
    }
  })

  if (bike === 0 || loanPeriod === 0 || budget === 0) {
    setMessage('Vyplňte údaje označené *', 'var(--text)')
    priceBtn.setAttribute('disabled', '')
  } else {
    setMessage('Stiskněte tlačítko', 'var(--info)')
    priceBtn.removeAttribute('disabled')
  }

  enableSendBtn()
}

function showPrice() {
  let carrier = document.querySelector('input[name="bike-carrier"]:checked').value
  let price = 0
  let priceS = ''

  bikeTypes.forEach((block) => {
    let amount = block.querySelector('input[type="number"]').value
    let value = block.querySelector('input[type="hidden"]').value
    price += amount * value
  })

  price *= loanPeriod * carrier
  priceS = `Cena celkem: ${Math.round(price)} Kč<br>`

  if (Math.round(price) > budget) {
    setMessage(`${priceS}Půjčovné je mimo Váš rozpočet`, 'var(--danger)')
  } else {
    setMessage(`${priceS}Půjčovné Váš rozpočet nezatíží`, 'var(--success)')
  }
}

//handler pro tlačítko "Odeslat rezervaci"
function enableSendBtn() {
  if (/[@]/g.test(email.value) && !priceBtn.disabled) {
    sendBtn.removeAttribute('disabled')
  } else {
    sendBtn.setAttribute('disabled', '')
  }
}

function sendOrder() {
  location.reload()
  window.alert('Objednávka byla odeslána')
}

//handler pro množství kol
for (let i = 0; i < bikeTypes.length; i++) {
  let block = bikeTypes[i]
  let input = block.querySelector('input[type="number"]')
  let incBtn = block.querySelector('.increase')
  let decBtn = block.querySelector('.decrease')

  function changeInput(x) {
    input.value = input.value > 0 ? parseInt(input.value) + x : 0
    bikesSelect[i] = input.value <= 0 ? false : true
    enablePriceBtn()
  }

  incBtn.addEventListener('click', () => {
    input.value = parseInt(input.value) + 1
    bikesSelect[i] = true
    enablePriceBtn()
  })

  decBtn.addEventListener('click', () => {
    changeInput(-1)
  })

  input.addEventListener('input', () => {
    changeInput(0)
  })
}

// Listeners
document.querySelector('#loan-period').addEventListener('change', (e) => {
  loanPeriod = e.target.value
  enablePriceBtn()
})

document.querySelector('#budget').addEventListener('input', (e) => {
  budget = e.target.value < 0 || e.target.value === '' ? 0 : e.target.value
  enablePriceBtn()
})

priceBtn.addEventListener('click', () => {
  showPrice()
})

email.addEventListener('input', () => {
  enableSendBtn()
})

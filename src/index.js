// DOM Instace
const checkboxes = document.querySelectorAll('input[type="checkbox"]')
const threshold = document.querySelector('.threshold')
const processButton = document.querySelector('.process-button')
const persentaseDisease = document.querySelector('.persentase-disease')
const predictionResultContainer = document.querySelector('.prediction-result-container')
const conclusionContainer = document.querySelector('.conclusion-container')

// Initial Varibel
let indication = {}
let diseases_list = {}
let checkboxes_list = []

function getCheckboxesData() {
  checkboxes.forEach(checkbox => {
    data = checkbox.checked ? 1 : 0
    checkboxes_list.push(data)
  })
}

function fitEffectList() {
  for (effect in indication) {
    console.log(indication[effect])
  }
}

function getPercentage(...indicationItem) {
  indicationItem = [...indicationItem]

  let indicationName = indicationItem.pop()
  let checkbox_indication = indicationItem
  let value_indication = []

  for (let i = 1; i <= checkboxes_list.length; i++) {
    if (checkbox_indication.includes(i)) {
      value_indication.push(checkboxes_list[i - 1])
    }
  }

  let percentage = value_indication.reduce((a, b) => a + b, 0) / value_indication.length
  percentage = percentage.toFixed(2)

  indication[`${indicationName}`] = {
    "checkbox_indication": checkbox_indication,
    "value_indication": value_indication,
    "percentage": percentage,
  }
}

function getresultPrediction(...indicationList) {
  let diseasesName = indicationList.pop()
  let diseasesResult = []
  for (data of indicationList) {
    percentage = indication[`${data}`].percentage
    diseasesResult.push({ data, percentage })
  }

  let total_percentage = diseasesResult.reduce((a, b) => {
    return a + (b.percentage / diseasesResult.length)
  }, 0)

  total_percentage = total_percentage.toFixed(2)
  diseasesResult.push({ "total percentage": total_percentage })
  diseases_list[`${diseasesName}`] = diseasesResult
  console.table(diseasesResult)
}


function main() {
  checkboxes_list = []
  indication = {}

  getCheckboxesData()

  getPercentage(1, 2, 4, 5, 'mencret')
  getPercentage(4, 5, 6, 'muntah')
  getPercentage(4, 7, 'sakit perut')
  getPercentage(4, 8, 9, 'darah rendah')
  getPercentage(8, 10, 'koma')
  getPercentage(4, 5, 9, 11, 'demam')
  getPercentage(4, 8, 11, 12, 'septicaemia')
  getPercentage(4, 13, 'lumpuh')
  getPercentage(1, 2, 3, 4, 5, 'mencret berdarah')
  getPercentage(14, 15, 'makan daging')
  getPercentage(14, 16, 'makan jamur')
  getPercentage(14, 17, 'makan makanan kaleng')
  getPercentage(18, 19, 'minum susu')

  getresultPrediction('mencret', 'muntah', 'sakit perut', 'darah rendah', 'makan daging', 'Staphylococcus aureus')
  getresultPrediction('mencret', 'muntah', 'sakit perut', 'koma', 'makan jamur', 'Jamur beracun')
  getresultPrediction('mencret', 'muntah', 'sakit perut', 'demam', 'septicaemia', 'makan daging', 'Salmonellae')
  getresultPrediction('muntah', 'lumpuh', 'makan makanan kaleng', 'Clostridium botulinum')
  getresultPrediction('mencret berdarah', 'sakit perut', 'demam', 'minum susu', 'Campylobacter')
}


processButton.addEventListener("click", () => {
  console.clear()
  main()
  if (threshold.value !== "") {
    let threshold_value = parseFloat(threshold.value)

    predictionResultContainer.innerHTML = ""
    conclusionContainer.innerHTML = ""

    let final_note = document.createElement('p')
    final_note.innerText = 'Anda terdeteksi keracunan :'
    let passing_threshold = false

    for (conclusion in diseases_list) {
      let p = document.createElement('p')
      p.className = 'ml-7 persentase-disease'
      let disease_name = document.createTextNode(`${conclusion}`)
      let disease_percentage = (diseases_list[conclusion]).at(-1)["total percentage"] * 100
      p.appendChild(disease_name)
      p.appendChild(document.createTextNode(` : ${disease_percentage} %`))
      predictionResultContainer.appendChild(p)

      if (disease_percentage >= threshold_value) {
        passing_threshold = true
        p.classList.add('text-red-500')
        let pConclusion = document.createElement('p')
        pConclusion.className = 'text-red-500'
        let conclusion_name = document.createTextNode(`${conclusion}`)
        pConclusion.appendChild(conclusion_name)
        conclusionContainer.appendChild(pConclusion)
      }

      if (passing_threshold) {
        conclusionContainer.insertAdjacentElement('afterbegin', final_note)
      }

    }
    console.table(indication)
    console.table(diseases_list)

  } else {
    alert("Threshold is empty")
    predictionResultContainer.innerHTML = ""
    conclusionContainer.innerHTML = ""
    for (conclusion in diseases_list) {
      let p = document.createElement('p')
      p.className = 'ml-7 persentase-disease'
      let disease_name = document.createTextNode(`${conclusion}`)
      let disease_percentage = (diseases_list[conclusion]).at(-1)["total percentage"] * 100
      p.appendChild(disease_name)
      p.appendChild(document.createTextNode(` : ${disease_percentage} %`))
      predictionResultContainer.appendChild(p)
    }

    console.table(indication)
    console.table(diseases_list)

  }
})




























const selectTag = document.querySelectorAll("select");
const translateButton = document.querySelector("button");
const textarea = document.querySelector(".from-text");
const textTo = document.querySelector(".to-text");
const exchangeIcon = document.querySelector(".exchange");
const icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
  for (const country_code in countries) {
    let selected;
    if (id == 0 && country_code === "en-GB") {
      selected = "selected";
    } else if (id == 1 && country_code === "hi-IN") {
      selected = "selected";
    }
    let option = `<option value="${country_code}" ${selected}> ${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});
translateButton.addEventListener("click", () => {
  const text = textarea.value;
  const translateFrom = selectTag[0].value;
  const translateTo = selectTag[1].value;
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      textTo.value = data.responseData.translatedText;
    });
});
exchangeIcon.addEventListener("click", () => {
  let tempText = textarea.value;
  tempLang = selectTag[0].value;
  textarea.value = textTo.value;
  selectTag[0].value = selectTag[1].value;
  textTo.value = tempText;
  selectTag[1].value = tempLang;
});
icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (target.classList.contains("fa-copy")) {
      // Copy functionality
      if (target.id === "from") {
        navigator.clipboard.writeText(textarea.value);
      } else {
        navigator.clipboard.writeText(textTo.value);
      }
    } else {
      // Speech functionality
      let utterance;
      if (target.id == "from") {
        utterance = new SpeechSynthesisUtterance(textarea.value);
        utterance.lang = selectTag[0].value;
        console.log("form side");
      } else {
        utterance = new SpeechSynthesisUtterance(textTo.value); // Corrected the variable name here
        utterance.lang = selectTag[1].value;
        console.log("to side");
      }
      speechSynthesis.speak(utterance);
    }
  });
});

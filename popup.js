/// Called to create slide button.
function create_slide_button(root, id, description) {
  chrome.storage.local.get(id, function (data) {
    let button_description = document.createElement("div");
    button_description.className = "button-description";

    let description_h3 = document.createElement("h3");
    description_h3.innerHTML = description;
    button_description.appendChild(description_h3);
    root.appendChild(button_description);

    let slide_button_div = document.createElement("div");
    slide_button_div.className = "slide-button";

    let switch_label = document.createElement("label");
    switch_label.className = "switch";

    let check_box = document.createElement("input");
    check_box.type = "checkbox";
    check_box.id = id;
    if (data[id] == true) {
      check_box.checked = true;
    }
  
    // FIXME: Really dirty work. I have not make clear how does
    // chrome storage work.
    check_box.addEventListener("change", function (event) {
      if (this.id == "auto_play") {
        chrome.storage.local.set({ auto_play: this.checked });
      } else if (this.id == "auto_answer") {
        chrome.storage.local.set({ auto_answer: this.checked });
      } else if (this.id == "no_voice") {
        chrome.storage.local.set({ no_voice: this.checked });
      }
    });

    let slider_span = document.createElement("span");
    slider_span.className = "slider";

    switch_label.appendChild(check_box);
    switch_label.appendChild(slider_span);

    slide_button_div.appendChild(switch_label);

    root.appendChild(slide_button_div);
  });
}

/// Called to construct popup page.
function construct_popup() {
  let page = document.getElementById("page");
  create_slide_button(page, "auto_play", "自动连播");
  create_slide_button(page, "no_voice", "自动静音");
  create_slide_button(page, "auto_answer", "自动答题");
}

construct_popup();
/// Auto start playing video.
function detect_starting_label() {
  let start_button = document.getElementsByClassName("vjs-big-play-button");

  if (start_button.length == 1) {
    start_button[0].click();
  }
}

/// Global variable that makes sure jumping button is clicked only once.
let NextVideoHasClicked = false;
/// Jump to next video.
function jump_to_next_video() {
  let parent_dom = parent.document;

  let ncells = parent_dom.getElementsByClassName("ncells");

  for (ncell_index = 0; ncell_index < ncells.length; ncell_index++) {
    let current_cell = ncells[ncell_index].getElementsByClassName("currents");
    if (current_cell.length != 0 && ncell_index != ncells.length - 1) {
      let next_link = ncells[ncell_index + 1].getElementsByTagName("a")[0];
      if (NextVideoHasClicked == false) {
        next_link.click();
        // Run exactly once.
        NextVideoHasClicked = true;
      }
    }
  }
}

/// Detect finishing label and jump to next video.
function detect_finishing_label() {
  let finished_flag = document.getElementsByClassName("ans-job-finished");
  if (finished_flag.length != 0) {
    chrome.storage.local.get("auto_play", function (data) {
      if (data.auto_play == true) {
        jump_to_next_video();
      }
    });
  }
}

/// Check finishing flag per 3 seconds.
setInterval(detect_finishing_label, 3000);

/// Check start playing button per 3 seconds.
setInterval(detect_starting_label, 3000);

/// Block mouseout event detection
/// See https://stackoverflow.com/questions/35070496/can-i-remove-event-listeners-with-a-chrome-extension.
document.addEventListener("mouseout", function (event) {
  event.stopPropagation();
}, true);

/// Check <div class="ans-videoquiz" /> which contains quiz.
function auto_answer() {
  chrome.storage.local.get("auto_answer", function (data) {
    if (data.auto_answer == true) {
      document.addEventListener("DOMSubtreeModified", function (event) {
        let quiz_div = document.getElementsByClassName("ans-videoquiz");
        if (quiz_div.length == 0) {
          return;
        }

        let quiz = quiz_div[0];
        let option_ul = quiz.getElementsByClassName("ans-videoquiz-opts")[0];
        let option_list = option_ul.getElementsByTagName("li");

        // Iterate over options.
        for (let option_index = 0; option_index < option_list.length; option_index++) {
          let option = option_list[option_index];
          let input = option.getElementsByTagName("input");

          // If this option is true, then we select it.
          if (input[0].value == "true") {
            input[0].checked = "checked";
          }
        }

        // Find submit button and submit.
        let submit = quiz.getElementsByClassName("ans-videoquiz-submit")[0];
        submit.click();
      });
    }
  });
}

/// Start automatically answer quiz.
auto_answer();
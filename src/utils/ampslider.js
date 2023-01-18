function getColor(colorVal) {
  if (colorVal < 88) {
    myRed = 255;
    myGreen = parseInt(colorVal * 1.136 * 255 / 100);
  } else {
    myRed = parseInt((175 - colorVal) * 1.136 * 255 / 100);
    myGreen = 255;
  }
  return "rgb(" + myRed + "," + myGreen + ",0)";
}

function refreshSlider(ui) {
  var ampSlider = ui.value;
  var myColor = getColor(ampSlider);
  $("#ampSlider")
    .find(".ui-slider-range")
    .css("background-color", myColor);
  $("#ampSlider .ui-state-default, .ui-widget-content .ui-state-default").css(
    "background-color",
    myColor
  );
  $("#ampValue").val(ampSlider);
  ztAmp = parseInt(ampSlider);
  updateLink();
  calculateTrapSetup();
}

$(function() {
  var sliderOptions = {
    range: "min",
    min: 0,
    max: 175,
    step: 1,
    slide: function(event, ui) {
      if (event.originalEvent) {
        refreshSlider(ui);
      } else {
        var myColor = getColor(100);
        $("#ampSlider")
          .find(".ui-slider-range")
          .css("background-color", myColor);
        $(
          "#ampSlider .ui-state-default, .ui-widget-content .ui-state-default"
        ).css("background-color", myColor);
        $("#ampValue").val(100);
      }
    },
    change: function(event, ui) {
      if (event.originalEvent) {
        refreshSlider(ui);
      } else {
        var myColor = getColor(100);
        $("#ampSlider")
          .find(".ui-slider-range")
          .css("background-color", myColor);
        $(
          "#ampSlider .ui-state-default, .ui-widget-content .ui-state-default"
        ).css("background-color", myColor);
        $("#ampValue").val(100);
      }
    }
  };
  $("#ampSlider").slider(sliderOptions);
  $(".ui-widget-header").css("background", "initial");
});

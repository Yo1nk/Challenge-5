var displayCurrentDay = document.querySelector("#currentDay");
var currentDay = moment();
displayCurrentDay.textContent = currentDay.format("dddd, MMMM Do YYYY")
var timeBlock = $(".time-block").addClass("row");
var blockText = $("<p>").addClass("description");
timeBlock.append(blockText);
var currentHour = parseInt(moment().format("H"));

var loadEvents = function (timeSlots) {

    timeSlots.forEach((element) => {
        let text = localStorage.getItem(parseInt(element.time));
        if (text) {
          element.text.val(text);
        }
      });
    };

    var fetchEvent = function () {
        var tempArr = [];
        $("textarea").each(function (index, elem) {
          tempArr.push({
            time: $(elem).attr("id"),
            text: $(elem),
          });
        });
        loadEvents(tempArr);
      };

      $("textarea").each(function () {
        var $this = $(this);
        var id = parseInt($this.attr("id"));
      
        if (id < currentHour) {
          $(this).addClass("past");
        }
        if (id > currentHour) {
          $(this).addClass("future");
        }
        if (id === currentHour) {
          $(this).addClass("present");
        }
      });

      $("button.saveBtn").click(function (event, loadEvents) {
        event.preventDefault();
        var $element = $(this).siblings("textarea");
        var time = $element.attr("id");
        var text = $element.val().trim();
        if (time && text !== "") {
            localStorage.setItem(time, text);
          }
        });

        $(".saveBtn").hover(function () {
            $(this).addClass("saveBtn:hover");
          });
          
          fetchEvent();
//set var to work with to display save msg when user presses save button
let showSaveMsg = document.querySelector("#save-msg");

//on load trigger . when document loads, fetches current month and day
//$ means jquery - shorter way to get data from page than using JS 
$(document).ready(function(){
    $("#currentDay").text(moment().format("dddd, MMMM Do"));  //id currentDay from html page stores current day value
    function updateHour(){
        let currentHour = moment().hours();  //gets current hours from moment which is date/time in JS
        $(".time-block").each(function(){  //loop through id attributes 
             let blockHour = Number($(this).attr("id"));  //get id attribute for each timeblock element - convert to Number from default string data type
             if(blockHour < currentHour){  //this means current timeblock in the past, so add the css class "past" to this timeblock
                 $(this).addClass("past"); 
                 $(this).removeClass("present");
                 $(this).removeClass("future");
             }
             else if(blockHour === currentHour){  //this means current timeblock in the present, so add the css class "present" to this timeblock
                 $(this).addClass("present"); 
                 $(this).removeClass("past");
                 $(this).removeClass("future");
             }
             else {  //this means current timeblock in the future, so add the css class "future" to this timeblock
                 $(this).addClass("future"); 
                 $(this).removeClass("past");
                 $(this).removeClass("present");
             }
 
        }) 
 
     }
     updateHour();
     setInterval(updateHour,60000);  //timer function in JS.  SetInterval here will call function updateHour every 60000 milliseconds which is one minute
 
     //loop through local storage to put data in timeblocks that was already saved
     //9 means 9am and 17 means 5pm, # in jquery is short for ID also in css the same 
     //description below is the class associated with each textarea so this is like doing getElementsByClass
     for(let i = 9; i<=17;i++){
         $("#"+i+" .description").val(localStorage.getItem(i));
     }
     //based on the save button clicked, get the data in its sibling text area (which has class description)
     $(".saveBtn").on("click",function(){
         let text = $(this).siblings(".description").val();
         let hour = $(this).parent().attr("id");  //go to parent attr ID which contains the hour value ie. 9, 10, 11, 12, 13 etc. it's like a hard-coded value that means something.
         localStorage.setItem(hour,text);  //this is unique because hour (id) is unique so each hour/id has its own desc associated with it in local storage
        //when local storage added, show message on html page to let user know. Remove hide on that element so it will be displayed.  
        showSaveMsg.classList.remove("hide");  
        //now want to add hide back to this display element after 2 seconds
        //https://alvarotrigo.com/blog/wait-1-second-javascript/
        setTimeout(function(){
            showSaveMsg.classList.add("hide");
        }, 2000);

    })
       
 }
 )
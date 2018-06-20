'use strict'

// TODO implement the presentation logic

$("form").submit(function(event) {
  event.preventDefault();
  var $input = $(this).find("input");
  var text = $input.val();
  console.log(text);
  logic.addTask(text);
  $("#input").val("");

  listTodos();
});

function listTodos() {
  var $listTodo = $("#todo > ul");
 
  $listTodo.empty();

  var taskTodo = logic.listTodos();
  var $buttonDone = "<button class='btnDone'>✔</button>";

  for (var i = 0; i < taskTodo.length; i++) {
    $listTodo.append(
      "<li>" + taskTodo[i].text + $buttonDone + "</li>"
    );

    $(".btnDone").click(function(){
        listTodos();

    });
  }


}




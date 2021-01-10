var trigger="";

$(".roomc").click(function (){
  $(trigger).addClass("hid");
  $(".create").removeClass("hid");
  trigger=".create";

})
$(".roomj").click(function (){
  $(trigger).addClass("hid");
  $(".join").removeClass("hid");
  trigger=".join";
})

function checkLength(el) {
  if (el.value.length != 6) {
    $(".warn1").removeClass("hid");
  }
  else{
    $(".warn1").addClass("hid");
  }
};

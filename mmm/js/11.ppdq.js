var titleId;

$.get("http://193.112.55.79:9090/api/getbrandtitle", function (ret) {
  // console.log(ret);

  // template(模板的id,要渲染的数据)
  var html = template("list_main", {
    arr: ret.result
  });
  // console.log(html);
  // 渲染
  $(".main").html(html);


  $(".list").on("click", function () {
    // console.log($(this).children('*:nth-child(2)').css("display"));

    if($(this).children('*:nth-child(2)').css("display")=="block"){
      $(this).children('*:nth-child(2)').hide();
      return;
    }

    titleId = $(this).children('*:nth-child(1)').data("id");
    // console.log($(this).children('*:nth-child(2)'));
    
    $(this).children('*:nth-child(2)').show()//
    $(this).siblings().children('*:nth-child(2)').hide();

    // var this1 = $(this);

    $.get("http://193.112.55.79:9090/api/getbrand", {
      "brandtitleid": titleId
    }, function (ret) {
      // console.log(ret);

      // template(模板的id,要渲染的数据)
      var html = template("list_all", {
        arr: ret.result
      });
      // console.log(html);
      // 渲染
      $(".list_main").html(html);

      // var li = $(this1).children().eq(1).children().children().eq();
      // console.log($(li));
      // for (let i = 0; i < li.length; i++) {
      //   $(".num").text(i);
        
      // }
      


    })
  })
})


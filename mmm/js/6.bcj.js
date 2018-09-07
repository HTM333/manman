$.get("http://193.112.55.79:9090/api/getbaicaijiaproduct", {
  "titleid": 0
}, function (ret) {
  console.log(ret);

  // template(模板的id,要渲染的数据)
  var html = template("listTemplate1", {
    arr: ret.result
  });
  // console.log(html);
  // 渲染
  $(".list").html(html);

})

$.get("http://193.112.55.79:9090/api/getbaicaijiatitle",function (ret) {
      // console.log(ret.result[0].category);

      // template(模板的id,要渲染的数据)
      var html = template("main_title_list", {
        arr: ret.result
      });
      // 渲染
      $(".main_title ul").html(html);
      
      $(".main_title_a").on("click",function () {

        $('.list').children().hide();

          var id = $(this).data("id");
          // console.log(id);

          $.get("http://193.112.55.79:9090/api/getbaicaijiaproduct", {
          "titleid": id
        }, function (ret) {
          // console.log(ret);

          // template(模板的id,要渲染的数据)
          var html = template("listTemplate2", {
            arr: ret.result
          });
          // console.log(html);
          // 渲染
          $(".list").html(html);

        })
      })
  })

  function goTop(acceleration, time) {
    acceleration = acceleration || 0.1;
    time = time || 16;
    var x1 = 0;
    var y1 = 0;
    var x2 = 0;
    var y2 = 0;
    var x3 = 0;
    var y3 = 0;
    if (document.documentElement) {
    x1 = document.documentElement.scrollLeft || 0;
    y1 = document.documentElement.scrollTop || 0;
    }
    if (document.body) {
    x2 = document.body.scrollLeft || 0;
    y2 = document.body.scrollTop || 0;
    }
    var x3 = window.scrollX || 0;
    var y3 = window.scrollY || 0;
    // 滚动条到页面顶部的水平距离
    var x = Math.max(x1, Math.max(x2, x3));
    // 滚动条到页面顶部的垂直距离
    var y = Math.max(y1, Math.max(y2, y3));
    // 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
    var speed = 1 + acceleration;
    window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));
    // 如果距离不为零, 继续调用迭代本函数
    if (x > 0 || y > 0) {
    var invokeFunction = "goTop(" + acceleration + ", " + time + ")";
    window.setTimeout(invokeFunction, time);
    }
    }
    $(".upTop").on("click", function() {
        //$("body").scrollTop(0);
        //window.scrollTo(0,0);
        goTop();
    });
function GetRequest() {
  var url = location.search; //获取url中"?"符后的字串  
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

var id = GetRequest().id;
console.log(id);

//分类ID
var flId;

$.get("http://193.112.55.79:9090/api/getproduct", {
  "productid": id
}, function (ret) {
  // console.log(ret.result[0].category);

  // template(模板的id,要渲染的数据)
  // var html = template("list_all", {
  //   arr: ret.result
  // });
  // // console.log(html);
  // // 渲染
  // $(".list_main").html(html);
  var text = ret.result[0].productName;
  // console.log(text);
  $(".render2").text(text);

  flId = ret.result[0].categoryId;

  $.get("http://193.112.55.79:9090/api/getcategorybyid", {
    "categoryid": flId
  }, function (ret) {
    // console.log(ret.result[0].category);

    // template(模板的id,要渲染的数据)
    // var html = template("list_all", {
    //   arr: ret.result
    // });
    // // console.log(html);
    // // 渲染
    // $(".list_main").html(html);
    var text = ret.result[0].category;
    // console.log(text);
    $(".render1").text(text);


  })


})

$.get("http://193.112.55.79:9090/api/getproduct", {
    "productid": id
  }, function (ret) {
    // console.log(ret.result[0].category);

    // template(模板的id,要渲染的数据)
    var html = template("main_dataTemplate", {
      arr: ret.result
    });
    // console.log(html);
    // 渲染
    $(".main_data").html(html);

  })

  $.get("http://193.112.55.79:9090/api/getproductcom", {
    "productid": id
  }, function (ret) {
    // console.log(ret.result[0].category);

    // template(模板的id,要渲染的数据)
    var html = template("text_listTemplate", {
      arr: ret.result
    });
    // console.log(html);
    // 渲染
    $(".main_pj_text").html(html);
  })


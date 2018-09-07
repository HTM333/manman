$(function(){
    // var myScroll = new IScroll('.buyIng');
    $(".gn_content").on("click",".con_buy" ,function (){
        $(".buyIng").css({display: "block" });
    }) 
    $(".gn_content").on("click",".con_btn",function(){
        $(".buyIng").css({display: "none" });
    })
    function GetRequest() {  
        //获取url中"?"符后的字串  
            var url = location.search;
           var theRequest = new Object();  
           if (url.indexOf("?") != -1) {  
              var str = url.substr(1);  
              strs = str.split("&");  
              for(var i = 0; i < strs.length; i ++) {  
                 theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  
              }  
           }  
           return theRequest;  
    } 
    
    var  id = GetRequest().id;
    
    console.log(id);
    $.get("http://193.112.55.79:9090/api/getmoneyctrlproduct",{"productid":id},function (ret) {
      console.log(ret);
        console.log(ret)
    var html=template("comm",{arr:ret.result});
      // console.log(html);
      // 渲染
      $(".gn_content").html(html);
    })
})
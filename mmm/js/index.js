
$(function(){
        // 轮播图
        var mySwiper = new Swiper('.swiper-container', {
            autoplay: {
                delay: 2000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
            },
            loop: true,
    
        })  
        // 转换rem单位
        setFz();
        window.onresize = function () {
            setFz();
        }
        function setFz() {
    
            var screenWidth = document.querySelector("html").offsetWidth;
            // 基础值
            var baseVal = 100;
            // 设计稿的宽度
            var pageWidth = 640;
            // 字体大小
            var fz = baseVal * screenWidth / pageWidth;
    
            document.querySelector("html").style.fontSize = fz + "px";
    
        }
        // 返回顶部
        var top = document.querySelector(".footer_top");
        top.onclick = function () {
            window.scroll(0, 0);
        }
        
        // 获取数据渲染页面
        $.get("http://193.112.55.79:9090/api/getmoneyctrl",function (ret) {
            // console.log(ret);
      
            // template(模板的id,要渲染的数据)
            var html=template("lis",{arr:ret.result});
            // console.log(html);
            // 渲染
            $(".discountLis ul").html(html);
      
            // evnetList();
          })

          $.get("http://193.112.55.79:9090/api/getindexmenu",function (ret) {
            // console.log(ret);
      
            // template(模板的id,要渲染的数据)
            var html=template("navlis",{arr:ret.result});
            // console.log(html);
            // 渲染
            $("nav").html(html);
      
            // evnetList();
          })
        
          $("nav").on("click","nav>a:nth-child(8)",function(){
                var bag = $("nav>a:nth-child(9)").css("display")
              $("nav>a:nth-child(8)").attr("href","javascript:;");
              
              if(bag == "none"){
                $("nav>a:nth-last-child(-n+4)").show(1000);
              }else{
                $("nav>a:nth-last-child(-n+4)").css("display","none")
              }
          })
             
  
        
    
})
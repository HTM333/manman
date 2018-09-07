function itcast(selector) {
  // 获取dom元素
  var dom = document.querySelector(selector);
  return {
    tap: function (cb) {
      // 给dom元素绑定 tap点击事件  tap 由两个事件组成 touchstart touchend
      // 按下的时间
      var startTime;
      // 按下的坐标
      var startX, startY;

      // 按下
      dom.addEventListener("touchstart", function (e) {
        // 1 判断屏幕上的手指的个数
        if (e.touches.length > 1) {
          return;
        }
        // 2 记录按下的时间 返回 1970 1 1 到现在 时间戳 毫秒!!!
        startTime = Date.now();
        // 3 记录坐标
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      })
      // 离开
      dom.addEventListener("touchend", function (e) {
        // 1 判断离开的手指的个数
        if (e.changedTouches.length > 1) {
          return;
        }
        // 2 记录离开的时间
        var endTime = Date.now();
        if (endTime - startTime > 300) {
          return;
        }

        // 3 记录离开的坐标
        var endX = e.changedTouches[0].clientX;
        var endY = e.changedTouches[0].clientY;
        // 距离不分正负 都需要用绝对值 Math.abs()
        if (Math.abs(endX - startX) > 5 || Math.abs(endY - startY) > 5) {
          return;
        }

        // 证明 tap的手势是满足要求了  触发自己的tap 逻辑
        // console.log("tap:自己封装 ");

        cb(e);
      })
      // obj
      return this;
    },
    swipe: function (cb) {

      // 开始坐标 开始的时间
      var startTime, startX, startY;

      // 按下
      dom.addEventListener("touchstart", function (e) {
        // 1 判断手指的个数
        if (e.touches.length > 1) {
          return;
        }

        // 2 记录按下的时间
        startTime = Date.now();

        // 3 按下的坐标
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      })

      // 离开
      dom.addEventListener("touchend", function (e) {
        // 1 判断手指的个数
        if (e.changedTouches.length > 1) {
          return;
        }

        // 2 计算按下的时间 800ms
        var endTime = Date.now();

        if (endTime - startTime > 800) {
          return;
        }

        // 3 获取离开的坐标
        var endX = e.changedTouches[0].clientX;
        var endY = e.changedTouches[0].clientY;


        // 滑动的方向
        var direction;
        // 判断滑动的距离和方向

        // 先判断水平 再判断垂直的距离和方向
        if (Math.abs(endX - startX) > 5) {
          // 再计算方向
          direction = endX > startX ? "right" : "left";

        } else if (Math.abs(endY - startY) > 5) {
          // 再计算方向 
          direction = endY > startY ? "down" : "up";
        } else {
          // 既没有在水平上滑动也没有在垂直上滑动 直接返回  不满足滑动的条件!!! 
          return;
        }

        // 可以成功触发滑动事件!!1
        // console.log(direction);
        cb(direction);
      })

      return this;
    }
  }
}
function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf('?') != -1) {
		var str = url.substr(1);
		strs = str.split('&');
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
		}
	}
	return theRequest;
}

var id = GetRequest().id;
// console.log(id);

$.get('http://193.112.55.79:9090/api/getcategorybyid', { categoryid: id }, function(ret) {
	// console.log(ret.result[0].category);

	// template(模板的id,要渲染的数据)
	// var html = template("list_all", {
	//   arr: ret.result
	// });
	// // console.log(html);
	// // 渲染
	// $(".list_main").html(html);
	var text = ret.result[0].category;
	console.log(text);
	$('.render').text(text);
});

var num = 1;
var num2 = 1;
$.get('http://193.112.55.79:9090/api/getproductlist', { categoryid: id }, function(ret) {
	// console.log(ret.result[0].category);
	//  console.log(ret);
	num = ret.totalCount;
	num2 = ret.pagesize;
	console.log(num, num2);
	// template(模板的id,要渲染的数据)
	var html = template('listTemplate', {
		arr: ret.result,
	});
	// console.log(html);
	// 渲染
	$('.list').html(html);
	fenye(num, num2);
});
function ajax(pageid2) {
  console.log(id,pageid2)
	$.get(
		'http://193.112.55.79:9090/api/getproductlist',
		{
			categoryid: id,
			pageid:pageid2,
		},
		function(ret) {
			// console.log(ret.result[0].category);
			//  console.log(ret);

			//  console.log(num,num2);
			// template(模板的id,要渲染的数据)
			var html = template('listTemplate', {
				arr: ret.result,
			});
		
			// 渲染
			$('.list').html(html);
      // console.log(html);
		}
	);
}
function fenye(num, num2) {
	window.pagObj = $('#pagination')
		.twbsPagination({
			totalPages: num/10,
			visiblePages: num2,
			onPageClick: function(event, page) {
				// console.info(page + ' (from options)');
			},
		})
		.on('page', function(event, page) {
			// console.info(page + ' (from options)');
			var aaa = page;
		
			ajax(aaa);
		});
}

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
		var invokeFunction = 'goTop(' + acceleration + ', ' + time + ')';
		window.setTimeout(invokeFunction, time);
	}
}
$('.upTop').on('click', function() {
	//$("body").scrollTop(0);
	//window.scrollTo(0,0);
	goTop();
});

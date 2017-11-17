
	// 限制输入范围		inputarea --- 输入选择器
	// 					a --- 整数长度
	// 					b --- 小数长度
	function limitRange(inputarea, a, b){
		var inputNum = [];
		inputarea.attr('ovalue', 0);
		inputarea.on("keyup", function(e){
			var that = $(this),
				nowInput = that.val(),
				oldValue = that.attr('ovalue');
			var frontNum,
				backNum;

			inputNum = nowInput.split('');

			// 判断首次输入是否违法 ？ 返回0
			if(isNaN(parseFloat(nowInput))){
				// 只有一位数 并进行 退格操作时
				if(oldValue.toString().length <= 1 && e.keyCode === 8){
					that.attr('ovalue', 0);
					that.val(0);
				}else{
					that.val(oldValue);
				}
			}else{
				if(inputNum.indexOf('.') > 0){	// 已有小数
					if(e.key !== '.'){
						frontNum = inputNum.slice(0, that.val().indexOf('.'));
						backNum = inputNum.slice(that.val().indexOf('.') + 1) || [0];

						// 限定输入的长度
						if(frontNum.length <= a && backNum.length <= b){
							that.attr('ovalue', parseFloat(inputNum.join('')));
							that.val(parseFloat(inputNum.join('')));

						}else{
							that.val(that.attr('ovalue'));
						}
					}else{
						that.val("");
						that.val(inputNum.join(''));
					}
				}else{		// 没有小数
					that.attr('ovalue', parseFloat(inputNum.join('')));
					if(inputNum.indexOf('0') === 0){
						// 安卓中 . 的keycode为190  不进行此操作，android下小数点可能会在光标后面
						if(e.keyCode !== 190){
							that.val(parseFloat(inputNum.join('')));
						}
					}
				}
			}
		});
	}
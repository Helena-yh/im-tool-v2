;
(function (RCS) {
	//sdk初始化
	var sdkInit = function (params, callbacks) {
		var appKey = params.appKey;
		var token = params.token;
		RongIMLib.RongIMClient.init(appKey);

		var instance = RongIMClient.getInstance();

		// 连接状态监听器
		RongIMClient.setConnectionStatusListener({
			onChanged: function (status) {
				console.log(status);
				var connectDom = $('.rcs-connect-status')[0];
				if (connectDom) {
					connectDom.style.display = 'block';
				}
				switch (status) {
					case RongIMLib.ConnectionStatus.CONNECTED:
						if (connectDom) {
							connectDom.style.display = 'none';
						}
						callbacks.getInstance && callbacks.getInstance(instance);
						break;
					case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
						console.log('网络不可用');
						reconnect();
						break;
					case RongIMLib.ConnectionStatus.DISCONNECTED:
						console.log('断开连接');
						break;
					default:
						console.log('未知错误');
						break;
				}
			}
		});

		RongIMClient.setOnReceiveMessageListener({
			// 接收到的消息
			onReceived: function (message) {
				// 判断消息类型
				console.log("新消息: " + message.targetId);
				if (message.offLineMessage) {
					return;
				}
				console.log(message);
				updateMessage(message);
			}
		});

		//开始链接
		RongIMClient.connect(token, {
			onSuccess: function (userId) {
				console.log("链接成功，用户id：" + userId);
				registerMessage();
				if (role == 'admin') {
					getCustomInfo()
				}
			},
			onTokenIncorrect: function () {
				console.log('token无效');
			},
			onError: function (errorCode) {
				console.log("=============================================");
				console.log(errorCode);
			}
		});
	}

	//im组件初始化
	var init = function (config) {
		RCS.config = config;
		config.isIM = true;
		userId = config.userId;
		role = config.role;
		role == 'custom' ? targetId = 'admin-' + userId : targetId = userId.substring(6, userId.length);
		var callbacks = {
			getInstance: function () {
				emoji.init();
			}
		}
		sdkInit(config, callbacks);
	}

	//断线重连
	var reconnect = function () {
		var callback = {
			onSuccess: function (userId) {
				console.log('reconnect success. ' + userId);
			},
			onTokenIncorrect: function () {
				console.log('token 无效');
			},
			onError: function (errorCode) {
				console.log(errorCode);
			}
		};
		RongIMClient.reconnect(callback);
	}

	//对外暴露
	RCS.init = init;
})(RCS);
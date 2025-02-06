// 初始化 Telegram Web App
var tg = window.Telegram.WebApp;

// 初始化 Mini App
tg.ready();

// 获取用户信息
var user = tg.initDataUnsafe.user;

// 显示用户信息
if (user) {
  var userName = "".concat(user.first_name, " ").concat(user.last_name);
  var userId = user.id;
  console.log("Hello, ".concat(userName, " (ID: ").concat(userId, ")"));
} else {
  console.log("User data is not available.");
}

// 绑定按钮点击事件
var mainButton = tg.MainButton;
mainButton.setText("Click Me!");
mainButton.show();

mainButton.onClick(function () {
  tg.showPopup({
    title: "Button Clicked",
    message: "You clicked the main button!",
    buttons: [
      { id: "close", type: "close" },
    ],
  });
});

// 关闭 Mini App 的逻辑
var closeButton = document.getElementById("close-button");
if (closeButton) {
  closeButton.addEventListener("click", function () {
    tg.close();
  });
}
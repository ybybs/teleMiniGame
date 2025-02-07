// 初始化 Telegram Web App
const tg = window.Telegram.WebApp;

// 初始化 Mini App
tg.ready();

// 获取用户信息
const user = tg.initDataUnsafe.user;

// 显示用户信息
if (user) {
  const userName = `${user.first_name} ${user.last_name}`;
  const userId = user.id;
  console.log(`Hello, ${userName} (ID: ${userId})`);
} else {
  console.log("User data is not available.");
}

// 绑定主按钮点击事件
const mainButton = tg.MainButton;
mainButton.setText("Click Me!");
mainButton.show();

mainButton.onClick(() => {
  tg.showPopup({
    title: "Button Clicked",
    message: "You clicked the main button!",
    buttons: [
      { id: "close", type: "close" },
    ],
  });
});

// 关闭 Mini App 的逻辑
const closeButton = document.getElementById("close-button");
if (closeButton) {
  closeButton.addEventListener("click", () => {
    tg.close();
  });
}
var invoiceLink = "";
function GetPostInvoice() {
    // 请求的 URL
const url = 'https://ybybs.github.io/teleMiniGame/create-invoice';

// 请求的数据
const data = {
  name: 'John Doe',
  job: 'Developer'
};

// 创建 XMLHttpRequest 对象
const xhr = new XMLHttpRequest();

// 初始化请求
xhr.open('POST', url, true);

// 设置请求头
xhr.setRequestHeader('Content-Type', 'application/json');

// 处理响应
xhr.onload = function () {
  if (xhr.status >= 200 && xhr.status < 300) {
    // 请求成功
    const response = JSON.parse(xhr.responseText);
    console.log('Success:', response);
    invoiceLink = response.invoiceLink;
    tg.showAlert("Payment successful! Thank you for your purchase."+response);
    tg.openInvoice(invoiceLink, function (status) {
        console.log("Payment successful!");
        tg.showAlert("Payment successful! Thank you for your purchase.");
    });
  } else {
    // 请求失败
    console.error('Error:', xhr.statusText);
    tg.showAlert("Payment Error! "+ xhr.statusText);

  }
};

// 处理网络错误
xhr.onerror = function () {
  console.error('Network error');
};

// 发送请求
xhr.send(JSON.stringify(data));
}
// 支付测试逻辑
const paymentButton = document.getElementById("payment-button");
if (paymentButton) {
  paymentButton.addEventListener("click", () => {
    // tg.showAlert("Payment ");

    // 创建支付发票
    // const invoice = {
    //   title: "Premium Subscription", // 商品标题
    //   description: "Get access to premium features for 1 month.", // 商品描述
    //   currency: "XTR", // 货币类型
    //   prices: [
    //     { label: "1 Month", amount: "5" } // 价格（以最小单位表示，例如 500 = $5.00）
    //   ],
    //   payload: { // 自定义数据，支付成功后返回
    //     userId: tg.initDataUnsafe.user?.id || "unknown"
    //   }
    // };
    GetPostInvoice();
    // 打开支付界面
    // tg.openInvoice(invoice, function (status) {
    //   if (status === "paid") {
    //     console.log("Payment successful!");
    //     tg.showAlert("Payment successful! Thank you for your purchase.");
    //   } else {
    //     console.log("Payment failed or was cancelled.");
    //     tg.showAlert("Payment failed or was cancelled.");
    //   }
    // });
  });
}
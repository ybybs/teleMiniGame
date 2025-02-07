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
    const data = {
        title: "Premium Plan",
        description: "Upgrade to access premium features",
        currency: "XTR",
        prices: [
          { amount: 24, label: "Premium Subscription" }
        ]
      };

      fetch('http://localhost:12000/create-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        invoiceLink = response.invoiceLink;
    tg.showAlert("Payment successful! Thank you for your purchase."+response);
    tg.openInvoice(invoiceLink, function (status) {
        console.log("Payment successful!");
        tg.showAlert("Payment successful! Thank you for your purchase.");
    });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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

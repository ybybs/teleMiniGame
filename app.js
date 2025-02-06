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

// 支付测试逻辑
const paymentButton = document.getElementById("payment-button");
if (paymentButton) {
  paymentButton.addEventListener("click", () => {
    // 创建支付发票
    const invoice = botApi.createInvoiceLink(
        "Title", //title
        "Some description", //description
        "{}", //payload
        "", // For Telegram Stars payment this should be empty
        "XTR", //currency
        [{ amount: 1, label: "Diamond" }], //prices
      );

    // 打开支付界面
    tg.openInvoice(invoice, function (status) {
      if (status === "paid") {
        console.log("Payment successful!");
        tg.showAlert("Payment successful! Thank you for your purchase.");
      } else {
        console.log("Payment failed or was cancelled.");
        tg.showAlert("Payment failed or was cancelled.");
      }
    });
  });
}
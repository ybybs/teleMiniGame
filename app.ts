// 初始化 Telegram Web App
const tg = (window as any).Telegram.WebApp;

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

// 绑定按钮点击事件
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

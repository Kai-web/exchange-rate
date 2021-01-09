window.onload = function () {
    // 获取下拉框和输入框节点
    const currencyEl_one = document.getElementById("currency-ony");
    const amountEl_one = document.getElementById("amount-one");
    const currencyEl_two = document.getElementById("currency-two");
    const amountEl_two = document.getElementById("amount-two");

    // 获取按钮节点
    const swap = document.getElementById("swap");
    const rateEl = document.getElementById("rate");

    // 通过fetch获取汇率并实现dom节点更新
    function calculate() {
        // 获取下拉框中的值
        const currency_one = currencyEl_one.value;
        const currency_two = currencyEl_two.value;

        fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[currency_two]
            
            // 设置对应的汇率值
            rateEl.innerText = `1${currency_one} = ${rate}${currency_two}`;
            // 更新下方换算值
            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
        })
    }
    calculate();

    // 事件监听
    currencyEl_one.addEventListener("change", calculate);
    amountEl_one.addEventListener("input", calculate);
    currencyEl_two.addEventListener("change", calculate);
    amountEl_two.addEventListener("input", calculate);

    // 点击交换按钮交换值
    swap.addEventListener("click", () => {
        const temp = currencyEl_one.value;
        currencyEl_one.value = currencyEl_two.value;
        currencyEl_two.value = temp;
        calculate();
    })
}

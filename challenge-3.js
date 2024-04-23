function getWheelSpinner(wheel) {
    var totalWeight = wheel.reduce(function (sum, wedge) { return sum + wedge.weight; }, 0);
    return function () {
        var random = Math.random() * totalWeight;
        var sum = 0;
        for (var _i = 0, wheel_1 = wheel; _i < wheel_1.length; _i++) {
            var wedge = wheel_1[_i];
            sum += wedge.weight;
            if (sum >= random) {
                return wedge.reward;
            }
        }
    };
}
var wheel = [
    { weight: 100, reward: "Small prize" },
    { weight: 50, reward: "Medium prize" },
    { weight: 20, reward: "Big prize" },
    { weight: 1, reward: "Huge prize" }
];
var spinWheel = getWheelSpinner(wheel);
console.log(spinWheel());
console.log(spinWheel());
console.log(spinWheel());
console.log(spinWheel());
console.log(spinWheel());
console.log(spinWheel());
console.log(spinWheel());
console.log(spinWheel());

type Reward = unknown;
type Wedge = {
    weight: number;
    reward: Reward;
};
type Wheel = Wedge[];

function getWheelSpinner(wheel: Wheel): () => Reward {
    const totalWeight = wheel.reduce((sum, wedge) => sum + wedge.weight, 0);

    return function(): Reward {
        let random = Math.random() * totalWeight;
        let sum = 0;

        for (const wedge of wheel) {
            sum += wedge.weight;
            if (sum >= random) {
                return wedge.reward;
            }
        }
    };
}

const wheel: Wheel = [
    { weight: 100, reward: "Small prize" },
    { weight: 50, reward: "Medium prize" },
    { weight: 20, reward: "Big prize" },
    { weight: 1, reward: "Huge prize" }
];

const spinWheel = getWheelSpinner(wheel);

console.log(spinWheel());
console.log(spinWheel());
console.log(spinWheel());
console.log(spinWheel());
console.log(spinWheel());
console.log(spinWheel());
console.log(spinWheel());
console.log(spinWheel());

import "./style.css";

let N: number = 0,
    K: number = 0;

function stirlingS2Calculator(n: number, k: number): [string[], number] {
    const listOfComputations: string[] = [];

    function stirlingS2(n: number, k: number): number {
        if (n === k || k === 1) {
            return 1;
        }
        if (k === 0 || k > n) {
            return 0;
        }

        const answer = k * stirlingS2(n - 1, k) + stirlingS2(n - 1, k - 1);
        listOfComputations.push(`$$S(${n},${k}) = ${k} * S(${n - 1}, ${k}) + S(${n - 1}, ${k - 1}) = ${answer}$$`);
        return answer;
    }

    const finalAnswer = stirlingS2(n, k);

    return [listOfComputations, finalAnswer];
}

type InputElement = HTMLInputElement | null;

const n = document.getElementById("n-number") as InputElement;
const k = document.getElementById("k-number") as InputElement;

n?.addEventListener("input", (e) => {
    const value = (e.target as InputElement)?.value;

    if (!value) return;

    N = parseInt(value);
});

k?.addEventListener("input", (e) => {
    const value = (e.target as InputElement)?.value;

    if (!value) return;

    K = parseInt(value);
});

const button = document.getElementById("compute");

button?.addEventListener("click", () => {
    const [list, _] = stirlingS2Calculator(N, K);
    const resultElement = document.getElementById("result");

    if (resultElement) resultElement.textContent = "";

    for (const item of list.reverse()) {
        const ol = document.createElement("ol");
        ol.textContent = item;

        resultElement?.appendChild(ol);

        //@ts-ignore
        MathJax.typesetPromise();
    }
});

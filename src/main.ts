import "./style.css";

let N: number = 0,
    K: number = 0;

type InputElement = HTMLInputElement | null;
type Computation = { k: number; n: number; expression: string };

function stirlingS2Calculator(n: number, k: number): [Computation[], number] {
    const listOfComputations: Computation[] = [];

    function stirlingS2(n: number, k: number): number {
        if (n === k || k === 1) {
            return 1;
        }
        if (k === 0 || k > n) {
            return 0;
        }

        const answer = k * stirlingS2(n - 1, k) + stirlingS2(n - 1, k - 1);
        listOfComputations.push({ k, n, expression: `$$S(${n},${k}) = ${k} * S(${n - 1}, ${k}) + S(${n - 1}, ${k - 1}) = ${answer}$$` });
        return answer;
    }

    const finalAnswer = stirlingS2(n, k);

    return [listOfComputations, finalAnswer];
}

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

    for (let q = 0; q < list.length; q++) {
        for (let e = 0; e < list.length; e++) {
            if (list[q] != list[e] && list[q].k === list[e].k && list[q].n === list[e].n) {
                list.splice(q, 1);
            }
        }
    }

    for (let q = 0; q < list.length; q++) {
        for (let e = 0; e < list.length; e++) {
            if (list[q] != list[e] && list[q].k === list[e].k && list[q].n === list[e].n) {
                list.splice(q, 1);
            }
        }
    }

    for (let q = 0; q < list.length; q++) {
        for (let e = 0; e < list.length; e++) {
            if (list[q].n > list[e].n) {
                const tmp = list[e];
                list[e] = list[q];
                list[q] = tmp;
            }
        }
    }

    for (const item of list) {
        const ol = document.createElement("ol");
        ol.textContent = item.expression;

        resultElement?.appendChild(ol);

        //@ts-ignore
        MathJax.typesetPromise();
    }
});

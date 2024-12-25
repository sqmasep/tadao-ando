export function wrapLines(linesArray: HTMLElement[] | null) {
  const lines = [] as HTMLElement[];

  linesArray?.forEach(line => {
    const text = line.textContent;
    const lineInner = document.createElement("div");
    lineInner.classList.add("line__inner");
    line.textContent = "";
    line.appendChild(lineInner);
    lineInner.innerHTML = text!;
    lines.push(lineInner);
  });

  return lines;
}

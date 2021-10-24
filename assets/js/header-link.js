window.addEventListener("resize", handleHeader);
/** adjust link position if header is larger */
function handleHeader() {
  let headerHeight = document.getElementsByTagName("header")[0].offsetHeight;
  let originArray = document.getElementsByClassName("adjust-origin");
  if (headerHeight > 100) {
    for (let origin of originArray) {
      if (!origin.getAttribute("href").includes("-destination")) {
        origin.setAttribute("href", `${origin.getAttribute("href")}-destination`);
      }
    }
  } else {
    for (let origin of originArray) {
      if (origin.getAttribute("href").includes("-destination")) {
        let sliceEnd = origin.getAttribute("href").indexOf("-destination");
        origin.setAttribute("href", `${origin.getAttribute("href").slice(0, sliceEnd)}`);
      }
    }
  }
}
handleHeader();
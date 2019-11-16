export default function debounce(a, b, c) {
  var d, e;
  return function () {
    function h() {
      d = null;
      c || (e = a.apply(f, g));
    }
    var f = this, g = arguments;
    return (clearTimeout(d), d = setTimeout(h, b), c && !d && (e = a.apply(f, g)), e)
  }
}

export function removeHTMLTags(str) {
  // return (str.replace(/<[^>]*>?/gm, '')).substring(0, 30);
  if (str ===null || str === "") return null;
  else str = str.toString();
  return str.replace(/(<([^>]+)>)/gi, "").substring(0,30);
};



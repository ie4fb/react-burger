export default function fixUiKitInput(input, styleAdditional) {
  if (input.current) {
    input.current.closest('.input').style.width = '100%';
    input.current.closest('.input__container').style.width = '100%';
    if (styleAdditional) {
      input.current.closest('.input__container').classList.add(styleAdditional);
    }
  }
}

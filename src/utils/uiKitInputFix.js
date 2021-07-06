export default function fixUiKitInput(input) {
    input.current.closest('.input').style.width = '100%';
    input.current.closest('.input__container').style.width = '100%';
    input.current.closest('.input__container').classList.add('mt-6');
}
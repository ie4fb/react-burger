interface FixProps {
  input: any
  // input: {
  //   current: {
  //     closest: (arg0: string) => {
  //       style: { width: string };
  //       classList: { add: (arg0: string) => void };
  //     };
  //   };
  // };
  styleAdditional: string;
}

export default function fixUiKitInput({ input, styleAdditional }: FixProps) {
  if (input && input.current) {
    input.current.closest('.input').style.width = '100%';
    input.current.closest('.input__container').style.width = '100%';
    if (styleAdditional) {
      input.current
        .closest('.input__container')
        ?.classList.add(styleAdditional);
    }
  }
}

export function InputErrorMessage({ show = false, text = '' }) {
  if(!show) {
    return null;
  }
  return <p className="text-red-400 text-sm pt-1.5">{text}</p>;
}

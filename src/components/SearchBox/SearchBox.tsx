import type { DebouncedState } from "use-debounce";
import css from "./SearchBox.module.css";

type SearchBoxProps = {
  onChange: DebouncedState<
    (event: React.ChangeEvent<HTMLInputElement>) => void
  >;
};
export default function SearchBox({ onChange }: SearchBoxProps) {
  return (
    <input
      onChange={onChange}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}

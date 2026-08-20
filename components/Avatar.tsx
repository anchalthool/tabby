import { getPersonIcon } from "@/utils/getPersonIcon";

type AvatarProps = {
  name: string;
  large?: boolean;
};

export default function Avatar({
  name,
  large = false,
}: AvatarProps) {
  return (
    <span
      className={`avatar${large ? " big" : ""}`}
      aria-hidden="true"
    >
      <img
        src={getPersonIcon(name)}
        alt=""
        className="avatar-glyph"
      />
    </span>
  );
}
import type { ReceiptItem } from "@/lib/types";
import { getFoodIcon } from "@/utils/getFoodIcon";

type FoodIconProps = {
  item: ReceiptItem;
  large?: boolean;
};

export default function FoodIcon({
  item,
  large = false,
}: FoodIconProps) {
  return (
    <div
      className={`food-badge${large ? " large" : ""}`}
      aria-hidden="true"
    >
      <img
        src={getFoodIcon(item.name)}
        alt=""
        className="badge-glyph"
      />
    </div>
  );
}
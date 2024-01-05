import { FC } from "react";
import { library, IconName, IconPrefix, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

export type IconType = "solid" | "regular" | "brand";

export const iconTypeMap: { [key in IconType]: IconPrefix } = {
  solid: "fas",
  regular: "far",
  brand: "fab",
};

library.add(fab, fas, far);

export const getIconNames = (keys: string[]) => keys
  .map((k) => k
    .replace(/^fa/, "")
    .replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase())
  .sort((a, b) => a.localeCompare(b));

export const FarIconNames = getIconNames(Object.keys(far));
export const FasIconNames = getIconNames(Object.keys(fas));
export const FabIconNames = getIconNames(Object.keys(fab));

export interface IconCoreProps extends Omit<FontAwesomeIconProps, "icon" | "spin"> {
  name: IconName,
  type?: IconType,
  className?: string,
  spin?: boolean,
  size?: SizeProp,
}

const Icon: FC<IconCoreProps> = ({
  name,
  className,
  spin,
  size,
  type = "regular",
  ...fontAwesomeProps
}) => {
  const prefix = iconTypeMap[type];

  return (
    <FontAwesomeIcon
      icon={[prefix, name]}
      className={className}
      spin={spin}
      size={size}
      {...fontAwesomeProps}
    />
  );
};

export default Icon;

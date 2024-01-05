import IconCore, { IconCoreProps, IconType } from "./IconCore";
import { match, P } from "ts-pattern";

import classNames from "classnames";
import { FC } from "react";
import { IconName } from "@fortawesome/fontawesome-common-types";

export type { IconName } from "@fortawesome/fontawesome-common-types";
export type { IconCoreProps, IconType } from "./IconCore";

const mapIcon = (icon: IconCoreProps | IconName, initialClassName?: string) => match(icon)
  .with({ name: P.string }, (i) => ({
    ...i,
    className: classNames(initialClassName, i.className),
  }))
  .otherwise((i) => ({ name: i, type: "regular" as IconType, className: initialClassName }));

export interface IconProps extends Omit<IconCoreProps, "name"> {
  /** defaults to regular */
  icon?: IconCoreProps | IconName,
  className?: string,
}

/**
 * Full list of icons can be found here <a href="https://fontawesome.com/search?o=r&m=free/" target="_blank">fontawesome</a>
 */
const Icon: FC<IconProps> = ({
  icon,
  className,
  ...coreProps
}) => icon
  ? <IconCore {...mapIcon(icon, className)} {...coreProps} />
  : null;

export default Icon;

import type { Meta, StoryObj } from "@storybook/react";
import Icon from ".";
import { FarIconNames } from "./IconCore";

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: "Atoms/Icon",
  argTypes: {
    icon: {
      control: { type: "select" },
      options: FarIconNames,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    icon: "face-smile",
  },
};

export const Animated: Story = {
  args: {
    icon: "cog",
    spin: true,
    type: "solid",
  },
};

export const SolidIcons: Story = {
  args: {
    icon: "football",
    type: "solid",
  },
  render: ({ icon }) => <Icon icon={icon} type="solid" />,
};

export const BrandIcons: Story = {
  args: {
    icon: "github",
    type: "brand",
    size: "2x",
  },
};

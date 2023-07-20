import clsx from "clsx"
import Image, { ImageProps } from "next/image"

interface AvatarProps extends Omit<ImageProps, "width" | "height"> {
  size?: "small" | "large"
}

export default function Avatar({
  size = "small",
  alt = "",
  className,
  ...props
}: AvatarProps) {
  const imageSize = size === "small" ? 40 : 76

  return (
    <Image
      alt={alt}
      width={imageSize}
      height={imageSize}
      {...props}
      className={clsx(
        "rounded-full bg-gradient-light-vertical p-[2px]",
        {
          "h-[40px] w-[40px]": size === "small",
          "h-[76px] w-[76px]": size === "large",
        },
        className,
      )}
    />
  )
}

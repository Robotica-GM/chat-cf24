import { Text, TextProps } from "react-native";

import { cn } from "@/lib/cn";

export interface ThemedTextProps extends TextProps {
  variant?: "title" | "body" | "subtitle";
  fontWeight?: "bold" | "semibold" | "regular" | "thin";
}

export function ThemedText({
  children,
  className,
  variant = "body",
  fontWeight = "regular",
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      className={cn(
        "font-normal text-gray-400",
        variant === "title" && "text-4xl font-bold uppercase",
        variant === "body" && "font-bold",
        variant === "subtitle" && "text-2xl font-semibold",
        fontWeight === "bold" && "font-bold",
        fontWeight === "semibold" && "font-semibold",
        fontWeight === "regular" && "font-normal",
        fontWeight === "thin" && "font-thin",
        className,
      )}
      {...rest}
    >
      {children}
    </Text>
  );
}

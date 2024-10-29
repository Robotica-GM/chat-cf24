import clsx from "clsx";
import { ReactNode } from "react";
import {
  TextInput,
  View,
  TextInputProps,
  Platform,
  ViewProps,
} from "react-native";

import { colors } from "@/styles/colors";

type Variants = "primary" | "secondary" | "tertiary";

type InputProps = ViewProps & {
  children: ReactNode;
  variant?: Variants;
};

function Input({
  children,
  variant = "primary",
  className,
  ...rest
}: InputProps) {
  return (
    <View
      className={clsx(
        "min-h-13 max-h-13 flex-row items-center gap-2",
        {
          "h-14 px-4 rounded-lg border border-gray-400": variant !== "primary",
        },
        { "bg-sky-900": variant === "secondary" },
        { "bg-black": variant === "tertiary" },
        className,
      )}
      {...rest}
    >
      {children}
    </View>
  );
}

function Field({ ...rest }: TextInputProps) {
  return (
    <TextInput
      className="flex-1 text-gray-100 font-regular"
      placeholderTextColor={colors.gray[400]}
      cursorColor={colors.gray[100]}
      selectionColor={Platform.OS === "ios" ? colors.gray[100] : undefined}
      style={{ color:"#fff" }}
      {...rest}
    />
  );
}

Input.Field = Field;

export { Input };

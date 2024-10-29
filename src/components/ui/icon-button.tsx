import { TouchableOpacity, TouchableOpacityProps } from "react-native";

export function IconButton({ children, ...rest }: TouchableOpacityProps) {
  return <TouchableOpacity {...rest}>{children}</TouchableOpacity>;
}

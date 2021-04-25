import React from "react";
import { TouchableOpacityProps, TouchableOpacity } from "react-native";

interface SectionProps extends TouchableOpacityProps {
  children?: React.ReactNode;
}

const Section: React.FC<SectionProps> = props => {
  return <TouchableOpacity activeOpacity={0.65} {...props} />;
};

export default React.memo(Section);

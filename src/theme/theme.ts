import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { colors } from "./colors";
import { textStyles } from "./text";

const config = defineConfig({
  theme: {
    
    tokens: {
      fonts: {
        heading: { value: `SF Pro Display', sans-serif` },
        body: { value: `SF Pro Display', sans-serif` },
      },
      colors,
      shadows: {
        /* blue: { value: "0 0 30px 0 rgba(1, 141, 248, 0.3)" },
        green: { value: "0 0 20px 0 rgba(91, 215, 103, 0.3)" },
        blueIndicator: { value: "0 0 30px 0 rgba(1, 141, 248, 0.3)" },
        purpleIndicator: { value: "0 0 30px 0 rgba(1, 141, 248, 0.3)" },
        greenIndicator: { value: "0 0 4px 0 rgba(77, 239, 93, 0.4)" },*/
      },
    },
    textStyles,
  },
});

export const system = createSystem(defaultConfig, config);

import { SafeAreaView, StyleSheet } from "react-native";
import { SketchCanvasWithInteractionAndCustomization } from "./src/canvas/canvas-with-interactivity-and-customizability";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SketchCanvasWithInteractionAndCustomization />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

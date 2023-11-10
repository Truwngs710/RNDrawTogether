import React, { Children, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PRIMARY_COLOR, windowHeight, windowWidth } from "../constant/constant";
import {
  Canvas,
  Circle,
  PaintStyle,
  Path,
  SkCanvas,
  SkPath,
  Skia,
  SkiaView,
  useDrawCallback,
  useTouchHandler,
} from "@shopify/react-native-skia";
import { Ipath } from "../constant/interface";

const paint = () => {
  const paint = Skia.Paint();
  paint.setStyle(PaintStyle.Stroke);
  paint.setStrokeWidth(2);
  paint.setColor(Skia.Color("#fff"));
  return paint;
};

const HomeScreen: React.FC = () => {
  const canvasRef = useRef<SkCanvas | null>(null);
  const currentPath = useRef<SkPath | null>(null);
  const [paths, setPaths] = useState<Ipath[]>([]);

  const onTouch = useTouchHandler({
    onStart: ({ x, y }) => {
      currentPath.current = Skia.Path.Make();
      currentPath.current.moveTo(x, y);
    },
    onActive: ({ x, y }) => {
      currentPath.current?.lineTo(x, y);
      canvasRef.current?.drawPath(currentPath.current!, paint());
    },
    onEnd: () => {
      setPaths((values) =>
        values.concat({
          path: currentPath.current!,
          paint: paint(),
        })
      );
      currentPath.current = null;
    },
  });

  const onDraw = useDrawCallback((canvas, info) => {
    onTouch(info.touches);
    canvasRef.current = canvas;
  }, []);

  return (
    <>
      <Canvas style={styles.canvas}>
        {Children.toArray(
          paths.map((value) => <Path path={value.path} paint={value.paint} />)
        )}
      </Canvas>
      <SkiaView style={styles.container} onDraw={onDraw}></SkiaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
  },
  canvas: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: PRIMARY_COLOR,
  },
});

export default HomeScreen;

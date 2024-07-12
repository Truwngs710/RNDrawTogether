import {
  Canvas,
  Path,
  SkPath,
  Skia,
  TouchInfo,
  useTouchHandler,
} from '@shopify/react-native-skia';
import React, {useCallback, useState} from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {style} from '../style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {addDataToRealtimeDB} from '../firebase/firebaseConfig';
type PathWithColorAndWidth = {
  path: SkPath;
  color: Color;
  strokeWidth: number;
};

export const SketchCanvasWithInteractionAndCustomization = () => {
  const [paths, setPaths] = useState<PathWithColorAndWidth[]>([]);
  const [color, setColor] = useState<Color>(Colors[0]);

  const [strokeWidth, setStrokeWidth] = useState(strokes[0]);

  const onDrawingStart = useCallback(
    (touchInfo: TouchInfo) => {
      setPaths(currentPaths => {
        const {x, y} = touchInfo;
        const newPath = Skia.Path.Make();
        newPath.moveTo(x, y);
        return [
          ...currentPaths,
          {
            path: newPath,
            color,
            strokeWidth,
          },
        ];
      });
    },
    [color, strokeWidth],
  );

  const onDrawingActive = useCallback((touchInfo: TouchInfo) => {
    setPaths(currentPaths => {
      const {x, y} = touchInfo;
      const currentPath = currentPaths[currentPaths.length - 1];
      const lastPoint = currentPath.path.getLastPt();
      const xMid = (lastPoint.x + x) / 2;
      const yMid = (lastPoint.y + y) / 2;

      currentPath.path.quadTo(lastPoint.x, lastPoint.y, xMid, yMid);
      return [...currentPaths.slice(0, currentPaths.length - 1), currentPath];
    });
  }, []);

  const OnDrawingEnd = useCallback((touchInfo: TouchInfo) => {
    addDataToRealtimeDB('1', paths);
  }, []);

  const touchHandler = useTouchHandler(
    {
      onActive: onDrawingActive,
      onStart: onDrawingStart,
      onEnd: OnDrawingEnd,
    },
    [onDrawingActive, onDrawingStart, OnDrawingEnd],
  );

  return (
    <View style={style.container}>
      <Toolbar
        color={color}
        strokeWidth={strokeWidth}
        setColor={setColor}
        setStrokeWidth={setStrokeWidth}
      />
      <Canvas style={style.canvas} onTouch={touchHandler}>
        {paths.map((path, index) => (
          <Path
            key={index}
            path={path.path}
            color={path.color}
            style={'stroke'}
            strokeWidth={path.strokeWidth}
          />
        ))}
      </Canvas>
      <View style={style.controlPad}>
        <TouchableOpacity
          style={style.returnDraw}
          onPress={() => {
            setPaths((paths && paths.slice(0, -1)) || []);
          }}>
          <Icon name="rotate-left" size={50}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Colors = ['black', 'red', 'blue', 'green', 'yellow', 'white'] as const;

type Color = (typeof Colors)[number];

type ToolbarProps = {
  color: Color;
  strokeWidth: number;
  setColor: (color: Color) => void;
  setStrokeWidth: (strokeWidth: number) => void;
};

const strokes = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];

const Toolbar = ({
  color,
  strokeWidth,
  setColor,
  setStrokeWidth,
}: ToolbarProps) => {
  const [showStrokes, setShowStrokes] = useState(false);

  const handleStrokeWidthChange = (stroke: number) => {
    setStrokeWidth(stroke);
    setShowStrokes(false);
  };

  const handleChangeColor = (color: Color) => {
    setColor(color);
  };

  return (
    <View style={style.toolbarContainer}>
      {showStrokes && (
        <View style={[style.toolbar, style.strokeToolbar]}>
          {strokes.map(stroke => (
            <Pressable
              onPress={() => handleStrokeWidthChange(stroke)}
              key={stroke}>
              <Text style={style.strokeOption}>{stroke}</Text>
            </Pressable>
          ))}
        </View>
      )}
      <View style={[style.toolbar]}>
        <Pressable
          style={style.currentStroke}
          onPress={() => setShowStrokes(!showStrokes)}>
          <Text>{strokeWidth}</Text>
        </Pressable>
        <View style={style.separator} />
        {Colors.map(item => (
          <ColorButton
            isSelected={item === color}
            key={item}
            color={item}
            onPress={() => handleChangeColor(item)}
          />
        ))}
      </View>
    </View>
  );
};

type ColorButtonProps = {
  color: Color;
  isSelected: boolean;
  onPress: () => void;
};

const ColorButton = ({color, onPress, isSelected}: ColorButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        style.colorButton,
        {backgroundColor: color},
        isSelected && {
          borderWidth: 2,
          borderColor: '#5CE1E6',
        },
      ]}
    />
  );
};

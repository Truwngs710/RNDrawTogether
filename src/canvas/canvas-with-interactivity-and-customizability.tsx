import {
  Canvas,
  Path,
  SkPath,
  Skia,
  TouchInfo,
  useTouchHandler,
} from '@shopify/react-native-skia';
import React, {useCallback, useEffect, useState} from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {style} from '../style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  addDataToRealtimeDB,
  getDataFromRealtimeDB,
} from '../firebase/firebaseConfig';
import {Toolbar} from './toolbar';
import {Colors, strokes} from '../constant/constant';

type Color = (typeof Colors)[number];

type PathWithColorAndWidth = {
  path: SkPath;
  color: Color;
  strokeWidth: number;
};

export const SketchCanvasWithInteractionAndCustomization = () => {
  const [paths, setPaths] = useState<PathWithColorAndWidth[]>([]);
  const [color, setColor] = useState<Color>(Colors[0]);
  const [strokeWidth, setStrokeWidth] = useState(strokes[0]);
  const [combinedSvgPath, setCombinedSvgPath] = useState<
    PathWithColorAndWidth[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataFromRealtimeDB('1');
      setCombinedSvgPath(data);
    };

    fetchData();

    return () => {};
  }, []);

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

  const OnDrawingEnd = () => {
    let combinedSvgPathArray = [];
    for (let i = 0; i < paths.length; i++) {
      const svgString = paths[i]?.path?.toSVGString();
      const pathObject = {
        path: svgString,
        color: 'black',
        strokeWidth: 2,
      };
      combinedSvgPathArray.push(pathObject);
      console.log(svgString || 'a');
    }
    console.log('Combined SVG Path Array:', combinedSvgPathArray);
    addDataToRealtimeDB('1', combinedSvgPathArray);
  };

  const handlePressReturn = () => {
    setCombinedSvgPath(prevPaths => prevPaths.slice(0, -1));
  };

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
            color={color}
            style={'stroke'}
            strokeWidth={path.strokeWidth}
          />
        ))}
        {combinedSvgPath.map((path, index) => (
          <Path
            key={combinedSvgPath.length + index}
            path={combinedSvgPath[index].path}
            color={'black'}
            style={'stroke'}
            strokeWidth={2}
          />
        ))}
      </Canvas>
      <View style={style.controlPad}>
        <TouchableOpacity
          style={style.returnDraw}
          onPress={() => {
            handlePressReturn();
          }}></TouchableOpacity>
      </View>
    </View>
  );
};

import {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {style} from './style';
import {strokes} from '../constant/constant';

const Colors = ['black', 'red', 'blue', 'green', 'yellow', 'white'] as const;

type Color = (typeof Colors)[number];

type ToolbarProps = {
  color: Color;
  strokeWidth: number;
  setColor: (color: Color) => void;
  setStrokeWidth: (strokeWidth: number) => void;
};

export const Toolbar = ({
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

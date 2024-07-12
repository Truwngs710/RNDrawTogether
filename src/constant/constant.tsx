import {Dimensions} from 'react-native';

export const PrimaryColor = '#000000';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const Colors = [
  'black',
  'red',
  'blue',
  'green',
  'yellow',
  'white',
] as const;
export const strokes = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];

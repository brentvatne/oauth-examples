import {
  createRouter,
} from '@exponent/ex-navigation';

import HomeScreen from '../screens/HomeScreen';

export default createRouter(() => ({
  home: () => HomeScreen,
}));

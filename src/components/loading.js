import { Dimensions, View } from 'react-native';
import * as Progress from 'react-native-progress'

var {width, height} = Dimensions.get("screen")
export function Loading() {
  return (
    <View style={{width, height}} className="absolute flex-row justify-center items-center">
        <Progress.CircleSnail 
            thickness={5} size={80} color={"rgb(6 182 212)"}
        />
    </View>
  );
}
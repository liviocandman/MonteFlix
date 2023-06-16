import { Dimensions } from 'react-native';
import { ScrollView, Text, View } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';

var {width, height} = Dimensions.get("screen")

export function MovieVideo({data, title}) {
  
  return (
    <View className="mb-3 space-y-4">
        <View className="mx-4 flex-row justify-between items-center">
            <Text className="text-white font-bold text-xl">
                {data.length>0 && title}
            </Text>
        </View>

        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 15}}
        >
            {
                data.map((item, index) => {
                    if(index === 0){
                    return(
                        <View className="justify-center items-center" key={index}>
                            <YoutubeIframe
                                videoId={item.key}
                                height={220}
                                width={width*0.92}
                           />
                        </View>
                    )
                    }
                })
            }
        </ScrollView>

    </View>
  );
}
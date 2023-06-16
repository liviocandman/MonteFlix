import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { image342, image500 } from '../api/moviedb';
import { fallbackImagePost } from '../constants';
import { useNavigation } from '@react-navigation/native';

var {width, height} = Dimensions.get("screen")

export function ListMovies({title,data}) {
    const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
        <View className="mx-4 flex-row justify-between items-center">
            <Text className="text-white font-bold text-xl">
                {data.length>0 && title}
            </Text>
        </View>

        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 15, gap: 6}}
        >
            {
                data.map((item, index) => {
                    return(
                        <TouchableOpacity key={index} onPress={() => navigation.push('Movie', item)}>
                            <Image 
                                source={{uri: image342(item.poster_path) || fallbackImagePost}}
                                style={{width: width*0.3, height: height*0.2}}
                                className="rounded-md"
                            />
                            
                            <Text className="text-neutral-400 text-xs text-center">
                                {
                                        item?.title.length>10? item.title.slice(0,17)+"...": item?.title
                                }
                                </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>

    </View>
  );
}
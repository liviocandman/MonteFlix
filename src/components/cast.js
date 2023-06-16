import { Image, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { image185, image500 } from '../api/moviedb';
import { fallbackImagePerson } from '../constants';

export function Cast({cast, navigation}) {
  return (
    <View className="my-6">
        <Text className="text-white font-semibold text-lg mx-4 mb-3">Elenco</Text>
        
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 15}}
        >
            {
                cast && cast.map((item, index) =>{
                    return(
                        <TouchableOpacity
                            key={index}
                            className="mr-3 items-center"
                            onPress={() => navigation.navigate('Person', item)}
                        >
                            <View className="overflow-hidden rounded-full w-20 h-20 items-center border border-neutral-500">
                                <Image 
                                    source={{uri: image185(item.profile_path) || fallbackImagePerson}}
                                    className="rounded-2xl h-24 w-20"
                                />
                                
                            </View>

                            <Text className="text-white text-xs mt-1">
                                {
                                    item?.character.length>10? item.character.slice(0,10)+"...": item?.character
                                }
                            </Text>
                            <Text className="text-neutral-400 text-xs mt-1">
                                {
                                    item?.original_name.length>10? item.original_name.slice(0,10)+"...": item?.original_name
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
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Text, ScrollView, TextInput, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {debounce} from 'lodash'
import { Loading } from '../components/loading';
import { image500, searchMovies } from '../api/moviedb';
import { fallbackImagePost } from '../constants';

var {width, height} = Dimensions.get("screen");

export function SearchScreen() {
    const navigation = useNavigation();
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    
    const handleSearch = value=>{
        if(value && value.length>2){
            setLoading(true);
            searchMovies({
                query: value,
                include_adult: 'false',
                language: 'pt-BR',
                page: '1'
            }).then(data=>{
                setLoading(false);
                if(data && data.results) setResults(data.results);
            })
        }else{
            setLoading(false);
            setResults([])
        }
    }
    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])
  return (
    <SafeAreaView className='bg-neutral-900 flex-1'>
        <View className="mx-4 my-3 flex-row  items-center justify-between border border-neutral-500 rounded-full">
            <TextInput
                onChangeText={handleTextDebounce} 
                placeholder='Buscar Filme '
                placeholderTextColor={'lightgray'}
                className="pb-1 pl-6 text-base font-semibold text-white w-72"
            />
            <TouchableOpacity className="rounded-full p-2 m-1 bg-cyan-500" onPress={() => navigation.navigate('Home')}>
                <Ionicons name='ios-close' size={25} color={"white"}/>
            </TouchableOpacity>
        </View>

        {/* Results */}
        {
            loading? (
                <Loading />
            ) : 
                results.length>0? (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingHorizontal: 15}}
                        className="space-y-3"
                    >
                        <Text className="text-white font-semibold ml-1">Results ({results.length})</Text>

                        <View className='flex-row justify-between flex-wrap'>
                            {
                                results.map((item, index) => {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => navigation.push("Movie", item)}>
                                            <View className="space-y-2 mb-4">
                                                <Image 
                                                    source={{uri: image500(item.poster_path) || fallbackImagePost}}
                                                    style={{width: width*0.44, height: height*0.3}}
                                                    className="rounded-md"
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                ) : (
                    <View className="flex-row justify-center top-40">
                        <Image 
                            source={{uri: "https://imgtr.ee/images/2023/06/10/KWu01.png"}}
                            style={{width, height: height*0.25}}
                        />
                    </View>
                )
        }

    </SafeAreaView>
  );
}
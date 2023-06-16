import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View, Image, Dimensions, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchPersonDetails, fetchPersonDetailsTranslate, fetchPersonMovies, image342, image500 } from '../api/moviedb';
import { fallbackImagePerson } from '../constants';
import { Loading } from '../components/loading';
import { ListMovies } from '../components/listMovies';

var {width, height} = Dimensions.get("screen");

export function PersonScreen() {
    const {params: item} = useRoute();
    const navigation = useNavigation();

    const [isFavourite, setIsFavourite] = useState([]);
    const [person, setPerson] = useState([]);
    const [personTranslate, setPersonTranslate] = useState([]);
    const [personMovies, setPersonMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
        getPersonDetails(item.id);
        getPersonDetailsTranslate(item.id);
        getPersonMovies(item.id);
    },[])
    
    const getPersonDetails = async id=>{
        const data =await fetchPersonDetails(id);
        if(data) setPerson(data)
        setLoading(false)
    }
    const getPersonDetailsTranslate = async id=>{
        const data =await fetchPersonDetailsTranslate(id);
        if(data) setPersonTranslate(data)
    }
    const getPersonMovies = async id=>{
        const data =await fetchPersonMovies(id);
        if(data && data.cast) setPersonMovies(data.cast)
    }

  return (
    <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{paddingBottom: 20}}>
        <SafeAreaView className="z-20 w-full flex-row justify-between items-center px-4 my-3">
            <TouchableOpacity className="rounded-xl p-1 bg-cyan-500" onPress={()=> navigation.goBack()}>
                <Ionicons name='chevron-back' size={28} color="white"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> setIsFavourite(!isFavourite)}>
                <Ionicons name='heart' size={38} color={!isFavourite? "red" :"white"}/>
            </TouchableOpacity>
        </SafeAreaView>

        {/* Person Details */}
        {loading? (
            <Loading />
        ):(
            <View>
                <View className="flex-row justify-center">
                    <View className="items-center rounded-full overflow-hidden h-64 w-64 border border-neutral-400">
                        <Image 
                            source={{uri: image500(person?.profile_path) || fallbackImagePerson}}
                            style={{width: width*0.65, height: height*0.32}}
                        />
                    </View>
                </View>
            
                <View className="mt-6">
                    <Text className="text-3xl text-white font-bold text-center">{person?.name}</Text>
                    
                    <Text className="text-base text-neutral-500 text-center">{personTranslate?.place_of_birth}</Text>
                </View>

                <View className="mx-3 p-4 mt-6 flex-row items-center bg-neutral-700 rounded-full justify-around space-x-5">
                    <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                        <Text className="text-white font-semibold ">Gênero</Text>
                        <Text className="text-neutral-300 text-sm">
                            {
                                personTranslate?.gender==1? 'Female': 'Male'
                            }
                        </Text>
                    </View>
                    <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                        <Text className="text-white font-semibold">Nascimento</Text>
                        <Text className="text-neutral-300 text-sm">
                            {
                                personTranslate?.birthday
                            }
                        </Text>
                    </View>
                    <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                        <Text className="text-white font-semibold">Conhcido por</Text>
                        <Text className="text-neutral-300 text-sm">
                            {
                                personTranslate?.known_for_department
                            }
                        </Text>
                    </View>
                    <View className="px-2 items-center">
                        <Text className="text-white font-semibold ">Popularidade</Text>
                        <Text className="text-neutral-300 text-sm">
                            {person?.popularity?.toFixed(2)} %
                        </Text>
                    </View>
                </View>
                        
                <View className="my-6 mx-4 space-y-2">
                    <Text className="text-white text-lg font-medium">Biografia</Text>
                    <Text className="text-neutral-400 tracking-wide">
                        {
                            personTranslate?.biography || person?.biography || "N/A"
                        }
                    </Text>
            </View>

            <ListMovies title={"Filmes"} data={personMovies} />

        </View>
        )}
    </ScrollView>
  );
}
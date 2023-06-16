import { useNavigation, useRoute, useCallback } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Text, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { fetchMovieCredits, fetchMovieDetails, fetchMovieVideos, fetchSimilarMovies, image500 } from '../api/moviedb';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ListMovies } from '../components/listMovies';
import { Cast } from '../components/cast';
import { Loading } from '../components/loading';
import { MovieVideo } from '../components/movieVideo';

var {width, height} = Dimensions.get("screen")

export function MovieScreen() {
    const [movie, setMovie] = useState([]);
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [videos, setVideos] = useState([]);
    const [isFavourite, setIsFavourite] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const {params: item} = useRoute();
    const navigation = useNavigation();

    useEffect(()=>{
        setLoading(true)
        getMovieDetails(item.id);
        getSimilarMovies(item.id);
        getMovieCredits(item.id);
        getMovieVideos(item.id);
    },[item])

    const getMovieDetails = async id=>{
        const data = await fetchMovieDetails(id);
        if(data) setMovie(data)
        setLoading(false)
    }
    const getSimilarMovies = async id=>{
        const data = await fetchSimilarMovies(id);
        if(data && data.results) setSimilarMovies(data.results)
    }
    const getMovieCredits = async id=>{
        const data = await fetchMovieCredits(id);
        if(data && data.cast) setCast(data.cast)
    }
    const getMovieVideos = async id=>{
        const data = await fetchMovieVideos(id);
        if(data && data.results) setVideos(data.results)
    }

  return (
    <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{paddingBottom:20}}>
        <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4 mt-3">
            <TouchableOpacity className="rounded-xl p-1 bg-cyan-500 items-center" onPress={()=> navigation.goBack()}>
                <Ionicons name='chevron-back' size={25} color="white"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> setIsFavourite(!isFavourite)}>
                <Ionicons name='heart' size={35} color={!isFavourite? "red" :"white"}/>
            </TouchableOpacity>
        </SafeAreaView>
       
      {
        loading? (
            <Loading />
        ) : (
            <View>
                <Image
                    source={{uri: image500(movie?.poster_path)}}
                    style={{width, height: height*0.6}}
                />
                <LinearGradient 
                    colors={['transparent', "rgba(23,23,23,0.8)", "rgba(23,23,23,1)" ]}
                    start={{x: 0.5, y: 0}}
                    end={{x: 0.5, y: 1}}
                    style={{width: width, height: height*0.4}}
                    className="absolute bottom-0"
                />
            </View>
        )
      }

       {/* Movie Details */}
       <View style={{marginTop: -(height*0.1)}} className='space-y-3'>
            <Text className="text-white text-center text text-3xl font-bold tracking-wider">
                {movie?.title}
            </Text>

           {
            movie?.id?(
                <Text className="text-neutral-400 font-semibold text-base text-center">
                   {movie?.spoken_languages?.map((lang,index) => index===0 && lang.english_name)} • {movie?.release_date?.split('-')[0]} • {movie?.status} • {movie?.runtime} min  
                </Text>
            ):null
           }

            <View className="flex-row justify-center mx-4 ">
               {
                movie?.genres?.map((genre, index) =>{
                    let showDot = index+1 != movie?.genres?.length;
                    return(
                        <Text key={index} className="text-neutral-400 font-semibold text-base text-center">{genre?.name}{showDot?" • ":null}</Text>
                    )
                })
               }
            </View>
            <Text className="text-neutral-400 mx-4 tracking-wide mb-4">
                {
                    movie?.overview
                }
            </Text>
       </View>

       <Cast navigation={navigation} cast={cast}/>
        
        {videos?.length> 0 && <MovieVideo title={"Trailer"} data={videos}/> }     
     
        <ListMovies title={"Filmes semelhantes"} data={similarMovies}/>
    </ScrollView>
  );
}

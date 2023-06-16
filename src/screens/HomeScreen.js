import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Text, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingMovies } from '../components/trendingMovies';
import { fetchPopularMovies, fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';
import { ListMovies } from '../components/listMovies';
import { Loading } from '../components/loading';
import { useNavigation } from '@react-navigation/native';

const ios = Platform.OS == "ios";
export function HomeScreen() {
    const navigation = useNavigation();
    const [trending, setTrending] = useState([])
    const [popular, setPopular] = useState([])
    const [topRated, setTopRated] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true);
        getTrendinMovies();
        getPopularMovies();
        getTopRatedMovies();
        getUpcomingMovies();
    }, [])

    const getTrendinMovies = async () => {
        const data = await fetchTrendingMovies();
        if(data && data.results) setTrending(data.results)
        setLoading(false);
    }
    const getPopularMovies = async () => {
        const data = await fetchPopularMovies();
        if(data && data.results) setPopular(data.results)
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        if(data && data.results) setTopRated(data.results)
    }
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
        if(data && data.results) setUpcoming(data.results)
    }

  return (
    <View className="flex-1 bg-neutral-900">
        <SafeAreaView className={ios? "-mb-2" : "mb-3"}>
            <StatusBar style='light'/>
            <View className="flex-row justify-between items-center mx-4">
                <Text className="text-cyan-500 text-3xl font-bold">
                Monte<Text className="text-red-500">Flix</Text>
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <Ionicons name='search-outline' size={28} color="white"/>
                </TouchableOpacity>
            </View> 
        </SafeAreaView>

        {
            loading? (
                <Loading />
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 10}}
                >
                    <TrendingMovies data={trending}/>

                    <ListMovies title={"Filmes Populares"} data={popular} />

                    <ListMovies title={"Melhores filmes"} data={topRated} />

                    <ListMovies title={"Em Breve"} data={upcoming} />
                </ScrollView>

            )
        }

    </View>
  );
}
import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { image500 } from '../api/moviedb';
import { fallbackImagePost } from '../constants';
import { useNavigation } from '@react-navigation/native';

var {width, height} = Dimensions.get("screen")

export function TrendingMovies({data}) {
    
  return (
    <View className="mb-8">
        <Text className="text-white text-xl mx-4 mb-5 font-bold">Filmes em alta hoje</Text>
        <Carousel
            data={data}
            renderItem={({item})=> <MovieCard item={item} />}
            firstItem={1}
            inactiveSlideOpacity={0.60}
            sliderWidth={width}
            itemWidth={width*0.6}
            itemHeight={height*0.4}
            slideStyle={{display: "flex", alignItems: "center"}}
        />
    </View>
  );
}

const MovieCard = ({item}) => {
    const navigation = useNavigation();
    
    return (
        <TouchableOpacity onPress={()=> navigation.navigate('Movie', item)}>
            <Image 
                source={{uri: image500(item.poster_path) || fallbackImagePost}}
                style={{
                    width: width*0.6,
                    height: height*0.4
                }}
                className="rounded-lg"
            />
        </TouchableOpacity>
    )
}
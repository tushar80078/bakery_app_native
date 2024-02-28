import React, {useState, useRef, useEffect} from 'react';
import {Text, View, Dimensions, StyleSheet, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {BORDERRADIUS, SPACING} from '../../theme/theme';
import C1 from '../../assets/Images/C1.png';
// import { scrollInterpolator, animatedStyles } from './utils/animations';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

const DATA = Array.from({length: 2}, (_, i) => i);

const CarouselComponent = () => {
  const [index, setIndex] = useState(0);
  const carouselRef = useRef(null);

  const renderItem = ({item}) => {
    return <Image source={C1} style={styles.Image} />;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % DATA.length;
      setIndex(nextIndex);
      carouselRef.current?.snapToItem(nextIndex);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [index]);

  return (
    <View style={styles.CarouselContainerHead}>
      <Carousel
        ref={carouselRef}
        data={DATA}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        containerCustomStyle={styles.carouselContainer}
        inactiveSlideShift={0}
        onSnapToItem={index => setIndex(index)}
        // scrollInterpolator={scrollInterpolator}
        // slideInterpolatedStyle={animatedStyles}
        useScrollView={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  CarouselContainerHead: {
    marginTop: SPACING.space_28,
  },
  carouselContainer: {
    marginBottom: SPACING.space_15,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: BORDERRADIUS.radius_20,
  },
  Image: {
    width: SPACING.space_36 * 8,
    height: SPACING.space_36 * 4,
    borderRadius: BORDERRADIUS.radius_20,
    objectFit: 'contain',
  },
});

export default CarouselComponent;

// Rating.js
import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, 
    faStarHalfAlt,
 } from '@fortawesome/free-solid-svg-icons';
 import { faStar as faStarRegular  } from '@fortawesome/free-regular-svg-icons';

function Rating({ value, text, color }) {
    const stars = [1, 2, 3, 4, 5].map((starValue) => (
        <View key={starValue} style={{ marginRight: 5 }}>
            <FontAwesomeIcon
                icon={
                    value >= starValue
                        ? faStar
                        : value >= starValue - 0.5
                        ? faStarHalfAlt
                        : faStarRegular 
                }
                color={color}
                size={15}
                style={{ marginRight: 2 }}
            />
        </View>
    ));

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {stars}
            {text && <Text>{text}</Text>}
        </View>
    );
}

export default Rating;

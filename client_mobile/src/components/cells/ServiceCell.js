import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Theme from '../../configuration/Theme';
import { useNavigation } from '@react-navigation/native';

const ServiceCell = ({ image, item, ...props }) => {
    const navigation = useNavigation();

    const handleCellClick = (screenName) => {
        navigation.navigate(screenName)
      };

    return (
        <TouchableOpacity style={styles.card} onPress={() => handleCellClick(item.screen)}>
          <Image source={item.source} style={item.style}/>
          <Text style={styles.name}>{(`Cells.${item.name}.title`)}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '48%',
    margin: 4,
    height: 177,
    backgroundColor: Theme.palette.color4,
    borderRadius: 8,
    paddingLeft: 15,
  },
  name: {
    marginTop: 10,
    color: Theme.palette.color1,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ServiceCell;
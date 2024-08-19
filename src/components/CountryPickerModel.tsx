import React from 'react';
import {
  View,
  Text,
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  Modal,
  GestureResponderEvent,
} from 'react-native';
import CountryFlag from 'react-native-country-flag'; 

// Define the type for a country
type Country = {
  name: string;
  code: string;
  dialCode: string;
};

// Sample countries data
const countries: Country[] = [
  {name: 'مصر', code: 'EG', dialCode: '+20'},
  {name: 'تركيا', code: 'TR', dialCode: '+90'},
  {name: 'الهند', code: 'IN', dialCode: '+91'},
  {name: 'الباكستان', code: 'PK', dialCode: '+92'},
  {name: 'بنغلاديش', code: 'BD', dialCode: '+880'},
  {name: 'الفلبين', code: 'PH', dialCode: '+63'},
  {name: 'الامارات', code: 'AE', dialCode: '+971'},
  {name: 'الصين', code: 'CN', dialCode: '+86'},
  {name: 'اندنوسيا', code: 'ID', dialCode: '+62'},
  {name: 'السودان', code: 'SD', dialCode: '+249'}, // Al-Sudan added here

];

// Define the props for the CountryPickerModal component
type CountryPickerModalProps = {
  show: boolean;
  onClose: (event: GestureResponderEvent) => void;
  onSelect: (country: Country) => void;
};

const CountryPickerModal: React.FC<CountryPickerModalProps> = ({show, onClose, onSelect}) => {
  const handleSelect = (item: Country) => {
    onSelect(item);
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={show}
      onRequestClose={onClose}
      animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <FlatList
            data={countries}
            keyExtractor={item => item.code}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleSelect(item)}>
                <Text style={styles.dialCode}>{item.dialCode}</Text>
                <View className="flex flex-row gap-2 items-center">
                  <Text style={styles.countryName}>{item.name}</Text>
                  <CountryFlag isoCode={item.code} size={20} />
                </View>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>غلق</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  label: {
    color: '#000',
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  countryName: {
    color: '#000',
    fontSize: 18,
  },
  dialCode: {
    color: '#000',
    fontSize: 18,
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
});

export default CountryPickerModal;

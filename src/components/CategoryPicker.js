import React, { useState } from 'react';
import { View, Text, Platform, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ChevronDown } from 'lucide-react-native';

export function CategoryPicker({ selectedCategory, onCategoryChange, enabled = true, categories = [] }) {
    const [modalVisible, setModalVisible] = useState(false);

    // Default categories if none provided
    const items = categories.length > 0 ? categories : [
        "Ders Çalışma",
        "Kodlama",
        "Proje",
        "Kitap Okuma",
        "Spor",
        "Diğer"
    ];

    if (Platform.OS === 'ios') {
        return (
            <>
                <TouchableOpacity
                    style={styles.iosButton}
                    onPress={() => enabled && setModalVisible(true)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.iosButtonText}>{selectedCategory}</Text>
                    <ChevronDown size={20} color="#b2bec3" />
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <TouchableOpacity
                                    onPress={() => setModalVisible(false)}
                                    style={styles.doneButton}
                                >
                                    <Text style={styles.doneButtonText}>Tamam</Text>
                                </TouchableOpacity>
                            </View>
                            <Picker
                                selectedValue={selectedCategory}
                                onValueChange={(itemValue) => onCategoryChange(itemValue)}
                                style={styles.iosPicker}
                                itemStyle={{ fontSize: 20, color: '#2d3436', height: 215 }}
                            >
                                {items.map((item) => (
                                    <Picker.Item key={item} label={item} value={item} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </Modal>
            </>
        );
    }

    return (
        <View style={styles.pickerWrapper}>
            <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => onCategoryChange(itemValue)}
                enabled={enabled}
                style={styles.picker}
            >
                {items.map((item) => (
                    <Picker.Item key={item} label={item} value={item} />
                ))}
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    pickerWrapper: {
        borderWidth: 0,
        borderRadius: 20,
        backgroundColor: '#f1f2f6',
        overflow: 'hidden',
        height: 60,
        justifyContent: 'center'
    },
    picker: {
        height: 60,
        color: '#2d3436'
    },
    iosButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f1f2f6',
        height: 60,
        borderRadius: 20,
        paddingHorizontal: 15,
    },
    iosButtonText: {
        fontSize: 16,
        color: '#2d3436'
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 20
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f2f6'
    },
    doneButton: {
        padding: 5
    },
    doneButtonText: {
        color: '#e84393',
        fontSize: 18,
        fontWeight: '600'
    },
    iosPicker: {
        height: 215,
        width: '100%'
    }
});

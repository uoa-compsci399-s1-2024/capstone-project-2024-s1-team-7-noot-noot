// app/components/Dropdown.js
import React from 'react';
import { StyleSheet } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

export default function Dropdown({ selectedValue, onValueChange }) {
  const options = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

  return (
    <ModalDropdown 
      options={options}
      defaultValue={selectedValue}
      onSelect={(index, value) => onValueChange(value.toLowerCase())}
      adjustFrame={style => {
        style.height = options.length * 40; // or any other height you want
        return style;
      }}
      dropdownTextStyle={styles.dropdownText}
      dropdownTextHighlightStyle={styles.dropdownTextHighlight}
    />
  );
}

const styles = StyleSheet.create({
  dropdownText: {
    color: 'black',
  },
  dropdownTextHighlight: {
    color: 'blue',
  },
});
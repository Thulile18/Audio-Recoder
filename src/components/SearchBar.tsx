import { TextInput, StyleSheet } from 'react-native';
import { colors, spacing, fontSizes, sizes } from '../constants/theme';
import { texts } from '../constants/texts';

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <TextInput
      style={styles.searchBox}
      placeholder={texts.searchPlaceholder}
      value={value}
      onChangeText={onChange}
    />
  );
}

const styles = StyleSheet.create({
  searchBox: {
    backgroundColor: colors.card,
    borderRadius: sizes.radius,
    padding: spacing.medium,
    fontSize: fontSizes.medium,
    marginBottom: spacing.medium,
  },
});

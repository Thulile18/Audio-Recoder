import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { colors, spacing, fontSizes, sizes } from '../constants/theme';
import { texts } from '../constants/texts';

type Props = {
  visible: boolean;
  name: string;
  onChangeName: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

export default function RenameModal({
  visible,
  name,
  onChangeName,
  onSave,
  onCancel,
}: Props) {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>{texts.renameTitle}</Text>
          <TextInput
            style={styles.modalInput}
            value={name}
            onChangeText={onChangeName}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={styles.modalCancel}>{texts.cancel}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSave}>
              <Text style={styles.modalSave}>{texts.save}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.overlay,
  },
  modalBox: {
    width: sizes.modalWidth,
    backgroundColor: colors.card,
    borderRadius: sizes.radius,
    padding: spacing.large,
  },
  modalTitle: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: spacing.medium,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: sizes.radius,
    padding: spacing.medium,
    fontSize: fontSizes.medium,
    marginBottom: spacing.medium,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalCancel: {
    color: colors.textLight,
    fontSize: fontSizes.medium,
    marginRight: spacing.large,
  },
  modalSave: {
    color: colors.primary,
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
  },
});

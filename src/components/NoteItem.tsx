import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { VoiceNote } from '../types/voiceNote';
import { colors, spacing, fontSizes, sizes } from '../constants/theme';
import { texts } from '../constants/texts';
import { formatTime } from '../utils/formatTime';

type Props = {
  note: VoiceNote;
  isSelected: boolean;
  onSelect: () => void;
  onRename: () => void;
  onDelete: () => void;
};

export default function NoteItem({
  note,
  isSelected,
  onSelect,
  onRename,
  onDelete,
}: Props) {
  const rowStyle = [styles.noteRow];
  if (isSelected) {
    rowStyle.push(styles.noteRowSelected);
  }

  return (
    <TouchableOpacity style={rowStyle} onPress={onSelect}>
      <View style={styles.noteInfo}>
        <Text style={styles.noteName}>{note.name}</Text>
        <Text style={styles.noteDetails}>
          {new Date(note.createdAt).toLocaleString()}
        </Text>
        <Text style={styles.noteDetails}>{formatTime(note.duration)}</Text>
      </View>
      <View style={styles.noteButtons}>
        <TouchableOpacity onPress={onRename}>
          <Text style={styles.renameText}>{texts.rename}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.deleteText}>{texts.delete}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  noteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: sizes.radius,
    padding: spacing.medium,
    marginBottom: spacing.small,
  },
  noteRowSelected: {
    borderWidth: sizes.borderWidth,
    borderColor: colors.primary,
  },
  noteInfo: {
    flex: 1,
  },
  noteName: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  noteDetails: {
    fontSize: fontSizes.small,
    color: colors.textLight,
  },
  noteButtons: {
    alignItems: 'flex-end',
  },
  renameText: {
    color: colors.primary,
    fontSize: fontSizes.small,
    marginBottom: spacing.small,
  },
  deleteText: {
    color: colors.danger,
    fontSize: fontSizes.small,
  },
});

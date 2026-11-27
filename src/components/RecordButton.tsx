import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, fontSizes, sizes } from '../constants/theme';
import { texts } from '../constants/texts';
import { formatTime } from '../utils/formatTime';

type Props = {
  isRecording: boolean;
  seconds: number;
  onPress: () => void;
};

export default function RecordButton({ isRecording, seconds, onPress }: Props) {
  let buttonColor = colors.primary;
  let buttonText = texts.record;

  if (isRecording) {
    buttonColor = colors.danger;
    buttonText = texts.stop;
  }

  return (
    <View style={styles.recordArea}>
      {isRecording && (
        <Text style={styles.recordingText}>
          {texts.recording} {formatTime(seconds)}
        </Text>
      )}
      <TouchableOpacity
        style={[styles.recordButton, { backgroundColor: buttonColor }]}
        onPress={onPress}
      >
        <Text style={styles.recordButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  recordArea: {
    alignItems: 'center',
    paddingVertical: spacing.medium,
  },
  recordingText: {
    color: colors.danger,
    fontSize: fontSizes.medium,
    marginBottom: spacing.small,
  },
  recordButton: {
    width: sizes.recordButton,
    height: sizes.recordButton,
    borderRadius: sizes.recordButton / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButtonText: {
    color: colors.card,
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
  },
});

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, fontSizes, sizes } from '../constants/theme';
import { texts } from '../constants/texts';
import { formatTime } from '../utils/formatTime';

type Props = {
  title: string;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onChangeSpeed: () => void;
};

export default function PlayerPanel({
  title,
  currentTime,
  duration,
  isPlaying,
  speed,
  onPlay,
  onPause,
  onStop,
  onChangeSpeed,
}: Props) {
  return (
    <View style={styles.playerPanel}>
      <Text style={styles.playerTitle}>{title}</Text>
      <Text style={styles.playerTime}>
        {formatTime(currentTime)} / {formatTime(duration)}
      </Text>
      <View style={styles.playerButtons}>
        {isPlaying ? (
          <TouchableOpacity style={styles.playerButton} onPress={onPause}>
            <Text style={styles.playerButtonText}>{texts.pause}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.playerButton} onPress={onPlay}>
            <Text style={styles.playerButtonText}>{texts.play}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.playerButton} onPress={onStop}>
          <Text style={styles.playerButtonText}>{texts.stop}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.playerButton} onPress={onChangeSpeed}>
          <Text style={styles.playerButtonText}>
            {texts.speed} {speed}x
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  playerPanel: {
    backgroundColor: colors.card,
    borderRadius: sizes.radius,
    padding: spacing.medium,
    marginTop: spacing.small,
    alignItems: 'center',
  },
  playerTitle: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  playerTime: {
    fontSize: fontSizes.large,
    color: colors.textDark,
    marginVertical: spacing.small,
  },
  playerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  playerButton: {
    backgroundColor: colors.primary,
    borderRadius: sizes.radius,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    marginHorizontal: spacing.small,
  },
  playerButtonText: {
    color: colors.card,
    fontSize: fontSizes.small,
    fontWeight: 'bold',
  },
});

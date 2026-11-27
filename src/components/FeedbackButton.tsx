import { Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { colors, spacing, fontSizes } from '../constants/theme';
import { texts } from '../constants/texts';
import { settings } from '../constants/settings';

export default function FeedbackButton() {
  function openEmail() {
    const subject = encodeURIComponent(texts.feedbackSubject);
    Linking.openURL('mailto:' + settings.supportEmail + '?subject=' + subject);
  }

  return (
    <TouchableOpacity onPress={openEmail}>
      <Text style={styles.feedbackText}>{texts.feedback}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  feedbackText: {
    color: colors.primary,
    fontSize: fontSizes.small,
    marginBottom: spacing.medium,
  },
});

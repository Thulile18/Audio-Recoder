import AsyncStorage from '@react-native-async-storage/async-storage';
import { File, Paths } from 'expo-file-system';
import { VoiceNote } from '../types/voiceNote';
import { settings } from '../constants/settings';

export async function loadNotes(): Promise<VoiceNote[]> {
  const savedNotes = await AsyncStorage.getItem(settings.storageKey);
  if (savedNotes === null) {
    return [];
  }
  return JSON.parse(savedNotes);
}

export async function saveNotes(notes: VoiceNote[]): Promise<void> {
  await AsyncStorage.setItem(settings.storageKey, JSON.stringify(notes));
}

export async function copyRecording(
  recordedUri: string,
  fileName: string
): Promise<void> {
  const recordedFile = new File(recordedUri);
  const savedFile = new File(Paths.document, fileName);
  await recordedFile.copy(savedFile);
}

export function getNoteUri(fileName: string): string {
  const file = new File(Paths.document, fileName);
  return file.uri;
}

export function deleteRecording(fileName: string): void {
  try {
    const file = new File(Paths.document, fileName);
    file.delete();
  } catch (error) {
    console.log(error);
  }
}

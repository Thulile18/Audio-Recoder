import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import {
  useAudioRecorder,
  useAudioRecorderState,
  useAudioPlayer,
  useAudioPlayerStatus,
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
} from 'expo-audio';

import { VoiceNote } from '../types/voiceNote';
import { colors, spacing, fontSizes, sizes } from '../constants/theme';
import { texts } from '../constants/texts';
import { settings } from '../constants/settings';
import {
  loadNotes,
  saveNotes,
  copyRecording,
  getNoteUri,
  deleteRecording,
} from '../services/storage';
import SearchBar from '../components/SearchBar';
import NoteItem from '../components/NoteItem';
import PlayerPanel from '../components/PlayerPanel';
import RecordButton from '../components/RecordButton';
import RenameModal from '../components/RenameModal';

export default function HomeScreen() {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);

  const [notes, setNotes] = useState<VoiceNote[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [renameNote, setRenameNote] = useState<VoiceNote | null>(null);
  const [renameText, setRenameText] = useState('');

  const selectedNote = notes.find((note) => note.id === selectedId);

  let selectedUri: string | null = null;
  if (selectedNote) {
    selectedUri = getNoteUri(selectedNote.fileName);
  }

  const player = useAudioPlayer(selectedUri);
  const playerStatus = useAudioPlayerStatus(player);

  useEffect(() => {
    askForPermission();
    loadSavedNotes();
  }, []);

  async function askForPermission() {
    const status = await AudioModule.requestRecordingPermissionsAsync();
    if (!status.granted) {
      Alert.alert(texts.permissionTitle, texts.permissionMessage);
    }
    await setAudioModeAsync({
      playsInSilentMode: true,
      allowsRecording: true,
    });
  }

  async function loadSavedNotes() {
    const savedNotes = await loadNotes();
    setNotes(savedNotes);
  }

  async function updateNotes(newNotes: VoiceNote[]) {
    setNotes(newNotes);
    await saveNotes(newNotes);
  }

  async function startRecording() {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
  }

  async function stopRecording() {
    const seconds = Math.floor(
      recorderState.durationMillis / settings.millisPerSecond
    );
    await audioRecorder.stop();

    if (audioRecorder.uri === null) {
      return;
    }

    const id = String(Date.now());
    const fileName = id + settings.fileExtension;
    await copyRecording(audioRecorder.uri, fileName);

    const newNote: VoiceNote = {
      id: id,
      name: texts.defaultName + ' ' + (notes.length + 1),
      fileName: fileName,
      duration: seconds,
      createdAt: new Date().toISOString(),
    };
    await updateNotes([newNote, ...notes]);
  }

  function handleRecordPress() {
    if (recorderState.isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }

  function selectNote(note: VoiceNote) {
    setSelectedId(note.id);
    setSpeedIndex(0);
  }

  async function playAudio() {
    const isAtEnd =
      playerStatus.duration > 0 &&
      playerStatus.currentTime >= playerStatus.duration - settings.finishedMargin;
    if (isAtEnd) {
      await player.seekTo(0);
    }
    player.setPlaybackRate(settings.speeds[speedIndex]);
    player.play();
  }

  function pauseAudio() {
    player.pause();
  }

  async function stopAudio() {
    player.pause();
    await player.seekTo(0);
  }

  function changeSpeed() {
    let nextIndex = speedIndex + 1;
    if (nextIndex >= settings.speeds.length) {
      nextIndex = 0;
    }
    setSpeedIndex(nextIndex);
    player.setPlaybackRate(settings.speeds[nextIndex]);
  }

  function openRename(note: VoiceNote) {
    setRenameNote(note);
    setRenameText(note.name);
  }

  async function saveRename() {
    if (renameNote === null || renameText.trim() === '') {
      return;
    }
    const newNotes = notes.map((note) => {
      if (note.id === renameNote.id) {
        return { ...note, name: renameText.trim() };
      }
      return note;
    });
    await updateNotes(newNotes);
    setRenameNote(null);
  }

  function confirmDelete(note: VoiceNote) {
    Alert.alert(texts.deleteTitle, texts.deleteMessage, [
      { text: texts.cancel, style: 'cancel' },
      {
        text: texts.delete,
        style: 'destructive',
        onPress: () => deleteNote(note),
      },
    ]);
  }

  async function deleteNote(note: VoiceNote) {
    deleteRecording(note.fileName);
    if (selectedId === note.id) {
      setSelectedId(null);
    }
    const newNotes = notes.filter((item) => item.id !== note.id);
    await updateNotes(newNotes);
  }

  const filteredNotes = notes.filter((note) =>
    note.name.toLowerCase().includes(searchText.toLowerCase())
  );

  let emptyMessage = texts.emptyList;
  if (notes.length > 0) {
    emptyMessage = texts.noResults;
  }

  function renderNote({ item }: { item: VoiceNote }) {
    return (
      <NoteItem
        note={item}
        isSelected={item.id === selectedId}
        onSelect={() => selectNote(item)}
        onRename={() => openRename(item)}
        onDelete={() => confirmDelete(item)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{texts.appTitle}</Text>

      <SearchBar value={searchText} onChange={setSearchText} />

      <FlatList
        style={styles.list}
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={renderNote}
        ListEmptyComponent={<Text style={styles.emptyText}>{emptyMessage}</Text>}
      />

      {selectedNote && (
        <PlayerPanel
          title={selectedNote.name}
          currentTime={playerStatus.currentTime}
          duration={playerStatus.duration || selectedNote.duration}
          isPlaying={playerStatus.playing}
          speed={settings.speeds[speedIndex]}
          onPlay={playAudio}
          onPause={pauseAudio}
          onStop={stopAudio}
          onChangeSpeed={changeSpeed}
        />
      )}

      <RecordButton
        isRecording={recorderState.isRecording}
        seconds={recorderState.durationMillis / settings.millisPerSecond}
        onPress={handleRecordPress}
      />

      <RenameModal
        visible={renameNote !== null}
        name={renameText}
        onChangeName={setRenameText}
        onSave={saveRename}
        onCancel={() => setRenameNote(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: sizes.screenTop,
    paddingHorizontal: spacing.medium,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: fontSizes.title,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: spacing.medium,
  },
  list: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textLight,
    fontSize: fontSizes.medium,
    marginTop: spacing.large,
  },
});

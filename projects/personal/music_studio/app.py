import sys
import os

if len(sys.argv) == 2:

    from lib import get_music_sheet
    from config import capo, no_of_tracks, no_of_channels, volume, duration, tempo, note_slip, lookup_track_name, lookup_program, mute_component

    from midiutil import MIDIFile
    my_midi = MIDIFile(no_of_tracks)

    song_name = sys.argv[1]

    start_time = 0
    for track in range(no_of_tracks):
        track_1i = str(track + 1)
        my_midi.addTrackName(track, 0, lookup_track_name[f"Track_{track_1i}"])
        my_midi.addTempo(track, 0, tempo)
        for channel in range(no_of_channels):
            channel_1i = str(channel + 1)
            music_sheet = get_music_sheet(
                song_name,
                track,
                channel,
                jdata={
                    "_capo": capo,
                    "_volume": volume,
                    "_duration": duration,
                }
            )
            if not music_sheet or track_1i in mute_component["Track"] or channel_1i in mute_component["Channel"]:
                print(f"[INFO] Disabled: Track-{track_1i}, Channel-{channel_1i}")
            else:
                for note in music_sheet:
                    if note[1] > 0:
                        if note[0] <= start_time:
                            continue
                        my_midi.addProgramChange(track, channel, note[0] - start_time, lookup_program[f'Track_{track_1i}'])
                        slip = channel * note_slip
                        if note[3] is None:
                            my_midi.addNote(track, channel, note[2], note[0] - start_time + slip, 1, 1)
                        else:
                            my_midi.addNote(track, channel, note[2], note[0] - start_time + slip, note[4], note[3])
                print(f"[INFO] Enabled: Track-{track_1i}, Channel-{channel_1i}; Program: {lookup_program[f'Track_{track_1i}']}; Beat (Total): {note[0]}")
        print()

    with open(f"output_audio/{song_name}.midi", 'wb') as output_file:
        my_midi.writeFile(output_file)

elif len(sys.argv) == 3:

    from config import music_sheet_shorthand, default_content
    from lib import generate_default_content

    song_name = sys.argv[1]
    enabled_channels = sys.argv[2]
    track_channel = [pair for pair in enabled_channels.strip().split('@')]

    music_sheet_dir = f"music_sheet/{song_name}"
    if os.path.exists(music_sheet_dir):
        print("[Warning] Pre-existing song! Terminating...")
        exit()
    os.mkdir(music_sheet_dir)
    print(f"[Info] Created folder: '{os.path.realpath(music_sheet_dir)}'")
    print()
    from config import no_of_tracks, no_of_channels
    for track in range(no_of_tracks):
        track_1i = str(track + 1)
        for channel in range(no_of_channels):
            channel_1i = str(channel + 1)
            filepath = os.path.realpath(f'{music_sheet_dir}/{track_1i}_{channel_1i}.csv')
            print(f"[Info] Created '{music_sheet_dir}/{track_1i}_{channel_1i}.csv'")
            with open(filepath, 'a', encoding="utf-8") as f:
                f.write(
                    f'{default_content["header"]}\n{generate_default_content(music_sheet_shorthand, track, channel)}\n{default_content["footer"] % ("True", "2", "-1")}'
                        if f"{track_1i}_{channel_1i}" in track_channel
                        else
                    f'{default_content["header"]}\n{default_content["footer"] % ("False", "-1", "0")}'
                )
    import shutil
    src_file = f"melody_sheet/{song_name}.csv"
    if os.path.exists(src_file):
        shutil.copyfile(src_file, f"music_sheet/{song_name}/2_5.csv")

    highly_customized_music_sheets = enabled_channels.split('@')
    for sheet in highly_customized_music_sheets:
        src_file = f"music_sheet_highly_customized/{song_name}/{sheet}.csv"
        if os.path.exists(src_file):
            dest_file = f"music_sheet/{song_name}/{sheet}.csv"
            shutil.copyfile(src_file, dest_file)

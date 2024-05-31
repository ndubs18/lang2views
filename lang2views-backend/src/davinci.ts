import * as fs from 'fs';
import * as xmlbuilder from 'xmlbuilder';

export interface VideoAndAudioNames {
    videoName: string,
    originalAudioName: string,
    vocalsRemovedName?: string,
    soundEffects?: string,
    environmentNoise?: string,
    voice1?: string,
    voice2?: string,
    voice3?: string,
    voice4?: string,
    voice5?: string,
    voice6?: string,
    voice7?: string,
    voice8?: string,
}

export class DaVinci {
    public generateTimelineXML(names: VideoAndAudioNames): string {
        const fcpxml = xmlbuilder.create('fcpxml', { encoding: 'UTF-8' })
            .att('version', '1.8');

        const resources = fcpxml.ele('resources');

        resources.ele('asset')
            .att('hasAudio', '0')
            .att('hasVideo', '1')
            .att('duration', '60s')
            .att('name', `videoTrack`)
            .att('format', 'r1')
            .att('audioSources', '1')
            .att('audioChannels', '2')
            .att('id', 'r2')
            .att('src', '')
            .att('start', '0s');

        for (let i = 0; i < 12; i++) {
            resources.ele('asset')
                .att('hasAudio', '1')
                .att('hasVideo', '0')
                .att('duration', '60s')
                .att('name', `audioTrack${i}`)
                .att('audioSources', '1')
                .att('audioChannels', '1')
                .att('id', `r${i + 3}`)
                .att('src', '')
                .att('start', '0s');
        }

        const library = fcpxml.ele('library');
        const event = library.ele('event').att('name', 'Timeline');
        const project = event.ele('project').att('name', 'Timeline');

        const sequence = project.ele('sequence')
            .att('duration', '60s')
            .att('format', 'r1');

        const spine = sequence.ele('spine');

        const clip = spine.ele('clip')
            .att('duration', '60s')
            .att('offset', '3600/1s')
            .att('name', `${names.videoName}`)
            .att('enabled', '1')
            .att('tcFormat', 'NDF')
            .att('format', 'r1')
            .att('start', '0/1s');

        clip.ele('adjust-transform')
            .att('position', '0 0')
            .att('anchor', '0 0')
            .att('scale', '1 1');

        clip.ele('video')
            .att('duration', '60s')
            .att('ref', 'r2')
            .att('offset', '0/1s')
            .att('start', '0/1s');

        const assetClips = [
            { ref: 'r3', name: `${names.originalAudioName}`, lane: '1' },
            { ref: 'r4', name: `${names.vocalsRemovedName}`, lane: '2' },
            { ref: 'r5', name: `${names.soundEffects}`, lane: '3' },
            { ref: 'r6', name: `${names.environmentNoise}`, lane: '4' },
            { ref: 'r7', name: `${names.voice1}`, lane: '5' },
            { ref: 'r8', name: `${names.voice2}`, lane: '6' },
            { ref: 'r9', name: `${names.voice3}`, lane: '7' },
            { ref: 'r10', name: `${names.voice4}`, lane: '8' },
            { ref: 'r11', name: `${names.voice5}`, lane: '9' },
            { ref: 'r12', name: `${names.voice6}`, lane: '10' },
            { ref: 'r13', name: `${names.voice7}`, lane: '11' },
            { ref: 'r14', name: `${names.voice8}`, lane: '12' },
        ];

        for (const clipAttributes of assetClips) {
            clip.ele('asset-clip')
                .att('duration', '60s')
                .att('ref', clipAttributes.ref)
                .att('offset', '0/1s')
                .att('name', clipAttributes.name)
                .att('enabled', '1')
                .att('lane', clipAttributes.lane.toString())
                .att('start', '0/1s');
        }

        return fcpxml.end({ pretty: true });
    }

    public exportXMLToFile(xmlContent: string, outputFilePath: string): void {
        fs.writeFileSync(outputFilePath, xmlContent, 'utf-8');
    }
}
# Changelog

## Current release:

### [Corpus 17.0](datasets/cv-corpus-17.0-2024-03-15.json)
**Dataset Changes**
- added `unvalidated_sentences.tsv` and `validated_sentences.tsv`
- `unvalidated_sentences.tsv` contains sentences that do not have any votes yet, the columns are: `sentence_id`, `sentence`, `sentence_domain` and `source`
- `validated_sentences.tsv`contains sentences that have at two up votes, it has two additional columns: `is_used` and `clips_count`
- `is_used`: indicates whether or not the sentence is used on the speak page
- `clips_count`: the number of clips that are associated with the sentence
- add `sentence_id` and `sentence_domain` to the [Corpora Creator](https://github.com/common-voice/CorporaCreator) files
- the following [sentence domains](https://github.com/common-voice/common-voice/blob/f820e0fa3ec00fc6d49dae7e31bcebf9eb24878b/common/taxonomies.ts#L35) are supported

## Past releases
### [Corpus 16.1](datasets/cv-corpus-16.1-2023-12-06.json)
**Dataset Changes**
- changed `times.txt` to `clip_durations.tsv` for consistency
- `clip_durations.tsv` contains two columns: `clip` and `duration[ms]`

### [Corpus 14.0](datasets/cv-corpus-14.0-2023-06-23.json)
**Dataset Changes**
- added `times.txt` containing mp3 filename and duration in ms

### [Corpus 13.0](datasets/cv-corpus-13.0-2023-03-09.json)
**Dataset Changes**
- added `variant` column to [Corpora Creator](https://github.com/common-voice/CorporaCreator)
files

### [Corpus 10.0](datasets/cv-corpus-10-2022-07-04.json)
**Dataset Changes**
- introduced delta segments
- delta segment tar file naming is `cv-corpus-{releaseNumber}-delta-{YYYY-MM-DD}-{locale}.tar.gz`
- delta segments contain the same files except for the training splits, i.e. `dev.tsv`, `test.tsv`, `train.tsv`

### [Corpus 9.0](datasets/cv-corpus-9.0-2022-04-27.json) - [Discourse](https://discourse.mozilla.org/c/voice/239)

Regularly scheduled dataset release Q1 2022.

- **Date released**: 27 April 2022
- **Clip cut-off date**: 07 April 2022
- **Total hours**: 20,217
- **Total validated hours**: 14,973
- **Number of languages**: 93

**New languages since last major release**: Tigre, Taiwanese (Minnan), Meadow Mari, Bengali, Toki Pona and Cantonese.

### [Corpus 8.0](datasets/cv-corpus-8.0-2022-01-19.json) - [Discourse Announcement](https://discourse.mozilla.org/t/dataset-release-day-v-8/92083)

Regularly scheduled dataset release.

- **Date released**: 26 January 2022
- **Clip cut-off date**: 19 January 2022
- **Total hours**: 18,243
- **Total validated hours**: 14,122
- **Number of languages**: 87

**New languages since last major release**: Igbo, Marathi, Danish, Norwegian Nynorsk, Central Kurdish, Malayalam, Swahili, Erzya, Moksha, Macedonian and Santali (Ol Chiki).

Note: minor variations in the validated hours of minor dot releases reflects the fact that labeling/validation happens on a different schedule than recording. In the timespan between dot releases the community will usually have performed additional validations, even if the clip cut-off date remains the same.

### [Corpus 7.0](datasets/cv-corpus-7.0-2021-07-21.json) - [Discourse Announcement](https://discourse.mozilla.org/t/common-voice-2021-mid-year-dataset-release/83812)

Regularly scheduled dataset release for H1 of 2021.

- **Date released**: 28 July 2021
- **Clip cut-off date**: 21 July 2021
- **Total hours**: 13,905
- **Total validated hours**: 11,192
- **Number of languages**: 76

**New languages since last major release**: Basaa, Slovak, Northern Kurdish, Bulgarian, Kazakh, Bashkir, Galician, Uyghur, Armenian, Belarusian, Urdu, Guarani, Serbian, Uzbek, Azerbaijani, Hausa

**Dataset Changes**
- changed tar file naming from `cv-corpus-{releaseNumber}-{YYYY-MM-DD}_{locale}.tar.tar`
  cv-corpus-{releaseNumber}-{YYYY-MM-DD}_cv-corpus-{releaseNumber}-{YYYY-MM-DD}-{locale}.tar.gz`, e.g. `cv-corpus-7.0-2021-07-21_cv-corpus-7.0-2021-07-21-tr.tar.gz`

### [Singleword Segment 7.0](datasets/cv-corpus-7.0-singleword.json)

Update to Singleword Segment 6.1

- **Date released**: 28 July 2021
- **Clip cut-off date**: 21 July 2021
- **Total hours**: 141
- **Total validated hours**: 82
- **Number of languages**: 34

### [Corpus 6.1](datasets/cv-corpus-6.1-2020-12-11.json) - [Discourse Announcement](https://discourse.mozilla.org/t/2020-end-of-year-common-voice-dataset-release/72287/)

Correction to Corpus 6.0, which had a bug that did not properly attribute demographics information.

- **Date released**: 22 Dec 2020
- **Clip cut-off date**: 11 Dec 2020
- **Total hours**: 9,283
- **Total validated hours**: 7,335
- **Number of languages**: 60

### [Singleword Segment 6.1](datasets/cv-corpus-6.1-singleword.json) - [Discourse Announcement](https://discourse.mozilla.org/t/2020-end-of-year-common-voice-dataset-release/72287/)

Correction to Corpus 6.0, which had a bug that did not properly attribute demographics information.

- **Date released**: 22 Dec 2020
- **Clip cut-off date**: 11 Dec 2020
- **Total hours**: 131
- **Total validated hours**: 77
- **Number of languages**: 31

### [Corpus 6.0](datasets/cv-corpus-6.0-2020-12-11.json) - [Discourse Announcement](https://discourse.mozilla.org/t/2020-end-of-year-common-voice-dataset-release/72287/)

Regularly scheduled dataset release for H2 of 2020.

- **Date released**: 22 Dec 2020
- **Clip cut-off date**: 11 Dec 2020
- **Total hours**: 9,261
- **Total validated hours**: 7,327
- **Number of languages**: 60

**New languages since last major release**: Hindi, Lithuanian, Luganda, Thai, Finnish, Hungarian

### [Singleword Segment 6.0](datasets/cv-corpus-6.0-singleword.json) - [Discourse Announcement](https://discourse.mozilla.org/t/2020-end-of-year-common-voice-dataset-release/72287/)

Update to Singleword Segment 5.1

- **Date released**: 22 Dec 2020
- **Clip cut-off date**: 11 Dec 2020
- **Total hours**: 131
- **Total validated hours**: 77
- **Number of languages**: 31

### [Corpus 5.1](datasets/cv-corpus-5.1-2020-06-22.json) - [Discourse Announcement](https://discourse.mozilla.org/t/common-voice-dataset-release-mid-year-2020/62938/7)

Correction to Corpus 5.0, which unintentionally altered the column order of the test/train/dev sets, and included some redundant metadata entries for clips that didn’t actually have valid audio.

- **Date released**: 14 July 2020
- **Clip cut-off date**: 22 June 2020
- **Total hours**: 7,226
- **Total validated hours**: 5,671\*
- **Number of languages**: 54

### [Singleword Segment 5.1](datasets/cv-corpus-5.1-singleword.json)

Correction to Singleword Segment 5.0, which was still optimizing for no repeated sentences during segmentation and thus resulted in disproportionately small test/dev/train sets.

- **Date released**: 16 September 2020
- **Clip cut-off date**: 22 June 2020
- **Total hours**: 120
- **Total validated hours**: 64
- **Number of languages**: 18

### [Corpus 5.0](datasets/cv-corpus-5-2020-06-22.json) - [Discourse Announcement](https://discourse.mozilla.org/t/common-voice-dataset-release-mid-year-2020/62938/)

Regularly scheduled dataset release for H1 of 2020. This release introduced sha256 checksum values for each dataset, which you can find on the datasets page for each language, or in the [datasheet files](datasets/cv-corpus-5.1-2020-06-22.json).

- **Date released**: 30 June 2020
- **Clip cut-off date**: 22 June 2020
- **Total hours**: 7,226
- **Total validated hours**: 5,591
- **Number of languages**: 7,226

**New languages since last major release**: Upper Sorbian, Romanian, Frisian, Czech, Greek, Romansh Vallader, Polish, Assamese, Ukranian, Maltese, Georgian, Punjabi, Odia, and Vietnamese

**Dataset Changes**

- changed archive folder structure: dataset release archive contains now a locale folder
  before:
  ```
    cv-corpus-3_tr
    ├── clips
    ├── dev.tsv
    ├── invalidated.tsv
    ├── other.tsv
    ├── test.tsv
    ├── train.tsv
    └── validated.tsv
  ```
  now:
  ```
  cv-corpus-5.1-2020-06-22
  └── tr
      ├── clips
      ├── dev.tsv
      ├── invalidated.tsv
      ├── other.tsv
      ├── reported.tsv
      ├── test.tsv
      ├── train.tsv
      └── validated.tsv
  ```
- added `reported.tsv` containing sentences that have been reported by the community
- added `locale` and `segment` columns to the [Corpora Creator](https://github.com/common-voice/CorporaCreator)
 files

### [Singleword Segment 5.0](datasets/cv-corpus-5-singleword.json)

This contains all of the voice data collected as part of the [Common Voice pilot target segment effort] collecting single-word utterances for a benchmark experiment.

- **Date released**: 30 June 2020
- **Clip cut-off date**: 22 June 2020
- **Total hours**: 120
- **Total validated hours**: 64
- **Number of languages**: 18

### [Corpus 4](datasets/cv-corpus-4-2019-12-10.json)

Regularly scheduled dataset release for H2 of 2019.

- **Date released**: 14 Jan 2020
- **Clip cut-off date**: 10 Dec 2019
- **Total hours**: 4,257
- **Total validated hours**: 3,401
- **Number of languages**: 40

**New languages since last major release**: Abkhazian, Arabic, Chinese (Hong Kong), Indonesian, Interlingua, Japanese, Latvian, Portuguese, Romansh (Sursilvan), Tamil, and Votic.

**Dataset Changes**
- changed tar file naming from `cv-corpus-{releaseNumber}_{locale}.tar.tar` to
  `cv-corpus-{releaseNumber}-{YYYY-MM-DD}_{locale}.tar.tar`, e.g. cv-corpus-4-2019-12-10_tr.tar.tar`

### [Corpus 3](datasets/cv-corpus-3.json) - [Discourse Update](https://discourse.mozilla.org/t/common-voice-mid-year-release-more-data-more-languages/41409/16)

Minor update to Corpus 2 to correct an issue with file-naming.

- **Date released**: 24 June 2019
- **Clip cut-off date**: 24 June 2019 (est)
- **Total hours**: 2,454
- **Total validated hours**: 1,979
- **Number of languages**: 29

**New languages since last major release**: Persian

### [Corpus 2](datasets/cv-corpus-2.json) - [Discourse Announcement](https://discourse.mozilla.org/t/common-voice-mid-year-release-more-data-more-languages/41409)

Regularly scheduled dataset release for H1 of 2019.

- **Date released**: 11 June 2019
- **Clip cut-off date**: 11 June 2019 (est)
- **Total hours**: 2,366
- **Total validated hours**: 1,872
- **Number of languages**: 28

**New languages since last major release**: Basque, Spanish, Chinese (Mandarin), Mongolian, Yakut, Divehi, Kinyarwandan, Swedish, Russian

### [Corpus 1](datasets/cv-corpus-1.json) - [Mozilla Announcement](https://blog.mozilla.org/blog/2019/02/28/sharing-our-common-voices-mozilla-releases-the-largest-to-date-public-domain-transcribed-voice-dataset/)

First multilingual release.

- **Date released**: 25 February 2019
- **Clip cut-off date**: 25 Feburary 2019 (est)
- **Total hours**: 1,368
- **Total validated hours**: 1,096
- **Number of languages**: 19

**New languages since last major release**: German, French, Welsh, Breton, Chuvash, Turkish, Tatar, Kyrgyz, Irish, Kabyle, Catalan, Chinese (Taiwan), Slovenian, Italian, Dutch, Hakka Chin, Esperanto, Estonian

**Dataset Structure**
- the dataset release folder structure is as follows:
  ```
    cv-corpus-1_tr
    ├── clips
    ├── dev.tsv
    ├── invalidated.tsv
    ├── other.tsv
    ├── test.tsv
    ├── train.tsv
    └── validated.tsv
  ```
- to get more information about the files included in the dataset release, please see [Corpora Creator](https://github.com/common-voice/CorporaCreator)
- in general the files `dev.tsv`, `test.tsv`, `train.tsv`, `validated.tsv`, `invalidated.tsv` and `other.tsv` are generated by the Corpora Creator
- they contain the following columns: `client_id`, `path`, `sentence`, `up_votes`, `down_votes`, `age`, `gender`, `accent`


### English Corpus 1

- **Date released**:
- **Clip cut-off date**:
- **Total hours**:
- **Total validated hours**:
- **Number of languages**: 1

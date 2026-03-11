# Scripted Speech Changelog

## Major Changes (March 2026)

The following changes affect SCS datasets starting with Corpus 25.0.

**Datasheets**: Each locale archive now includes a `README.md` datasheet -- a Markdown document describing the language, dataset statistics, demographic breakdowns, text sources, and community-contributed context. Datasheets are auto-generated during the bundler run using templates and community content from the [cv-datasheets](https://github.com/common-voice/cv-datasheets) repository (schema v2.0.0). The datasheet is placed at the root of the locale directory inside the archive:

```txt
cv-corpus-{version}-{YYYY-MM-DD}/{lang}/
├── README.md      <-- new: locale datasheet
├── clips/
├── dev.tsv
├── ...
```

## Current Release

### [Corpus 25.0](cv-corpus-25.0-2026-03-09.json)

Regularly scheduled dataset release Q1 2026.

- **Date released**: 18 March 2026
- **Clip cut-off date**: 09 March 2026
- **Total hours**:
- **Total validated hours**:
- **Number of languages**:

**New languages since last major release**:

#### Dataset Changes in Corpus 25.0

- added `variant` column to `validated_sentences.tsv` (after `sentence`), containing the language variant token for the sentence (empty if none)
- added `variant` column to `unvalidated_sentences.tsv` (after `sentence`)
- added `up_votes`, `down_votes`, and `status` columns to `unvalidated_sentences.tsv`
- `status` is `pending` (not-yet-validated) or `rejected` (when `down_votes` >= 2 and `down_votes` > `up_votes`)
- the `unvalidated_sentences.tsv` description is corrected: it contains sentences that have not reached the validated threshold, not only sentences without any votes
- added `variant` and `locale` columns to [Corpora Creator](https://github.com/common-voice/CorporaCreator) clip files

## Past Releases

### [Corpus 24.0](cv-corpus-24.0-2025-12-05.json)

Regularly scheduled dataset release Q4 2025.

- **Date released**: 17 December 2025
- **Clip cut-off date**: 05 December 2025
- **Total hours**: 38,932
- **Total validated hours**: 25,886
- **Number of languages**: 289

**New languages since last major release**: Sorbian, Lower (`dsb`), Alsatian (`gsw`), Laz (`lzz`)

### [Corpus 23.0](cv-corpus-23.0-2025-09-05.json)

Regularly scheduled dataset release Q3 2025.

- **Date released**: 17 September 2025
- **Clip cut-off date**: 05 September 2025
- **Total hours**: 35,921
- **Total validated hours**: 24,600
- **Number of languages**: 286

**New languages since last major release**: Adamawa Fulfulde (`fub`), Adja (`ajg`), Adyghe (`ady`), Aragonese (`an`), Asheninka Perene, Asheninka South Ucayali, Atayal (`tay`), Baatonum (`bba`), Bafia (`ksf`), Bafut (`bfd`), Bakoko, Balti (`bft`), Bamun (`bax`), Bamvele (`beb`), Bankon (`abb`), Baoule (`bci`), Batanga (`bnm`), Bateri (`btv`), Borgu Fulfulde (`fue`), Brahui, Brushaski (`bsk`), Bulu (`bum`), Bunun (`bnn`), Cameroon Pidgin (`wes`), Central Alaskan Yup'ik (`esu`), Central Puebla Nahuatl (`ncx`), Central Tarahumara, Chokwe, Copainalá Zoque (`zoc`), Cornish (`kw`), Dagbani (`dag`), Dameli (`dml`), Dargwa (`dar`), Dawoodi (`dmk`), Dhatki, Duala (`dua`), Eastern Balochi (`bgp`), Ebrie (`ebr`), Ekoti, Eton (`eto`), Ewondo (`ewo`), Fang (`fan`), Fe'efe'e (`fmp`), Gawarbaiti (`gwt`), Gawri (`gwc`), Ghomala (`bbj`), Goaria, Guidar, Guiziga, Gujari (`gju`), Gurgula (`ggg`), Hazargi, Huarijio (`var`), Huautla Mazatec (`mau`), Ibibio (`ibb`), Indus Kohistani (`mvy`), Iñupiaq (`ipk`), Jaqaru (`jqr`), Kabardian (`kbd`), Kachhi, Kalasha (`kls`), Kalkoti (`xka`), Kateviri (`bsh`), Khetrani (`xhe`), Khowar (`khw`), Kichwa (`qvi`), Kihemba, Kirombo, Kohistani Shina (`plk`), Kom (`bkm`), Kotokoli, Kunabembe, Kwasio, Lassi (`lss`), Loarki, Loja Highland Kichwa, Losso, Mada (`mxu`), Malay (`ms`), Manx (`gv`), Massa, Matses, Mbo (`mbo`), Mbum, Medumba (`byv`), Mengambo, Mina, Mingrelian (`xmf`), Mokpwe (`bri`), Moussey, Mpiemo, Mundang, Mungaka, Musgum, Ngiembon (`nnh`), Ngomba, Ngombale, Nigerian Pidgin English (`pcm`), Northern Hindko (`hno`), Northwest Gbaya (`gya`), Nuasue, Nyungwe, Nüpode Huitoto, Oadki, Orizaba Nahuatl, Ormuri (`oru`), Ouldémé, Pahari-Pothwari, Paiwan (`pwn`), Pakistani Marwari, Palula (`phl`), Parkari Koli, Puno Quechua (`qxp`), Quechua Ambo-Pasco (`qva`), Quechua Arequipa-La Unión (`qxu`), Quechua Cajatambo (`qvl`), Quechua Chiquián (`qxa`), Quechua Corongo Ancash (`qwa`), Quechua Jauja Wanka (`qxw`), Quechua Pasco Santa Ana de Tusi (`qxt`), Quechua Santiago del Estero, Quechua Sihuas Ancash (`qws`), Quechua Yanahuanca, Quechua Yauyos (`qux`), Rukai (`dru`), Sakizaya (`szy`), Sansi, Seediq (`trv`), Seri (`sei`), Shina (`scl`), Sindhi Bhili, Siswati (`ss`), Southern Pastaza Quechua (`qup`), Svan (`sva`), Tepeuxila Cuicatec (`cux`), Teutila Cuicatec (`cut`), Tlingit, Torwali (`trw`), Tshiluba, Tuki, Tunen (`tvu`), Tupuri (`tui`), Tush (`bbl`), Ushojo (`ush`), Wadiyara Koli, Wakhi (`wbl`), Western Highland Purepecha (`pua`), Yadgha, Yaqui (`yaq`)

### [Corpus 22.0](cv-corpus-22.0-2025-06-20.json)

Regularly scheduled dataset release Q2 2025.

- **Date released**: 25 June 2025
- **Clip cut-off date**: 20 June 2025
- **Total hours**: 33,815
- **Total validated hours**: 22,640
- **Number of languages**: 137

**New languages since last major release**: Aromanian (`rup`), Tajik (`tg`), Tshivenda (`ve`)

### [Corpus 21.0](cv-corpus-21.0-2025-03-14.json)

Regularly scheduled dataset release Q1 2025.

- **Date released**: 19 March 2025
- **Clip cut-off date**: 14 March 2025
- **Total hours**: 33,534
- **Total validated hours**: 22,344
- **Number of languages**: 134

**New languages since last major release**: Norwegian Bokmål (`nb-NO`)

### [Corpus 20.0](cv-corpus-20.0-2024-12-06.json)

Regularly scheduled dataset release Q4 2024.

- **Date released**: 11 December 2024
- **Clip cut-off date**: 06 December 2024
- **Total hours**: 33,154
- **Total validated hours**: 22,106
- **Number of languages**: 133

**New languages since last major release**: IsiNdebele (South) (`nr`), Southern Sotho (`st`)

### [Corpus 19.0](cv-corpus-19.0-2024-09-13.json)

Regularly scheduled dataset release Q3 2024.

- **Date released**: 18 September 2024
- **Clip cut-off date**: 13 September 2024
- **Total hours**: 32,584
- **Total validated hours**: 21,593
- **Number of languages**: 131

**New languages since last major release**: Sindhi (`sd`), Xitsonga (`ts`)

### [Corpus 18.0](cv-corpus-18.0-2024-06-14.json)

#### Dataset Changes in Corpus 18.0

- the `sentence_domain` column contains now up to three domains separated by a comma, e.g. `general,finance,news_current_affairs`
- the domains `agriculture`, `automotive` and `food_service_retail` have been renamed to `agriculture_food`, `automotive_transport`, `service_retail` respectively

### [Corpus 17.0](cv-corpus-17.0-2024-03-15.json)

#### Dataset Changes in Corpus 17.0

- added `unvalidated_sentences.tsv` and `validated_sentences.tsv`
- `unvalidated_sentences.tsv` contains sentences that do not have any votes yet, the columns are: `sentence_id`, `sentence`, `sentence_domain` and `source`
- `validated_sentences.tsv` contains sentences that have at two up votes, it has two additional columns: `is_used` and `clips_count`
- `is_used`: indicates whether or not the sentence is used on the speak page
- `clips_count`: the number of clips that are associated with the sentence
- added `sentence_id` and `sentence_domain` to the [Corpora Creator](https://github.com/common-voice/CorporaCreator) files
- the following [sentence domains](https://github.com/common-voice/common-voice/blob/f820e0fa3ec00fc6d49dae7e31bcebf9eb24878b/common/taxonomies.ts#L35) are supported

### [Corpus 16.1](cv-corpus-16.1-2023-12-06.json)

#### Dataset Changes in Corpus 16.1

- changed `times.txt` to `clip_durations.tsv` for consistency
- `clip_durations.tsv` contains two columns: `clip` and `duration[ms]`

### [Corpus 14.0](cv-corpus-14.0-2023-06-23.json)

#### Dataset Changes in Corpus 14.0

- added `times.txt` containing mp3 filename and duration in ms

### [Corpus 13.0](cv-corpus-13.0-2023-03-09.json)

#### Dataset Changes in Corpus 13.0

- added `variant` column to [Corpora Creator](https://github.com/common-voice/CorporaCreator) files

### [Corpus 10.0](cv-corpus-10.0-2022-07-04.json)

#### Dataset Changes in Corpus 10.0

- introduced delta segments
- delta segment tar file naming is `cv-corpus-{version}-delta-{YYYY-MM-DD}-{locale}.tar.gz`
- delta segments contain the same files except for the training splits, i.e. `dev.tsv`, `test.tsv`, `train.tsv`

### [Corpus 9.0](cv-corpus-9.0-2022-04-27.json)

Regularly scheduled dataset release Q1 2022.

- **Date released**: 27 April 2022
- **Clip cut-off date**: 07 April 2022
- **Total hours**: 20,217
- **Total validated hours**: 14,973
- **Number of languages**: 93

**New languages since last major release**: Tigre (`tig`), Taiwanese (Minnan) (`nan-tw`), Meadow Mari (`mhr`), Bengali (`bn`), Toki Pona (`tok`), Cantonese (`yue`)

### [Corpus 8.0](cv-corpus-8.0-2022-01-19.json)

Regularly scheduled dataset release.

- **Date released**: 26 January 2022
- **Clip cut-off date**: 19 January 2022
- **Total hours**: 18,243
- **Total validated hours**: 14,122
- **Number of languages**: 87

**New languages since last major release**: Igbo (`ig`), Marathi (`mr`), Danish (`da`), Norwegian Nynorsk (`nn-NO`), Central Kurdish (`ckb`), Malayalam (`ml`), Swahili (`sw`), Erzya (`myv`), Moksha (`mdf`), Macedonian (`mk`), Santali (Ol Chiki) (`sat`)

Note: minor variations in the validated hours of minor dot releases reflects the fact that labeling/validation happens on a different schedule than recording. In the timespan between dot releases the community will usually have performed additional validations, even if the clip cut-off date remains the same.

### [Corpus 7.0](cv-corpus-7.0-2021-07-21.json)

Regularly scheduled dataset release for H1 of 2021.

- **Date released**: 28 July 2021
- **Clip cut-off date**: 21 July 2021
- **Total hours**: 13,905
- **Total validated hours**: 11,192
- **Number of languages**: 76

**New languages since last major release**: Basaa (`bas`), Slovak (`sk`), Kurmanji Kurdish (`kmr`), Bulgarian (`bg`), Kazakh (`kk`), Bashkir (`ba`), Galician (`gl`), Uyghur (`ug`), Armenian (`hy-AM`), Belarusian (`be`), Urdu (`ur`), Guarani (`gn`), Serbian (`sr`), Uzbek (`uz`), Azerbaijani (`az`), Hausa (`ha`)

#### Dataset Changes in Corpus 7.0

- changed tar file naming to `cv-corpus-{version}-{YYYY-MM-DD}-{locale}.tar.gz`

### [Singleword Segment 7.0](cv-corpus-7.0-singleword.json)

Update to Singleword Segment 6.1.

- **Date released**: 28 July 2021
- **Clip cut-off date**: 21 July 2021
- **Total hours**: 141
- **Total validated hours**: 82
- **Number of languages**: 34

### [Corpus 6.1](cv-corpus-6.1-2020-12-11.json)

Correction to Corpus 6.0, which had a bug that did not properly attribute demographics information.

- **Date released**: 22 Dec 2020
- **Clip cut-off date**: 11 Dec 2020
- **Total hours**: 9,283
- **Total validated hours**: 7,335
- **Number of languages**: 60

### [Singleword Segment 6.1](cv-corpus-6.1-singleword.json)

Correction to Singleword Segment 6.0, which had a bug that did not properly attribute demographics information.

- **Date released**: 22 Dec 2020
- **Clip cut-off date**: 11 Dec 2020
- **Total hours**: 131
- **Total validated hours**: 77
- **Number of languages**: 31

### [Corpus 6.0](cv-corpus-6.0-2020-12-11.json)

Regularly scheduled dataset release for H2 of 2020.

- **Date released**: 22 Dec 2020
- **Clip cut-off date**: 11 Dec 2020
- **Total hours**: 9,261
- **Total validated hours**: 7,327
- **Number of languages**: 60

**New languages since last major release**: Hindi (`hi`), Lithuanian (`lt`), Luganda (`lg`), Thai (`th`), Finnish (`fi`), Hungarian (`hu`)

### [Singleword Segment 6.0](cv-corpus-6.0-singleword.json)

Update to Singleword Segment 5.1.

- **Date released**: 22 Dec 2020
- **Clip cut-off date**: 11 Dec 2020
- **Total hours**: 131
- **Total validated hours**: 77
- **Number of languages**: 31

### [Corpus 5.1](cv-corpus-5.1-2020-06-22.json)

Correction to Corpus 5.0, which unintentionally altered the column order of the test/train/dev sets, and included some redundant metadata entries for clips that didn't actually have valid audio.

- **Date released**: 14 July 2020
- **Clip cut-off date**: 22 June 2020
- **Total hours**: 7,226
- **Total validated hours**: 5,671
- **Number of languages**: 54

### [Singleword Segment 5.1](cv-corpus-5.1-singleword.json)

Correction to Singleword Segment 5.0, which was still optimizing for no repeated sentences during segmentation and thus resulted in disproportionately small test/dev/train sets.

- **Date released**: 16 September 2020
- **Clip cut-off date**: 22 June 2020
- **Total hours**: 120
- **Total validated hours**: 64
- **Number of languages**: 18

### [Corpus 5.0](cv-corpus-5-2020-06-22.json)

Regularly scheduled dataset release for H1 of 2020. This release introduced sha256 checksum values for each dataset.

- **Date released**: 30 June 2020
- **Clip cut-off date**: 22 June 2020
- **Total hours**: 7,226
- **Total validated hours**: 5,591
- **Number of languages**: 54

**New languages since last major release**: Sorbian, Upper (`hsb`), Romanian (`ro`), Frisian (`fy-NL`), Czech (`cs`), Greek (`el`), Romansh Vallader (`rm-vallader`), Polish (`pl`), Assamese (`as`), Ukrainian (`uk`), Maltese (`mt`), Georgian (`ka`), Punjabi (`pa-IN`), Odia (`or`), Vietnamese (`vi`)

#### Dataset Changes in Corpus 5.0

- changed archive folder structure: dataset release archive now contains a locale folder

  ```txt
  cv-corpus-5.1-2020-06-22/
  └── tr/
      ├── clips/
      ├── dev.tsv
      ├── invalidated.tsv
      ├── other.tsv
      ├── reported.tsv
      ├── test.tsv
      ├── train.tsv
      └── validated.tsv
  ```

- added `reported.tsv` containing sentences that have been reported by the community
- added `locale` and `segment` columns to the [Corpora Creator](https://github.com/common-voice/CorporaCreator) files

### [Singleword Segment 5.0](cv-corpus-5-singleword.json)

This contains all of the voice data collected as part of the Common Voice pilot target segment effort collecting single-word utterances for a benchmark experiment.

- **Date released**: 30 June 2020
- **Clip cut-off date**: 22 June 2020
- **Total hours**: 120
- **Total validated hours**: 64
- **Number of languages**: 18

### [Corpus 4](cv-corpus-4-2019-12-10.json)

Regularly scheduled dataset release for H2 of 2019.

- **Date released**: 14 Jan 2020
- **Clip cut-off date**: 10 Dec 2019
- **Total hours**: 4,257
- **Total validated hours**: 3,401
- **Number of languages**: 40

**New languages since last major release**: Abkhaz (`ab`), Arabic (`ar`), Chinese (Hong Kong) (`zh-HK`), Indonesian (`id`), Interlingua (`ia`), Japanese (`ja`), Latvian (`lv`), Portuguese (`pt`), Romansh Sursilvan (`rm-sursilv`), Tamil (`ta`), Votic (`vot`)

#### Dataset Changes in Corpus 4.0

- changed tar file naming from `cv-corpus-{version}_{locale}.tar.tar` to `cv-corpus-{version}-{YYYY-MM-DD}_{locale}.tar.tar`

### [Corpus 3](cv-corpus-3.json)

Minor update to Corpus 2 to correct an issue with file-naming.

- **Date released**: 24 June 2019
- **Clip cut-off date**: 24 June 2019 (est)
- **Total hours**: 2,454
- **Total validated hours**: 1,979
- **Number of languages**: 29

**New languages since last major release**: Persian (`fa`)

### [Corpus 2](cv-corpus-2.json)

Regularly scheduled dataset release for H1 of 2019.

- **Date released**: 11 June 2019
- **Clip cut-off date**: 11 June 2019 (est)
- **Total hours**: 2,366
- **Total validated hours**: 1,872
- **Number of languages**: 28

**New languages since last major release**: Basque (`eu`), Spanish (`es`), Chinese (China) (`zh-CN`), Mongolian (`mn`), Sakha/Yakut (`sah`), Dhivehi (`dv`), Kinyarwanda (`rw`), Swedish (`sv-SE`), Russian (`ru`)

### [Corpus 1](cv-corpus-1.json)

First multilingual release.

- **Date released**: 25 February 2019
- **Clip cut-off date**: 25 February 2019 (est)
- **Total hours**: 1,368
- **Total validated hours**: 1,096
- **Number of languages**: 19

**New languages**: German (`de`), French (`fr`), Welsh (`cy`), Breton (`br`), Chuvash (`cv`), Turkish (`tr`), Tatar (`tt`), Kyrgyz (`ky`), Irish (`ga-IE`), Kabyle (`kab`), Catalan (`ca`), Chinese (Taiwan) (`zh-TW`), Slovenian (`sl`), Italian (`it`), Dutch (`nl`), Hakha Chin (`cnh`), Esperanto (`eo`), Estonian (`et`)

#### Initial Dataset Structure

- the initial dataset release folder structure:

  ```txt
  cv-corpus-1_{locale}/
  ├── clips/
  ├── dev.tsv
  ├── invalidated.tsv
  ├── other.tsv
  ├── test.tsv
  ├── train.tsv
  └── validated.tsv
  ```

- to get more information about the files included in the dataset release, please see [Corpora Creator](https://github.com/common-voice/CorporaCreator)
- columns: `client_id`, `path`, `sentence`, `up_votes`, `down_votes`, `age`, `gender`, `accent`

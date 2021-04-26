# Common Voice Dataset
This repo contains release details and metadata for the Common Voice dataset. Please visit https://commonvoice.mozilla.org/datasets to download the full dataset.

## About this repo

This repo contains [statistics for each dataset](datasets) we have released in JSON format, as well as a [changelog](CHANGELOG.md) with brief summaries of the release. The JSON structure may have changed slightly from release-to-release, so if you plan on doing any comparisons you may need to normalize them between versions. Currently, changelogs and statistics from datasets released in the last year are available, and we are working to backfill this information for older versions as well. 

Any demographic split (i.e. sex, age, accent) is applied to **the entire dataset**, not just the validated set. Unless otherwise indicated, durations are measured in miliseconds, and file sizes are measured in bytes.

Please only use this repo to provide feedback on **technical issues** with the dataset, such as file corruptions, problems with the partitions, and so on. For more expansive discussions of qualitative discussions, please join us in [Discourse](https://discourse.mozilla.org/c/voice).

## About the Dataset

This dataset features contributions from the Common Voice community on our [web platform](https://commonvoice.mozilla.org). New datasets are released approximately every six months.

All voice contributions are released as part of datasets, regardless of validation status. We only remove clips from datasets at the request of the user. The clips are bundled and uploaded to S3 using the [Common Voice Bundler tool](https://github.com/Common-Voice/common-voice-bundler/).

Each downloaded `.tar.gz` file will have the following structure, where `[lang]` represents the [ISO 639-1 code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) for that language:

```
[lang].tar.gz/
├── clips/
│   ├── *.mp3 files
|__ dev.tsv
|__ invalidated.tsv
|__ other.tsv
|__ test.tsv
|__ train.tsv
|__ validated.tsv
|__ reported.tsv (as of Corpus 5.0)
```

Each `.tsv` file contains a list of files, the annotation (original source sentence) for that clip, a hashed `client_id`, validation data, as well as any relevant demographics. If a language has fewer than 5 unique speakers, demographic data is removed to preserve privacy.

* `validated` contains a list of all clips that have received two or more validations where `up_votes` > `down_votes`
* `invalidated` contains a list of all clips that have received two or more validations where `down_votes` > `up_votes`, or clips that have received three or more validations where `down_votes` = `up_votes`
* `other` contains a list of all clips that have not received sufficient validations to determine their status

As of Corpus 5.0, we are publishing a list of all of the sentences that have been flagged or reported by our contributors for each language, at the request of language communities that wish to use this data to do better quality control on their source sentences.

## Fields
Each row of a tsv file represents a single audio clip, and contains the following information:

* client_id - hashed UUID of a given user
* path - relative path of the audio file
* text - supposed transcription of the audio
* up_votes - number of people who said audio matches the text
* down_votes - number of people who said audio does not match text
* age - age of the speaker*
* gender - gender of the speaker*
* accent - accent of the speaker*
* segment - if sentence belongs to a custom dataset segment, it will be listed here

*For a full list of age, gender, and accent options, see the [demograpics spec](https://github.com/common-voice/common-voice/blob/main/web/src/stores/demographics.ts). These will only be reported if the speaker opted in to provide that information.

## Use for machine-learning

We use the [Mozilla Corpora Creator](https://github.com/mozilla/CorporaCreator) tool to parse through metadata to generate [test, train, and dev](https://en.wikipedia.org/wiki/Training,_validation,_and_test_sets) sets. The Corpora Creator eliminates duplication in clips and maximized for speaker diversity.

Each test/train/dev set is generated non-deterministically, meaning that they will vary from release to release even for minor updates. This is to avoid reproducing and perpetuating any demographic skews in each subsequent set.

## Dataset access

We're aware that downloading large files (> 1-2 GB) over HTTP is not ideal, and we are working on improving our dataset access mechanisms to make it easier for researchers and developers to make use of our corpus. In the meantime, if you find that you are experiencing interruptions to your download, we suggest using `curl` on the command line for this, so that you can resume interrupted downloads with the `-C` option. For more information on how to use `curl`, please see [the man page documentation](https://www.mit.edu/afs.new/sipb/user/ssen/src/curl-7.11.1/docs/curl.html).

## Citation

If you use the data in a published academic work we would appreciate if you cite the following article:

- Ardila, R., Branson, M., Davis, K., Henretty, M., Kohler, M., Meyer, J., Morais, R., Saunders, L., Tyers, F. M. and Weber, G. (2020) "[Common Voice: A Massively-Multilingual Speech Corpus](https://arxiv.org/abs/1912.06670)". _Proceedings of the 12th Conference on Language Resources and Evaluation (LREC 2020)._ pp. 4211—4215

The BiBTex is:

```
@inproceedings{commonvoice:2020,
  author = {Ardila, R. and Branson, M. and Davis, K. and Henretty, M. and Kohler, M. and Meyer, J. and Morais, R. and Saunders, L. and Tyers, F. M. and Weber, G.},
  title = {Common Voice: A Massively-Multilingual Speech Corpus},
  booktitle = {Proceedings of the 12th Conference on Language Resources and Evaluation (LREC 2020)},
  pages = {4211--4215},
  year = 2020
}
```

```

```

const fakeChannels = [
  {
    "_id":"561e35242be79d56cc406ac9",
    "id":111111,
    "name":"E:\\music\\krautrock",
    "description":null,
    "url":"e_music_krautrock",
    "image":"http://cs623125.vk.me/v623125610/321e1/yrqKsdYgmAM.jpg",
    "created":"2015-10-14T10:57:40.127Z",
    "updated":"2015-10-15T10:44:11.632Z",
    "tags": ["kraut", "instrumental", "chill"]
  },
  {
    "_id":"561e356a2be79d56cc406aca",
    "id":222222,
    "name":"God's right hand",
    "description":null,
    "url":"godsrighthand",
    "image":"http://cs621125.vk.me/v621125580/21777/LEyTm5_1tmM.jpg",
    "created":"2015-10-14T10:58:50.864Z",
    "updated":"2015-10-15T10:44:13.505Z",
    "tags": ["stoner", "blues_rock", "experimental"]
  },
  {
    "_id":"561e35812be79d56cc406acb",
    "id":333333,
    "name":"The 13'th Floor",
    "description":null,
    "url":"13th_floor",
    "image":"https://pp.vk.me/c622419/v622419024/454f/cMsO3fmXN9g.jpg",
    "created":"2015-10-15T10:45:07.170Z",
    "updated":"2015-10-15T10:44:15.951Z",
    "tags": ["blues", "country", "psychodelic"]
  },

];

const fakeTracks = [
  {
    "id":"2000337449_410239455",
    "date":1445699109,"artist":"Jaycee Ocean",
    "title":"My new Devil's birthday (Demo)",
    "url":"https://cs9-6v4.vk.me/p3/89561ee5a33d24.mp3?extra=PH42TAvLSgW9AXYmZyMuK_vgFkBBW0fIdZnNdMHd7CjTtnMEAmbg_rs_-LbkcY4zS5QrXJgQ-D8ubCdmVx33uM4SvlBC0DwJcXA",
    "duration":200,"position":1,"channelId":111111,"cover":"https://pp.vk.me/c627624/v627624678/17d85/py-R_Bw1slU.jpg"
  },
  {
    "id":"2000339028_408768117",
    "date":1445699109,"artist":"Jaycee Ocean",
    "title":"Far from light (demo)",
    "url":"https://cs9-3v4.vk.me/p21/a49158ee76d416.mp3?extra=cr9dQSteQIPnQNG-tfdoJcAZsLbtNluy1h6yiDQ11PP7UggvpYrzWGnN7PK_yHcjttwHegmY0FpQmOVd2H-yMYKOYR8ZG3DLv0w",
    "duration":360,"position":2,"channelId":111111,"cover":"https://pp.vk.me/c627624/v627624678/17d85/py-R_Bw1slU.jpg"
  },
  {
    "id":"2000337288_408296248",
    "date":1445699109,"artist":"Jaycee Ocean",
    "title":"Space Jellyfish (Demo)",
    "url":"https://cs9-3v4.vk.me/p15/f5caf80f32874f.mp3?extra=ovZhTsopSmfNsEa6SKmoVYiw8qLdysPUHwnbRoPR4y7smenL4rUPcyaf7gDkqZONXOvt0Di3XOGRanovRjS5V_TzbRouZuzI-Kg",
    "duration":290,"position":3,"channelId":111111,"cover":"https://pp.vk.me/c627624/v627624678/17d85/py-R_Bw1slU.jpg"
  },
  {
    "id":"2000342178_410579241",
    "date":1445720739,"artist":"Mr. Plow",
    "title":"From The Mouth Of Gandalf",
    "url":"https://psv4.vk.me/c422326/u88443393/audios/1bd7381d0632.mp3?extra=ehVMp8Bvrtnd4lWgK2N-7zNBj7vvFUjJd7mtUAmipyKjNZAs0K0ePK_rbUzX7g4x_BSn1KkW6fHc5wpqf1dX1wsJH9Ukcv6uZks",
    "duration":745,"position":1,"channelId":111111,"cover":"https://pp.vk.me/c622718/v622718393/4c460/tRhwNqMCXWU.jpg"
  },
  {
    "id":"2000342642_407489809",
    "date":1445720739,"artist":"Mr. Plow",
    "title":"The Only Reason",
    "url":"https://psv4.vk.me/c422427/u88443393/audios/7258a1152651.mp3?extra=PuF6mhzbLW3Htji_rxS2N09QrImbwYcx2mqkXMnB0-tNdDRQkPVAThpY-mvsFwJPnvalyheKYE6eYfLSPTJD28r2L5OBQVhij6A",
    "duration":223,"position":2,"channelId":111111,"cover":"https://pp.vk.me/c622718/v622718393/4c460/tRhwNqMCXWU.jpg"
  },
  {
    "id":"2000342995_408285715",
    "date":1445720739,"artist":"Mr. Plow",
    "title":"Autozone",
    "url":"https://psv4.vk.me/c422624/u88443393/audios/a574d3012c98.mp3?extra=FBMiSAWaAQtROLH06g6LL7y7KZRpR5gfTObj6lzpSmjvskjLaR18OOv4cOxjmFoHhg2hktTI3zvNKtR4EFV0y0Rux92AsHhMbdM",
    "duration":339,"position":3,"channelId":111111,"cover":"https://pp.vk.me/c622718/v622718393/4c460/tRhwNqMCXWU.jpg"
  },
  {
    "id":"2000344269_406960541",
    "date":1445720739,"artist":"Mr. Plow",
    "title":"Master Blaster",
    "url":"https://psv4.vk.me/c422828/u88443393/audios/fd36b547d070.mp3?extra=nBsIec0FPssf_WfBps6Ws2NCzxqyc3BSAcx1MdaaigbBcdO-niVvfKbNcuMnNrH4SK_xImuUO8miUxpZoubdyQz7QJhKesufxno",
    "duration":183,"position":4,"channelId":111111,"cover":"https://pp.vk.me/c622718/v622718393/4c460/tRhwNqMCXWU.jpg"
  },
  {
    "id":"2000343697_407115737",
    "date":1445720739,"artist":"Mr. Plow",
    "title":"Electric Sheep",
    "url":"https://psv4.vk.me/c613129/u88443393/audios/6087ba2ab1b4.mp3?extra=OjosoFR29PenCUi_2ZpMmj3X8YKM56_mhmoY5ZdXpUP1eOQeTrP96n8AGJUK0ax6SX4V42WMag6mtjhdSvR7D9nbwyxQmisKsgg",
    "duration":301,"position":5,"channelId":111111,"cover":"https://pp.vk.me/c622718/v622718393/4c460/tRhwNqMCXWU.jpg"
  },
  {
    "id":"2000343312_408986945",
    "date":1445720739,"artist":"Mr. Plow",
    "title":"The Dude",
    "url":"https://psv4.vk.me/c611920/u88443393/audios/a6baed594b71.mp3?extra=LQUSNfx5Z3TDp1hgNU7pWOoY1RN23DKI7XkkE-WoBk2JRr8GG-yGiHvz98vjvKPCAYUoALjJlr5PM2UUUqHNq96UOcuXSlWgpV4",
    "duration":289,"position":6,"channelId":111111,"cover":"https://pp.vk.me/c622718/v622718393/4c460/tRhwNqMCXWU.jpg"
  },
  {
    "id":"2000345088_409068806",
    "date":1445720739,"artist":"Mr. Plow",
    "title":"Louder Tha Larry",
    "url":"https://cs9-11v4.vk.me/p19/41f0c984c917ad.mp3?extra=vIVmpo4J6ujHR6Yj7DDwBNvoMbZgLWw-IChJ2tbf2s79VurKPrPnCuehgmXQfRfPG2kEYZp1WNKCJGUQo-5Xs9gzjoj1n3CyTSY",
    "duration":353,"position":7,"channelId":111111,"cover":"https://pp.vk.me/c622718/v622718393/4c460/tRhwNqMCXWU.jpg"
  },
  {
    "id":"2000342303_407626668",
    "date":1445720739,"artist":"Mr. Plow",
    "title":"Ode To Carlo",
    "url":"https://cs9-8v4.vk.me/p10/0057223c3fecf3.mp3?extra=umBzXN54XmvpkL6B2e0DApWInPPMgxz2xAMKe3hUu4-fVQ0RAFdi-e9wq4ZNAQKiApH0RqKWi4RMCAlVeOMEkDRT3Ycc8R_1cfk",
    "duration":340,"position":8,"channelId":111111,"cover":"https://pp.vk.me/c622718/v622718393/4c460/tRhwNqMCXWU.jpg"
  },
  {
    "id":"2000341754_406949481",
    "date":1445720739,"artist":"Mr. Plow",
    "title":"Festivus",
    "url":"https://cs9-12v4.vk.me/p24/eebdf5edafee4a.mp3?extra=x-EWEQ_o5vdtrDNMz-40P3FHwRVEVIMuF28qCSS2ScLm6gzF8eUj5k-eVy2ZTnVTnap-jODILO9eBMvPQdJ8HO5zkJ0KF9rMhDU",
    "duration":238,"position":9,"channelId":111111,"cover":"https://pp.vk.me/c622718/v622718393/4c460/tRhwNqMCXWU.jpg"
  },
  {
    "id":"2000343565_406583106",
    "date":1445882705,"artist":"Geezer",
    "title":"Long Dull Knife (digital single)",
    "url":"https://cs9-8v4.vk.me/p13/52bd5771269293.mp3?extra=U4vwjMMMzVvyZWIu3J-gQf7wM98p1PfGv3ngewh_U6ggJxHUTmyIHlIKMxg43jyMjgLKqRh1xuuRlrq3xgkdjXWno3UsfvHdvas",
    "duration":368,"position":1,"channelId":111111,"cover":"https://pp.vk.me/c622718/v622718507/4ecb4/glo2QpSbrQE.jpg"
  },
  {
    "id":"2000345265_407311266",
    "date":1445925635,"artist":"Hyne",
    "title":"Into the Sun",
    "url":"https://psv4.vk.me/c613825/u45304509/audios/6559b68df3e1.mp3?extra=h2BpTRftTX9RP4VWQ6JVoVZtjWV0_cQjtLS6a71lk2bqfH9y5GqVyQYCsuebf-kmQ-eCjZZQeBpQ5luprR0vGNWQETjc8zxqksY",
    "duration":368,"position":1,"channelId":111111,"cover":"https://pp.vk.me/c625426/v625426509/5325c/fuCJfycpL60.jpg"
  },
  {
    "id":"2000345191_409726566",
    "date":1445925635,"artist":"Hyne",
    "title":"Ride the Snake",
    "url":"https://psv4.vk.me/c613825/u45304509/audios/46620d6f0dd7.mp3?extra=5w23s72EMrrDWN7OhXCZ85HoYwBkxq32Go0aMXWyFU-yc9651dGxsAkyI8cmawZszLLbaAniI_JYCIS7jCpKClx8tjkF4qkLpvE",
    "duration":244,"position":2,"channelId":111111,"cover":"https://pp.vk.me/c625426/v625426509/5325c/fuCJfycpL60.jpg"
  },
  {
    "id":"2000348660_409892754",
    "date":1445925635,"artist":"Hyne",
    "title":"Monkey's Paw",
    "url":"https://psv4.vk.me/c613825/u45304509/audios/6ccc68e51b7d.mp3?extra=SCsMXb0zq2PUg0f2-L9dMo-Yxc-p7o0BOy3GQ0C0FTOsb9wFyiLQC7atNpf0LA1tGnZfxorweSCYA8YDJe5gHuADnlQrNGGmCS8",
    "duration":260,"position":3,"channelId":222222,"cover":"https://pp.vk.me/c625426/v625426509/5325c/fuCJfycpL60.jpg"
  },
  {
    "id":"2000348985_408665568",
    "date":1445925635,"artist":"Hyne",
    "title":"Orbit",
    "url":"https://psv4.vk.me/c613825/u45304509/audios/026cf37af27a.mp3?extra=xpma2qz-4Ak46rTHSDffNsb8CqDekpgYBSsKjwx5mCNR9sfJQ3DHDyRF9UZ6y2yMS70s9zXjg3SGYEpAyTJFyMXA1afMwDIw8dg",
    "duration":225,"position":4,"channelId":222222,"cover":"https://pp.vk.me/c625426/v625426509/5325c/fuCJfycpL60.jpg"
  },
  {
    "id":"2000347179_410063978",
    "date":1445925635,"artist":"Hyne",
    "title":"The Apprentice",
    "url":"https://psv4.vk.me/c613825/u45304509/audios/679a28d825a6.mp3?extra=A5g3eMx29gzvmGmRVYBR3sRNNiMPaEsSoNBhOMTtmNKyrAT_M3in-ixwiOtf48XP7Gomk3KAKcth85s2219Nzk-ZDyBpR4hFXl0",
    "duration":471,"position":5,"channelId":222222,"cover":"https://pp.vk.me/c625426/v625426509/5325c/fuCJfycpL60.jpg"
  },
  {
    "id":"2000347601_408396395",
    "date":1445925635,"artist":"Hyne",
    "title":"Keep It Low",
    "url":"https://cs9-15v4.vk.me/p13/debe12b4da04f2.mp3?extra=eSf-iF4gBY91de0cJKnzDeyotBtdqBa089RQI1CjRJoEmwvDO3kRP6RXbYzJM2SkajylxxYyaT3WuUdeTRb9Y0xTgK4lvIAxhCc",
    "duration":292,"position":6,"channelId":222222,"cover":"https://pp.vk.me/c625426/v625426509/5325c/fuCJfycpL60.jpg"
  },
  {
    "id":"2000348952_408796329",
    "date":1445925635,"artist":"Hyne",
    "title":"Undertow",
    "url":"https://cs9-3v4.vk.me/p17/8ef05bff494c55.mp3?extra=OlsgQNHtrQeNafc0GJhwZe3OxfEPVxDQNjirBztQkjNtL1ByiG3eTzwNPc7urKQERZUQKXjhFokly5_Xp3Twxr3Vgl6blFYlWQ8",
    "duration":230,"position":7,"channelId":222222,"cover":"https://pp.vk.me/c625426/v625426509/5325c/fuCJfycpL60.jpg"
  },
  {
    "id":"2000346485_408665567",
    "date":1445925635,"artist":"Hyne",
    "title":"Black Paint",
    "url":"https://cs9-14v4.vk.me/p9/d13524a19da3e0.mp3?extra=bxbk90EAXk74y2bso8sDsvgjJYtGH15Wtw-f4LqSbHCpgvKNodKOpZRM4O7pkwNl8M4q7IA8HEn-HM7AIQX9B-oswRl90r_rkKY",
    "duration":373,"position":8,"channelId":222222,"cover":"https://pp.vk.me/c625426/v625426509/5325c/fuCJfycpL60.jpg"
  },
  {
    "id":"2000346121_409633995",
    "date":1445952017,"artist":"All Them Witches",
    "title":"Blood and Sand ／ Milk and Endless Waters",
    "url":"https://psv4.vk.me/c613321/u272639628/audios/7cd366e41fa8.mp3?extra=rXJOIKXgY7Pc2CTXc4kphhugXkNFWKsVO12Pbky93IusOvhrza7xRi8yKEDG8TordU4qlg1LzSdQNKcE6NKvGfBkmM_JygQOjwE",
    "duration":440,"position":1,"channelId":222222,"cover":"https://pp.vk.me/c625426/v625426628/4e802/zrFxqFqvfD4.jpg"
  },
  {
    "id":"2000346695_408873706",
    "date":1445952017,"artist":"All Them Witches",
    "title":"Talisman",
    "url":"https://psv4.vk.me/c613321/u272639628/audios/c07b361f2149.mp3?extra=PaMyjyKFLN9wx4Dba6dTOrB1Pq6_STZeYOK7M7CzOQWrBCmbCdRPwX7ez3YjurRkA67mbnLHWxVpdKk58pPGrhGFHfCE9v_zaOs",
    "duration":367,"position":2,"channelId":222222,"cover":"https://pp.vk.me/c625426/v625426628/4e802/zrFxqFqvfD4.jpg"
  },
  {
    "id":"2000346750_409241704",
    "date":1445952017,"artist":"All Them Witches",
    "title":"Instrumental 2 (Welcome to the Caveman Future)",
    "url":"https://psv4.vk.me/c613321/u272639628/audios/e031e91b822b.mp3?extra=z6BllUTqesBxKeT9fd7EEQOUtMRVnb7aQ5Cu_8AqIQWVbYFSe16GCcG6Ogq-hgd8h31-Sexs4r-OZ_TmFyVszXA9TDVltkLIRAI",
    "duration":152,"position":3,"channelId":222222,"cover":"https://pp.vk.me/c625426/v625426628/4e802/zrFxqFqvfD4.jpg"
  },
  {
    "id":"2000347537_408202718",
    "date":1445952017,"artist":"All Them Witches",
    "title":"Open Passageways",
    "url":"https://cs9-12v4.vk.me/p15/f4facf5b2c4033.mp3?extra=dntaTecFi8EtLo_ZqcNQpS04FHHzHbeF41NlVydjBFZXOaYhJIYIwtTs1pmM7VMy1c-TIlSSHuGf93klu-qzy26D-07mKjWs43I",
    "duration":194,"position":4,"channelId":222222,"cover":"https://pp.vk.me/c625426/v625426628/4e802/zrFxqFqvfD4.jpg"
  },
  {
    "id":"2000349296_408625338",
    "date":1445952017,"artist":"All Them Witches",
    "title":"Mellowing",
    "url":"https://cs9-14v4.vk.me/p24/2e1258ed14ba73.mp3?extra=d0tNM7Lqha8Tn2wyzWYn1khocOc1Yg3RnZG6o6OM7KBncC_qf_AuCtY4kL4tvMucuNVp2P-8wsoWcLkgSzzemfVw0w89ul5yl30",
    "duration":191,"position":5,"channelId":222222,"cover":"https://pp.vk.me/c625426/v625426628/4e802/zrFxqFqvfD4.jpg"
  },
  {
    "id":"2000346306_406183509",
    "date":1445952017,"artist":"All Them Witches",
    "title":"This Is Where It Falls Apart",
    "url":"https://cs9-4v4.vk.me/p6/fdb9a4b419564b.mp3?extra=Epy-686opkzc1HaYBLK2FNDrO6eA-X1PMkliLgABCzmq_IXfcZvQFT5eM63HKDZFpfogsS4p6Rs8mh9QkVNhURYbomBZ6mb11PI",
    "duration":422,"position":6,"channelId":222222,"cover":"https://pp.vk.me/c625426/v625426628/4e802/zrFxqFqvfD4.jpg"
  },
  {
    "id":"2000348816_409519336",
    "date":1445952017,"artist":"All Them Witches",
    "title":"Dirt Preachers",
    "url":"https://cs9-8v4.vk.me/p9/bae55c60dbc7d9.mp3?extra=IsK9RsfCi5WTzNsK-FTHRQdwJxAYMG3IYBUT80lSEVLyvLNeDYAU7wDKufmJN0JXosMMvQiuzb04LK1PeGahYX53tLTaYR-M5dE",
    "duration":224,"position":7,"channelId":222222,"cover":"https://pp.vk.me/c625426/v625426628/4e802/zrFxqFqvfD4.jpg"
  },
  {
    "id":"2000347528_410134705",
    "date":1445952017,"artist":"All Them Witches",
    "title":"El Centro",
    "url":"https://cs9-3v4.vk.me/p23/2ea2e5c34b1aa5.mp3?extra=q0lV_6ecP-ZynfZmFV8cWWe0ARUWjN91yFOQuTBCrqdkyhRzTIq8wOz0c0OdB6RGr84PLm79A4Oeoi3I2CcUPEDGwcIWVVsfdS4",
    "duration":505,"position":8,"channelId":222222,"cover":"https://pp.vk.me/c625426/v625426628/4e802/zrFxqFqvfD4.jpg"
  },
  {
    "id":"2000345830_408929230",
    "date":1445952017,"artist":"All Them Witches",
    "title":"Call Me Star",
    "url":"https://cs9-7v4.vk.me/p12/3b124b454fcaee.mp3?extra=esqf-qfmvu9f4B7sWsZ0JBfsUvzee8MuLmdZeR3MeVgF4pkHjFKdnVr5y9mEDSSFr8HbAB0PoqYVbPAEcVpG8aVMsS8tKHt8c8s",
    "duration":234,"position":9,"channelId":222222,"cover":"https://pp.vk.me/c625426/v625426628/4e802/zrFxqFqvfD4.jpg"
  },
  {
    "id":"2000313779_405444868",
    "date":1445961900,"artist":"Karma Sutra",
    "title":"07 Live 2015-08-13",
    "url":"https://psv4.vk.me/c611128/u77146088/audios/13f70a3ded44.mp3?extra=1VvMKaIFwKtE5ytjPDQN59p5Zt1l8VArYJqb2CxThHKfYWkeyx-B1GOfz5c3DS2mHFbcAMzXxhVdhR5JUpRLj4IrRF5Wocjm7f4",
    "duration":650,"position":1,"channelId":222222,"cover":"https://pp.vk.me/c629400/v629400088/1c0b0/w50pI_ENoW0.jpg"
  },
  {
    "id":"2000311978_406417843",
    "date":1445961900,"artist":"Karma Sutra",
    "title":"06 Live 2015-08-13",
    "url":"https://psv4.vk.me/c422321/u77146088/audios/8258f28e1c4b.mp3?extra=D5_kyHzattwlDokx973Wbr0Qs_wiBqrY34CKRgBpT-DvOCgfiOw_RCzXBHTKLU1Pck_WtUnrlsscRkCid_3e117122xJs4MTS2g",
    "duration":349,"position":2,"channelId":333333,"cover":"https://pp.vk.me/c629400/v629400088/1c0b0/w50pI_ENoW0.jpg"
  },
  {
    "id":"2000314318_402536320",
    "date":1445961900,"artist":"Karma Sutra",
    "title":"05 Live 2015-08-13",
    "url":"https://psv4.vk.me/c611317/u77146088/audios/15cc88f3ea55.mp3?extra=DdNw1qVrbTyRYMbohF5fm_wEbKsrQmJL3AfxWUJVTmBlXBP3IOWJRRMlMMw7EtwNXtO_PzLTIspqgCg1qH9hho6kZ_2ClPt5H-k",
    "duration":250,"position":3,"channelId":333333,"cover":"https://pp.vk.me/c629400/v629400088/1c0b0/w50pI_ENoW0.jpg"
  },
  {
    "id":"2000315090_403784295",
    "date":1445961900,"artist":"Karma Sutra",
    "title":"04 Live 2015-08-13",
    "url":"https://psv4.vk.me/c611825/u77146088/audios/4715bb7ec202.mp3?extra=PuHrbZMABnmFq_TNkeaQDChvlavlRcm8ssJ4VdZr_HfIyMnc1jE_7x07eCCoNLlV9SmNvYxNzsJqIYP-G0bWwTDckeRYLiMQiYE",
    "duration":436,"position":4,"channelId":333333,"cover":"https://pp.vk.me/c629400/v629400088/1c0b0/w50pI_ENoW0.jpg"
  },
  {
    "id":"2000311815_403993117",
    "date":1445961900,"artist":"Karma Sutra",
    "title":"03 Live 2015-08-13",
    "url":"https://psv4.vk.me/c611330/u77146088/audios/684dbfb245a5.mp3?extra=zX9cSzap_BjLtpCb-6kFvsSfBGQbe0DHS8618AD1uxk71VRvb70AYcXzbaaKYqTJHBG_0mLJsNvVWu7KUfK9VSGmg2J-SbszCsI",
    "duration":268,"position":5,"channelId":333333,"cover":"https://pp.vk.me/c629400/v629400088/1c0b0/w50pI_ENoW0.jpg"
  },
  {
    "id":"2000311667_406128942",
    "date":1445961900,"artist":"Karma Sutra",
    "title":"02 Live 2015-08-13",
    "url":"https://psv4.vk.me/c611618/u77146088/audios/9f448bbfa93a.mp3?extra=XdhtLLol0ILZ2fBr4o2XqeEBqFqxdtj6TF_969CR1ULyqeBV9-UkpS05nm-hl1qz06ZYjneF4duX7yoVGE5rNpaHQew-BCCpooc",
    "duration":301,"position":6,"channelId":333333,"cover":"https://pp.vk.me/c629400/v629400088/1c0b0/w50pI_ENoW0.jpg"
  },
  {
    "id":"2000311873_404128783",
    "date":1445961900,"artist":"Karma Sutra",
    "title":"01 Live 2015-08-13",
    "url":"https://cs9-11v4.vk.me/p18/251753be85fea9.mp3?extra=-iVD8wPapza-ncO9naX4sNaBbDxzTsM1juIDcRu0rL-J2zbH-W6VWK2F4Oj-x3BQmLuYkzv9cwtiCJ49coEd8WpZ_56ZGi5OEXE",
    "duration":401,"position":7,"channelId":333333,"cover":"https://pp.vk.me/c629400/v629400088/1c0b0/w50pI_ENoW0.jpg"
  },
  {
    "id":"2000333952_407179494",
    "date":1445366469,"artist":"Love Is",
    "title":"Spacejets",
    "url":"https://cs9-11v4.vk.me/p12/59efae136a34db.mp3?extra=Cw_GbNygPlKIXs-9ztyBiXO8yFwqW-t_veumH1gcWHmRaytSk3wLoDTUrf7sVkIsfThWhDDZGNh8HfT8fh8hG9gLr0Dp3NVBtWg",
    "duration":401,"position":1,"channelId":333333,"cover":"https://pp.vk.me/c627625/v627625962/2498e/eqchJ-GN3T4.jpg"
  },
  {
    "id":"2000334914_406850287",
    "date":1445366469,"artist":"Blind Dog",
    "title":"Coming To",
    "url":"https://cs9-3v4.vk.me/p11/abd84058379d73.mp3?extra=AegkWzJsqpQR_l5cDZU3mL84P7KEW_GzofqlCYmLnAVh90ZXaakp_Yr5tQqPyc7VpytkiJd6C0CeyLtMHaJFJ1Izpz-cSWjz83s",
    "duration":488,"position":2,"channelId":333333,"cover":"https://pp.vk.me/c627625/v627625962/2498e/eqchJ-GN3T4.jpg"
  },
  {
    "id":"2000146069_381573000",
    "date":1445366469,"artist":"The Heavy Minds",
    "title":"Rivers",
    "url":"https://cs9-11v4.vk.me/p18/885063d98427c5.mp3?extra=EzXbwrvhNJUVMcLK6U6VX6EMDJFw6s95haKQj823B8jJ-6ArzVy7Ni4ppjInhmRqoYyw_QCFjAyr5jzwi5pxsFsbAZwMXfi41Bg",
    "duration":217,"position":3,"channelId":333333,"cover":"https://pp.vk.me/c627625/v627625962/2498e/eqchJ-GN3T4.jpg"
  },
  {
    "id":"2000336944_409136467",
    "date":1445366469,"artist":"Elder",
    "title":"Compendium",
    "url":"https://cs9-2v4.vk.me/p14/8e224a1141ab0f.mp3?extra=V1hcsphn5iPrV9PRUVPj2eEGzzfk_mVedX5lDojm0Skv_XqnitxTWud7wyIIQpfmGCo54qG_s358h6Wiywz6gOtraMK2VO9C6yk",
    "duration":639,"position":4,"channelId":333333,"cover":"https://pp.vk.me/c627625/v627625962/2498e/eqchJ-GN3T4.jpg"
  },
  {
    "id":"2000301721_339141902",
    "date":1445366469,"artist":"Whores.",
    "title":"Baby Bird",
    "url":"https://cs9-11v4.vk.me/p9/055b57ad3b8684.mp3?extra=b2E3J6DOqWFp6fJXzRdk2d7CgFSEy8YF6h5kbSp5i5Z1PezX3mXuDmurPfleLYchA56Bt1z43eeoNTbYBNCtE4FwOzWmdPjFmGA",
    "duration":221,"position":5,"channelId":333333,"cover":"https://pp.vk.me/c627625/v627625962/2498e/eqchJ-GN3T4.jpg"
  },
  {
    "id":"2000334664_407122198",
    "date":1445366469,"artist":"Black Medicine",
    "title":"Riots Rage",
    "url":"https://cs9-6v4.vk.me/p6/cb201c2cf763ee.mp3?extra=HWrYZTSsWIZaRsXBYdaVf6KCVTutkpk0xiIcu5-skFVdQ9kqk1-HqFH5DDetZiAH6JEym81YhEAKRUBAZU-gPvckkskbTccMnW8",
    "duration":459,"position":6,"channelId":333333,"cover":"https://pp.vk.me/c627625/v627625962/2498e/eqchJ-GN3T4.jpg"
  },
  {
    "id":"2000213316_391465161",
    "date":1445366469,"artist":"Fuzziebär",
    "title":"Funny Ass Joke",
    "url":"https://cs9-8v4.vk.me/p19/7ca6b021a749ff.mp3?extra=Ddz8S2ZII4ujW_DkcQAUh_VdobxG1p_TdUX3YZ_M4j-DS5rergYbFpstbZrG6uXzfQS1340gGsAbq1H8xw0d3tpQn6J8Iu4OYxo",
    "duration":361,"position":7,"channelId":333333,"cover":"https://pp.vk.me/c627625/v627625962/2498e/eqchJ-GN3T4.jpg"
  },
  {
    "id":"2000285433_400288071",
    "date":1445366469,"artist":"Wonder Vincent",
    "title":"Doombo",
    "url":"https://cs9-10v4.vk.me/p19/bb461a5e13d7c9.mp3?extra=SkeQeZPxz4GrPijlxEVXMulAg9Eva5w3ZYKoCE7i53GmWh5gScjZvTYCjJWYUaBNgE7uCsbrLfK4YjFxPUvW623vuKAngO-ZJ54",
    "duration":334,"position":8,"channelId":333333,"cover":"https://pp.vk.me/c627625/v627625962/2498e/eqchJ-GN3T4.jpg"
  },
  {
    "id":"2000336818_405564400",
    "date":1445366469,"artist":"Suplecs",
    "title":"Stalker",
    "url":"https://cs9-3v4.vk.me/p22/5e44bb1cec0a0a.mp3?extra=mUM9OojBIxptzrrhKegy1Mjb8O5YmU3ggMvy_FWErzQw-DETpzKy44eTohe26E_N1-O40RtqjVbWQc5M4Lvz6LWwTEjmk-aa2jE",
    "duration":253,"position":9,"channelId":333333,"cover":"https://pp.vk.me/c627625/v627625962/2498e/eqchJ-GN3T4.jpg"
  }
];

export default {
  player: {
    track: null,
    position: 0,
    isPlaying: false,
    isLoading: false,
  },

  channels: {
    picked: [111111, 222222],
    items: fakeChannels,
  },

  tracks: {
    items: fakeTracks,
  },
};

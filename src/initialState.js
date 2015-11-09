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
  {"id":"2000360734_410744500","date":1446403836,"artist":"Moebius, Plank & Thompson","title":"Boy Boy Boy","url":"https://psv4.vk.me/c613821/u226313522/audios/115da65acf0f.mp3?extra=kVLheP88W6Tl9PMAy02CuRpCfS1aQibcfu0J8oMXN0TnaGd3bOO2-F4DGyalD7d_JM5nWe3wBXNCV9eguKl9eVCKMpwm_7U","duration":196,"position":1,"channelId":111111,"cover":"https://pp.vk.me/c629403/v629403522/34444/wC5v86dJT_Y.jpg"},{"id":"2000360368_411393174","date":1446403836,"artist":"Moebius, Plank & Thompson","title":"Taras Bulba","url":"https://psv4.vk.me/c613821/u226313522/audios/812073e9e985.mp3?extra=9HNWd5auR8BIplfwfezXnffnlQkShYDFuhgHf3egMV6j1ra9EQPG8Z7Vk97cuP8YfCDgijyDdOLOVH9-V_u33Y74AhU7m5o","duration":306,"position":2,"channelId":111111,"cover":"https://pp.vk.me/c629403/v629403522/34444/wC5v86dJT_Y.jpg"},{"id":"2000361067_412494033","date":1446403836,"artist":"Moebius, Plank & Thompson","title":"Gestalt","url":"https://psv4.vk.me/c613319/u226313522/audios/115fce1d32c5.mp3?extra=Wuc_4lZwOueWxCZUgXUmpPX84qSoxT05sLbwYU0jmTsH2ThpVz7Nhq4rO4ofz5-4Ld4gaq2SLlAEz0hSihwHByTyY500T9U","duration":284,"position":3,"channelId":111111,"cover":"https://pp.vk.me/c629403/v629403522/34444/wC5v86dJT_Y.jpg"},{"id":"2000358375_410567234","date":1446403836,"artist":"Moebius, Plank & Thompson","title":"Farmer Gabriel","url":"https://psv4.vk.me/c613821/u226313522/audios/9df097cdeffc.mp3?extra=cWeYPCY1fHQTaVkY-lgmeW1Zk9d_xBdAom5QHN1djC5zLJ-QjU-gUbbIx_yLWUVfBD78cNo87ayBimpc-jeEmXlH3OUiLC0","duration":291,"position":4,"channelId":111111,"cover":"https://pp.vk.me/c629403/v629403522/34444/wC5v86dJT_Y.jpg"},{"id":"2000360096_410259508","date":1446403836,"artist":"Moebius, Plank & Thompson","title":"42","url":"https://psv4.vk.me/c613821/u226313522/audios/0a3b4f69fc24.mp3?extra=Bv6sqMGrT-QQha0XxuzPxiNpyQlphDQ6u0k_NIk6l1VVJWOquFO56mmbR2le-UHAjraNDo__3BvTJzXgXZw1jXjQIaSc6qI","duration":224,"position":5,"channelId":111111,"cover":"https://pp.vk.me/c629403/v629403522/34444/wC5v86dJT_Y.jpg"},{"id":"2000357459_410432838","date":1446403836,"artist":"Moebius, Plank & Thompson","title":"Ludwig's Law","url":"https://psv4.vk.me/c613821/u226313522/audios/23b763b6bbe8.mp3?extra=zpkS9_j4rlIbowsNDQsrCQ9UPni8zqWvEhGVM--y0sEbhskmRKdp8eSWWsbb-z_i-dYq5J_VOawKPunkub7CAdksB3NiQCw","duration":260,"position":6,"channelId":111111,"cover":"https://pp.vk.me/c629403/v629403522/34444/wC5v86dJT_Y.jpg"},{"id":"2000359228_411766674","date":1446403836,"artist":"Moebius, Plank & Thompson","title":"The Truth","url":"https://psv4.vk.me/c613821/u226313522/audios/bfa31beac151.mp3?extra=4P2xAWwT6fNHAMr7JjZ-YDynl9Kd5STYOlVVC_6W6DIoEvbJhUcls4XJNSLjXW0QnKXWR1lOu9-Be5wmqvnJsXU987SV-3M","duration":311,"position":7,"channelId":111111,"cover":"https://pp.vk.me/c629403/v629403522/34444/wC5v86dJT_Y.jpg"},{"id":"2000358101_410120817","date":1446403836,"artist":"Moebius, Plank & Thompson","title":"Das Apartment","url":"https://psv4.vk.me/c613821/u226313522/audios/9fa5f9437b5a.mp3?extra=4ZCmYP7mZ7rrCK3ZuU2k14P2n1s-E-fIDjcmZND4VSlu_LDM4plDY9bE2qoivC594Cvzwi0ApiGIx3tOxsQjBVuJmvZ57yk","duration":270,"position":8,"channelId":111111,"cover":"https://pp.vk.me/c629403/v629403522/34444/wC5v86dJT_Y.jpg"},{"id":"2000359141_410602628","date":1446403836,"artist":"Moebius, Plank & Thompson","title":"Scientists","url":"https://psv4.vk.me/c613821/u226313522/audios/3d2cf82590ce.mp3?extra=DDf46KhdML27NJdqbS8v78DAFANwudQ0wgCuCHEIx57V_E4l9ZWnPx7BMpVcIncEjIoaBChnblX7ghVRSN_cmnJzOmHQLxE","duration":40,"position":9,"channelId":111111,"cover":"https://pp.vk.me/c629403/v629403522/34444/wC5v86dJT_Y.jpg"},{"id":"2000359236_410658691","date":1446473194,"artist":"Krautwerk","title":"VIII","url":"https://psv4.vk.me/c613328/u226313522/audios/2057987397d9.mp3?extra=az4ey5xjYyDtc-1zHscnX7UrkuF-hSdiB2MQidyy6PnxofS-1KpaBT4v1EvGQB6e_fuGnRUibnZNrHS_fWa2vevKsJm2_Ck","duration":418,"position":1,"channelId":111111,"cover":"https://cs7059.vk.me/c625322/v625322522/46d90/WV_9IiWkunE.jpg"},{"id":"2000362229_412177666","date":1446473194,"artist":"Krautwerk","title":"VII","url":"https://psv4.vk.me/c613328/u226313522/audios/c22955064ba6.mp3?extra=wJ3fTojugRrRvB57od1anKrZPVh-wpsaYmx22MQyj8aaZO77OY8fGKZ9mv8WDUrK29CE23iDtVBKbZsS8X3jhQan1ZdWOUc","duration":594,"position":2,"channelId":111111,"cover":"https://cs7059.vk.me/c625322/v625322522/46d90/WV_9IiWkunE.jpg"},{"id":"2000362280_411466340","date":1446473194,"artist":"Krautwerk","title":"VI","url":"https://psv4.vk.me/c613328/u226313522/audios/28723ee1e373.mp3?extra=qBmRvn1oIEVdJMaFoIspQzLigUn6kD84UJjLUF4jBTZwyCHnKPPP3ov0W68W6MzMlxNOQZ85uvXIVJrPQTV98nqj6iK9Yn0","duration":409,"position":3,"channelId":111111,"cover":"https://cs7059.vk.me/c625322/v625322522/46d90/WV_9IiWkunE.jpg"},{"id":"2000361438_409142548","date":1446473194,"artist":"Krautwerk","title":"V","url":"https://psv4.vk.me/c613328/u226313522/audios/e8d055f856f8.mp3?extra=ueTwHaViJXUAAB2nVC9_fXZThUi7Oor4Mnt4aMW91AKqt44YglQu8b_F9N5Z7K3Xxe1IKfFNOBBv5hKjMlmmB0Au7mLNJCE","duration":398,"position":4,"channelId":111111,"cover":"https://cs7059.vk.me/c625322/v625322522/46d90/WV_9IiWkunE.jpg"},{"id":"2000359394_412846997","date":1446473194,"artist":"Krautwerk","title":"IV","url":"https://psv4.vk.me/c613328/u226313522/audios/eaab570a357c.mp3?extra=fO6132zhIwMiPpM7zP-DUoYiDt-ViEfHmZ028yVuM_HZ63QPK6Zg5GxGPJ8he82Ge0gavWXjnTp3owo9IjR8eD01nYbgZw8","duration":376,"position":5,"channelId":111111,"cover":"https://cs7059.vk.me/c625322/v625322522/46d90/WV_9IiWkunE.jpg"},{"id":"2000361855_410630321","date":1446473194,"artist":"Krautwerk","title":"III","url":"https://psv4.vk.me/c613328/u226313522/audios/f40b4f894b99.mp3?extra=1YOFHSKoMjO_f5-Env4qkyeKTLGs0QuP_4h2ld06zT9v8I0anxRYWIxmgMlWWcbyThfGQx4lDa3fMncshs8NAAEXn1IednQ","duration":547,"position":6,"channelId":111111,"cover":"https://cs7059.vk.me/c625322/v625322522/46d90/WV_9IiWkunE.jpg"},{"id":"2000361437_409992974","date":1446473194,"artist":"Krautwerk","title":"II","url":"https://psv4.vk.me/c613328/u226313522/audios/73f877b8d04e.mp3?extra=pNNvkK1oUseOiLOe14au5dnjDykj8xIz2DvieJt4RGm32sF2ywC0cz3F9F8-55SaSKh-t0OYz9_rLBJTU3q9TRpzsBYMo94","duration":240,"position":7,"channelId":111111,"cover":"https://cs7059.vk.me/c625322/v625322522/46d90/WV_9IiWkunE.jpg"},{"id":"2000359894_412846995","date":1446473194,"artist":"Krautwerk","title":"I","url":"https://psv4.vk.me/c613328/u226313522/audios/ee9dc4dd2cc2.mp3?extra=AFYamQJbBAhmtLpLuERomzDodRJ86wjGFVRg2LMgDkpvuyU1jkSFjLwou-Jt2vNoNoBFQtSGERq8g4ioKSc6HsmV7BURqhY","duration":393,"position":8,"channelId":111111,"cover":"https://cs7059.vk.me/c625322/v625322522/46d90/WV_9IiWkunE.jpg"},{"id":"2000361306_408110900","date":1446580808,"artist":"Datashock","title":"Tod in der Saarvanne","url":"https://psv4.vk.me/c611321/u226313522/audios/c2b72409dcd9.mp3?extra=z9ipkmJclI5LeWjzjhOM46BogjNHWS_Xr-AXfV2YXjbzfTlNSVlZNsjzxw-CYatue7o90UjnhAvSl-SXQEIW3Yl4_Z5sBGQ","duration":263,"position":1,"channelId":111111,"cover":"https://cs7059.vk.me/c625322/v625322522/46e52/QrX49QKP7A8.jpg"},{"id":"2000362319_410261803","date":1446580808,"artist":"Datashock","title":"Her mit dem Kelch, (das) hier muss es sein","url":"https://psv4.vk.me/c611321/u226313522/audios/8575ac8b888d.mp3?extra=u2K9NnzXextsaIBz_-WaPYvz_Yh__-ejQZ736KR2Tmkz9o16mjJhCWzWe9Sm-PVaoJsKIho3VzIYjCZoKAbxjEMt9EauhbQ","duration":282,"position":2,"channelId":111111,"cover":"https://cs7059.vk.me/c625322/v625322522/46e52/QrX49QKP7A8.jpg"},{"id":"2000359612_411509627","date":1446580808,"artist":"Datashock","title":"Ekstase der Wahrheit","url":"https://psv4.vk.me/c611321/u226313522/audios/b9f9c251401c.mp3?extra=2nGorD5CySB8XkQuBniq04jtsFN7gklK77eE2kurT6n_b9w9D7QZJgLjUe7Wn_8ITqQcvt2UL433L1f_CaP2jzN4WEkY1IE","duration":219,"position":3,"channelId":111111,"cover":"https://cs7059.vk.me/c625322/v625322522/46e52/QrX49QKP7A8.jpg"},{"id":"2000359717_411691505","date":1446580808,"artist":"Datashock","title":"Fanta Morgana","url":"https://psv4.vk.me/c611321/u226313522/audios/8d69e2cb968b.mp3?extra=23_HSL5L2xsy-V0_tl3rwLGek07gGa7LrnovuCdwBIukrKva_ksvAghuZAfS0zI8zchP_sgXa-IaN9eQ6LVRz7vGhTmbvUk","duration":420,"position":4,"channelId":111111,"cover":"https://cs7059.vk.me/c625322/v625322522/46e52/QrX49QKP7A8.jpg"},{"id":"2000363369_409508997","date":1446580808,"artist":"Datashock","title":"Rubinregen aus der spirituellen Sphäre","url":"https://psv4.vk.me/c611321/u226313522/audios/8e902d6d5c04.mp3?extra=_igOC9Xf4BJWS1-cutQPf978m-GP-Iv9UMUwU-S7kgHzwxFYMML1AyPeCa9A1pjuRMlR-bo1yxa64T_VybiXmMV3ECcrvcU","duration":405,"position":5,"channelId":111111,"cover":"https://cs7059.vk.me/c625322/v625322522/46e52/QrX49QKP7A8.jpg"},{"id":"2000362886_410132046","date":1446580808,"artist":"Datashock","title":"Obsidian Karavan und die acht Drachmen","url":"https://psv4.vk.me/c611321/u226313522/audios/4119c07a574c.mp3?extra=wsTiJgxSKFWMKSeGAZ2e7LU_5feWhp4Vy-cwe1RoFOiVroMrvv8nA9vsvdNOOnsyzPF4arBjONOkwfxZuoCjqA8Nv8z79C0","duration":706,"position":6,"channelId":111111,"cover":"https://cs7059.vk.me/c625322/v625322522/46e52/QrX49QKP7A8.jpg"},{"id":"2000362108_416687821","date":1446580808,"artist":"Datashock","title":"Der verschleierte Helm des Pharaooze","url":"https://psv4.vk.me/c611321/u226313522/audios/42b9454f4070.mp3?extra=8p5VxwZaIXKzRzivXmvKDBeD1V4dgMndWM0HQI8BA6F6AiCMgcPGG3Z0mRXHye_HiNWwf70q163rzbQtmMCLIxEH90EDDs0","duration":243,"position":7,"channelId":111111,"cover":"https://cs7059.vk.me/c625322/v625322522/46e52/QrX49QKP7A8.jpg"},{"id":"2000362232_409775458","date":1446580808,"artist":"Datashock","title":"Keine Oase in Sicht","url":"https://psv4.vk.me/c611321/u226313522/audios/1ea01dd6ce66.mp3?extra=NN0kkxluSc9cCD0UzXIktP1SYFXP3dcJmSif5-XtcupNhJRMGps_SKkbMQzN6zyvKRSxF7JMOCI4B60fQuBrIC_qD5SLghA","duration":390,"position":8,"channelId":111111,"cover":"https://cs7059.vk.me/c625322/v625322522/46e52/QrX49QKP7A8.jpg"},{"id":"2000363273_410800403","date":1446580808,"artist":"Datashock","title":"Mudschahidin der Liebe","url":"https://psv4.vk.me/c611321/u226313522/audios/ad092b87d190.mp3?extra=LymRqPjBTa2IO7nsjXdQhnyJDb0Kj8bF18fZsmdQfxVHqquJTx4DYg6OpygY39RuQWJwywsJjXGsAYwpIvy1CxDa4zY1l8I","duration":828,"position":9,"channelId":111111,"cover":"https://cs7059.vk.me/c625322/v625322522/46e52/QrX49QKP7A8.jpg"},{"id":"2000366644_413588981","date":1446745860,"artist":"Gert Thrue","title":"Сepheus","url":"https://psv4.vk.me/c611619/u226313522/audios/a2d4a00974d6.mp3?extra=B6vfuUpMczD8aKrNC6mQq1iADc5GG6YW7yAwQc_lkjF-ByhUKjMczsp1cD8twjG-9SzIrsekjXx0ofkIHDuHCuE0-OSIrYE","duration":287,"position":1,"channelId":111111,"cover":"https://pp.vk.me/c627727/v627727522/21eb0/O7qXQsdbqcQ.jpg"},{"id":"2000367028_412890499","date":1446745860,"artist":"Gert Thrue","title":" I Sing The Body Electric","url":"https://psv4.vk.me/c611619/u226313522/audios/01b49ccac0b8.mp3?extra=ijQPLgaxezyy1RzRJcz39MaLwavKg1gkAcf8kZyhLhAyVjMa0JkkxZFF5iKURBWSl4x222D-mmUTHW3lInmzANp1zflAjpc","duration":557,"position":2,"channelId":111111,"cover":"https://pp.vk.me/c627727/v627727522/21eb0/O7qXQsdbqcQ.jpg"},{"id":"2000368157_412217811","date":1446745860,"artist":"Gert Thrue","title":"Traveling By Thoughts","url":"https://psv4.vk.me/c611619/u226313522/audios/ad18b7d4c123.mp3?extra=DTVnhCXQhjryA77c-JJXHYuBUcNyswPMoEseMpBl1bHUi4vnvgC17oQUbwloFQ0cvm9Mg2TzLED4gezwXwNyvUQt6OQ7y4o","duration":417,"position":3,"channelId":111111,"cover":"https://pp.vk.me/c627727/v627727522/21eb0/O7qXQsdbqcQ.jpg"},{"id":"2000367096_411369229","date":1446745860,"artist":"Gert Thrue","title":"Sound Painted Pictures Of Cosmic Love","url":"https://cs9-8v4.vk.me/p7/f36678cdd949cc.mp3?extra=F1Gvm1Qb3MnzfPAV0xonnWgFpbVKdprdNdH9MryfnXXhFbevKuUtvM_-27NVe95yS5AKi8_E_V9hpa33gRh4yD3Awt4ZSPU","duration":1118,"position":4,"channelId":111111,"cover":"https://pp.vk.me/c627727/v627727522/21eb0/O7qXQsdbqcQ.jpg"},{"id":"2000367870_411012399","date":1446813051,"artist":"Harmonia","title":"Live at Fabrik in Hamburg","url":"https://psv4.vk.me/c422531/u27467342/audios/1a398874dd31.mp3?extra=u0ul0sCY_vzeHAifGPRNlZXp2tVxYZ9tH3XYABup5IMejcPWMbp93NIKEuMmLxjlNxNVCdfuvtvqm2P9QgbQys-E02G4_PQ","duration":690,"position":1,"channelId":111111,"cover":"https://pp.vk.me/c621518/v621518342/1a9bc/YQHMigBQkNU.jpg"},{"id":"2000370588_412578498","date":1446813051,"artist":"Harmonia","title":"Proto-Deluxe","url":"https://psv4.vk.me/c422730/u27467342/audios/88f82b282d0a.mp3?extra=ixSOWSo1CtlxEp3W04tj7gDNC9WoGycY3lZDFvJsQRBp5WcM7DIcgHaA3SdKBidRCXNI71tIVdmmr2fdGzie6VL3IUDpkcE","duration":269,"position":2,"channelId":111111,"cover":"https://pp.vk.me/c621518/v621518342/1a9bc/YQHMigBQkNU.jpg"},{"id":"2000370665_410333877","date":1446813051,"artist":"Harmonia","title":"Live at Onkel Pö in Hamburg","url":"https://psv4.vk.me/c422924/u27467342/audios/06551c12a181.mp3?extra=h-3ZiN_J9Z6TUYSgHuA6WYGQJxOBOIi_dmj4138kiCJrN5C6HaUjbiRrwIs7SbDuQ0svaCrdrNa1qsGwGtt9HG8MvKg9NPk","duration":552,"position":3,"channelId":111111,"cover":"https://pp.vk.me/c621518/v621518342/1a9bc/YQHMigBQkNU.jpg"},{"id":"2000367843_411001019","date":1446813051,"artist":"Harmonia","title":"Tiki-Taka","url":"https://psv4.vk.me/c613119/u27467342/audios/7ca54ba93f75.mp3?extra=lMy1GbmIqVgOg208flfG7sTLUXJS68ZZNTwvbhRbI2uKDtKHNzcih7z3VAbGOHAkP27uCfPV-CxIKDmDxfBjeSUO8TrepIo","duration":388,"position":4,"channelId":111111,"cover":"https://pp.vk.me/c621518/v621518342/1a9bc/YQHMigBQkNU.jpg"},{"id":"2000370203_411280604","date":1446883530,"artist":"Moonwood","title":"The Worm Is Calling","url":"https://psv4.vk.me/c422218/u226313522/audios/5285d25ef0f3.mp3?extra=hIHXavOciZW2XFEEG8BxtBq28y_9lIEqHS2d51YAdAuzsILPB5K2-ObOFYLAFXVIcdPKLgIQ18moON4Bra9k-eF05KoWYwo","duration":279,"position":1,"channelId":111111,"cover":"https://pp.vk.me/c623718/v623718522/56aa3/qrXemeBAByw.jpg"},{"id":"2000367977_412043363","date":1446883530,"artist":"Moonwood","title":"On the Funeral Plane","url":"https://psv4.vk.me/c422218/u226313522/audios/a26aada54db2.mp3?extra=vDHqCJaRQ9_I6GAPFg3SQkXuBik4FaOsLzAQDvZ41IFIhlFqtuMHxluoWqpDHyIbg1hepZAQKg-_MNYljS-bcEUjvRV1CCY","duration":326,"position":2,"channelId":111111,"cover":"https://pp.vk.me/c623718/v623718522/56aa3/qrXemeBAByw.jpg"},{"id":"2000371433_412006880","date":1446883530,"artist":"Moonwood","title":"God Is Silent","url":"https://psv4.vk.me/c422218/u226313522/audios/d268ef8ee8be.mp3?extra=3JhL9ZAVpfX0bPaRXbOlmJd57swwSm3MgOA19_s9349lV2I1-0YaOzpwHtnWDd04HxBcpIR_33uGfBVL8-Vx21hFzPUS3NE","duration":205,"position":3,"channelId":111111,"cover":"https://pp.vk.me/c623718/v623718522/56aa3/qrXemeBAByw.jpg"},{"id":"2000370022_411316657","date":1446883530,"artist":"Moonwood","title":"Ghola Dance","url":"https://psv4.vk.me/c422218/u226313522/audios/701e0f8585ce.mp3?extra=A0i3lgXcH9uDFDAPCjVS33dp8js6TwlrZStCeX3pPNVM0CgLS-xDBV_bl2nmTa4AVhPj1IJGl87-xP39KgeovSMi_lcmuUQ","duration":243,"position":4,"channelId":111111,"cover":"https://pp.vk.me/c623718/v623718522/56aa3/qrXemeBAByw.jpg"},{"id":"2000368680_412721419","date":1446883530,"artist":"Moonwood","title":"Bombshell Betty","url":"https://psv4.vk.me/c422218/u226313522/audios/a22337aad748.mp3?extra=rZ2_r-2hL45-ru_s1DlYso-M4jcodn_qA9z_QA5O36gpy4RJ6z6YBG6QHxUmE2QyC_V5EiEJVRmOwzaALxCmPgvIaAk4X8s","duration":189,"position":5,"channelId":111111,"cover":"https://pp.vk.me/c623718/v623718522/56aa3/qrXemeBAByw.jpg"},{"id":"2000369223_412290020","date":1446883530,"artist":"Moonwood","title":"The Girl Who Waited","url":"https://psv4.vk.me/c422218/u226313522/audios/5d7923351143.mp3?extra=zOX4Q1gNv9LMbuYMxioxCMCq7W1CBuJZ60oFL5Ur3jWi8xiioFKWiVWqj2Zq9pKotZxznE__eOLZJM1wYNfiTKx3YfYoD_I","duration":267,"position":6,"channelId":111111,"cover":"https://pp.vk.me/c623718/v623718522/56aa3/qrXemeBAByw.jpg"},{"id":"2000368033_412006879","date":1446883530,"artist":"Moonwood","title":"Pipeline of Death","url":"https://psv4.vk.me/c422218/u226313522/audios/c2ad97c9e6de.mp3?extra=6oKdI5ukNIxMh3vXdlgne5rB-rnY1WvE08kAfi4uvTGYaSurCEhyP5ls1kz4qLCGMLMR7jPpFGEpKf5f4jXmWu-iwrQ5Wik","duration":291,"position":7,"channelId":111111,"cover":"https://pp.vk.me/c623718/v623718522/56aa3/qrXemeBAByw.jpg"},{"id":"2000369931_411119263","date":1446883530,"artist":"Moonwood","title":"I'm Gonna Be Sick","url":"https://psv4.vk.me/c422218/u226313522/audios/92ea2e359e1e.mp3?extra=CBMdsQIAZDs7Wm6qLqtY8vg08mhOWRR_go-_AyTC5NNUdVZNUTmnjv-mIyVDhL-sf1DWJzJcoGQ1ApFXZHx7emyb3Bte83M","duration":347,"position":8,"channelId":111111,"cover":"https://pp.vk.me/c623718/v623718522/56aa3/qrXemeBAByw.jpg"},{"id":"2000369621_412694534","date":1446883530,"artist":"Moonwood","title":"Trans Mojave Express","url":"https://cs9-14v4.vk.me/p5/1bd8fda606c2d4.mp3?extra=xiSTBG_3ovyEBA776RI6FsTc9yxGa_o01pE2ZL8lo4H2T1z8_UjyzE1SZYHwNVsExm7z4EyFQrLcKLH24IUwH3tr3BhlpgI","duration":280,"position":9,"channelId":111111,"cover":"https://pp.vk.me/c623718/v623718522/56aa3/qrXemeBAByw.jpg"},
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

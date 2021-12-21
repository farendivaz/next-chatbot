// Options the user could type in
const prompts = [
    //0
    [''],
    //1 
    ['hi','hai','hei','hey','halo','hallo','hello'],
    //2
    ['bagaimana kabarmu',
    'bagaimana kabar anda','kabar anda',
    'apa kabar','bagaimana hari anda?','apa kabar?'],
    //3
    ['baik','baik juga','senang','luar biasa'],
    //4
    ['buruk','bosan','lelah','sedih','kecewa','tertekan','depresi'],
    //5
    ['ceritakan saya sebuah cerita','ceritakan saya suatu candaan'],
    //6
    ['terima kasih','makasih','makasih banyak'],
    //7
    ['selamat tinggal','sampai jumpa','sampai jumpa lagi'],
];

// Possible responses,in corresponding order
const replies = [
  //0
  ['Coba ketikkan sesuatu'],
  //1
  ['Hallo!','Hai!'],
  //2
  ['Baik... bagaimana keadaan anda?',
  'Sangat baik, anda?','Luar biasa, bagaimana hari anda?'],
  //3
  ['Menarik','Wah, syukurlah!','Senang mendengarnya'],
  //4
  ['Kenapa?','Semangat ya'],
  //5
  ['Bagaimana dengan?','Pada jaman dahulu...'],
  //6
  ['Sama-sama','Senang membantu anda','Tidak masalah sobat'],
  //7
  ['Selamat tinggal','Sampai jumpa lagi'],
];

const alternative = [
  'Ketikkan sesuatu yang bot pahami...',
  'Bot tidak paham...',
  'Maaf, bot tidak paham',
];

// Whatever else you want :)
const coronavirus = [
  'Tetap di rumah ya!',
  'Yuk, gunakan masker',
  'Jangan lupa jaga jarak',
  'These are uncertain times'
]
  
export {
  prompts,
  replies,
  alternative,
  coronavirus,
}
